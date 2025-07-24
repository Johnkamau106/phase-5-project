from flask import Blueprint
from app.controllers import child_controller

child_bp = Blueprint('child_bp', __name__)

# Basic CRUD routes
child_bp.route('', methods=['GET'])(child_controller.get_all_children)
child_bp.route('', methods=['POST'])(child_controller.create_child)
child_bp.route('/<int:child_id>', methods=['GET'])(child_controller.get_child)
child_bp.route('/<int:child_id>', methods=['PUT'])(child_controller.update_child)
child_bp.route('/<int:child_id>', methods=['DELETE'])(child_controller.delete_child)

# Additional child-specific routes
child_bp.route('/<int:child_id>/sponsor', methods=['POST'])(child_controller.sponsor_child)
child_bp.route('/<int:child_id>/sponsor', methods=['DELETE'])(child_controller.cancel_sponsorship)
# child_bp.route('/<int:child_id>/progress', methods=['GET'])(child_controller.get_child_progress)
# child_bp.route('/<int:child_id>/photos', methods=['GET'])(child_controller.get_child_photos)