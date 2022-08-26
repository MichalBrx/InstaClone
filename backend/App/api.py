from typing import Any, List, Optional
from fastapi import APIRouter, Depends, Query

from sqlalchemy.orm import Session
from sqlalchemy import func, or_
from fastapi_jwt_auth import AuthJWT
from fastapi.responses import JSONResponse


import schemas, deps, services, models


# poprzez APIRouter  rządania i ich endpointy przenoszone sa do pliku main.py,
# dzieki odwolania api.router
router = APIRouter(tags=["api"])


# /SignUp to endpoint w ktory uderza user metodą rzadania post
# request: schemas.Register odpowiada za dane ktore user wpisuje,
# gdyby bylo schemas.Register.password uzytkownik moglby wpisac tyko haslo
# Depends uzywane jest do wstrzykiwania zaleznosci do danej funckji
# w tym przypadku tworzona jest rzeczywista sesja, w ktorej depends wstrtzykuje get_db do funckji
# user to zmienna ktora tworzy danego uzytkownika na podstawie argumentow db i request
# endpoint SignUp zwraca dane usera gdy wszystko zostalo zaznaczone poprawnie
@router.post("/signup")
async def SignUp(request: schemas.Register, db: Session = Depends(deps.get_db)):
    user = services.create_user(db, request=request)
    return {user}


@router.post("/signin", response_model=schemas.Tokens)
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


@router.delete("/logout")
async def logout(Authorize: AuthJWT = Depends()):
    Authorize.jwt_required()

    Authorize.unset_jwt_cookies()
    return {"msg": "Successfully logout"}


@router.post("/refresh")
def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()

    current_user = Authorize.get_jwt_subject()
    new_access_token = Authorize.create_access_token(subject=current_user)
    # Set the JWT cookies in the response
    Authorize.set_access_cookies(new_access_token)
    return {"msg": "The token has been refresh"}


@router.get("/getuser", response_model=schemas.User)
async def get_current_user(
    current_user: schemas.User = Depends(deps.get_current_user),
) -> Any:
    return current_user


@router.get("/allusers", response_model=List[schemas.AllUsers])
async def get_all_users(db: Session = Depends(deps.get_db)):
    return db.query(models.User).all()


@router.get("/search/")
def search(
    search: Optional[str] = None,
    skip: int = Query(0, ge=0),
    limit: int = Query(5, ge=0),
    db: Session = Depends(deps.get_db),
) -> Any:

    q = db.query(models.User)

    if not search:
        users = q.offset(skip).limit(limit).all()
        return users

    if search:
        q = q.filter(
            or_(
                func.lower(models.User.username.contains(search)),
                func.lower(models.User.name.contains(search)),
            )
        )
    users = q.offset(skip).limit(limit).all()
    return users
