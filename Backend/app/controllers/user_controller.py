from flask import jsonify, request
from app.models.user import User
from app.extensions import db

def get_all_users():
    users = User.query.all()
    return jsonify([user.to_dict() for user in users]), 200

def get_user_by_id(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict()), 200

def create_user():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"error": "Email and password are required"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"error": "Email already exists"}), 409

    user = User(
        email=data["email"],
        username=data.get("username"),
        name=data.get("name"),
        phone=data.get("phone"),
        address=data.get("address"),
        bio=data.get("bio"),
        avatar=data.get("avatar"),
        roles=",".join(data.get("roles", [])),
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()
    return jsonify(user.to_dict()), 201

def update_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.get_json()
    user.username = data.get("username", user.username)
    user.name = data.get("name", user.name)
    user.phone = data.get("phone", user.phone)
    user.address = data.get("address", user.address)
    user.bio = data.get("bio", user.bio)
    user.avatar = data.get("avatar", user.avatar)
    user.roles = ",".join(data.get("roles", user.roles.split(",")))

    db.session.commit()
    return jsonify(user.to_dict()), 200

def delete_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"}), 200
