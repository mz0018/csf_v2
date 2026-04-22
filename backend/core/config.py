from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    DATABASE_URL: str
    BASE_URL_LOCAL: str
    BASE_URL_REMOTE: str
    PG_HOST: str
    PG_DATABASE: str
    PG_USER: str
    PG_PASSWORD: str
    PG_PORT: str
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    JWT_SECRET: str = "your-super-secret-key-change-in-production"
    JWT_ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7

class Config:
        env_file = ".env"

settings = Settings()