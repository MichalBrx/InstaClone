from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from pydantic import EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional

import fastAPI.schemas as schemas, fastAPI.models as models, config.hashing as hashing, jwt

# db Session przekazuje inforamcje do bazy danych
# zmienna isEmailTaken sprawdza czy podany email przez uztykownika
# nie byl juz wczesniej uzyty
# funckja query wysyla zapytanie do bazy danych do tabeli User
# nastepnie funckja filter sprawdza czy emaile sa takie same
# (func.lower sprowadza wszytskie litery do malych liter)
# funckja check_email zwraca email lub none gdy email byl wczesniej uzyty
def check_email(db: Session, *, email: EmailStr) -> Optional[models.User]:
    isEmailTaken = (
        db.query(models.User)
        .filter(func.lower(models.User.email) == func.lower(email))
        .first()
    )
    return isEmailTaken


# w tej funkcji gdy check_email zwroci email to wyskoaczy blad Email is taken
# gdy zwroci none new_user zostanie dodany do bazy danych
def create_user(db: Session, *, request: schemas.Register) -> models.User:
    if check_email(db, email=request.email):
        raise HTTPException(
            status_code=422,
            detail=[{"loc": ["body", "email"], "msg": "Email is taken"}],
        )
    new_user = models.User(
        username=request.username,
        password=hashing.get_password_hash(request.password),
        email=request.email,
        name=request.name,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


# ta funkcja sprawdza czy podane dane dane do logowania sa prawidłowe
# db.query wysyła zapytanie do models.User, funckja .filter porównuje
# email w bazie danych z emailem podanym przez usera
# funckja .first bierze pierwszą wartośc jaką znajdzie


def token_valid(db: Session, form_data: OAuth2PasswordRequestForm = Depends()):
    user = (
        db.query(models.User)
        .filter(func.lower(models.User.email) == func.lower(form_data.username))
        .first()
    )

    if not user:
        raise HTTPException(
            detail="Invalid Email or Password",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )

    if not hashing.verify_password(form_data.password, user.password):
        raise HTTPException(
            detail="Invalid Email or Password",
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        )
    access_token = jwt.create_access_token({"sub": user.email})
    return access_token
