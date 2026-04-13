from datetime import date
from sqlalchemy import func
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models.feedback_model import Feedback

load_dotenv()

class Client:

    def save_client_savefeedback(self, office_id, userId, body):
        db: Session = SessionLocal()

        try:
            selected_service = body.get('selectedService')

            existing_feedback = db.query(Feedback).filter(
                Feedback.user_id == userId,
                Feedback.office_id == office_id,
                Feedback.type_of_service == selected_service,
                func.date(Feedback.created_at) == date.today()
            ).first()

            if existing_feedback:
                return {
                    "message": "You already submitted your feedback for this service"
                }

            feedback = Feedback(
                office_id=office_id,
                user_id=userId,
                client_name=body.get('client_name'),
                client_phone=body.get('client_phone'),
                type_of_service=selected_service,
                affiliation=body.get('affiliation'),
                age_group=body.get('age'),
                sex=body.get('sex'),
                address=body.get('address'),
                specific_location=body.get('specific_location'),
                employment_status=body.get('employment_status'),
                service_rating=body.get('serviceRatings'),
                other_suggestions=body.get('other_suggestions'),
                created_at=func.now()
            )

            db.add(feedback)
            db.commit()
            db.refresh(feedback)

            return {
                "id": feedback.id,
                "success": True
            }

        except Exception as e:
            db.rollback()
            return {"error": str(e)}

        finally:
            db.close()

    def feedback_status(self, office_id, userId):
        
        db = SessionLocal()
        try:
            today = date.today()

            existing = db.query(Feedback).filter(
                Feedback.user_id == userId,
                Feedback.office_id == office_id,
                func.date(Feedback.created_at) == today
            ).first()
        
            return { "alreadySubmitted": existing is not None }
        finally:
            db.close()
