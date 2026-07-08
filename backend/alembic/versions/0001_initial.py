"""Initial migration — complete schema from models

Revision ID: 0001_initial
Revises:
Create Date: 2026-07-08 00:00:00.000000

Tables created (in dependency order):
  1. categories
  2. departments
  3. users
  4. complaints
  5. ai_analysis
  6. complaint_images
  7. complaint_history
  8. notifications
"""

from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa

# ---------------------------------------------------------------------------
revision: str = "0001_initial"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None
# ---------------------------------------------------------------------------


def upgrade() -> None:

    # ── 1. categories ────────────────────────────────────────────────────────
    op.create_table(
        "categories",
        sa.Column("id",          sa.Integer(),     nullable=False),
        sa.Column("name",        sa.String(100),   nullable=False),
        sa.Column("description", sa.String(255),   nullable=True),
        sa.Column("created_at",  sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_index("ix_categories_id", "categories", ["id"], unique=False)

    # ── 2. departments ───────────────────────────────────────────────────────
    op.create_table(
        "departments",
        sa.Column("id",         sa.Integer(),    nullable=False),
        sa.Column("name",       sa.String(100),  nullable=False),
        sa.Column("email",      sa.String(255),  nullable=True),
        sa.Column("phone",      sa.String(15),   nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("name"),
    )
    op.create_index("ix_departments_id", "departments", ["id"], unique=False)

    # ── 3. users ─────────────────────────────────────────────────────────────
    op.create_table(
        "users",
        sa.Column("id",           sa.Integer(),    nullable=False),
        sa.Column("full_name",    sa.String(100),  nullable=False),
        sa.Column("email",        sa.String(255),  nullable=False),
        sa.Column("phone",        sa.String(20),   nullable=True),
        sa.Column("password_hash",sa.String(255),  nullable=False),
        sa.Column("role",         sa.String(20),   nullable=False, server_default="citizen"),
        sa.Column("status",       sa.String(20),   nullable=False, server_default="active"),
        sa.Column("constituency", sa.String(150),  nullable=True),
        sa.Column("district",     sa.String(100),  nullable=True),
        sa.Column("state",        sa.String(100),  nullable=True),
        sa.Column("party",        sa.String(100),  nullable=True),
        sa.Column("mp_id",        sa.String(50),   nullable=True),
        sa.Column("is_verified",  sa.Boolean(),    nullable=True),
        sa.Column("created_at",   sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.Column("updated_at",   sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("email"),
        sa.UniqueConstraint("phone"),
        sa.UniqueConstraint("mp_id"),
    )
    op.create_index("ix_users_id",    "users", ["id"],    unique=False)
    op.create_index("ix_users_email", "users", ["email"], unique=True)
    op.create_index("ix_users_phone", "users", ["phone"], unique=True)

    # ── 4. complaints ────────────────────────────────────────────────────────
    op.create_table(
        "complaints",
        sa.Column("id",          sa.Integer(),    nullable=False),
        sa.Column("title",       sa.String(200),  nullable=False),
        sa.Column("description", sa.Text(),       nullable=False),
        sa.Column("user_id",     sa.Integer(),    nullable=True),
        sa.Column("status",      sa.String(20),   nullable=True, server_default="Pending"),
        sa.Column("priority",    sa.String(20),   nullable=True, server_default="Medium"),
        sa.Column("created_at",  sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.Column("updated_at",  sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_complaints_id", "complaints", ["id"], unique=False)

    # ── 5. ai_analysis ───────────────────────────────────────────────────────
    op.create_table(
        "ai_analysis",
        sa.Column("id",               sa.Integer(),  nullable=False),
        sa.Column("complaint_id",     sa.Integer(),  nullable=False),
        sa.Column("category",         sa.String(100), nullable=False),
        sa.Column("department",       sa.String(100), nullable=False),
        sa.Column("priority",         sa.String(20),  nullable=False),
        sa.Column("summary",          sa.Text(),      nullable=False),
        sa.Column("suggested_action", sa.Text(),      nullable=False),
        sa.Column("confidence",       sa.Float(),     nullable=True),
        sa.Column("created_at",       sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.ForeignKeyConstraint(["complaint_id"], ["complaints.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("complaint_id"),
    )
    op.create_index("ix_ai_analysis_id", "ai_analysis", ["id"], unique=False)

    # ── 6. complaint_images ──────────────────────────────────────────────────
    op.create_table(
        "complaint_images",
        sa.Column("id",           sa.Integer(),   nullable=False),
        sa.Column("complaint_id", sa.Integer(),   nullable=False),
        sa.Column("image_path",   sa.String(500), nullable=False),
        sa.Column("uploaded_at",  sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.ForeignKeyConstraint(["complaint_id"], ["complaints.id"]),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_complaint_images_id", "complaint_images", ["id"], unique=False)

    # ── 7. complaint_history ─────────────────────────────────────────────────
    op.create_table(
        "complaint_history",
        sa.Column("id",         sa.Integer(),   nullable=False),
        sa.Column("old_status", sa.String(50),  nullable=False),
        sa.Column("new_status", sa.String(50),  nullable=False),
        sa.Column("updated_by", sa.String(100), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_complaint_history_id", "complaint_history", ["id"], unique=False)

    # ── 8. notifications ─────────────────────────────────────────────────────
    op.create_table(
        "notifications",
        sa.Column("id",         sa.Integer(),   nullable=False),
        sa.Column("title",      sa.String(200), nullable=False),
        sa.Column("message",    sa.String(500), nullable=False),
        sa.Column("is_read",    sa.Boolean(),   nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True),
                  server_default=sa.text("now()"), nullable=True),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index("ix_notifications_id", "notifications", ["id"], unique=False)


def downgrade() -> None:
    # Drop in reverse dependency order
    op.drop_index("ix_notifications_id",      table_name="notifications")
    op.drop_table("notifications")

    op.drop_index("ix_complaint_history_id",  table_name="complaint_history")
    op.drop_table("complaint_history")

    op.drop_index("ix_complaint_images_id",   table_name="complaint_images")
    op.drop_table("complaint_images")

    op.drop_index("ix_ai_analysis_id",        table_name="ai_analysis")
    op.drop_table("ai_analysis")

    op.drop_index("ix_complaints_id",         table_name="complaints")
    op.drop_table("complaints")

    op.drop_index("ix_users_phone",  table_name="users")
    op.drop_index("ix_users_email",  table_name="users")
    op.drop_index("ix_users_id",     table_name="users")
    op.drop_table("users")

    op.drop_index("ix_departments_id", table_name="departments")
    op.drop_table("departments")

    op.drop_index("ix_categories_id", table_name="categories")
    op.drop_table("categories")
