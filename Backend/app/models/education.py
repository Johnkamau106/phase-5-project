from app.extensions import db

class EducationRecord(db.Model):
    __tablename__ = 'education_records'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable=False)
    school_name = db.Column(db.String(200), nullable=False)
    grade_level = db.Column(db.String(50), nullable=False)
    academic_year = db.Column(db.String(20), nullable=False)
    performance = db.Column(db.Text)
    special_needs = db.Column(db.Text)
    teacher_comments = db.Column(db.Text)
    enrollment_date = db.Column(db.Date)
    recorded_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Remove this line to avoid conflict
    # child = db.relationship('Child', backref='education_records')

    staff = db.relationship('User', backref='recorded_education')

    def to_dict(self):
        return {
            "id": self.id,
            "childId": self.child_id,
            "schoolName": self.school_name,
            "gradeLevel": self.grade_level,
            "academicYear": self.academic_year,
            "performance": self.performance,
            "specialNeeds": self.special_needs,
            "teacherComments": self.teacher_comments,
            "enrollmentDate": self.enrollment_date.isoformat() if self.enrollment_date else None,
            "recordedById": self.recorded_by,
            
            "staff": self.staff.to_dict() if self.staff else None
        }
