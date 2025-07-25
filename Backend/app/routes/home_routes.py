from flask import Blueprint
from app.controllers import home_controller

home_bp = Blueprint("home_bp", __name__)

home_bp.route("/homes", methods=["GET"])(home_controller.get_all_homes)
home_bp.route("/homes/<int:home_id>", methods=["GET"])(home_controller.get_home_by_id)
home_bp.route("/homes", methods=["POST"])(home_controller.create_home)
home_bp.route("/homes/<int:home_id>", methods=["PUT"])(home_controller.update_home)
home_bp.route("/homes/<int:home_id>", methods=["DELETE"])(home_controller.delete_home)
