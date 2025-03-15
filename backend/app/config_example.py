import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Database Configuration
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql+asyncpg://user:password@localhost:port/dbname"
)

# AWS S3 Configuration
ENDPOINT = os.getenv("ENDPOINT", "ENDPOINT_DEFAULT_URL")
BUCKET_NAME = os.getenv("BUCKET_NAME", "BUCKETNAME_DEFAULT")
ACCESS_KEY = os.getenv("ACCESS_KEY", "ACCESSKEY_DEFAULT")
SECRET_KEY = os.getenv("SECRET_KEY", "SECRETKEY_DEFAULT")