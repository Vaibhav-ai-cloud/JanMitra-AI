from fastapi import APIRouter, File, UploadFile, HTTPException

from app.schemas.upload import UploadResponse
from app.services.upload_service import save_image

router = APIRouter(
    prefix="/upload",
    tags=["Upload"]
)


@router.post(
    "/image",
    response_model=UploadResponse
)
async def upload_image(
    file: UploadFile = File(...)
):
    # Allowed image types
    allowed_types = [
        "image/jpeg",
        "image/png",
        "image/webp"
    ]

    if file.content_type not in allowed_types:
        raise HTTPException(
            status_code=400,
            detail="Only JPEG, PNG and WEBP images are allowed."
        )

    file_path = save_image(file)

    return UploadResponse(
        filename=file.filename,
        file_path=file_path
    )