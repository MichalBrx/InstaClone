from pydantic import BaseModel
from typing import Optional


class Tokens(BaseModel):
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
