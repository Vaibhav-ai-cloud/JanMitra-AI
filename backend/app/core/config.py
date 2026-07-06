from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "JanMitra AI"
    api_v1_prefix: str = "/api"

    class Config:
        env_file = ".env"


settings = Settings()
