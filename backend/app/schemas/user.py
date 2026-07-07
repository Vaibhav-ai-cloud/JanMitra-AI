from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    full_name: str
    email: EmailStr
    phone: str | None = None
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str

