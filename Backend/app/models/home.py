from app.extensions import db

class Home(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(150), nullable=False)
    location = db.Column(db.String(200), nullable=False)
    current_need = db.Column(db.String(200))
    description = db.Column(db.Text)
    amount_contributed = db.Column(db.Float, default=0.0)
    target_amount = db.Column(db.Float, default=0.0)
    image = db.Column(db.String(300))

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "location": self.location,
            "current_need": self.current_need,
            "description": self.description,
            "amount_contributed": self.amount_contributed,
            "target_amount": self.target_amount,
            "image": self.image
        }
