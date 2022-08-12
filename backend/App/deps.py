from pydantic import EmailStr
from db.database import SessionLocal
from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException
from fastapi_jwt_auth import AuthJWT
import schemas, crud, models

# wstzykuje rzeczywista (aktualna) sesje sqlAlchemy ORM
# dzieki temu tworzy sie sesja bazy danych i po zakonczeniu funkcji zamknie sie
async def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def get_current_user(
    db: Session = Depends(get_db), Authorize: AuthJWT = Depends()
) -> schemas.User:
    Authorize.jwt_required()

    id = Authorize.get_jwt_subject()

    user = crud.get_by_email(db, email=id)

    if not user:
        raise HTTPException(status_code=401)
    return user
