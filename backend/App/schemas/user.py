from pydantic import BaseModel, EmailStr


class User(BaseModel):
    username: str
    email: EmailStr
    name: str

    class Config:
        orm_mode = True


class Login(BaseModel):
    email: EmailStr
    password: str


class Register(BaseModel):
    username: str
    password: str
    email: EmailStr
    name: str


class AllUsers(BaseModel):
    id: int
    username: str
    name: str

    class Config:
        orm_mode = True
