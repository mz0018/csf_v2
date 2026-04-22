from pydantic import BaseModel, Field
from typing import Literal

class UserCreate(BaseModel):
    username: str = Field(..., min_length=2, max_length=20)
    password: str = Field(..., min_length=8, max_length=20)
    user_type: Literal["hr_admin", "office_admin"] = "office_admin"