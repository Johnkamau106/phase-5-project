# app/controllers/auth_controller.py
from flask import jsonify, request,Blueprint
from app.services.auth_service import AuthService
from app.utils.jwt_helper import generate_token
from app.extensions import db
from app.models.user import User

auth_bp = Blueprint('auth_bp', __name__)

@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.check_password(password):
        user_data = user.to_dict()
        user_data["token"] = generate_token(user.id)
        return jsonify({"success": True, "user": user_data})
    return jsonify({"success": False, "message": "Invalid credentials"}), 401

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if User.query.filter_by(email=email).first():
        return jsonify({"success": False, "message": "User already exists"}), 400

    new_user = User(
        email=email,
        username=email.split("@")[0],
        name="New User",
        roles="donor",
        avatar="https://i.pravatar.cc/150?img=0"
    )
    new_user.set_password(password)

    db.session.add(new_user)
    db.session.commit()

    user_data = new_user.to_dict()
    user_data["token"] = generate_token(new_user.id)

    return jsonify({"success": True, "user": user_data}), 201

def refresh():
    # Will be implemented with JWT
    pass


def protected():
    # Example protected route
    return jsonify({"message": "This is a protected route"}), 200
