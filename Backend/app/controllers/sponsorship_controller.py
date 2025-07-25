from flask import jsonify, request, Blueprint
from app.extensions import db
from app.models.sponsorship import Sponsorship
from app.models.child import Child
from flask_jwt_extended import jwt_required, get_jwt_identity

sponsorship_bp = Blueprint('sponsorship_bp', __name__)

@sponsorship_bp.route("/sponsorships", methods=["POST"])
@jwt_required()
def create_sponsorship():
    user_id = get_jwt_identity()
    data = request.get_json()
    child_id = data.get("child_id")

    if not child_id:
        return jsonify({"error": "Child ID is required"}), 400

    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404

    existing_sponsorship = Sponsorship.query.get((user_id, child_id))
    if existing_sponsorship:
        return jsonify({"message": "Sponsorship already exists"}), 409

    new_sponsorship = Sponsorship(user_id=user_id, child_id=child_id)
    db.session.add(new_sponsorship)
    db.session.commit()

    return jsonify(new_sponsorship.to_dict()), 201

@sponsorship_bp.route("/sponsorships/<int:child_id>", methods=["DELETE"])
@jwt_required()
def delete_sponsorship(child_id):
    user_id = get_jwt_identity()

    sponsorship = Sponsorship.query.get((user_id, child_id))
    if not sponsorship:
        return jsonify({"error": "Sponsorship not found"}), 404

    db.session.delete(sponsorship)
    db.session.commit()

    return jsonify({"message": "Sponsorship deleted"}), 200

@sponsorship_bp.route("/sponsorships/user", methods=["GET"])
@jwt_required()
def get_user_sponsorships():
    user_id = get_jwt_identity()
    sponsorships = Sponsorship.query.filter_by(user_id=user_id).all()
    sponsored_children_ids = [s.child_id for s in sponsorships]
    return jsonify(sponsored_children_ids), 200
