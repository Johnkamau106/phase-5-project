from app.extensions import db
from datetime import datetime


class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    currency = db.Column(db.String(3), default='KES')
    payment_method = db.Column(db.String(50), nullable=False)  # mpesa, card, bank, etc.
    transaction_id = db.Column(db.String(100), unique=True)
    status = db.Column(db.String(20), default='pending')  # pending, completed, failed, refunded
    donation_type = db.Column(db.String(20))  # one-time, monthly, yearly, sponsorship
    receipt_number = db.Column(db.String(50))
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    home_id = db.Column(db.Integer, db.ForeignKey('homes.id'))
    child_id = db.Column(db.Integer, db.ForeignKey('children.id'))

    donor = db.relationship('User', backref='donations')
    home = db.relationship('Home', backref='donations')
    child = db.relationship('Child', backref='sponsorships')

    def to_dict(self):
        return {
            'id': self.id,
            'amount': self.amount,
            'currency': self.currency,
            'payment_method': self.payment_method,
            'transaction_id': self.transaction_id,
            'status': self.status,
            'donation_type': self.donation_type,
            'receipt_number': self.receipt_number,
            'created_at': self.created_at.isoformat(),
            'donor': self.donor.to_dict() if self.donor else None,
            'home': self.home.to_dict() if self.home else None,
            'child': self.child.to_dict() if self.child else None
        }