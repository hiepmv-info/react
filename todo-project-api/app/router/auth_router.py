from fastapi import APIRouter, HTTPException, status, Depends

from app.schema.auth_schema import Login



router = APIRouter(
    prefix="/api/auth",
    tags=["auth"],
    responses={404: {"description": "Not found"}},
)

@router.post("/login", status_code=status.HTTP_200_OK)
async def login(login: Login):
    if 'admin' in login.email:
        return {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFiYyIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6ImFkbWluIn0.qU73qrS6DCyRRvWMuni18cC7NgOmFkZ1KrsHJOzZzXQ",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFiYyIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6ImFkbWluIn0.qU73qrS6DCyRRvWMuni18cC7NgOmFkZ1KrsHJOzZzXQ",
            "user": {
                "id": 1,
                "name": "admin",
                "email": login.email
            },
        }  
    elif 'user' in login.email:
        return {
            "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFiYyIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6InVzZXIifQ.yRJgfBvgr6AjY6ZnLvqtbLmplalU5dLiuB6_M0vQ1F0",
            "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6ImFiYyIsImlhdCI6MTUxNjIzOTAyMiwicm9sZSI6InVzZXIifQ.yRJgfBvgr6AjY6ZnLvqtbLmplalU5dLiuB6_M0vQ1F0",
            "user": {
                "id": 2,
                "name": "user",
                "email": login.email
            },
        }
    else:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid email or password") 

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register():
    return {"data": "register"}