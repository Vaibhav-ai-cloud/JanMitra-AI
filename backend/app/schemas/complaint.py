from datetime import datetime

from pydantic import BaseModel


class ComplaintCreate(BaseModel):
    title: str
    description: str


class ComplaintUpdate(BaseModel):
    title: str
    description: str


class ComplaintResponse(BaseModel):
    id: int
    title: str
    description: str
    user_id: int | None
    status: str
    priority: str
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True
    }