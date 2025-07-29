
from flask import request, jsonify
from app.models import Donation, Home, Child, User
from app.services.Mpesa_service import initiate_stk_push
from app.extensions import db
from datetime import datetime


def create_donation():
    data = request.get_json()

    # Validate required fields
    if not data.get('amount') or not data.get('payment_method') or not data.get('donor_id'):
        return jsonify({'error': 'Amount, payment method, and donor ID are required'}), 400

    # Check if home or child is specified
    if not data.get('home_id') and not data.get('child_id'):
        return jsonify({'error': 'Either home_id or child_id must be specified'}), 400

    # For child sponsorships, verify the child exists and isn't already sponsored
    if data.get('child_id'):
        child = Child.query.get(data['child_id'])
        if not child:
            return jsonify({'error': 'Child not found'}), 404
        if child.is_sponsored:
            return jsonify({'error': 'Child is already sponsored'}), 400

    # Create the donation
    donation = Donation(
        amount=data['amount'],
        payment_method=data['payment_method'],
        donation_type=data.get('donation_type', 'one-time'),
        status='pending',
        donor_id=data['donor_id'],
        home_id=data.get('home_id'),
        child_id=data.get('child_id'),
        notes=data.get('notes')
    )

    db.session.add(donation)
    db.session.commit()

    # If this is a child sponsorship, update the child's status
    if data.get('child_id'):
        child.is_sponsored = True
        child.sponsor_id = data['donor_id']
        db.session.commit()

    return jsonify(donation.to_dict()), 201


def get_donations():
    # Get query parameters
    donor_id = request.args.get('donor_id')
    home_id = request.args.get('home_id')
    child_id = request.args.get('child_id')
    status = request.args.get('status')

    query = Donation.query

    if donor_id:
        query = query.filter_by(donor_id=donor_id)
    if home_id:
        query = query.filter_by(home_id=home_id)
    if child_id:
        query = query.filter_by(child_id=child_id)
    if status:
        query = query.filter_by(status=status)

    donations = query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


def get_donation(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify(donation.to_dict()), 200


def update_donation(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    data = request.get_json()

    # Only allow updating certain fields
    if 'status' in data:
        donation.status = data['status']
    if 'transaction_id' in data:
        donation.transaction_id = data['transaction_id']
    if 'receipt_number' in data:
        donation.receipt_number = data['receipt_number']
    if 'notes' in data:
        donation.notes = data['notes']

    donation.updated_at = datetime.utcnow()
    db.session.commit()

    return jsonify(donation.to_dict()), 200


def delete_donation(donation_id):
    donation = Donation.query.get(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    # If this was a sponsorship, unsponsor the child
    if donation.child_id:
        child = Child.query.get(donation.child_id)
        if child:
            child.is_sponsored = False
            child.sponsor_id = None

    db.session.delete(donation)
    db.session.commit()

    return jsonify({'message': 'Donation deleted successfully'}), 200
def mpesa_donation():
    data = request.get_json()
    phone = data.get("phone_number")
    amount = data.get("amount")
    donor_id = data.get("donor_id")
    home_id = data.get("home_id")
    child_id = data.get("child_id")
    notes = data.get("notes", "")

    if not phone or not amount or not donor_id:
        return jsonify({"error": "Phone number, amount, and donor_id required"}), 400

    # 1. Create the donation first
    donation = Donation(
        amount=amount,
        payment_method="mpesa",
        donation_type="one-time",
        status="pending",
        donor_id=donor_id,
        home_id=home_id,
        child_id=child_id,
        notes=notes,
    )
    db.session.add(donation)
    db.session.commit()

    # 2. Initiate STK push
    callback_url = "https://yourdomain.com/api/v1/mpesa/callback"  # Replace this!
    response = initiate_stk_push(
        phone_number=phone,
        amount=amount,
        account_reference=f"Donation{donation.id}",
        transaction_desc="Donation to children’s home",
        callback_url=callback_url
    )

    return jsonify({"message": "STK push initiated", "mpesa_response": response, "donation_id": donation.id})

