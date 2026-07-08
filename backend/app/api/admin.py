from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.dependencies.auth import require_admin
from app.models.user import User
from app.schemas.user import MPResponse
from app.services.auth_service import (
    get_pending_mps,
    approve_mp,
    reject_mp,
)

router = APIRouter(prefix="/admin", tags=["Admin"])


# -- GET /admin/pending-mps ---------------------------------------------------

@router.get(
    "/pending-mps",
    response_model=list[MPResponse],
    summary="List all MPs awaiting approval",
)
async def list_pending_mps(
    db: Session = Depends(get_db),
    _admin: User = Depends(require_admin),
):
    """Return all MP registrations with status = pending."""
    return get_pending_mps(db)


# -- POST /admin/approve-mp/{id} ----------------------------------------------

@router.post(
    "/approve-mp/{user_id}",
    response_model=MPResponse,
    summary="Approve an MP registration",
)
async def approve_mp_endpoint(
    user_id: int,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_admin),
):
    """Set the MP account status to approved.  MP can now log in."""
    mp = approve_mp(db, user_id)
    return MPResponse.model_validate(mp)


# -- POST /admin/reject-mp/{id} -----------------------------------------------

@router.post(
    "/reject-mp/{user_id}",
    response_model=MPResponse,
    summary="Reject an MP registration",
)
async def reject_mp_endpoint(
    user_id: int,
    db: Session = Depends(get_db),
    _admin: User = Depends(require_admin),
):
    """Set the MP account status to rejected.  MP cannot log in."""
    mp = reject_mp(db, user_id)
    return MPResponse.model_validate(mp)
