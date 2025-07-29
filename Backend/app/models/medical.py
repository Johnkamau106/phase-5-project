from app.extensions import db
from datetime import datetime

class MedicalRecord(db.Model):
    __tablename__ = 'medical_records'

    id = db.Column(db.Integer, primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'), nullable=False)
    record_date = db.Column(db.Date, default=datetime.utcnow, nullable=False)
    diagnosis = db.Column(db.String(200), nullable=False)
    treatment = db.Column(db.Text)
    prescription = db.Column(db.Text)
    notes = db.Column(db.Text)
    follow_up_date = db.Column(db.Date)
    recorded_by = db.Column(db.Integer, db.ForeignKey('users.id'))

    child = db.relationship('Child', backref='medical_records')
    staff = db.relationship('User', backref='recorded_medical')

    def to_dict(self):
        return {
            "id": self.id,
            "childId": self.child_id,
            "recordDate": self.record_date.isoformat() if self.record_date else None,
            "diagnosis": self.diagnosis,
            "treatment": self.treatment,
            "prescription": self.prescription,
            "notes": self.notes,
            "followUpDate": self.follow_up_date.isoformat() if self.follow_up_date else None,
            "recordedById": self.recorded_by,
            "child": self.child.to_dict() if self.child else None,
            "staff": self.staff.to_dict() if self.staff else None
        }