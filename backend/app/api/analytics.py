from fastapi import APIRouter

router = APIRouter(prefix="/analytics", tags=["analytics"])

@router.get("/")
def get_analytics():
    return {"analytics": "placeholder"}
