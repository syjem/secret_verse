from flask import Flask
from config import DevelopmentConfig

# For production
# from api import routes
# from api.config import Config
# app.config.from_object(Config)

app = Flask(__name__)
app.config.from_object(DevelopmentConfig)


# For development
from routes import *