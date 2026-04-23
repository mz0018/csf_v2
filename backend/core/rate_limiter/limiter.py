import time
from functools import wraps
import logging
from fastapi import HTTPException, Request
from fastapi.responses import JSONResponse
from .config import RATE_LIMITS, RateLimitConfig
from .storage import storage

logger = logging.getLogger(__name__)

class RateLimiter:
    def __init__(self, storage: storage.__class__):
        self.storage = storage

    def _generate_key(self, config: RateLimitConfig, identifier: str) -> str:
        return f"{config.key_prefix}:{identifier}"

    def _sliding_window_count(self, config: RateLimitConfig, identifier: str) -> int:
        key = self._generate_key(config, identifier)
        current_count = self.storage.get_client().get(key)
        return int(current_count) if current_count else 0

    def is_allowed(self, config: RateLimitConfig, identifier: str) -> tuple[bool, int]:
        key = self._generate_key(config, identifier)
        current = self.storage.increment_with_expiry(key, config.window_seconds)
        remaining = max(0, config.max_requests - current)
        return current <= config.max_requests, remaining

_rate_limiter = RateLimiter(storage)

def rate_limit(key: str = "default"):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            request = kwargs.get("request")

            if not request:
                for arg in args:
                    if isinstance(arg, Request):
                        request = arg
                        break

            config = RATE_LIMITS.get(key, RATE_LIMITS["default"])
            user_id = request.cookies.get("userId") or request.client.host

            identifier = f"{user_id}"
            allowed, remaining = _rate_limiter.is_allowed(config, identifier)

            if not allowed:
                logger.warning(f"Rate limit exceeded for {identifier} on '{key}'")
                raise HTTPException(
                    status_code=429,
                    detail=f"Too many login attempts. Please try again later."
                )

            result = await func(*args, **kwargs)

            if isinstance(result, dict):
                return JSONResponse(
                    content=result,
                    headers={"X-RateLimit-Remaining": str(remaining)},
                )

            return result

        return wrapper

    return decorator


limiter = RateLimiter(storage)