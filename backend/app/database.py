from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from app.config import DATABASE_URL

# Create an asynchronous database engine
engine = create_async_engine(DATABASE_URL, echo=True)

# Create a session factory for AsyncSession
async_session = sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False  # Prevents objects from expiring after commit
)

# Dependency to provide a database session
async def get_db() -> AsyncSession:
    """
    Asynchronous dependency to provide a database session.

    Yields:
        AsyncSession: An instance of AsyncSession for database operations.
    """
    async with async_session() as session:
        yield session