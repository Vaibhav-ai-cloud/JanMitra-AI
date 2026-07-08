import re
from pydantic import BaseModel, EmailStr, field_validator
from typing import Optional
from datetime import datetime

from app.constants.roles import CITIZEN, MP, ADMIN, ALLOWED_REGISTRATION_ROLES


# ── Citizen Registration ───────────────────────────────────────────────────────

class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: Optional[str] = None
    password: str
    role: str = CITIZEN

    @field_validator("role")
    @classmethod
    def role_must_be_citizen(cls, v: str) -> str:
        if v not in ALLOWED_REGISTRATION_ROLES:
            raise ValueError(
                f"Role '{v}' is not allowed for registration."
            )
        return v

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one digit.")
        return v

    @field_validator("phone")
    @classmethod
    def phone_format(cls, v: Optional[str]) -> Optional[str]:
        if v is None:
            return v
        cleaned = re.sub(r"\D", "", v)
        if len(cleaned) < 10 or len(cleaned) > 15:
            raise ValueError("Phone must be 10–15 digits.")
        return cleaned


# ── MP Registration ────────────────────────────────────────────────────────────

class MPRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str
    password: str
    constituency: str
    state: str
    district: str
    party: str
    mp_id: Optional[str] = None

    @field_validator("password")
    @classmethod
    def password_strength(cls, v: str) -> str:
        if len(v) < 8:
            raise ValueError("Password must be at least 8 characters.")
        if not re.search(r"[A-Z]", v):
            raise ValueError("Password must contain at least one uppercase letter.")
        if not re.search(r"[0-9]", v):
            raise ValueError("Password must contain at least one digit.")
        return v

    @field_validator("phone")
    @classmethod
    def phone_format(cls, v: str) -> str:
        cleaned = re.sub(r"\D", "", v)
        if len(cleaned) < 10 or len(cleaned) > 15:
            raise ValueError("Phone must be 10–15 digits.")
        return cleaned

    @field_validator("full_name", "constituency", "state", "district", "party")
    @classmethod
    def not_blank(cls, v: str) -> str:
        if not v.strip():
            raise ValueError("Field must not be blank.")
        return v.strip()


# ── Login ──────────────────────────────────────────────────────────────────────

class UserLogin(BaseModel):
    email: EmailStr
    password: str


# (Admin uses the same UserLogin schema — no separate type needed)
AdminLogin = UserLogin


# ── Response Schemas ───────────────────────────────────────────────────────────

class UserResponse(BaseModel):
    """Returned for citizen accounts."""
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    role: str
    status: str

    model_config = {"from_attributes": True}


class MPResponse(BaseModel):
    """Returned for MP accounts (includes constituency fields)."""
    id: int
    full_name: str
    email: str
    phone: Optional[str] = None
    role: str
    status: str
    constituency: Optional[str] = None
    district: Optional[str] = None
    state: Optional[str] = None
    party: Optional[str] = None
    mp_id: Optional[str] = None
    created_at: Optional[datetime] = None

    model_config = {"from_attributes": True}


class AdminResponse(BaseModel):
    """Returned for admin accounts."""
    id: int
    full_name: str
    email: str
    role: str
    status: str

    model_config = {"from_attributes": True}
