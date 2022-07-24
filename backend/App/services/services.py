from hashlib import algorithms_available
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm, OAuth2PasswordBearer
from jose import JWTError, jwt as jwt_lib
from pydantic import EmailStr
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional
from core.config import settings

import fastAPI.schemas as schemas, fastAPI.models as models
import core.hashing as hashing, services.jwt as jwt
import core.deps as deps

# funckja check_email zwraca email lub none gdy email byl wczesniej uzyty
# db Session przekazuje inforamcje do bazy danych
# zmienna isEmailTaken sprawdza czy podany email przez uztykownika
# nie byl juz wczesniej uzyty
# funckja query wysyla zapytanie do bazy danych do tabeli User
# nastepnie funckja filter sprawdza czy emaile sa takie same
# (func.lower sprowadza wszytskie litery do malych liter)


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


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="SignIn")


async def get_current_user(
    db: Session = Depends(deps.get_db), token: str = Depends(oauth2_scheme)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt_lib.decode(
            token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM]
        )
        email: str = payload.get("sub")
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = check_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user
