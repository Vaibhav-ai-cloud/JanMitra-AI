from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func

from app.db.database import Base


class Department(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String(100), unique=True, nullable=False)

    email = Column(String(255), nullable=True)

    phone = Column(String(15), nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())