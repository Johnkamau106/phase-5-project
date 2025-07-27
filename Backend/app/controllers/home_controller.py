from flask import request, jsonify
from app.models import Home
from app.extensions import db


def create_home():
    data = request.get_json()

    if not data.get('name'):
        return jsonify({'error': 'Home name is required'}), 400

    home = Home(
        name=data['name'],
        description=data.get('description'),
        location=data.get('location'),
        address=data.get('address'),
        phone=data.get('phone'),
        email=data.get('email'),
        website=data.get('website'),
        logo=data.get('logo'),
        capacity=data.get('capacity', 0),
        needs=','.join(data.get('needs', [])),
        bank_name=data.get('bank_name'),
        account_name=data.get('account_name'),
        account_number=data.get('account_number'),
        branch=data.get('branch')
    )

    db.session.add(home)
    db.session.commit()

    return jsonify(home.to_dict()), 201


def get_homes():
    homes = Home.query.all()
    return jsonify([home.to_dict() for home in homes]), 200


def get_home(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({'error': 'Home not found'}), 404
    return jsonify(home.to_dict()), 200


def update_home(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({'error': 'Home not found'}), 404

    data = request.get_json()

    if 'name' in data:
        home.name = data['name']
    if 'description' in data:
        home.description = data['description']
    if 'location' in data:
        home.location = data['location']
    if 'address' in data:
        home.address = data['address']
    if 'phone' in data:
        home.phone = data['phone']
    if 'email' in data:
        home.email = data['email']
    if 'website' in data:
        home.website = data['website']
    if 'logo' in data:
        home.logo = data['logo']
    if 'capacity' in data:
        home.capacity = data['capacity']
    if 'needs' in data:
        home.needs = ','.join(data['needs'])
    if 'bank_name' in data:
        home.bank_name = data['bank_name']
    if 'account_name' in data:
        home.account_name = data['account_name']
    if 'account_number' in data:
        home.account_number = data['account_number']
    if 'branch' in data:
        home.branch = data['branch']

    db.session.commit()

    return jsonify(home.to_dict()), 200


def delete_home(home_id):
    home = Home.query.get(home_id)
    if not home:
        return jsonify({'error': 'Home not found'}), 404

    db.session.delete(home)
    db.session.commit()

    return jsonify({'message': 'Home deleted successfully'}), 200