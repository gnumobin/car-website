from fastapi import APIRouter, Depends, UploadFile, Form,  File, HTTPException , Query
from sqlalchemy.sql import func
from sqlalchemy import Integer , String
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload
from typing import List
from app.config import BUCKET_NAME, ACCESS_KEY, SECRET_KEY, ENDPOINT , CLOUD_CUSTOM_PREFIX
from app.database import get_db
from app.models import Car, CarImage
from app.schemas import CarCreate, CarUpdate, CarResponse , PaginatedCarResponse
import uuid
import boto3

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
async def create_car(
    main_image: UploadFile = File(...),           # File upload for main_image
    car_data: str = Form(...),                   # Car data as a JSON string
    db: AsyncSession = Depends(get_db)
):
    """
    Create a new car with optional images and a main image.

    Args:
        main_image (UploadFile): The main image file to upload.
        car_data (str): The car data serialized as a JSON string.
        db (AsyncSession): An asynchronous database session.

    Returns:
        CarResponse: The newly created car with its associated images and main image URL.
    """
    try:
        # Parse the JSON string into the CarCreate model
        car = CarCreate.parse_raw(car_data)  # Deserialize and validate
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Invalid car data: {str(e)}")

    # Generate a unique key for the main image
    file_extension = main_image.filename.split('.')[-1]
    image_key = f"cars/{uuid.uuid4()}.{file_extension}"

    # Infer content type if not provided
    content_type = main_image.content_type or "image/jpeg"

    try:
        # Upload the main image to S3
        s3_client.upload_fileobj(
            main_image.file,
            BUCKET_NAME,
            image_key,
            ExtraArgs={"ContentType": content_type, "ACL": "public-read"},
        )
        main_image_url = f"{CLOUD_CUSTOM_PREFIX}/{image_key}"
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to upload main image: {str(e)}")

    # Create the car object including the main image URL
    car_dict = car.model_dump(exclude={"images"})
    car_dict["main_image"] = main_image_url  # Override the main_image field

    new_car = Car(**car_dict)
    db.add(new_car)
    await db.commit()
    await db.refresh(new_car)

    # Handle associated images (if any)
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




@router.get("/cars", response_model=PaginatedCarResponse)
async def get_all_cars(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Items per page"),
    sort_order: str = Query("asc", regex="^(asc|desc)$", description="Sort by ID (asc/desc)"),
    make: str = Query(None, description="Filter by car make (e.g., 'Toyota')"),
    motor: str = Query(None, description="Filter by car motor type (e.g., 'V6', 'V8', 'Electric Motor')"),
    model : str = Query(None, description="Filter by car model type "),
    min_year: int = Query(None, description="Filter cars with year ≥ [value]"),
    max_year: int = Query(None, description="Filter cars with year ≤ [value]"),
    min_speed: int = Query(None, description="Filter cars with speed ≥ [value]"),
    max_speed: int = Query(None, description="Filter cars with speed ≤ [value]"),
    min_price: float = Query(None, description="Filter cars with price ≥ [value]"),
    max_price: float = Query(None, description="Filter cars with price ≤ [value]"),
    is_electric: bool = Query(None, description="Filter cars that are electric (true/false)"),
    is_bulletproof: bool = Query(None, description="Filter cars that are bulletproof (true/false)"),
    db: AsyncSession = Depends(get_db)
):
    """
    Retrieve a paginated, sorted, and filtered list of cars with their associated images.

    Args:
        page (int): Page number (default: 1).
        page_size (int): Items per page (default: 10, max: 100).
        sort_order (str): Sort cars by ID in 'asc' or 'desc' order.
        make (str): Filter cars by make (exact match).
        min_year (int): Filter cars with year ≥ [value].
        max_year (int): Filter cars with year ≤ [value].
        min_speed (int): Filter cars with speed ≥ [value].
        max_speed (int): Filter cars with speed ≤ [value].
        min_price (float): Filter cars with price ≥ [value].
        max_price (float): Filter cars with price ≤ [value].
        is_electric (bool): Filter cars that are electric (true/false).
        is_bulletproof (bool): Filter cars that are bulletproof (true/false).
        db (AsyncSession): An asynchronous database session.

    Returns:
        PaginatedCarResponse: Paginated, sorted, and filtered list of cars with metadata.
    """
    offset = (page - 1) * page_size

    # Base query with optional filters
    stmt = select(Car).options(selectinload(Car.images))
    
    # Apply filters
    if make:
        stmt = stmt.filter(Car.make == make)
    if motor:
        stmt.filter(Car.motor == motor)
    if model:
        stmt = stmt.filter(func.cast(func.split_part(Car.name, " ", 2), String) == model)
    if min_year:
        stmt = stmt.filter(Car.year >= min_year)
    if max_year:
        stmt = stmt.filter(Car.year <= max_year)
    if min_speed:
        stmt = stmt.filter(func.cast(func.split_part(Car.max_speed, " ", 1), Integer) >= min_speed)
    if max_speed:
        stmt = stmt.filter(func.cast(func.split_part(Car.max_speed, " ", 1), Integer) <= max_speed)
    if min_price:
        stmt = stmt.filter(Car.price >= min_price)
    if max_price:
        stmt = stmt.filter(Car.price <= max_price)
    if is_electric is not None:  # Handle both True and False cases
        stmt = stmt.filter(Car.is_electric == is_electric)
    if is_bulletproof is not None:  # Handle both True and False cases
        stmt = stmt.filter(Car.is_bulletproof == is_bulletproof)
    
    # Apply sorting
    stmt = stmt.order_by(Car.id.asc() if sort_order == "asc" else Car.id.desc())

    # Get total count of filtered cars
    total_query = select(func.count()).select_from(stmt.subquery().alias())
    total_result = await db.execute(total_query)
    total = total_result.scalar()

    # Apply pagination
    stmt = stmt.offset(offset).limit(page_size)

    # Execute query
    result = await db.execute(stmt)
    cars = result.scalars().all()

    return {
        "items": cars,
        "total": total,
        "page": page,
        "page_size": page_size
    }
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