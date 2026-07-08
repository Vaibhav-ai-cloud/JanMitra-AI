from pydantic import BaseModel


class UploadResponse(BaseModel):
    filename: str
    file_path: str