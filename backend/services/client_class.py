import json
import qrcode
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from core.database import SessionLocal
from models.feedback_model import Feedback

load_dotenv()

class Client:

    def save_client_savefeedback(self, userId, body):
        db: Session = SessionLocal()

        try:
            feedback = Feedback(
                user_id=userId,
                client_name=body.get('client_name'),
                client_phone=body.get('client_phone'),
                type_of_service=body.get('selectedService'),  # Field mapping
                affiliation=body.get('affiliation'),
                age_group=body.get('age'),
                sex=body.get('sex'),
                address=body.get('address'),
                specific_location=body.get('specific_location'),
                employment_status=body.get('employment_status'),
                service_rating=body.get('serviceRatings'),  # Field mapping
                other_suggestions=body.get('other_suggestions')
            )
            db.add(feedback)
            db.commit()
            db.refresh(feedback)
            return {"message": "Feedback saved", "id": feedback.id}
        except Exception as e:
            db.rollback()
            return {"error": str(e)}
        finally:
            db.close()
