from flask import Blueprint
from app.controllers import sponsorship_controller

sponsorship_bp = Blueprint('sponsorship_bp', __name__)

sponsorship_bp.route("/sponsorships", methods=["POST"])(sponsorship_controller.create_sponsorship)
sponsorship_bp.route("/sponsorships/<int:child_id>", methods=["DELETE"])(sponsorship_controller.delete_sponsorship)
sponsorship_bp.route("/sponsorships/user", methods=["GET"])(sponsorship_controller.get_user_sponsorships)
