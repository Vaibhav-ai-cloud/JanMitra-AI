from fastapi import APIRouter

router = APIRouter(prefix="/auth", tags=["auth"])

@router.get("/me")
def get_me():
    return {"user": "demo-user"}
