from fastapi import APIRouter, UploadFile, File, HTTPException, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.database import get_db
from app.config import BUCKET_NAME, ENDPOINT, ACCESS_KEY, SECRET_KEY
from app.models import Car, CarImage
from app.schemas import CarImageResponse, CarImageCreate
import boto3
import uuid

# S3 Configuration
cloud_address_prefix = "https://cars-storage.abolfazlrabiei.ir"
s3_client = boto3.client(
    "s3",
    endpoint_url=ENDPOINT,
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)

router = APIRouter()


# ========================= UPLOAD IMAGE TO GALLERY =========================
@router.post("/cars/{car_id}/gallery", response_model=CarImageResponse, status_code=201)
async def add_image_to_gallery(
    car_id: int,
    image: UploadFile = File(...),
    db: AsyncSession = Depends(get_db)
):
    """
    Upload an image to the car's gallery, save it to S3, and store metadata in the database.

    Args:
        car_id (int): The ID of the car to associate the image with.
        image (UploadFile): The image file to upload.
        db (AsyncSession): An asynchronous database session.

    Returns:
        CarImageResponse: The metadata of the uploaded image.

    Raises:
        HTTPException: If the car is not found or an error occurs during the upload process.
    """
    # Check if the car exists
    stmt = select(Car).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    # Generate a unique key for the image
    file_extension = image.filename.split('.')[-1]
    image_key = f"cars/{car_id}/{uuid.uuid4()}.{file_extension}"

    try:
        # Upload the image to S3
        s3_client.upload_fileobj(
            image.file,
            BUCKET_NAME,
            image_key,
            ExtraArgs={"ContentType": image.content_type, "ACL": "public-read"},
        )

        # Generate the public URL for the image
        image_url = f"{cloud_address_prefix}/{image_key}"

        # Save the image metadata in the database
        new_image = CarImage(car_id=car_id, image_url=image_url)
        db.add(new_image)
        await db.commit()
        await db.refresh(new_image)

        return new_image

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload image: {str(e)}")


# ========================= GET CAR GALLERY =========================
@router.get("/cars/{car_id}/gallery", response_model=List[CarImageResponse])
async def get_car_gallery(car_id: int, db: AsyncSession = Depends(get_db)):
    """
    Retrieve all images from the car's gallery.

    Args:
        car_id (int): The ID of the car whose gallery is being retrieved.
        db (AsyncSession): An asynchronous database session.

    Returns:
        List[CarImageResponse]: A list of all images associated with the car.

    Raises:
        HTTPException: If the car is not found.
    """
    # Check if the car exists and load its associated images
    stmt = select(Car).options(selectinload(Car.images)).where(Car.id == car_id)
    result = await db.execute(stmt)
    car = result.scalar_one_or_none()
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")

    # Return the list of associated images
    return car.images