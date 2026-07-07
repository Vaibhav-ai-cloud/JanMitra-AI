from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.user import UserRegister, UserLogin
from app.core.security import create_access_token
from app.services.auth_service import (
    register_user,
    get_user_by_email,
    authenticate_user
)

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


from fastapi import HTTPException


@router.post("/register")
async def register(
    user: UserRegister,
    db: Session = Depends(get_db)
):
    existing_user = get_user_by_email(db, user.email)

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = register_user(db, user)

    return {
        "message": "User registered successfully",
        "user_id": new_user.id,
        "email": new_user.email
    }

@router.post("/login")
async def login(
    user: UserLogin,
    db: Session = Depends(get_db)
):
    authenticated_user = authenticate_user(
        db,
        user.email,
        user.password
    )

    if not authenticated_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
    data={
        "sub": authenticated_user.email
    }
)

    return {
    "access_token": access_token,
    "token_type": "bearer"
}