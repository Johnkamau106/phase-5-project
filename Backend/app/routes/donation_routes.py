from flask import Blueprint
from app.controllers import donation_controller

donation_bp = Blueprint('donation_bp', __name__)

donation_bp.route('', methods=['POST'])(donation_controller.create_donation)
donation_bp.route('', methods=['GET'])(donation_controller.get_donations)
donation_bp.route('/<int:donation_id>', methods=['GET'])(donation_controller.get_donation)
donation_bp.route('/<int:donation_id>', methods=['PUT'])(donation_controller.update_donation)
donation_bp.route('/<int:donation_id>', methods=['DELETE'])(donation_controller.delete_donation)