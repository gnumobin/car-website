from fastapi import FastAPI
from contextlib import asynccontextmanager
from app.database import engine
from app.models import Base
from app.routers import cars, gallery_cars
import uvicorn
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from logging_config import logger

# Middleware configuration for CORS
middleware = [
    Middleware(
        CORSMiddleware,
        allow_origins=['*'],  # Allow all origins
        allow_credentials=True,  # Allow credentials (e.g., cookies)
        allow_methods=['*'],  # Allow all HTTP methods
        allow_headers=['*']  # Allow all headers
    )
]

@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Lifespan function for FastAPI to manage database initialization.

    This function ensures that database tables are created before the application starts.
    """
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)  # Create tables if they don't exist
    yield  # Continue running the application

# Initialize FastAPI app with lifespan and middleware
app = FastAPI(lifespan=lifespan, middleware=middleware)

# Include routers for cars and gallery endpoints
app.include_router(cars.router, prefix="/api", tags=["cars"])
app.include_router(gallery_cars.router, prefix="/api", tags=["gallery"])
