from flask import Blueprint
from app.controllers.donation_controller import create_donation, get_donations

donation_bp = Blueprint('donation_bp', __name__, url_prefix='/donations')

donation_bp.route('', methods=['POST'])(create_donation)
donation_bp.route('', methods=['GET'])(get_donations)
