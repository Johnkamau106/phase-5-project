# app/__init__.py
from flask import Flask, request
from app.config import Config
from app.extensions import db, migrate, jwt, cors
from app.routes import user_routes, auth_routes, child_routes, event_routes, home_routes, donation_routes
from app.models.user import User
from app.models.child import Child
from app.models.event import Event
from app.models.donation import Donation
def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    @app.route("/")
    def index():
        return "Backend is running"

    @app.after_request
    def add_cors_headers(response):
        allowed_origins = [
            "http://localhost:5173",
            "https://phase-5-project-hbsk-9tb0hdeau-john-kamaus-projects-c0b9c885.vercel.app",
            "https://hope-haven-orphanage.netlify.app"
        ]
        origin = request.headers.get("Origin")
        if origin in allowed_origins:
            response.headers["Access-Control-Allow-Origin"] = origin
        response.headers["Access-Control-Allow-Credentials"] = "true"
        response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization"
        response.headers["Access-Control-Allow-Methods"] = "GET,POST,PUT,DELETE,OPTIONS"
        return response

    @app.route('/<path:path>', methods=['OPTIONS'])
    def options_handler(path):
        return '', 204

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    jwt.init_app(app)
    cors.init_app(
        app,
        resources={r"/*": {"origins": '*'}},
        supports_credentials=True
    )

    # Register blueprints
    app.register_blueprint(user_routes.user_bp, url_prefix='/api')
    app.register_blueprint(auth_routes.auth_bp, url_prefix='/auth')
    app.register_blueprint(child_routes.child_bp, url_prefix='/api/children')
    app.register_blueprint(event_routes.event_bp, url_prefix='/api/events')
    app.register_blueprint(home_routes.home_bp, url_prefix='/api/homes')
    app.register_blueprint(donation_routes.donation_bp, url_prefix='/api/donation')
    print("Available routes:")
    print(app.url_map)
    with app.app_context():
        db.create_all()

    return app