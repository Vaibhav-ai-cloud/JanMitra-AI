from sqlalchemy.orm import Session
from sqlalchemy import or_
from app.ai.ai_service import analyze_new_complaint
from app.models.ai_analysis import AIAnalysis
from app.models.complaint import Complaint
from app.schemas.complaint import ComplaintCreate



def create_complaint(
    db: Session,
    complaint: ComplaintCreate,
    user_id: int
):
    # 1. Save complaint
    new_complaint = Complaint(
        title=complaint.title,
        description=complaint.description,
        user_id=user_id
    )

    db.add(new_complaint)
    db.commit()
    db.refresh(new_complaint)

    # 2. Run AI analysis
    analysis = analyze_new_complaint(
        title=complaint.title,
        description=complaint.description
    )

    # 3. Save AI analysis
    ai_analysis = AIAnalysis(
        complaint_id=new_complaint.id,
        category=analysis["category"],
        department=analysis["department"],
        priority=analysis["priority"],
        summary=analysis["summary"],
        suggested_action=analysis["suggested_action"],
        confidence=1.0
    )

    db.add(ai_analysis)
    db.commit()

    db.refresh(new_complaint)

    return new_complaint

def get_all_complaints(db: Session):
    return db.query(Complaint).all()

def get_complaint_by_id(
    db: Session,
    complaint_id: int
):
    return (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

def update_complaint(
    db: Session,
    complaint_id: int,
    complaint_data: ComplaintCreate
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        return None

    complaint.title = complaint_data.title
    complaint.description = complaint_data.description

    db.commit()
    db.refresh(complaint)

    return complaint

def delete_complaint(
    db: Session,
    complaint_id: int
):
    complaint = (
        db.query(Complaint)
        .filter(Complaint.id == complaint_id)
        .first()
    )

    if complaint is None:
        return None

    db.delete(complaint)
    db.commit()

    return complaint

def search_complaints(
    db: Session,
    query: str
):
    return (
        db.query(Complaint)
        .filter(
            or_(
                Complaint.title.ilike(f"%{query}%"),
                Complaint.description.ilike(f"%{query}%")
            )
        )
        .all()
    )