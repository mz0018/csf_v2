import redis
from typing import Optional

class RedisStorage:
    def __init__(self, host='localhost', port=6379, db=0):
        self.pool =  redis.ConnectionPool(host=host, port=port, db=db, decode_responses=True)

    def get_client(self) -> redis.Redis:
        return redis.Redis(connection_pool=self.pool)

    def increment_with_expiry(self, key: str, window: int) -> int:
        client = self.get_client()
        pipe = client.pipeline()
        pipe.incr(key)
        pipe.expire(key, window)
        return pipe.execute()[0]

storage = RedisStorage()