from sqlalchemy.orm import Session
from sqlalchemy import func
from pydantic import EmailStr
from typing import Any, Optional
from fastapi import Depends

import models

# * wymusza na tym zeby wszystkie argumenty mialy podane wartosci
#   gdy beda one puste to wyskoczy TypeError
def get_by_email(db: Session, *, email: EmailStr) -> Optional[models.User]:
    get_email = (
        db.query(models.User)
        .filter(func.lower(models.User.email) == func.lower(email))
        .first()
    )
    return get_email


def remove_by_email(db: Session, *, email: EmailStr) -> None:
    token = get_by_email(db, email)
    if not token:
        return
    db.delete(token)
    db.commit()
    return
