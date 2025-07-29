from app.extensions import db
from datetime import datetime

class Child(db.Model):
    __tablename__ = 'children'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    date_of_birth = db.Column(db.Date, nullable=False)
    gender = db.Column(db.String(10), nullable=False)
    photo = db.Column(db.String(300))
    health_status = db.Column(db.String(100))
    education_level = db.Column(db.String(100))
    hobbies = db.Column(db.Text)
    background = db.Column(db.Text)
    admission_date = db.Column(db.Date, default=datetime.utcnow)
    is_sponsored = db.Column(db.Boolean, default=False)
    sponsorship_details = db.Column(db.Text)

    # Foreign Keys
    home_id = db.Column(db.Integer, db.ForeignKey('homes.id'), nullable=False)
    sponsor_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    home = db.relationship('Home', backref='children')
    sponsor = db.relationship('User', backref='sponsored_children')
    education_records = db.relationship('EducationRecord', backref='child', cascade="all, delete-orphan")
    medical_records = db.relationship('MedicalRecord', backref='child', cascade='all, delete-orphan')
    

    def to_dict(self):
        return {
            "id": self.id,
            "firstName": self.first_name,
            "lastName": self.last_name,
            "fullName": f"{self.first_name} {self.last_name}",
            "dateOfBirth": self.date_of_birth.isoformat() if self.date_of_birth else None,
            "age": self.calculate_age(),
            "gender": self.gender,
            "photo": self.photo,
            "healthStatus": self.health_status,
            "educationLevel": self.education_level,
            "hobbies": self.hobbies.split(',') if self.hobbies else [],
            "background": self.background,
            "admissionDate": self.admission_date.isoformat() if self.admission_date else None,
            "isSponsored": self.is_sponsored,
            "sponsorshipDetails": self.sponsorship_details,
            "home": self.home.to_dict() if self.home else None,
            "sponsor": self.sponsor.to_dict() if self.sponsor else None,
            "educationRecords": [record.to_dict() for record in self.education_records],
            "medicalRecords": [record.to_dict() for record in self.medical_records]  # ✅ added this line
        }

    def calculate_age(self):
        if not self.date_of_birth:
            return None
        today = datetime.today()
        return today.year - self.date_of_birth.year - (
            (today.month, today.day) < (self.date_of_birth.month, self.date_of_birth.day)
        )
