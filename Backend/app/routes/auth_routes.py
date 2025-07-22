# app/routes/auth_routes.py
from flask import Blueprint
from flask_jwt_extended import jwt_required
from app.controllers import auth_controller

auth_bp = Blueprint('auth_bp', __name__)

auth_bp.route('/login', methods=['POST'])(auth_controller.login)
auth_bp.route('/register', methods=['POST'])(auth_controller.register)
auth_bp.route('/refresh', methods=['POST'])(auth_controller.refresh)
auth_bp.route('/protected', methods=['GET'])(jwt_required())(auth_controller.protected)