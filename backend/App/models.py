from sqlalchemy import Column, String, Integer, ForeignKey
from db.database import Base
from sqlalchemy.orm import relationship


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    name = Column(String)

    post = relationship("Post", back_populates="user")


class Post(Base):
    __tablename__ = "post"
    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, ForeignKey("user.email"))
    caption = Column(String)
    file_name = Column(String)

    user = relationship("User", back_populates="post")
