from sqlalchemy.sql import func
from sqlalchemy import Column, Integer, String, DateTime, Enum
from core.database import Base

class Users(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, nullable=False, unique=True, index=True)
    password = Column(String, nullable=False)
    user_type = Column(Enum("hr_admin", "office_admin", "it_admin", name="user_roles"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())