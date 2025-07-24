from flask import Flask
from app.config import Config
from app.extensions import db, jwt, cors, migrate
from app.routes import user_routes, auth_routes
from app.routes.donation_routes import donation_bp

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
    app.register_blueprint(donation_bp)

    with app.app_context():
        db.create_all()

    return app
