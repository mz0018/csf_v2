from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, JSON, DateTime
from core.database import Base

class Feedback(Base):
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    office_id = Column(String, nullable=False)
    user_id = Column(String, nullable=False)
    client_name = Column(String, nullable=True)
    client_phone = Column(String, nullable=True)
    type_of_service = Column(String, nullable=False)
    affiliation = Column(String, nullable=False)
    age_group = Column(String, nullable=False)
    sex = Column(String, nullable=False)
    address = Column(String, nullable=False)
    specific_location = Column(String, nullable=True)
    employment_status = Column(String, nullable=False)
    service_rating = Column(JSON, nullable=False)
    other_suggestions = Column(String, nullable=True)
    created_at = Column(DateTime, default=func.now())