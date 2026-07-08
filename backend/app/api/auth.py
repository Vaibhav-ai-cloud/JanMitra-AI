from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from pydantic import BaseModel, EmailStr

from app.db.database import get_db
from app.schemas.user import (
    UserRegister,
    MPRegister,
    UserLogin,
    UserResponse,
    MPResponse,
    AdminResponse,
)
from app.core.security import create_access_token, get_current_user, decode_access_token, hash_password
from app.services.auth_service import (
    register_user,
    register_mp,
    get_user_by_email,
    authenticate_user,
)
from app.constants.roles import CITIZEN, MP, ADMIN
from app.models.user import User

router = APIRouter(prefix="/auth", tags=["Authentication"])


# ── Helper: build JWT ─────────────────────────────────────────────────────────

def _make_token(user: User) -> str:
    return create_access_token(
        data={
            "sub":     user.email,
            "user_id": user.id,
            "role":    user.role,
            "email":   user.email,
        }
    )


# ════════════════════════════════════════════════════════════════════════════
# CITIZEN
# ════════════════════════════════════════════════════════════════════════════

@router.post("/register", summary="Citizen registration")
async def register_citizen(
    user: UserRegister,
    db: Session = Depends(get_db),
):
    """Register a new citizen account. Role is always forced to 'citizen'."""
    user.role = CITIZEN          # enforce — ignore any role field sent by client
    new_user = register_user(db, user)
    return {
        "message": "Registration successful.",
        "user": UserResponse.model_validate(new_user),
    }


# ════════════════════════════════════════════════════════════════════════════
# MP
# ════════════════════════════════════════════════════════════════════════════

@router.post("/mp/register", summary="MP registration (pending approval)")
async def register_mp_endpoint(
    payload: MPRegister,
    db: Session = Depends(get_db),
):
    """
    Register a new MP account.
    Status is set to **pending** — admin must approve before the MP can log in.
    """
    new_mp = register_mp(db, payload)
    return {
        "message": (
            "MP registration submitted successfully. "
            "Your account is pending admin approval."
        ),
        "user": MPResponse.model_validate(new_mp),
    }


@router.post("/mp/login", summary="MP login (approved accounts only)")
async def login_mp(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    """
    MP login.  Returns HTTP 403 if the account is *pending* or *rejected*.
    """
    user = authenticate_user(
        db,
        credentials.email,
        credentials.password,
        required_role=MP,
    )
    return {
        "access_token": _make_token(user),
        "token_type": "bearer",
        "user": MPResponse.model_validate(user),
    }


# ════════════════════════════════════════════════════════════════════════════
# ADMIN
# ════════════════════════════════════════════════════════════════════════════

@router.post("/admin/login", summary="Admin login (no self-registration)")
async def login_admin(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    """
    Admin login only.  Admin accounts are created manually in the database.
    There is no admin registration endpoint.
    """
    user = authenticate_user(
        db,
        credentials.email,
        credentials.password,
        required_role=ADMIN,
    )
    return {
        "access_token": _make_token(user),
        "token_type": "bearer",
        "user": AdminResponse.model_validate(user),
    }


# ════════════════════════════════════════════════════════════════════════════
# GENERIC LOGIN (backward-compatible — all roles)
# ════════════════════════════════════════════════════════════════════════════

@router.post("/login", summary="Generic login (citizen / MP / admin)")
async def login(
    credentials: UserLogin,
    db: Session = Depends(get_db),
):
    """
    Single login endpoint for all roles.
    MP accounts are status-gated (pending → 403, rejected → 403).
    """
    user = authenticate_user(db, credentials.email, credentials.password)

    token = _make_token(user)

    # Select the richer response schema for MPs
    if user.role == MP:
        user_out = MPResponse.model_validate(user)
    elif user.role == ADMIN:
        user_out = AdminResponse.model_validate(user)
    else:
        user_out = UserResponse.model_validate(user)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": user_out,
    }


# ════════════════════════════════════════════════════════════════════════════
# ME
# ════════════════════════════════════════════════════════════════════════════

@router.get("/me", summary="Get current authenticated user")
async def get_me(current_user: User = Depends(get_current_user)):
    """Return the profile of the authenticated user from their JWT token."""
    if current_user.role == MP:
        return MPResponse.model_validate(current_user)
    if current_user.role == ADMIN:
        return AdminResponse.model_validate(current_user)
    return UserResponse.model_validate(current_user)


# ════════════════════════════════════════════════════════════════════════════
# FORGOT / RESET PASSWORD (unchanged — preserved from original)
# ════════════════════════════════════════════════════════════════════════════

class ForgotPasswordRequest(BaseModel):
    email: EmailStr


@router.post("/forgot-password")
async def forgot_password(
    body: ForgotPasswordRequest,
    db: Session = Depends(get_db),
):
    """
    Request a password reset link.
    Always returns 200 to prevent email enumeration.
    """
    get_user_by_email(db, body.email)
    return {"message": "If that email is registered, a reset link has been sent."}


class ResetPasswordRequest(BaseModel):
    token: str
    new_password: str


@router.post("/reset-password")
async def reset_password(
    body: ResetPasswordRequest,
    db: Session = Depends(get_db),
):
    """Reset the user's password using a JWT reset token."""
    try:
        payload = decode_access_token(body.token)
    except HTTPException:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid or expired reset token. Please request a new link.",
        )

    email = payload.get("sub")
    if not email:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid reset token.",
        )

    user = get_user_by_email(db, email)
    if not user:
        raise HTTPException(status_code=404, detail="User not found.")

    user.password_hash = hash_password(body.new_password)
    db.commit()
    return {"message": "Password reset successfully."}