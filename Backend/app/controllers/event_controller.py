from flask import jsonify, request
from app.models.event import Event
from app.extensions import db
from datetime import datetime

def get_all_events():
    events = Event.query.all()
    return jsonify([event.to_dict() for event in events]), 200

def get_event_by_id(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    return jsonify(event.to_dict()), 200

def create_event():
    data = request.get_json()
    new_event = Event(
        name=data.get("name"),
        date=datetime.fromisoformat(data.get("date")) if data.get("date") else None,
        location=data.get("location"),
        description=data.get("description"),
        home_id=data.get("home_id")
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify(new_event.to_dict()), 201

def update_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    data = request.get_json()
    event.name = data.get("name", event.name)
    event.date = datetime.fromisoformat(data.get("date")) if data.get("date") else event.date
    event.location = data.get("location", event.location)
    event.description = data.get("description", event.description)
    event.home_id = data.get("home_id", event.home_id)

    db.session.commit()
    return jsonify(event.to_dict()), 200

def delete_event(event_id):
    event = Event.query.get(event_id)
    if not event:
        return jsonify({"error": "Event not found"}), 404
    
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted"}), 200

# Volunteer for event
from app.models.event_volunteer import EventVolunteer
from app.models.user import User

def volunteer_for_event(event_id):
    data = request.get_json()
    user_id = data.get('user_id')
    if not user_id:
        return jsonify({'error': 'user_id is required'}), 400
    event = Event.query.get(event_id)
    if not event:
        return jsonify({'error': 'Event not found'}), 404
    user = User.query.get(user_id)
    if not user:
        return jsonify({'error': 'User not found'}), 404
    # Check if already volunteered
    existing = EventVolunteer.query.filter_by(event_id=event_id, user_id=user_id).first()
    if existing:
        return jsonify({'message': 'Already volunteered for this event'}), 200
    volunteer = EventVolunteer(event_id=event_id, user_id=user_id)
    db.session.add(volunteer)
    db.session.commit()
    return jsonify({'message': 'Successfully volunteered for event', 'volunteer': volunteer.to_dict()}), 201