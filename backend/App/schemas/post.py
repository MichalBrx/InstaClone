from pydantic import BaseModel, EmailStr


class Post(BaseModel):
    user_email: EmailStr
    file_name: str
    caption: str

    class Config:
        orm_mode = True
