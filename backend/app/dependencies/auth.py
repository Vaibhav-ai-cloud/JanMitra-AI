from typing import List

from fastapi import Depends, HTTPException, status

from app.core.security import get_current_user
from app.models.user import User
from app.constants.roles import CITIZEN, MP, ADMIN


# ── Generic role factory ───────────────────────────────────────────────────────

def require_role(allowed_roles: List[str]):
    """
    Returns a FastAPI dependency that allows access only to users whose role
    is in *allowed_roles*.  Also enforces the MP approval-status gate so a
    revoked MP cannot use a cached token.

    Usage:
        @router.get("/mp-only")
        def endpoint(current_user: User = Depends(require_role([MP]))):
            ...
    """
    def _check(current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    f"Access denied. Required role(s): {allowed_roles}. "
                    f"Your role: '{current_user.role}'."
                ),
            )

        # Re-validate MP status on every request (token may outlive approval)
        if current_user.role == MP and current_user.status != "approved":
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=(
                    "Your account is awaiting admin approval."
                    if current_user.status == "pending"
                    else "Your account has been rejected."
                ),
            )

        return current_user

    return _check


# ── Named shorthand dependencies ───────────────────────────────────────────────

def require_admin(current_user: User = Depends(require_role([ADMIN]))) -> User:
    """Allow only admin users."""
    return current_user


def require_mp(current_user: User = Depends(require_role([MP]))) -> User:
    """Allow only approved MP users."""
    return current_user


def require_citizen(current_user: User = Depends(require_role([CITIZEN]))) -> User:
    """Allow only citizen users."""
    return current_user


def require_mp_or_admin(
    current_user: User = Depends(require_role([MP, ADMIN]))
) -> User:
    """Allow MP or admin users (e.g. shared analytics endpoints)."""
    return current_user
