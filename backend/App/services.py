from fastapi import HTTPException, status, Depends

from sqlalchemy.orm import Session

import schemas, models, hashing, crud


def create_user(db: Session, *, request: schemas.Register) -> models.User:
    if crud.get_by_email(db, email=request.email):
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


def sign_in(db: Session, *, user: schemas.Login) -> schemas.User:

    usr = crud.get_by_email(db, email=user.email)
    if not usr:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials"
        )

    if not hashing.verify_password(user.password, usr.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Invalid Credentials"
        )

    return usr
