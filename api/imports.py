import os
import secrets
from PIL import Image
from api import app

def update_profile_picture(picture):
    random_hex = secrets.token_hex(8)
    _, file_extension = os.path.splitext(picture.filename)
    picture_file_name = random_hex + file_extension
    picture_path = os.path.join(app.root_path, "static/images/", picture_file_name)

    preffered_size = (200, 200)
    image = Image.open(picture)
    image.thumbnail(preffered_size)

    image.save(picture_path)

    return picture_file_name

def story_covers_file(picture):
    random_hex = secrets.token_hex(8)
    _, file_extension = os.path.splitext(picture.filename)
    picture_file_name = random_hex + file_extension
    picture_path = os.path.join(app.root_path, "static/images/story_covers", picture_file_name)

    preffered_size = (400, 400)
    image = Image.open(picture)
    image.thumbnail(preffered_size)

    image.save(picture_path)

    return picture_file_name