from fastapi import APIRouter

router = APIRouter()

@router.get("/client")
def hello():
    return { "message": "Hello there, from backend!"}