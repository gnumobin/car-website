from pydantic import BaseModel
from typing import Optional

class CarBase(BaseModel):
    """
    Base schema for Car.
    """
    name: str
    year: int
    price: float
    motor: Optional[str] = None
    torque: Optional[str] = None
    zero_to_hundred: Optional[str] = None
    max_speed: Optional[str] = None
    traction: Optional[str] = None
    color: Optional[str] = None
    interior: Optional[str] = None
    fuel: Optional[str] = None
    seats: Optional[int] = None
    trunk_space: Optional[str] = None
    main_image: Optional[str] = None

class CarCreate(CarBase):
    """
    Schema for creating a new car.
    """
    pass

class CarUpdate(CarBase):
    """
    Schema for updating an existing car.
    """
    pass

class CarResponse(CarBase):
    """
    Schema for returning car data.
    """
    id: int

    class Config:
        from_attributes = True
