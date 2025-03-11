from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.models import Car
from app.schemas import CarCreate, CarUpdate

async def create_car(db: AsyncSession, car_data: CarCreate):
    """
    Create a new car and store it in the database.
    """
    new_car = Car(**car_data.model_dump())
    db.add(new_car)
    await db.commit()
    await db.refresh(new_car)
    return new_car

async def get_car(db: AsyncSession, car_id: int):
    """
    Retrieve a car by its ID.
    """
    result = await db.execute(select(Car).where(Car.id == car_id))
    return result.scalar_one_or_none()

async def get_all_cars(db: AsyncSession):
    """
    Retrieve all cars from the database.
    """
    result = await db.execute(select(Car))
    return result.scalars().all()

async def update_car(db: AsyncSession, car_id: int, car_data: CarUpdate):
    """
    Update a car by ID.
    """
    car = await get_car(db, car_id)
    if not car:
        return None

    for key, value in car_data.model_dump(exclude_unset=True).items():
        setattr(car, key, value)

    await db.commit()
    await db.refresh(car)
    return car

async def delete_car(db: AsyncSession, car_id: int):
    """
    Delete a car by ID.
    """
    car = await get_car(db, car_id)
    if not car:
        return None

    await db.delete(car)
    await db.commit()
    return car
