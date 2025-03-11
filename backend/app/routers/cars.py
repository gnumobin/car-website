from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from app.database import get_db
from app import crud
from app.schemas import CarCreate, CarUpdate, CarResponse

router = APIRouter()

@router.post("/cars", response_model=CarResponse ,status_code=201)
async def create_car(car: CarCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_car(db, car)

@router.get("/cars/{car_id}", response_model=CarResponse)
async def get_car(car_id: int, db: AsyncSession = Depends(get_db)):
    car = await crud.get_car(db, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@router.get("/cars", response_model=list[CarResponse])
async def get_all_cars(db: AsyncSession = Depends(get_db)):
    return await crud.get_all_cars(db)

@router.put("/cars/{car_id}", response_model=CarResponse , status_code=200)
async def update_car(car_id: int, car_data: CarUpdate, db: AsyncSession = Depends(get_db)):
    car = await crud.update_car(db, car_id, car_data)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return car

@router.delete("/cars/{car_id}", response_model=dict , status_code=200)
async def delete_car(car_id: int, db: AsyncSession = Depends(get_db)):
    car = await crud.delete_car(db, car_id)
    if not car:
        raise HTTPException(status_code=404, detail="Car not found")
    return {"message": f"Car with ID {car_id} has been deleted successfully."}
