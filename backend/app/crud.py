from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import joinedload
from app.models import Car, CarImage
from app.schemas import CarCreate, CarUpdate

async def create_car(db: AsyncSession, car: CarCreate):
    """
    Creates a new car and its associated images in the database.

    Args:
        db (AsyncSession): An asynchronous database session.
        car (CarCreate): A Pydantic schema containing the car's data.

    Returns:
        Car: The newly created car object.
    """
    # Create the car object excluding the images field
    new_car = Car(**car.model_dump(exclude={"images"}))
    db.add(new_car)
    await db.commit()
    await db.refresh(new_car)

    # Add associated images for the car
    for image in car.images:
        car_image = CarImage(car_id=new_car.id, image_url=image.image_url)
        db.add(car_image)
        await db.commit()

    return new_car

async def get_car(db: AsyncSession, car_id: int):
    """
    Retrieves a car by its ID, including its associated images.

    Args:
        db (AsyncSession): An asynchronous database session.
        car_id (int): The ID of the car to retrieve.

    Returns:
        Car: The car object with its associated images, or None if not found.
    """
    stmt = select(Car).options(joinedload(Car.images)).where(Car.id == car_id)
    result = await db.execute(stmt)
    return result.scalar_one_or_none()

async def get_all_cars(db: AsyncSession):
    """
    Retrieves all cars from the database, including their associated images.

    Args:
        db (AsyncSession): An asynchronous database session.

    Returns:
        List[Car]: A list of all cars with their associated images.
    """
    stmt = select(Car).options(joinedload(Car.images))
    result = await db.execute(stmt)
    return result.scalars().all()

async def update_car(db: AsyncSession, car_id: int, car_data: CarUpdate):
    """
    Updates an existing car's data in the database.

    Args:
        db (AsyncSession): An asynchronous database session.
        car_id (int): The ID of the car to update.
        car_data (CarUpdate): A Pydantic schema containing the updated data.

    Returns:
        Car: The updated car object, or None if the car is not found.
    """
    stmt = select(Car).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()

    if not car:
        return None

    # Update only the fields provided in the request
    for key, value in car_data.model_dump(exclude_unset=True).items():
        setattr(car, key, value)

    await db.commit()
    await db.refresh(car)
    return car

async def delete_car(db: AsyncSession, car_id: int):
    """
    Deletes a car from the database by its ID.

    Args:
        db (AsyncSession): An asynchronous database session.
        car_id (int): The ID of the car to delete.

    Returns:
        Car: The deleted car object, or None if the car is not found.
    """
    stmt = select(Car).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()

    if not car:
        return None

    await db.delete(car)
    await db.commit()
    return car