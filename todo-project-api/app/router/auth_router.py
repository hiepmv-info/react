from typing import Annotated
from fastapi import APIRouter, HTTPException, status, Depends
from fastapi.security import OAuth2PasswordRequestForm

from app.schema.auth_schema import Login, Register, Token
from app.service.auth_service import AuthService
from app.core.oauth2 import create_access_token
from app.core.connect import get_db
from sqlalchemy.orm import Session


router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)


@router.post("/login", status_code=status.HTTP_200_OK, response_model=Token)
def login(user_credentials: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user = AuthService.login_user(user_credentials.username, user_credentials.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials"
        )

    access_token = create_access_token(data={"email": user.email, "user_id": user.id})
    return {"access_token": access_token, "token_type": "bearer", "user": {"id": user.id, "name": user.name, "email": user.email}}


@router.post("/register", status_code=status.HTTP_201_CREATED)
def register(user: Register, db: Session = Depends(get_db)):
    result = AuthService.register_user(user, db)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="User already exist"
        )
    return {"detail": "User created successfully"}
