from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm

import fastAPI.schemas as schemas, deps.deps as deps, fastAPI.models as models, deps.services as services


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


@router.post("/SignIn")
async def SignIn(
    form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(deps.get_db)
):
    access_token = services.token_valid(db, form_data)
    return {"access_token": access_token, "token_type": "bearer"}
