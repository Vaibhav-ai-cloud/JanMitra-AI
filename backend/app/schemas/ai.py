from pydantic import BaseModel


class ComplaintAnalysisRequest(BaseModel):
    title: str
    description: str


class ComplaintAnalysisResponse(BaseModel):
    category: str
    department: str
    priority: str
    summary: str
    suggested_action: str