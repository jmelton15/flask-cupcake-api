from flask import Flask,request,render_template,redirect,flash,session,flash,url_for,jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
import models
from models import db, connect_db,Cupcake
from forms import AddCupcakeForm,EditCupcakeForm
import os
from werkzeug.utils import secure_filename
from werkzeug.datastructures import CombinedMultiDict, FileStorage


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SUPERSECRETKEY"

connect_db(app)

# db.create_all()


@app.route('/',methods=["GET","POST"])
def show_cupcake_form():
    """Shows premade cupcake form that will work with the API
    """
    if request.method == "POST":
        return redirect('/')
    else:
        add_form = AddCupcakeForm()
        edit_form = EditCupcakeForm()
        return render_template("home_page.html",add_form=add_form,edit_form=edit_form)
    
@app.route('/api/cupcakes')
def get_all_cupcakes():
    """Gets data about all cupcakes in the API database
    Returns JSON {'cupcakes':[{id,flavor,size,rating,image},...]}
    """
    cupcakes = [cupcake.serialize() for cupcake in Cupcake.query.order_by(Cupcake.id.desc()).all()]
    
    return jsonify(cupcakes=cupcakes)

@app.route('/api/cupcakes/<int:cake_id>')
def get_a_cupcake(cake_id):
    """Gets data about a single cupcake with a given id value
    Returns JSON {'cupcake':{id,flavor,size,rating,image}}
    """
    cupcake = Cupcake.query.get_or_404(cake_id)
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes',methods=["POST"])
def create_cupcake():
    """Handles post request for creating a new cupcake
    Returns JSON {'cupcake':{id,flavor,size,rating,image}}
    """
    flavor = request.json["flavor"]
    size = request.json['size']
    rating = request.json['rating']
    image = request.json.get('image')
        
    if image:
        new_cupcake = Cupcake(flavor=flavor,size=size,rating=rating,image=image)
        db.session.add(new_cupcake)
    else:
        new_cupcake = Cupcake(flavor=flavor,size=size,rating=rating)
        db.session.add(new_cupcake)
    db.session.commit()
    return ( jsonify(cupcake=new_cupcake.serialize()),201)


@app.route('/api/cupcakes/<int:cake_id>',methods=["PATCH"])  
def update_cupcake(cake_id):
    """Handles PATCH requests for updating a cupcake 
    Returns JSON {'cupcake':{id,flavor,size,rating,image}}
    """
    cupcake = Cupcake.query.get_or_404(cake_id)
    
    cupcake.flavor = request.json.get('flavor',cupcake.flavor)
    cupcake.size = request.json.get('size',cupcake.size)
    cupcake.rating = request.json.get('rating',cupcake.rating)
    cupcake.image = request.json.get('image', cupcake.image)
    
    db.session.commit()
    return jsonify(cupcake=cupcake.serialize())

@app.route('/api/cupcakes/<int:cake_id>',methods=["DELETE"])
def delete_cupcake(cake_id):
    """Handles DELETE request for deleting a cupcake 
    Returns JSON {message: "Deleted"}
    """
    cupcake = Cupcake.query.get_or_404(cake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return {'message': 'Deleted'}


    
    
        
    
    