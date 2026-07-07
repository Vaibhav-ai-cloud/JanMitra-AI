from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.database import get_db

from app.schemas.complaint import (
    ComplaintCreate,
    ComplaintUpdate,
    ComplaintResponse,
)

from app.services.complaint_service import (
    create_complaint,
    get_all_complaints,
    get_complaint_by_id,
    update_complaint,
    delete_complaint,
    search_complaints,
)

router = APIRouter(
    prefix="/complaints",
    tags=["Complaints"]
)


# --------------------------------
# Create Complaint
# --------------------------------
@router.post(
    "/",
    response_model=ComplaintResponse,
    status_code=201
)
async def create(
    complaint: ComplaintCreate,
    db: Session = Depends(get_db)
):
    return create_complaint(
        db,
        complaint,
        1        # Temporary user_id
    )


# --------------------------------
# Get All Complaints
# --------------------------------
@router.get(
    "/",
    response_model=list[ComplaintResponse]
)
async def get_all(
    db: Session = Depends(get_db)
):
    return get_all_complaints(db)


# --------------------------------
# Search Complaints
# IMPORTANT:
# This MUST be above /{complaint_id}
# --------------------------------
@router.get(
    "/search/",
    response_model=list[ComplaintResponse]
)
async def search(
    query: str,
    db: Session = Depends(get_db)
):
    return search_complaints(
        db,
        query
    )


# --------------------------------
# Get Complaint By ID
# --------------------------------
@router.get(
    "/{complaint_id}",
    response_model=ComplaintResponse
)
async def get_by_id(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    complaint = get_complaint_by_id(
        db,
        complaint_id
    )

    if complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return complaint


# --------------------------------
# Update Complaint
# --------------------------------
@router.put(
    "/{complaint_id}",
    response_model=ComplaintResponse
)
async def update(
    complaint_id: int,
    complaint: ComplaintUpdate,
    db: Session = Depends(get_db)
):
    updated_complaint = update_complaint(
        db,
        complaint_id,
        complaint
    )

    if updated_complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return updated_complaint


# --------------------------------
# Delete Complaint
# --------------------------------
@router.delete(
    "/{complaint_id}",
    status_code=200
)
async def delete(
    complaint_id: int,
    db: Session = Depends(get_db)
):
    deleted_complaint = delete_complaint(
        db,
        complaint_id
    )

    if deleted_complaint is None:
        raise HTTPException(
            status_code=404,
            detail="Complaint not found"
        )

    return {
        "message": "Complaint deleted successfully"
    }