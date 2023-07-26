from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.fields import HiddenField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from api.models import Users


class RegistrationForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=3, max=25)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField(
        "Password", validators=[DataRequired(), Length(min=8, max=40)]
    )
    confirm_password = PasswordField(
        "Confirm Password",
        validators=[DataRequired(), Length(min=8, max=40), EqualTo("password")],
    )
    submit = SubmitField("Sign Up")

    def validate_username(self, username):
        user = Users.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError("Username is already taken!")

    def validate_email(self, email):
        user = Users.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError("Email is already registered!")


class LoginForm(FlaskForm):
    email = StringField("Email", validators=[DataRequired(), Email()])
    password = PasswordField(
        "Password", validators=[DataRequired(), Length(min=8, max=40)]
    )
    remember = BooleanField("Remember Me")
    submit = SubmitField("Sign In")


class UpdateProfileForm(FlaskForm):
    username = StringField(
        "Username", validators=[DataRequired(), Length(min=3, max=25)]
    )
    email = StringField("Email", validators=[DataRequired(), Email()])

    image = FileField("Avatar", validators=[FileAllowed(["jpg", "jpeg", "png", "svg"])])

    submit = SubmitField("Save")

    def validate_username(self, username):
        if username.data != current_user.username:
            user = Users.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError("Username is already taken!")

    def validate_email(self, email):
        if email.data != current_user.email:
            user = Users.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError("Email is already registered!")


class UploadStoryForm(FlaskForm):
    title = StringField("Title", validators=[DataRequired(), Length(min=3, max=250)])
    content = FileField("Content", validators=[DataRequired(), FileAllowed(["txt", "docx", "pdf"])])
    cover = FileField(
        "Cover", validators=[DataRequired(), FileAllowed(["jpg", "jpeg", "png", "svg"])]
    )
    author = HiddenField("Author")

    submit = SubmitField("Upload")
