from app.extensions import db

class Child(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    birthdate = db.Column(db.String(20))
    age = db.Column(db.Integer)
    gender = db.Column(db.String(10))
    photo = db.Column(db.String(300))
    health_status = db.Column(db.String(100))
    notes = db.Column(db.Text)
    home = db.Column(db.String(100))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "birthdate": self.birthdate,
            "age": self.age,
            "gender": self.gender,
            "photo": self.photo,
            "healthStatus": self.health_status,
            "notes": self.notes,
            "home": self.home,
        }