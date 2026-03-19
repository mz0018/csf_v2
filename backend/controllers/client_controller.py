from fastapi import APIRouter

router = APIRouter()

@router.get("/client")
def hello():
    return { "message": "Hello there, from backend!"}

@router.post("/save-feedback")
def save_feedback():
    return {"message": "Feedback saved"}

@router.get("/feedback")
def feedback():
    return {"message": "Install fucking postgres and finished this shit!"}