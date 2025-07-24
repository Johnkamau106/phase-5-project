from flask import request, jsonify
from app.extensions import db
from app.models.donation import Donation

def create_donation():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid input"}), 400

    try:
        donation = Donation(
            title=data.get("title"),
            description=data.get("description"),
            amount=data.get("amount"),
            payment_method=data.get("payment_method"),
            recurring=data.get("recurring", False)
        )
        db.session.add(donation)
        db.session.commit()
        return jsonify({"message": "Donation created successfully", "donation": {
            "id": donation.id,
            "title": donation.title,
            "description": donation.description,
            "amount": donation.amount,
            "payment_method": donation.payment_method,
            "recurring": donation.recurring,
            "created_at": donation.created_at.isoformat()
        }}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def get_donations():
    donations = Donation.query.all()
    donations_list = []
    for donation in donations:
        donations_list.append({
            "id": donation.id,
            "title": donation.title,
            "description": donation.description,
            "amount": donation.amount,
            "payment_method": donation.payment_method,
            "recurring": donation.recurring,
            "created_at": donation.created_at.isoformat()
        })
    return jsonify(donations_list), 200
