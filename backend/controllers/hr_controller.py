from fastapi import APIRouter
from services.hr_class import HR
from schemas.users_schema import UserCreate

router = APIRouter()


@router.post("/signup")
async def signup(data: UserCreate):
    hr = HR()
    result = hr.signup(data.model_dump())
    return result