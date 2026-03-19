from pydantic import BaseModel, Field
from typing import Literal, Optional

RatingValue = Literal[1, 2, 3, 4, 5]

class ServiceRating(BaseModel):
    responsive: RatingValue
    reliability: RatingValue
    access_facilities: RatingValue
    communication: RatingValue
    costs: RatingValue
    integrity: RatingValue
    assurance: RatingValue
    outcome: RatingValue

class FeedbackCreate(BaseModel):
    client_name: Optional[str] = Field(
        None,
        min_length=2,
        max_length=50
    )
    client_phone: Optional[str] = Field(
        None,
        min_length=10,
        max_length=15,
        pattern=r"^\+?\d{10,15}$"
    )
    type_of_service: str = Field(..., min_length=2, max_length=80)
    affiliation: str = Field(..., min_length=2, max_length=80)
    age_group: str = Field(..., min_length=2, max_length=80)
    sex: str = Field(..., min_length=2, max_length=80)
    address: str = Field(..., min_length=2, max_length=80)
    employment_status: str = Field(..., min_length=2, max_length=80)

    service_rating: ServiceRating

    other_suggestions: Optional[str] = Field(
        None,
        max_length=100
    )

class FeedbackResponse(BaseModel):
    id: int
    client_name: Optional[str]
    client_phone: Optional[str]
    type_of_service: str
    affiliation: str
    age_group: str
    sex: str
    address: str
    employment_status: str

    service_rating: ServiceRating

    other_suggestions: Optional[str]

    class Config:
        orm_mode = True