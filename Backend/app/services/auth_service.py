# app/services/auth_service.py
from datetime import datetime, timedelta
from flask_jwt_extended import create_access_token, create_refresh_token
from app.models.user import User
from app.extensions import db


class AuthService:
    @staticmethod
    def login(email, password):
        user = User.query.filter_by(email=email).first()
        if not user or not user.check_password(password):
            return None

        user.last_login = datetime.utcnow()
        db.session.commit()

        return {
            "access_token": create_access_token(identity=user.id),
            "refresh_token": create_refresh_token(identity=user.id),
            "user": user.to_dict()
        }

    @staticmethod
    def register(email, password, **kwargs):
        if User.query.filter_by(email=email).first():
            return None

        user = User(email=email, **kwargs)
        user.set_password(password)
        db.session.add(user)
        db.session.commit()

        return user