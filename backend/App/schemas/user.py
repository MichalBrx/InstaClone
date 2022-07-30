from pydantic import BaseModel, EmailStr


class User(BaseModel):
    username: str
    email: EmailStr


class Login(BaseModel):
    email: EmailStr
    password: str


class Register(BaseModel):
    username: str
    password: str
    email: EmailStr
    name: str
