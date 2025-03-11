from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Car(Base):
    """
    Car model representing a vehicle with all its specifications.
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
