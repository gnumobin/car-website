from pydantic import BaseModel
from typing import Optional, List

class CarImageResponse(BaseModel):
    """
    Schema for returning car image data.

    Attributes:
        id (int): Unique identifier for the image.
        image_url (str): URL of the image.
    """
    id: int
    image_url: str

class CarBase(BaseModel):
    """
    Base schema for a car, containing all its specifications.

    Attributes:
        name (str): Name or model of the car.
        year (int): Manufacturing year of the car.
        price (float): Price of the car.
        motor (Optional[str]): Engine type or specification (optional).
        torque (Optional[str]): Torque details of the car (optional).
        zero_to_hundred (Optional[str]): Time taken to accelerate from 0 to 100 km/h (optional).
        max_speed (Optional[str]): Maximum speed of the car (optional).
        traction (Optional[str]): Traction type (e.g., AWD, FWD) (optional).
        color (Optional[str]): Exterior color of the car (optional).
        interior (Optional[str]): Interior design/material details (optional).
        fuel (Optional[str]): Fuel type (e.g., petrol, diesel, electric) (optional).
        seats (Optional[int]): Number of seats in the car (optional).
        trunk_space (Optional[str]): Trunk capacity details (optional).
        main_image (Optional[str]): URL of the main image of the car (optional).
        is_electric (Optional[bool]): Indicates if the car is electric (default: False).
        is_bulletproof (Optional[bool]): Indicates if the car is bulletproof (default: False).
        images (List[CarImageResponse]): List of associated images (optional, default: empty list).
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
    is_electric: Optional[bool] = False
    is_bulletproof: Optional[bool] = False
    images: List[CarImageResponse] = []

class CarCreate(CarBase):
    """
    Schema for creating a new car. Inherits all attributes from `CarBase`.
    """
    pass

class CarUpdate(CarBase):
    """
    Schema for updating an existing car. Inherits all attributes from `CarBase`.
    """
    pass

class CarResponse(CarBase):
    """
    Schema for returning car data. Extends `CarBase` with an additional `id` field.

    Attributes:
        id (int): Unique identifier for the car.
    """
    id: int

    class Config:
        from_attributes = True  # Allows ORM mode for compatibility with SQLAlchemy models.

class CarImage(BaseModel):
    """
    Schema for representing a car image.

    Attributes:
        id (int): Unique identifier for the image.
        car_id (int): Foreign key referencing the associated car's ID.
        image_url (str): URL of the image.
    """
    id: int
    car_id: int
    image_url: str

    class Config:
        from_attributes = True  # Allows ORM mode for compatibility with SQLAlchemy models.

class CarImageCreate(BaseModel):
    """
    Schema for saving a new car image.

    Attributes:
        image_url (str): URL of the image to be saved.
    """
    image_url: str

class PaginatedCarResponse(BaseModel):
    """
    for paginate response cars.
    """
    items: List[CarResponse]
    total: int
    page: int
    page_size: int