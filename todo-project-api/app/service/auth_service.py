from app.db.database import User
from app.core.security import verify
from sqlalchemy.orm import Session
from app.schema.auth_schema import Register
from app.core.security import hash


class AuthService:
    @staticmethod
    def login_user(username: str, password: str, db: Session):
        user = db.query(User).filter(User.email == username).first()
        if not user:
            return False
        if not verify(password, user.password):
            return False
        return user

    @staticmethod
    def register_user(user: Register, db: Session):
        user_exist = db.query(User).filter(User.email == user.email).first()
        if user_exist:
            return False
        hashed_password = hash(user.password)
        user.password = hashed_password
        new_user = User(**user.model_dump())
        db.add(new_user)
        db.commit()
        return True