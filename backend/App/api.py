from fastapi import APIRouter, Depends, HTTPException, status
from requests import session
from sqlalchemy.orm import Session
from sqlalchemy import func

from fastapi_jwt_auth import AuthJWT
from fastapi.responses import JSONResponse

import schemas, deps, services, crud, hashing, models


# poprzez APIRouter  rządania i ich endpointy przenoszone sa do pliku main.py,
# dzieki odwolania api.router
router = APIRouter()


# /SignUp to endpoint w ktory uderza user metodą rzadania post
# request: schemas.Register odpowiada za dane ktore user wpisuje,
# gdyby bylo schemas.Register.password uzytkownik moglby wpisac tyko haslo
# Depends uzywane jest do wstrzykiwania zaleznosci do danej funckji
# w tym przypadku tworzona jest rzeczywista sesja, w ktorej depends wstrtzykuje get_db do funckji
# user to zmienna ktora tworzy danego uzytkownika na podstawie argumentow db i request
# endpoint SignUp zwraca dane usera gdy wszystko zostalo zaznaczone poprawnie
@router.post("/SignUp")
async def SignUp(request: schemas.Register, db: Session = Depends(deps.get_db)):
    user = services.create_user(db, request=request)
    return {user}


@router.post("/SignIn", response_model=schemas.Tokens)
async def sign_in(
    response: JSONResponse,
    user: schemas.Login,
    db: Session = Depends(deps.get_db),
    Authorize: AuthJWT = Depends(),
):
    usr = services.sign_in(db, user=user)

    access_token = Authorize.create_access_token(subject=usr.email)
    refresh_token = Authorize.create_refresh_token(subject=usr.email)

    Authorize.set_access_cookies(access_token, response)
    Authorize.set_refresh_cookies(refresh_token, response)

    return {"access_token": access_token, "refresh_token": refresh_token}
