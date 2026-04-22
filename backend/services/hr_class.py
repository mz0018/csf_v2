from sqlalchemy.orm import Session
from passlib.context import CryptContext

from core.database import SessionLocal
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