from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError

from app.models.user import User
from app.schemas.user import UserRegister, MPRegister
from app.core.security import hash_password, verify_password
from app.constants.roles import MP, ADMIN


# ── Citizen Registration ───────────────────────────────────────────────────────

def register_user(db: Session, user: UserRegister) -> User:
    new_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password_hash=hash_password(user.password),
        role=user.role,
        status="active",        # citizens are immediately active
    )
    db.add(new_user)
    try:
        db.commit()
        db.refresh(new_user)
    except IntegrityError as e:
        db.rollback()
        _raise_integrity_error(e)
    return new_user


# ── MP Registration ────────────────────────────────────────────────────────────

def register_mp(db: Session, payload: MPRegister) -> User:
    new_mp = User(
        full_name=payload.full_name,
        email=payload.email,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role=MP,
        status="pending",       # requires admin approval
        constituency=payload.constituency,
        district=payload.district,
        state=payload.state,
        party=payload.party,
        mp_id=payload.mp_id if payload.mp_id else None,
    )
    db.add(new_mp)
    try:
        db.commit()
        db.refresh(new_mp)
    except IntegrityError as e:
        db.rollback()
        _raise_integrity_error(e)
    return new_mp


# ── Lookup helpers ─────────────────────────────────────────────────────────────

def get_user_by_email(db: Session, email: str) -> User | None:
    return db.query(User).filter(User.email == email).first()


def get_user_by_id(db: Session, user_id: int) -> User | None:
    return db.query(User).filter(User.id == user_id).first()


# ── Authentication (shared: citizen / MP / admin) ──────────────────────────────

def authenticate_user(
    db: Session,
    email: str,
    password: str,
    *,
    required_role: str | None = None,
) -> User:
    """
    Validates credentials and, for MPs, enforces the approval workflow.

    Raises HTTPException (not ValueError) so callers get proper HTTP responses.
    Pass required_role="mp" or required_role="admin" to enforce role gating.
    For the generic /auth/login endpoint leave required_role=None.
    """
    user = get_user_by_email(db, email)

    if not user or not verify_password(password, user.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password.",
        )

    # Role gate (when called from role-specific endpoints)
    if required_role and user.role != required_role:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail=f"This login endpoint is for {required_role} accounts only.",
        )

    # MP approval gate
    if user.role == MP:
        if user.status == "pending":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account is awaiting admin approval.",
            )
        if user.status == "rejected":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account has been rejected.",
            )
        if user.status != "approved":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Your account is not active.",
            )

    return user


# ── Admin dashboard helpers ────────────────────────────────────────────────────

def get_pending_mps(db: Session) -> list[User]:
    return (
        db.query(User)
        .filter(User.role == MP, User.status == "pending")
        .order_by(User.created_at.asc())
        .all()
    )


def approve_mp(db: Session, user_id: int) -> User:
    mp = db.query(User).filter(User.id == user_id, User.role == MP).first()
    if not mp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="MP account not found.",
        )
    if mp.status == "approved":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="MP account is already approved.",
        )
    mp.status = "approved"
    db.commit()
    db.refresh(mp)
    return mp


def reject_mp(db: Session, user_id: int) -> User:
    mp = db.query(User).filter(User.id == user_id, User.role == MP).first()
    if not mp:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="MP account not found.",
        )
    if mp.status == "rejected":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="MP account is already rejected.",
        )
    mp.status = "rejected"
    db.commit()
    db.refresh(mp)
    return mp


# ── Private ────────────────────────────────────────────────────────────────────

def _raise_integrity_error(e: IntegrityError) -> None:
    error_str = str(e.orig).lower() if e.orig else str(e).lower()
    if "email" in error_str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered.",
        )
    if "phone" in error_str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number already registered.",
        )
    if "mp_id" in error_str:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="MP ID already registered.",
        )
    raise HTTPException(
        status_code=status.HTTP_400_BAD_REQUEST,
        detail="Account could not be created. Please try again.",
    )