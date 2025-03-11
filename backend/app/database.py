from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL

# Create an async database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session factory
async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

# Dependency to get a database session
async def get_db():
    async with async_session() as session:
        yield session
