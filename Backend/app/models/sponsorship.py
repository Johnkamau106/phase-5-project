from app.extensions import db
from datetime import datetime

class Sponsorship(db.Model):
    __tablename__ = 'sponsorships'
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    child_id = db.Column(db.Integer, db.ForeignKey('child.id'), primary_key=True)
    sponsored_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', lazy=True)
    child = db.relationship('Child', lazy=True)

    def to_dict(self):
        return {
            "user_id": self.user_id,
            "child_id": self.child_id,
            "sponsored_at": self.sponsored_at.isoformat()
        }
