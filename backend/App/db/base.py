from sqlalchemy import Column, Integer
from sqlalchemy.ext.declarative import as_declarative, declared_attr


@as_declarative()
class Base:
    id = Column(Integer, primary_key=True)
    __name__: str

    @declared_attr
    def __tablename__(self) -> str:
        return self.__name__.lower()
