from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserRegister
from app.core.security import hash_password


def register_user(db: Session, user: UserRegister):

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        phone=user.phone,
        password_hash=hash_password(user.password)
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user
def get_user_by_email(db: Session, email: str):
    return db.query(User).filter(User.email == email).first()

from app.core.security import verify_password


def authenticate_user(
    db: Session,
    email: str,
    password: str
):
    user = get_user_by_email(db, email)

    if not user:
        return None

    if not verify_password(
        password,
        user.password_hash
    ):
        return None

    return user