import re
from pydantic import BaseModel, EmailStr, Field, validator


class Login(BaseModel):
    email: str
    password: str


class TokenData(BaseModel):
    email: str = None


class Token(BaseModel):
    access_token: str
    token_type: str
    user: dict


class Register(BaseModel):
    name: str
    email: EmailStr
    password: str = Field(..., min_length=8)

    @validator("password")
    def validate_password(cls, password):
        pattern = re.compile(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$"
        )
        if not pattern.match(password):
            raise ValueError(
                "Password must have at least one lowercase letter, one uppercase letter, one digit, and one special character"
            )
        return password
