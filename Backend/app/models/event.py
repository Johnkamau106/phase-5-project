from app.extensions import db
from datetime import datetime

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(200))
    description = db.Column(db.Text)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "date": self.date.isoformat() if self.date else None,
            "location": self.location,
            "description": self.description,
        }