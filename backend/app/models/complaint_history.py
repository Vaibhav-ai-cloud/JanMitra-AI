from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class ComplaintHistory(Base):
    __tablename__ = "complaint_history"

    id = Column(Integer, primary_key=True, index=True)

    old_status = Column(String(50), nullable=False)

    new_status = Column(String(50), nullable=False)

    updated_by = Column(String(100), nullable=False)

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )