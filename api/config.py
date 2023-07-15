import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()  


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY')
    RAPID_API_KEY = os.getenv('RAPID_API_KEY')
    WTF_CSRF_SECRET_KEY = os.getenv('WTF_CSRF_SECRET_KEY')
    DEBUG = False