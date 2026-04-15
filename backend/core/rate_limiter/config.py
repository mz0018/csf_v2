from dataclasses import dataclass
from typing import Dict

@dataclass
class RateLimitConfig:
    max_requests: int
    window_seconds: int
    key_prefix: str

RATE_LIMITS: Dict[str, RateLimitConfig] = {
    "feedback_submission": RateLimitConfig(
        max_requests=30,
        window_seconds=60,
        key_prefix="rate:feedback"
    ),
    "default": RateLimitConfig(
        max_requests=60,
        window_seconds=60,
        key_prefix="rate:default"
    ),
}