from flask import request, jsonify
from app.extensions import db
from app.models import MedicalRecord, Child
from datetime import datetime

def register_medical_routes(app):
    @app.route('/api/children/<int:child_id>/medical-records', methods=['POST'])
    def create_medical_record(child_id):
        data = request.get_json()
        
        child = Child.query.get_or_404(child_id)
        
        try:
            record_date = datetime.strptime(data['recordDate'], '%Y-%m-%d').date() if 'recordDate' in data else None
            follow_up_date = datetime.strptime(data['followUpDate'], '%Y-%m-%d').date() if 'followUpDate' in data else None
            
            record = MedicalRecord(
                child_id=child_id,
                record_date=record_date,
                diagnosis=data['diagnosis'],
                treatment=data.get('treatment'),
                prescription=data.get('prescription'),
                notes=data.get('notes'),
                follow_up_date=follow_up_date,
                recorded_by=data.get('recordedBy')
            )
            
            db.session.add(record)
            db.session.commit()
            
            return jsonify(record.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

    @app.route('/api/children/<int:child_id>/medical-records', methods=['GET'])
    def get_child_medical_records(child_id):
        records = MedicalRecord.query.filter_by(child_id=child_id).order_by(MedicalRecord.record_date.desc()).all()
        return jsonify([record.to_dict() for record in records])

    @app.route('/api/medical-records/<int:record_id>', methods=['GET', 'PUT', 'DELETE'])
    def handle_medical_record(record_id):
        record = MedicalRecord.query.get_or_404(record_id)
        
        if request.method == 'GET':
            return jsonify(record.to_dict())
            
        elif request.method == 'PUT':
            data = request.get_json()
            
            try:
                if 'recordDate' in data:
                    record.record_date = datetime.strptime(data['recordDate'], '%Y-%m-%d').date()
                if 'followUpDate' in data:
                    record.follow_up_date = datetime.strptime(data['followUpDate'], '%Y-%m-%d').date()
                
                record.diagnosis = data.get('diagnosis', record.diagnosis)
                record.treatment = data.get('treatment', record.treatment)
                record.prescription = data.get('prescription', record.prescription)
                record.notes = data.get('notes', record.notes)
                record.recorded_by = data.get('recordedBy', record.recorded_by)
                
                db.session.commit()
                return jsonify(record.to_dict())
            except Exception as e:
                db.session.rollback()
                return jsonify({"error": str(e)}), 400
                
        elif request.method == 'DELETE':
            db.session.delete(record)
            db.session.commit()
            return jsonify({"message": "Medical record deleted successfully"}), 200