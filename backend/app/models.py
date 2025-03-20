from sqlalchemy import Column, Integer, String, Float, ForeignKey, Boolean , Index 
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship

# Base class for declarative models
Base = declarative_base()

class Car(Base):
    """
    Represents a car with detailed specifications.

    Attributes:
        id (int): Primary key and unique identifier for the car.
        name (str): Name of the car (e.g., model name).
        year (int): Manufacturing year of the car.
        price (float): Price of the car.
        motor (str): Engine type or specification.
        torque (str): Torque details of the car.
        zero_to_hundred (str): Time taken to accelerate from 0 to 100 km/h.
        max_speed (str): Maximum speed of the car.
        traction (str): Traction type (e.g., AWD, FWD).
        color (str): Exterior color of the car.
        interior (str): Interior design/material details.
        fuel (str): Fuel type (e.g., petrol, diesel, electric).
        seats (int): Number of seats in the car.
        trunk_space (str): Trunk capacity details.
        main_image (str): URL of the main image of the car.
        is_bulletproof (bool): Indicates if the car is bulletproof (default: False).
        is_electric (bool): Indicates if the car is electric (default: False).
        make (str) : brand car. (e.g. , toyota , bmw).
        images (relationship): Relationship to associated `CarImage` objects.
    """
    __tablename__ = "cars"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    year = Column(Integer, nullable=False)
    price = Column(Float, nullable=False)
    motor = Column(String)
    torque = Column(String)
    zero_to_hundred = Column(String)
    max_speed = Column(String)
    traction = Column(String)
    color = Column(String)
    interior = Column(String)
    fuel = Column(String)
    seats = Column(Integer)
    trunk_space = Column(String)
    main_image = Column(String)
    is_bulletproof = Column(Boolean, default=False, nullable=False)
    is_electric = Column(Boolean, default=False, nullable=False)
    make = Column(String, nullable=False)

    __table_args__ = (
        Index("ix_cars_make", "make"),
    )

    # Relationship to CarImage
    images = relationship("CarImage", back_populates="car", lazy="select")

class CarImage(Base):
    """
    Represents an image associated with a car.

    Attributes:
        id (int): Primary key and unique identifier for the image.
        car_id (int): Foreign key referencing the `id` of the associated car.
        image_url (str): URL of the image.
        car (relationship): Relationship to the associated `Car` object.
    """
    __tablename__ = "car_images"

    id = Column(Integer, primary_key=True, index=True)
    car_id = Column(Integer, ForeignKey("cars.id", ondelete="CASCADE"), nullable=False)
    image_url = Column(String, nullable=False)

    # Relationship to Car
    car = relationship("Car", back_populates="images")