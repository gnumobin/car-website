from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import engine
from app.models import Base
from app.routers import cars

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan function for FastAPI that initializes the database connection.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # Create tables if they don't exist
    yield  # Continue running the app

app = FastAPI(lifespan=lifespan)

app.include_router(cars.router, prefix="/api", tags=["cars"])
