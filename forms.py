from flask_wtf import FlaskForm
from wtforms import StringField,FloatField,SelectField,IntegerField,TextAreaField,BooleanField
from wtforms.validators import InputRequired,Optional,Email,URL,NumberRange,Optional,ValidationError
from wtforms.ext.sqlalchemy.fields import QuerySelectField
from flask_wtf.file import FileField, FileRequired,FileAllowed
from models import db, connect_db,Cupcake
import models 


class AddCupcakeForm(FlaskForm):
    """WTForm that handles adding a cupcake
    """
    
    flavor = StringField("Cupcake Flavor",validators=[InputRequired()])
    size = StringField("Cupcake Size",validators=[InputRequired()])
    rating = FloatField("Rate Your Cupcake",validators=[InputRequired(),NumberRange(min=0,max=30)])
    image = StringField("Cupcake URL",validators=[Optional(),URL()])

class EditCupcakeForm(FlaskForm):
    """WTForm that handles editing a cupcake
    """
    u_flavor = StringField("Edit Cupcake Flavor",validators=[InputRequired()])
    u_size = StringField("Edit Cupcake Size",validators=[InputRequired()])
    u_rating = FloatField("Edit Rate Your Cupcake",validators=[InputRequired(),NumberRange(min=0,max=30)])
    u_image = StringField("Edit Cupcake URL",validators=[Optional(),URL()])
    