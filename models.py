from flask import Flask, request,render_template,redirect,flash,session,jsonify
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """[connect to database]
    """
    app.app_context().push()
    db.app = app
    db.init_app(app)
    
class Cupcake(db.Model):
    """Create cupcakes table in database
    """
    __tablename__ = "cupcakes"
    
    def __repr__(self):
        """show better represented info about tag objects
        """
        c = self
        return f"<Cupcake id= {c.id} | flavor= {c.flavor} | size= {c.size} | rating= {c.rating} | image= {c.image}"
    
    def serialize(self):
        """serializes our Cupcake objects into 'jsonify-able' data
        """
        return {
            "id":self.id,
            "flavor":self.flavor,
            "size":self.size,
            "rating":self.rating,
            "image":self.image,
        }
    
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    flavor = db.Column(db.String(20),nullable=False)
    size = db.Column(db.String(20),nullable=False)
    rating = db.Column(db.Float,nullable=False)
    image = db.Column(db.String,nullable=True,default='https://tinyurl.com/demo-cupcake')
    

    