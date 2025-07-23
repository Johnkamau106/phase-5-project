from flask import jsonify, request
from app.models.child import Child
from app.extensions import db

def get_all_children():
    children = Child.query.all()
    return jsonify([child.to_dict() for child in children]), 200

def get_child_by_id(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404
    return jsonify(child.to_dict()), 200

def create_child():
    data = request.get_json()
    new_child = Child(
        name=data.get("name"),
        birthdate=data.get("birthdate"),
        age=data.get("age"),
        gender=data.get("gender"),
        photo=data.get("photo"),
        health_status=data.get("healthStatus"),
        notes=data.get("notes"),
        home=data.get("home"),
    )
    db.session.add(new_child)
    db.session.commit()
    return jsonify(new_child.to_dict()), 201

def update_child(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404
    
    data = request.get_json()
    child.name = data.get("name", child.name)
    child.birthdate = data.get("birthdate", child.birthdate)
    child.age = data.get("age", child.age)
    child.gender = data.get("gender", child.gender)
    child.photo = data.get("photo", child.photo)
    child.health_status = data.get("healthStatus", child.health_status)
    child.notes = data.get("notes", child.notes)
    child.home = data.get("home", child.home)

    db.session.commit()
    return jsonify(child.to_dict()), 200

def delete_child(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404
    
    db.session.delete(child)
    db.session.commit()
    return jsonify({"message": "Child deleted"}), 200