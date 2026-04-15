import os
import time
import threading
import redis
import logging

from dotenv import load_dotenv

load_dotenv()
logger = logging.getLogger(__name__)

_storage_instance = None
_last_redis_check = 0
_RETRY_INTERVAL = 60

class RedisStorage:
    def __init__(
            self,
            host = os.getenv("REDIS_HOST"),
            port = os.getenv("REDIS_PORT"),
            db = os.getenv("REDIS_DB"),
        ):

        self.pool =  redis.ConnectionPool(host=host, port=port, db=db, decode_responses=True)

    def get_client(self) -> redis.Redis:
        return redis.Redis(connection_pool=self.pool)

    def increment_with_expiry(self, key: str, window: int) -> int:
        try:
            client = self.get_client()
            pipe = client.pipeline()
            pipe.incr(key)
            pipe.expire(key, window)
            return pipe.execute()[0]
        except redis.RedisError as e:
            logger.error(f"Redis error during increment: {e}")
            raise


class InMemoryStorage:
    def __init__(self):
        self._data = {}
        self._lock = threading.Lock()

    def increment_with_expiry(self, key: str, window: int) -> int:
        with self._lock:
            now = time.time()
            if key in self._data:
                val, expiry = self._data[key]
                if now < expiry:
                    self._data[key] = (val + 1, expiry)
                else:
                    self._data[key] = (1, now + window)
            else:
                self._data[key] = (1, now + window)
            return self._data[key][0]

    def get_client(self):
        return self

def get_storage(force_check: bool = False):
    global _storage_instance, _last_redis_check

    current_time = time.time()

    if _storage_instance is None or force_check or (current_time - _last_redis_check) > _RETRY_INTERVAL:
        _last_redis_check = current_time
        try:
            redis_storage = RedisStorage()
            redis_storage.get_client().ping()
            _storage_instance = redis_storage
            logger.info("Redis storage initialized")
        except Exception as e:
            if _storage_instance is None or isinstance(_storage_instance, InMemoryStorage):
                logger.warning(f"Redis unavailable, falling back to in-memory storage: {e}")
                _storage_instance = InMemoryStorage()
            else:
                logger.warning(f"Redis temporarily unavailable, keeping current storage")

    return _storage_instance

storage = get_storage()