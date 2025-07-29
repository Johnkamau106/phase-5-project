from app.extensions import db


class Home(db.Model):
    __tablename__ = 'homes'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.Text)
    location = db.Column(db.String(100))
    address = db.Column(db.String(200))
    phone = db.Column(db.String(20))
    email = db.Column(db.String(100))
    website = db.Column(db.String(100))
    logo = db.Column(db.String(200))
    image = db.Column(db.String(300))  # Image URL for home card
    capacity = db.Column(db.Integer)
    current_children = db.Column(db.Integer, default=0)
    amountContributed = db.Column(db.Float, default=0.0)
    target = db.Column(db.Float, default=0.0)
    needs = db.Column(db.Text)  # JSON list of needs

    # Bank details for donations
    bank_name = db.Column(db.String(100))
    account_name = db.Column(db.String(100))
    account_number = db.Column(db.String(50))
    branch = db.Column(db.String(100))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'location': self.location,
            'address': self.address,
            'phone': self.phone,
            'email': self.email,
            'website': self.website,
            'logo': self.logo,
            'image': self.image,
            'capacity': self.capacity,
            'current_children': self.current_children,
            'amountContributed': self.amountContributed,
            'target': self.target,
            'needs': self.needs.split(',') if self.needs else [],
            'bank_details': {
                'bank_name': self.bank_name,
                'account_name': self.account_name,
                'account_number': self.account_number,
                'branch': self.branch
            } if self.bank_name else None
        }