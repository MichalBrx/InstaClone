from pydantic import BaseModel, EmailStr, Field
from typing import Optional


class User(BaseModel):
    id: int
    username: str
    email: EmailStr
    name: str

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: EmailStr
    password: str


class Register(BaseModel):
    username: str = Field(max_length=64)
    password: str
    email: EmailStr
    name: str


class AllUsers(BaseModel):
    id: int
    username: str
    name: str

    class Config:
        orm_mode = True
