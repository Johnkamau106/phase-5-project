from flask import Blueprint
from app.controllers import child_controller

child_bp = Blueprint("child_bp", __name__)

child_bp.route("/children", methods=["GET"])(child_controller.get_all_children)
child_bp.route("/children/<int:child_id>", methods=["GET"])(child_controller.get_child_by_id)
child_bp.route("/children", methods=["POST"])(child_controller.create_child)
child_bp.route("/children/<int:child_id>", methods=["PUT"])(child_controller.update_child)
child_bp.route("/children/<int:child_id>", methods=["DELETE"])(child_controller.delete_child)