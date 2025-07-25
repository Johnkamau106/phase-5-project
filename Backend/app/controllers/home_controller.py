from flask import jsonify, request
from app.models.home import Home
from app.extensions import db

def get_all_homes():
    homes = Home.query.all()
    return jsonify([home.to_dict() for home in homes]), 200

def get_home_by_id(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({"error": "Home not found"}), 404
    return jsonify(home.to_dict()), 200

def create_home():
    data = request.get_json()
    new_home = Home(
        name=data.get("name"),
        location=data.get("location"),
        current_need=data.get("current_need"),
        description=data.get("description"),
        amount_contributed=data.get("amount_contributed", 0),
        target_amount=data.get("target_amount", 0),
        image=data.get("image")
    )
    db.session.add(new_home)
    db.session.commit()
    return jsonify(new_home.to_dict()), 201

def update_home(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({"error": "Home not found"}), 404
    
    data = request.get_json()
    home.name = data.get("name", home.name)
    home.location = data.get("location", home.location)
    home.current_need = data.get("current_need", home.current_need)
    home.description = data.get("description", home.description)
    home.amount_contributed = data.get("amount_contributed", home.amount_contributed)
    home.target_amount = data.get("target_amount", home.target_amount)
    home.image = data.get("image", home.image)

    db.session.commit()
    return jsonify(home.to_dict()), 200

def delete_home(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({"error": "Home not found"}), 404
    
    db.session.delete(home)
    db.session.commit()
    return jsonify({"message": "Home deleted"}), 200
