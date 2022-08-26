from .crudBase import CRUDBase
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, List

import models, schemas


class CRUDSearch(CRUDBase[models.User, schemas.UserCreate, schemas.UserUpdate]):
    def get_multi(
        self,
        db: Session,
        *,
        id: int,
        search: Optional[str],
        skip: int = 0,
        limit: int = 5,
    ) -> List[schemas.User]:
        q = db.query(self.model).filter(self.model.id == id)

        if search:
            q = q.filter(
                func.lower(self.model.username.contains(func.lower(search))),
            )

        users = q.offset(skip).limit(limit).all()

        return users


search = CRUDSearch(models.User)
