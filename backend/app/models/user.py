from sqlalchemy import Column, Integer, String, Boolean, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(100), nullable=False)

    email = Column(String(255), unique=True, nullable=False, index=True)

    phone = Column(String(20), unique=True, nullable=True, index=True)

    password_hash = Column(String(255), nullable=False)

    role = Column(String(20), nullable=False, default="citizen")

    # ── Account status (used for MP approval workflow) ─────────────────────────
    # citizen  → always "active"
    # mp       → starts as "pending", admin sets "approved" or "rejected"
    # admin    → always "active" (created manually)
    status = Column(String(20), nullable=False, default="active")

    # ── MP-specific fields (nullable for citizen / admin rows) ─────────────────
    constituency = Column(String(150), nullable=True)
    district     = Column(String(100), nullable=True)
    state        = Column(String(100), nullable=True)
    party        = Column(String(100), nullable=True)
    mp_id        = Column(String(50),  nullable=True, unique=True)

    is_verified = Column(Boolean, default=False)

    created_at = Column(DateTime(timezone=True), server_default=func.now())

    updated_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
    )

    complaints = relationship("Complaint", back_populates="user")