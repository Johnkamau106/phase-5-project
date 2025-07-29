from flask import Blueprint, request, jsonify
from app.models import EducationRecord, Child
from app.extensions import db
from datetime import datetime

education_bp = Blueprint('education', __name__, url_prefix='/api/education-records')

@education_bp.route('/child/<int:child_id>', methods=['POST'])
def create_education_record(child_id):
    data = request.get_json()

    if not Child.query.get(child_id):
        return jsonify({"error": "Child not found"}), 404

    try:
        enrollment_date = datetime.strptime(data['enrollment_date'], '%Y-%m-%d').date() if 'enrollment_date' in data else datetime.utcnow().date()

        record = EducationRecord(
            child_id=child_id,
            school_name=data.get('school_name', ''),
            grade_level=data.get('grade_level', ''),
            academic_year=data.get('academic_year', ''),
            performance=data.get('performance'),
            special_needs=data.get('special_needs'),
            teacher_comments=data.get('teacher_comments'),
            enrollment_date=enrollment_date,
            recorded_by=None  # or hardcode as "admin" if needed
        )

        db.session.add(record)
        db.session.commit()

        return jsonify({
            "message": "Education record created successfully",
            "record": record.to_dict()
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@education_bp.route('/child/<int:child_id>', methods=['GET'])
def get_child_education_records(child_id):
    records = EducationRecord.query.filter_by(child_id=child_id)\
                                   .order_by(EducationRecord.academic_year.desc())\
                                   .all()
    return jsonify([record.to_dict() for record in records])

@education_bp.route('/<int:record_id>', methods=['GET'])
def get_education_record(record_id):
    record = EducationRecord.query.get_or_404(record_id)
    return jsonify(record.to_dict())

@education_bp.route('/<int:record_id>', methods=['PUT'])
def update_education_record(record_id):
    record = EducationRecord.query.get_or_404(record_id)
    data = request.get_json()

    try:
        if 'enrollment_date' in data:
            record.enrollment_date = datetime.strptime(data['enrollment_date'], '%Y-%m-%d').date() if data['enrollment_date'] else None

        record.school_name = data.get('school_name', record.school_name)
        record.grade_level = data.get('grade_level', record.grade_level)
        record.academic_year = data.get('academic_year', record.academic_year)
        record.performance = data.get('performance', record.performance)
        record.special_needs = data.get('special_needs', record.special_needs)
        record.teacher_comments = data.get('teacher_comments', record.teacher_comments)

        db.session.commit()

        return jsonify({
            "message": "Education record updated successfully",
            "record": record.to_dict()
        })

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400

@education_bp.route('/<int:record_id>', methods=['DELETE'])
def delete_education_record(record_id):
    record = EducationRecord.query.get_or_404(record_id)
    db.session.delete(record)
    db.session.commit()
    return jsonify({"message": "Education record deleted successfully"}), 200

@education_bp.route('/search', methods=['GET'])
def search_education_records():
    school_name = request.args.get('school_name')
    child_id = request.args.get('child_id')
    grade_level = request.args.get('grade_level')
    academic_year = request.args.get('academic_year')

    query = EducationRecord.query

    if school_name:
        query = query.filter(EducationRecord.school_name.ilike(f'%{school_name}%'))
    if child_id:
        query = query.filter_by(child_id=child_id)
    if grade_level:
        query = query.filter_by(grade_level=grade_level)
    if academic_year:
        query = query.filter_by(academic_year=academic_year)

    records = query.order_by(EducationRecord.academic_year.desc()).all()
    return jsonify([record.to_dict() for record in records])
