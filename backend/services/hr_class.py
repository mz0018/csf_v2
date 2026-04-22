from sqlalchemy.orm import Session
from passlib.context import CryptContext

from core.database import SessionLocal
from core.auth import create_tokens
from models.user_model import Users

pwd_context = CryptContext(schemes=["argon2"])


class HR:
    def signup(self, data: dict) -> dict:
        db: Session = SessionLocal()

        try:
            existing_user = db.query(Users).filter(
                Users.username == data["username"]
            ).first()

            if existing_user:
                return {"success": False, "error": "Username already exists"}

            hashed_password = pwd_context.hash(data["password"])

            new_user = Users(
                username=data["username"],
                password=hashed_password,
                user_type=data["user_type"],
            )

            db.add(new_user)
            db.commit()
            db.refresh(new_user)

            return {"success": True}

        except Exception as e:
            db.rollback()
            return {"success": False, "error": str(e)}

        finally:
            db.close()

    def signin(self, data: dict) -> dict:
        db: Session = SessionLocal()
        
        try:
            user = db.query(Users).filter(
                Users.username == data["username"]
            ).first()
            
            if not user:
                return {"success": False, "error": "Invalid credentials"}
            
            if not pwd_context.verify(data["password"], user.password):
                return {"success": False, "error": "Invalid credentials"}
            
            tokens = create_tokens({"id": user.id, "username": user.username, "user_type": user.user_type})
            return {"success": True, "user": {"id": user.id, "username": user.username, "user_type": user.user_type}, "tokens": tokens}
        finally:
            db.close()


    def get_user_by_id(self, user_id: int) -> dict:
        db: Session = SessionLocal()
        try:
            user = db.query(Users).filter(Users.id == user_id).first()
            if not user:
                return {"success": False, "error": "User not found"}
            return {"success": True, "user": {"id": user.id, "username": user.username, "user_type": user.user_type}}
        finally:
            db.close()