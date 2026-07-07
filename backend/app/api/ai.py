from fastapi import APIRouter

from app.ai.ollama_client import analyze_complaint
from app.schemas.ai import (
    ComplaintAnalysisRequest,
    ComplaintAnalysisResponse,
)

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post(
    "/analyze",
    response_model=ComplaintAnalysisResponse
)
async def analyze(
    request: ComplaintAnalysisRequest
):
    result = analyze_complaint(
        title=request.title,
        description=request.description
    )

    return ComplaintAnalysisResponse(**result)