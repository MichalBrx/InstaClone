from pydantic import BaseModel, EmailStr


class Register(BaseModel):
    username: str
    password: str
    email: EmailStr
    name: str
