from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
import boto3
from app.config import BUCKET_NAME, ACCESS_KEY, SECRET_KEY, ENDPOINT
from app.database import get_db
from app.models import Car, CarImage
from app.schemas import CarCreate, CarUpdate, CarResponse

# Create an API router
router = APIRouter()

# Initialize S3 client for AWS S3 or compatible services
s3_client = boto3.client(
    "s3",
    endpoint_url=ENDPOINT,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY
)

@router.post("/cars", response_model=CarResponse, status_code=201)
async def create_car(car: CarCreate, db: AsyncSession = Depends(get_db)):
    """
    Create a new car with optional images.

    Args:
        car (CarCreate): The car data to be created.
        db (AsyncSession): An asynchronous database session.

    Returns:
        CarResponse: The newly created car with its associated images.
    """
    # Create the car object excluding the images field
    new_car = Car(**car.model_dump(exclude={"images"}))
    db.add(new_car)
    await db.commit()
    await db.refresh(new_car)

    # Handle associated images
    if car.images:
        for image_data in car.images:
            new_image = CarImage(car_id=new_car.id, image_url=image_data.image_url)
            db.add(new_image)
        await db.commit()

    # Retrieve the car with its associated images
    stmt = select(Car).options(selectinload(Car.images)).where(Car.id == new_car.id)
    result = await db.execute(stmt)
    car_with_images = result.scalar_one_or_none()

    return car_with_images


@router.get("/cars/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retrieve a single car by ID with its associated images.

    Args:
        car_id (int): The ID of the car to retrieve.
        db (AsyncSession): An asynchronous database session.

    Returns:
        CarResponse: The car object with its associated images.

    Raises:
        HTTPException: If the car is not found.
    """
    stmt = select(Car).options(selectinload(Car.images)).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()

    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    return car


@router.get("/cars", response_model=List[CarResponse])
async def get_all_cars(db: AsyncSession = Depends(get_db)):
    """
    Retrieve a list of all cars with their associated images.

    Args:
        db (AsyncSession): An asynchronous database session.

    Returns:
        List[CarResponse]: A list of all cars with their associated images.
    """
    stmt = select(Car).options(selectinload(Car.images))
    result = await db.execute(stmt)
    cars = result.scalars().all()

    return cars


@router.put("/cars/{car_id}", response_model=CarResponse, status_code=200)
async def update_car(car_id: int, car_data: CarUpdate, db: AsyncSession = Depends(get_db)):
    """
    Update an existing car's data.

    Args:
        car_id (int): The ID of the car to update.
        car_data (CarUpdate): The updated data for the car.
        db (AsyncSession): An asynchronous database session.

    Returns:
        CarResponse: The updated car object with its associated images.

    Raises:
        HTTPException: If the car is not found.
    """
    stmt = select(Car).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()

    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    # Update the car's fields
    for key, value in car_data.model_dump(exclude_unset=True).items():
        setattr(car, key, value)

    await db.commit()
    await db.refresh(car)

    # Retrieve the car with its associated images
    stmt = select(Car).options(selectinload(Car.images)).where(Car.id == car_id)
    result = await db.execute(stmt)
    car_with_images = result.scalar_one_or_none()

    return car_with_images


@router.delete("/cars/{car_id}", response_model=dict, status_code=200)
async def delete_car(car_id: int, db: AsyncSession = Depends(get_db)):
    """
    Delete a car from the database and its associated files from AWS S3.

    Args:
        car_id (int): The ID of the car to delete.
        db (AsyncSession): An asynchronous database session.

    Returns:
        dict: A success message indicating the car and its files have been deleted.

    Raises:
        HTTPException: If the car is not found or an error occurs while deleting files from S3.
    """
    stmt = select(Car).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()

    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    # Delete the folder (and all associated files) from AWS S3
    folder_prefix = f"{car_id}/"  # Assume the car ID is the folder name
    try:
        response = s3_client.list_objects_v2(Bucket=BUCKET_NAME, Prefix=folder_prefix)

        if "Contents" in response:
            # Collect keys of all files in the folder
            objects_to_delete = [{"Key": obj["Key"]} for obj in response["Contents"]]
            # Delete all files in the folder
            s3_client.delete_objects(
                Bucket=BUCKET_NAME,
                Delete={"Objects": objects_to_delete}
            )

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete S3 folder: {str(e)}")

    # Delete the car from the database
    await db.delete(car)
    await db.commit()

    return {"message": f"Car with ID {car_id} and its associated files have been deleted successfully."}