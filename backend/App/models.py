from sqlalchemy import Column, String, Integer
from db.database import Base

# from base import Base_token
# import secrets
# from datetime import datetime, timedelta
# from pydantic import EmailStr
# from sqlalchemy import DateTime


class User(Base):
    __tablename__ = "user"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String)
    password = Column(String)
    email = Column(String)
    name = Column(String)
