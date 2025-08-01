from app.extensions import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(150), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    username = db.Column(db.String(100))
    name = db.Column(db.String(100))
    phone = db.Column(db.String(20))
    address = db.Column(db.String(200))
    bio = db.Column(db.Text)
    avatar = db.Column(db.String(300))
    roles = db.Column(db.String(200), default='donor')  # Store as comma-separated string
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    last_login = db.Column(db.DateTime)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "name": self.name,
            "phone": self.phone,
            "address": self.address,
            "bio": self.bio,
            "avatar": self.avatar,
            "roles": self.roles.split(","),
            "token": None  # Add JWT later
        }
