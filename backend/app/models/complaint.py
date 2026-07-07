from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base


class Complaint(Base):
    __tablename__ = "complaints"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text, nullable=False)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)

    status = Column(String(20), default="Pending")

    priority = Column(String(20), default="Medium")

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now()
    )
    images = relationship(
    "ComplaintImage",
    back_populates="complaint",
    cascade="all, delete-orphan"
)
    ai_analysis = relationship(
    "AIAnalysis",
    back_populates="complaint",
    uselist=False,
    cascade="all, delete-orphan"
)

    user = relationship("User", back_populates="complaints")