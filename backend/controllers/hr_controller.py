from fastapi import APIRouter, Request, Query
from dotenv import load_dotenv

from services.hr_class import HR

load_dotenv()
router = APIRouter()

@router.post("/signup")
async def signup(request: Request):
    body = await request.json()
    hr = HR()
    result = hr.signup(body)
    return result