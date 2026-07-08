from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Float,
    DateTime,
    ForeignKey
)
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from app.db.database import Base


class AIAnalysis(Base):
    __tablename__ = "ai_analysis"

    id = Column(Integer, primary_key=True, index=True)

    complaint_id = Column(
        Integer,
        ForeignKey("complaints.id"),
        nullable=False,
        unique=True
    )

    category = Column(String(100), nullable=False)

    department = Column(String(100), nullable=False)

    priority = Column(String(20), nullable=False)

    summary = Column(Text, nullable=False)

    suggested_action = Column(Text, nullable=False)

    confidence = Column(Float, default=1.0)

    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    complaint = relationship(
        "Complaint",
        back_populates="ai_analysis"
    )