import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://postgres:abolfazl2331@localhost:5432/cars"
)

# AWS S3 Configuration
ENDPOINT = os.getenv("ENDPOINT", "https://storage.c2.liara.space")
BUCKET_NAME = os.getenv("BUCKET_NAME", "condescending-austin-rv1bandks")
ACCESS_KEY = os.getenv("ACCESS_KEY", "nq7nk4mr8lc02n6f")
SECRET_KEY = os.getenv("SECRET_KEY", "0cf1b37c-683c-4ccb-9f3c-648fff6172e1")