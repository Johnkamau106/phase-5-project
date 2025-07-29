from flask import Blueprint, request, jsonify
from app.models import MedicalRecord, Child, User
from app.extensions import db
from datetime import datetime
from flask_jwt_extended import jwt_required, get_jwt_identity

medical_bp = Blueprint('medical', __name__, url_prefix='/api/medical-records')

@medical_bp.route('/child/<int:child_id>', methods=['POST'])
@jwt_required()
def create_medical_record(child_id):
    """Create a new medical record for a child"""
    current_user = get_jwt_identity()
    data = request.get_json()
    
    if not Child.query.get(child_id):
        return jsonify({"error": "Child not found"}), 404
    
    try:
        record_date = datetime.strptime(data['record_date'], '%Y-%m-%d').date() if 'record_date' in data else datetime.utcnow().date()
        follow_up_date = datetime.strptime(data['follow_up_date'], '%Y-%m-%d').date() if 'follow_up_date' in data else None
        
        record = MedicalRecord(
            child_id=child_id,
            record_date=record_date,
            diagnosis=data.get('diagnosis', ''),
            treatment=data.get('treatment'),
            prescription=data.get('prescription'),
            notes=data.get('notes'),
            follow_up_date=follow_up_date,
            recorded_by=current_user['id']
        )
        
        db.session.add(record)
        db.session.commit()
        
        return jsonify({
            "message": "Medical record created successfully",
            "record": record.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@medical_bp.route('/child/<int:child_id>', methods=['GET'])
@jwt_required()
def get_child_medical_records(child_id):
    """Get all medical records for a specific child"""
    records = MedicalRecord.query.filter_by(child_id=child_id)\
                                .order_by(MedicalRecord.record_date.desc())\
                                .all()
    return jsonify([record.to_dict() for record in records])

@medical_bp.route('/<int:record_id>', methods=['GET'])
@jwt_required()
def get_medical_record(record_id):
    """Get a specific medical record"""
    record = MedicalRecord.query.get_or_404(record_id)
    return jsonify(record.to_dict())

@medical_bp.route('/<int:record_id>', methods=['PUT'])
@jwt_required()
def update_medical_record(record_id):
    """Update a medical record"""
    current_user = get_jwt_identity()
    record = MedicalRecord.query.get_or_404(record_id)
    data = request.get_json()
    
    try:
        if 'record_date' in data:
            record.record_date = datetime.strptime(data['record_date'], '%Y-%m-%d').date()
        if 'follow_up_date' in data:
            record.follow_up_date = datetime.strptime(data['follow_up_date'], '%Y-%m-%d').date() if data['follow_up_date'] else None
        
        record.diagnosis = data.get('diagnosis', record.diagnosis)
        record.treatment = data.get('treatment', record.treatment)
        record.prescription = data.get('prescription', record.prescription)
        record.notes = data.get('notes', record.notes)
        
        db.session.commit()
        
        return jsonify({
            "message": "Medical record updated successfully",
            "record": record.to_dict()
        })
        
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@medical_bp.route('/<int:record_id>', methods=['DELETE'])
@jwt_required()
def delete_medical_record(record_id):
    """Delete a medical record"""
    record = MedicalRecord.query.get_or_404(record_id)
    
    db.session.delete(record)
    db.session.commit()
    
    return jsonify({"message": "Medical record deleted successfully"}), 200

@medical_bp.route('/search', methods=['GET'])
@jwt_required()
def search_medical_records():
    """Search medical records with filters"""
    diagnosis = request.args.get('diagnosis')
    child_id = request.args.get('child_id')
    start_date = request.args.get('start_date')
    end_date = request.args.get('end_date')
    
    query = MedicalRecord.query
    
    if diagnosis:
        query = query.filter(MedicalRecord.diagnosis.ilike(f'%{diagnosis}%'))
    
    if child_id:
        query = query.filter_by(child_id=child_id)
    
    if start_date:
        start_date = datetime.strptime(start_date, '%Y-%m-%d').date()
        query = query.filter(MedicalRecord.record_date >= start_date)
    
    if end_date:
        end_date = datetime.strptime(end_date, '%Y-%m-%d').date()
        query = query.filter(MedicalRecord.record_date <= end_date)
    
    records = query.order_by(MedicalRecord.record_date.desc()).all()
    return jsonify([record.to_dict() for record in records])