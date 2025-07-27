from flask import jsonify, request
from app.models import Child, Home, User
from app.extensions import db
from datetime import datetime


def get_all_children():
    # Add filtering capabilities
    home_id = request.args.get('home_id')
    is_sponsored = request.args.get('is_sponsored')
    gender = request.args.get('gender')
    age_min = request.args.get('age_min')
    age_max = request.args.get('age_max')

    query = Child.query

    if home_id:
        query = query.filter_by(home_id=home_id)
    if is_sponsored:
        query = query.filter_by(is_sponsored=(is_sponsored.lower() == 'true'))
    if gender:
        query = query.filter_by(gender=gender.lower())
    if age_min or age_max:
        # Calculate birthdate range for age filtering
        today = datetime.today()
        if age_max:
            min_birth_year = today.year - int(age_max)
            query = query.filter(Child.date_of_birth >= datetime(min_birth_year, 1, 1))
        if age_min:
            max_birth_year = today.year - int(age_min)
            query = query.filter(Child.date_of_birth <= datetime(max_birth_year, 12, 31))

    children = query.all()
    return jsonify([child.to_dict() for child in children]), 200


def get_child(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404

    # Include more detailed information
    response = child.to_dict()

    # Add sponsorship history if sponsored
    if child.is_sponsored:
        response['sponsorshipHistory'] = [
            donation.to_dict()
            for donation in child.sponsorships
            if donation.status == 'completed'
        ]

    return jsonify(response), 200


def create_child():
    data = request.get_json()

    # Validate required fields
    required_fields = ['first_name', 'last_name', 'date_of_birth', 'gender', 'home_id']
    if not all(field in data for field in required_fields):
        return jsonify({"error": "Missing required fields"}), 400

    # Check if home exists
    if not Home.query.get(data['home_id']):
        return jsonify({"error": "Home not found"}), 404

    try:
        new_child = Child(
            first_name=data['first_name'],
            last_name=data['last_name'],
            date_of_birth=datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date(),
            gender=data['gender'],
            photo=data.get('photo'),
            health_status=data.get('health_status'),
            education_level=data.get('education_level'),
            hobbies=",".join(data.get('hobbies', [])),
            background=data.get('background'),
            home_id=data['home_id']
        )

        db.session.add(new_child)
        db.session.commit()

        # Update home's children count
        home = Home.query.get(data['home_id'])
        home.current_children = Child.query.filter_by(home_id=data['home_id']).count()
        db.session.commit()

        return jsonify(new_child.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


def update_child(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404

    data = request.get_json()

    try:
        if 'first_name' in data:
            child.first_name = data['first_name']
        if 'last_name' in data:
            child.last_name = data['last_name']
        if 'date_of_birth' in data:
            child.date_of_birth = datetime.strptime(data['date_of_birth'], '%Y-%m-%d').date()
        if 'gender' in data:
            child.gender = data['gender']
        if 'photo' in data:
            child.photo = data['photo']
        if 'health_status' in data:
            child.health_status = data['health_status']
        if 'education_level' in data:
            child.education_level = data['education_level']
        if 'hobbies' in data:
            child.hobbies = ",".join(data['hobbies'])
        if 'background' in data:
            child.background = data['background']
        if 'home_id' in data:
            # Verify new home exists
            if not Home.query.get(data['home_id']):
                return jsonify({"error": "New home not found"}), 404
            old_home_id = child.home_id
            child.home_id = data['home_id']

            # Update children counts for both homes
            old_home = Home.query.get(old_home_id)
            new_home = Home.query.get(data['home_id'])

            old_home.current_children = Child.query.filter_by(home_id=old_home_id).count()
            new_home.current_children = Child.query.filter_by(home_id=data['home_id']).count()

        db.session.commit()
        return jsonify(child.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


def delete_child(child_id):
    child = Child.query.get(child_id)
    if not child:
        return jsonify({"error": "Child not found"}), 404

    try:
        home_id = child.home_id
        db.session.delete(child)
        db.session.commit()

        # Update home's children count
        home = Home.query.get(home_id)
        home.current_children = Child.query.filter_by(home_id=home_id).count()
        db.session.commit()

        return jsonify({"message": "Child deleted successfully"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

def sponsor_child(child_id):
        data = request.get_json()

        if not data.get('sponsor_id'):
            return jsonify({"error": "Sponsor ID is required"}), 400

        child = Child.query.get(child_id)
        if not child:
            return jsonify({"error": "Child not found"}), 404

        if child.is_sponsored:
            return jsonify({"error": "Child is already sponsored"}), 400

        sponsor = User.query.get(data['sponsor_id'])
        if not sponsor:
            return jsonify({"error": "Sponsor not found"}), 404

        try:
            child.is_sponsored = True
            child.sponsor_id = data['sponsor_id']
            child.sponsorship_details = data.get('sponsorship_details')

            db.session.commit()
            return jsonify(child.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

def cancel_sponsorship(child_id):
        child = Child.query.get(child_id)
        if not child:
            return jsonify({"error": "Child not found"}), 404

        if not child.is_sponsored:
            return jsonify({"error": "Child is not currently sponsored"}), 400

        try:
            child.is_sponsored = False
            child.sponsor_id = None
            child.sponsorship_details = None

            db.session.commit()
            return jsonify({"message": "Sponsorship cancelled successfully"}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400