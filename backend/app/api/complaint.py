from fastapi import APIRouter

router = APIRouter(prefix="/complaints", tags=["complaints"])

@router.get("/")
def list_complaints():
    return [{"id": 1, "status": "open"}]
