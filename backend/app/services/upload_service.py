import os
import shutil
import uuid

from fastapi import UploadFile

UPLOAD_DIR = "app/uploads/complaints"


def save_image(file: UploadFile) -> str:
    """
    Save uploaded image and return relative path.
    """

    # Create upload folder if it doesn't exist
    os.makedirs(UPLOAD_DIR, exist_ok=True)

    # Generate unique filename
    extension = file.filename.split(".")[-1]
    filename = f"{uuid.uuid4()}.{extension}"

    file_path = os.path.join(UPLOAD_DIR, filename)

    # Save image
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return file_path
