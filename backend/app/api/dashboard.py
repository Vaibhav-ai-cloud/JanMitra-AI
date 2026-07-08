from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.db.database import get_db
from app.models.complaint import Complaint
from app.models.ai_analysis import AIAnalysis

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/stats")
def get_dashboard_stats(
    db: Session = Depends(get_db)
):
    total = db.query(Complaint).count()

    pending = (
        db.query(Complaint)
        .filter(Complaint.status == "Pending")
        .count()
    )

    resolved = (
        db.query(Complaint)
        .filter(Complaint.status == "Resolved")
        .count()
    )

    high_priority = (
        db.query(Complaint)
        .filter(Complaint.priority == "High")
        .count()
    )

    categories = (
        db.query(
            AIAnalysis.category,
            func.count(AIAnalysis.id)
        )
        .group_by(AIAnalysis.category)
        .all()
    )

    category_stats = {
        category: count
        for category, count in categories
    }

    return {
        "total_complaints": total,
        "pending": pending,
        "resolved": resolved,
        "high_priority": high_priority,
        "categories": category_stats
    }