from pydantic import BaseModel, EmailStr


class Register(BaseModel):
    username: str
    password: str
    email: EmailStr
    name: str


class User(BaseModel):
    id: int
    username: str
    email: EmailStr
