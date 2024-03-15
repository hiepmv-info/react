from pydantic_settings import BaseSettings


class Setting(BaseSettings):
    DATABASE_HOSTNAME: str
    DATABASE_NAME: str
    DATABASE_USERNAME: str
    DATABASE_PASSWORD: str

    @property
    def DATABASE_URL(self):
        return f"mysql://{self.DATABASE_USERNAME}:{self.DATABASE_PASSWORD}@{self.DATABASE_HOSTNAME}/{self.DATABASE_NAME}"
    

    class Config:
        env_file = ".env"
        
settings = Setting()