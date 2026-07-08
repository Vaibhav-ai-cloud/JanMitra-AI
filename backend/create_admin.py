"""
create_admin.py
---------------
Run from inside the backend/ directory with the venv active:

    python create_admin.py

Creates the Super Admin account if it does not already exist.
Uses the same models and password-hashing utility as the rest of the backend.
"""

import sys
import os

# ── Make sure "app" package is importable ────────────────────────────────────
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Import all models so SQLAlchemy can resolve every relationship before
# any query is executed (prevents "failed to locate name 'Complaint'" errors).
import app.db.base  # noqa: F401

from app.db.database import SessionLocal
from app.models.user import User
from app.core.security import hash_password

# ── Admin details ─────────────────────────────────────────────────────────────
ADMIN_FULL_NAME = "Super Admin"
ADMIN_EMAIL     = "admin@janmitra.ai"
ADMIN_PHONE     = "9999999999"
ADMIN_PASSWORD  = "Admin@123"
ADMIN_ROLE      = "admin"
ADMIN_STATUS    = "active"


def create_admin() -> None:
    db = SessionLocal()
    try:
        existing = db.query(User).filter(User.email == ADMIN_EMAIL).first()

        if existing:
            print("Admin already exists.")
            return

        admin = User(
            full_name     = ADMIN_FULL_NAME,
            email         = ADMIN_EMAIL,
            phone         = ADMIN_PHONE,
            password_hash = hash_password(ADMIN_PASSWORD),
            role          = ADMIN_ROLE,
            status        = ADMIN_STATUS,
            is_verified   = True,
        )

        db.add(admin)
        db.commit()
        db.refresh(admin)

        print("")
        print("====================================")
        print("Admin created successfully!")
        print("")
        print(f"Email:    {ADMIN_EMAIL}")
        print(f"Password: {ADMIN_PASSWORD}")
        print("====================================")
        print("")

    except Exception as exc:
        db.rollback()
        print(f"Error creating admin: {exc}")
        sys.exit(1)
    finally:
        db.close()


if __name__ == "__main__":
    create_admin()
