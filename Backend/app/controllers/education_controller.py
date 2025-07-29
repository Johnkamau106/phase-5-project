from flask import request, jsonify
from app.extensions import db
from app.models import EducationRecord, Child
from datetime import datetime

def register_education_routes(app):
    @app.route('/api/children/<int:child_id>/education-records', methods=['POST'])
    def create_education_record(child_id):
        data = request.get_json()
        
        child = Child.query.get_or_404(child_id)
        
        try:
            enrollment_date = datetime.strptime(data['enrollmentDate'], '%Y-%m-%d').date() if 'enrollmentDate' in data else None
            
            record = EducationRecord(
                child_id=child_id,
                school_name=data['schoolName'],
                grade_level=data['gradeLevel'],
                academic_year=data['academicYear'],
                performance=data.get('performance'),
                special_needs=data.get('specialNeeds'),
                teacher_comments=data.get('teacherComments'),
                enrollment_date=enrollment_date,
                recorded_by=data.get('recordedBy')
            )
            
            db.session.add(record)
            db.session.commit()
            
            return jsonify(record.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({"error": str(e)}), 400

    @app.route('/api/children/<int:child_id>/education-records', methods=['GET'])
    def get_child_education_records(child_id):
        records = EducationRecord.query.filter_by(child_id=child_id).order_by(EducationRecord.academic_year.desc()).all()
        return jsonify([record.to_dict() for record in records])

    @app.route('/api/education-records/<int:record_id>', methods=['GET', 'PUT', 'DELETE'])
    def handle_education_record(record_id):
        record = EducationRecord.query.get_or_404(record_id)
        
        if request.method == 'GET':
            return jsonify(record.to_dict())
            
        elif request.method == 'PUT':
            data = request.get_json()
            
            try:
                if 'enrollmentDate' in data:
                    record.enrollment_date = datetime.strptime(data['enrollmentDate'], '%Y-%m-%d').date()
                
                record.school_name = data.get('schoolName', record.school_name)
                record.grade_level = data.get('gradeLevel', record.grade_level)
                record.academic_year = data.get('academicYear', record.academic_year)
                record.performance = data.get('performance', record.performance)
                record.special_needs = data.get('specialNeeds', record.special_needs)
                record.teacher_comments = data.get('teacherComments', record.teacher_comments)
                record.recorded_by = data.get('recordedBy', record.recorded_by)
                
                db.session.commit()
                return jsonify(record.to_dict())
            except Exception as e:
                db.session.rollback()
                return jsonify({"error": str(e)}), 400
                
        elif request.method == 'DELETE':
            db.session.delete(record)
            db.session.commit()
            return jsonify({"message": "Education record deleted successfully"}), 200