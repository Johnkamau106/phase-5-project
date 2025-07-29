# app/__init__.py
from flask import Flask
from app.config import Config
from app.extensions import db, migrate, jwt, cors
from app.routes import user_routes, auth_routes, child_routes, event_routes, home_routes, donation_routes, education_routes, medical_routes
from app.models.user import User
from app.models.child import Child
from app.models.event import Event
from app.models.donation import Donation
from app.models.education import EducationRecord   
from app.models.medical import MedicalRecord    
from dotenv import load_dotenv
import os

load_dotenv()
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(app)

    # Register blueprints
    app.register_blueprint(user_routes.user_bp, url_prefix='/api')
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
    app.register_blueprint(child_routes.child_bp, url_prefix='/api/children')
    app.register_blueprint(event_routes.event_bp, url_prefix='/api/events')
    app.register_blueprint(home_routes.home_bp, url_prefix='/api/homes')
    app.register_blueprint(donation_routes.donation_bp, url_prefix='/api/donation')
    app.register_blueprint(medical_routes.medical_bp)
    app.register_blueprint(education_routes.education_bp)
    print("Available routes:")
    print(app.url_map)
    with app.app_context():
        db.create_all()

    return app


# Optional: confirm loaded
print("ENV:", os.getenv("MPESA_ENVIRONMENT"))