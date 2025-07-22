# app/__init__.py

from flask import Flask
from app.config import Config
from app.extensions import db, migrate, jwt, cors
from app.routes.user_routes import user_bp  # 👈 make sure path is correct

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    with app.app_context():
        from app.models.user import User
        db.create_all()

    app.register_blueprint(user_bp, url_prefix="/api")  # 👈 this gives you /api/users

    return app
