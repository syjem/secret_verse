from flask import (
    render_template,
    request,
    url_for,
    redirect,
    jsonify,
    flash,
    redirect,
    url_for,
)

import requests
from datetime import datetime
from sqlalchemy import desc
from flask_login import login_user, logout_user, current_user, login_required

from api.models import Users, Story
from api import app, db, bcrypt
from api.imports import update_profile_picture, story_covers_file
from api.forms import RegistrationForm, LoginForm, UpdateProfileForm, UploadStoryForm


@app.context_processor
def inject_current_year():
    current_year = datetime.now().year
    return dict(current_year=current_year)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/library", methods=["GET", "POST"])
@login_required
def library():
    if request.method == "POST":
        data = request.get_json()
        search = data.get("search")

        rapid_api_key = app.config["RAPID_API_KEY"]

        url = f"https://open-library2.p.rapidapi.com/search_title/{search}"

        headers = {
            "X-RapidAPI-Key": rapid_api_key,
            "X-RapidAPI-Host": "open-library2.p.rapidapi.com",
        }

        response = requests.get(url, headers=headers)

        try:
            json_response = response.json()

            # Extract the first book only
            books = json_response.get("books", [])
            first_book = books[0] if books else {}

            title = first_book.get("title", "N/A")
            author = first_book.get("author", "N/A")
            image = first_book.get("image", "N/A")
            book_url = first_book.get("url", "N/A")

            return jsonify(
                {"title": title, "author": author, "image": image, "book_url": book_url}
            )

        except ValueError as e:
            # Handle JSON decoding error
            print(f"JSON decoding error: {e}")
            return jsonify({"error": "Error occurred while processing the request."})

    image_file = url_for("static", filename="images/" + current_user.image_file)

    return render_template("library.html", image_file=image_file)


@app.route("/sign-up", methods=["GET", "POST"])
def register():
    """Registers user"""
    if current_user.is_authenticated:
        return redirect(url_for("library"))

    form = RegistrationForm()
    if form.validate_on_submit():
        hashed_password = bcrypt.generate_password_hash(form.password.data).decode(
            "utf-8"
        )
        user = Users(
            username=form.username.data, email=form.email.data, password=hashed_password
        )
        db.session.add(user)
        db.session.commit()
        flash(
            "Registered successfully! Now, sign-in with your registered account.",
            "success",
        )
        return redirect(url_for("login"))
    return render_template("register.html", form=form)


@app.route("/sign-in", methods=["GET", "POST"])
def login():
    """Log's user in"""

    if current_user.is_authenticated:
        return redirect(url_for("library"))

    form = LoginForm()
    if form.validate_on_submit():
        user = Users.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            next_page = request.args.get("next")
            return redirect(next_page) if next_page else redirect(url_for("library"))
        else:
            flash(
                "Login unsuccessful! Please, check your email and password.", "danger"
            )
    return render_template("login.html", form=form)


@app.route("/logout")
def logout():
    """Log's user out"""

    logout_user()

    # Redirect user to homepage
    return redirect(url_for("home"))


@app.route("/user/profile/edit", methods=["GET", "POST"])
@login_required
def user():
    """User's Profile/Edit"""

    form = UpdateProfileForm()
    if form.validate_on_submit():
        if form.image.data:
            picture_file = update_profile_picture(form.image.data)
            current_user.image_file = picture_file

        current_user.username = form.username.data
        current_user.email = form.email.data
        db.session.commit()
        flash("Updated successfully!", "info")
        return redirect(url_for("user"))

    elif request.method == "GET":
        form.username.data = current_user.username
        form.email.data = current_user.email

    image_file = url_for("static", filename="images/" + current_user.image_file)
    return render_template(
        "account.html",
        image_file=image_file,
        form=form,
    )


@app.route("/user/password/edit", methods=["GET", "POST"])
@login_required
def password():
    """User's Password/Edit"""

    return render_template("password-edit.html")


@app.route("/library/upload-story", methods=["GET", "POST"])
@login_required
def upload_story():
    """Upload Story"""

    form = UploadStoryForm()

    if form.validate_on_submit():
        content = form.content.data
        content_file = content.filename
        content_data = content.read()

        cover = story_covers_file(form.cover.data)
        title = form.title.data
        story = Story(
            title=title,
            content_file=content_file,
            content_data=content_data,
            cover=cover,
            user_id=current_user.id,
        )

        db.session.add(story)
        db.session.commit()

        flash("Story uploaded successfully!", "info")
        return redirect(url_for("secrets_feed"))

    form.author.data = current_user.username
    image_file = url_for("static", filename="images/" + current_user.image_file)
    return render_template("upload_story.html", image_file=image_file, form=form)


@app.route("/library/secrets-feed", methods=["GET", "POST"])
@login_required
def secrets_feed():
    """Stories Feed Story"""

    # Retrieve the latest stories from the database
    stories = Story.query.order_by(desc(Story.date_posted)).all()

    usernames = [Users.query.get(story.user_id).username for story in stories]
    profiles = [Users.query.get(story.user_id).image_file for story in stories]
    image_file = url_for("static", filename="images/" + current_user.image_file)

    # Combine stories and usernames into a list of dictionaries
    combined_data = [
        {"story": story, "username": username, "profile": profile}
        for story, username, profile in zip(stories, usernames, profiles)
    ]

    return render_template(
        "secrets_feed.html", image_file=image_file, data=combined_data
    )


@app.route("/library/my-collections", methods=["GET", "POST"])
@login_required
def my_collections():
    """Upload Story"""

    image_file = url_for("static", filename="images/" + current_user.image_file)
    return render_template("my-collections.html", image_file=image_file)
