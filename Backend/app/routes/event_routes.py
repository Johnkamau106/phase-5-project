from flask import Blueprint
from app.controllers import event_controller

event_bp = Blueprint("event_bp", __name__)

event_bp.route("/events", methods=["GET"])(event_controller.get_all_events)
event_bp.route("/events/<int:event_id>", methods=["GET"])(event_controller.get_event_by_id)
event_bp.route("/events", methods=["POST"])(event_controller.create_event)
event_bp.route("/events/<int:event_id>", methods=["PUT"])(event_controller.update_event)
event_bp.route("/events/<int:event_id>", methods=["DELETE"])(event_controller.delete_event)
event_bp.route("/events/<int:event_id>/volunteer", methods=["POST"])(event_controller.volunteer_for_event)