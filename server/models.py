from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship, validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, bcrypt


# Models go here!

class Well(db.Model, SerializerMixin):
    __tablename__ = 'Well_table'
    
    # serialization_rules

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column (db.String, nullable=False)
    coordinates = db.Column(db.String)

    # Foreign keys
    production_curve_id = db.Column(db.Integer, db.ForeignKey("Production_curve_table.id") )
    gas_concentration_id = db.Column(db.Integer, db.ForeignKey("Gas_concentration_table.id"))
    assumption_id = db.Column(db.Integer, db.ForeignKey("Assumptions_table.id"))
    project_id = db.Column(db.Integer, db.ForeignKey("Project_table.id"))
    user_id = db.Column(db.Integer, db.ForeignKey("User_table.id"))
    
    # relationships will come in here
    production_curve = db.relationship("ProductionCurve", back_populates="well")
    gas_concentration = db.relationship("GasConcentration", back_populates="well")
    assumptions = db.relationship("Assumptions", back_populates="well")
    project = db.relationship("Project", back_populates="well")
    user  = db.relationship("User", back_populates="well")

    ## validations will come in here


class Assumptions(db.Model, SerializerMixin):
    __tablename__ = "Assumptions_table"

    id = db.Column(db.Integer, primary_key= True)
    
    # Land assumptions
    net_revenue_interest = db.Column(db.Float, nullable=False)
    working_interest = db.Column(db.Float, nullable=False)
    list_of_oil_deducts = db.Column(db.String)
    list_of_gas_deducts = db.Column(db.String)
    severance_tax = db.Column(db.Float)
    ad_valorem_tax = db.Column(db.Float)
    total_monthly_opex = db.Column(db.Float)    
    drilling_costs = db.Column(db.Float)
    completion_costs = db.Column(db.Float)
    pipeline_costs = db.Column(db.Float)
    contingency_costs = db.Column(db.Float)
    ## Added these 2
    prod_start_month = db.Column(db.String)
    prod_start_year = db.Column(db.String)

    #relationships
    well = db.relationship("Well", back_populates="assumptions")

    # serialize_rules
    serialize_rules = ("-well",)

    #validations


class ProductionCurve(db.Model, SerializerMixin):
    __tablename__ = "Production_curve_table"

    id = db.Column(db.Integer, primary_key= True)
    type_curve = db.Column(db.String, nullable=False)

    #relationships
    well = db.relationship("Well", back_populates="production_curve")

    # serialize_rules
    serialize_rules = ("-well",)

    #validations


class GasConcentration(db.Model, SerializerMixin):
    __tablename__ = "Gas_concentration_table"

    id = db.Column(db.Integer, primary_key=True)
    methane = db.Column(db.Float)
    ethane = db.Column(db.Float)
    propane = db.Column(db.Float)
    i_butane = db.Column(db.Float)
    n_butane = db.Column(db.Float)
    i_pentane = db.Column(db.Float)
    n_pentane = db.Column(db.Float)
    hexane_plus = db.Column(db.Float)
    helium = db.Column(db.Float)
    other = db.Column(db.Float)

    #relationships
    well = db.relationship("Well", back_populates="gas_concentration")

    # serialize_rules
    serialize_rules = ("-well",)


    #validations
    # need to add a validation here that adding all concentrations need to equal to 1



class User(db.Model, SerializerMixin):
    __tablename__ = 'User_table'

    id = db.Column(db.Integer, primary_key= True)
    username = db.Column(db.String)
    email = db.Column(db.String)
    _password_hash = db.Column(db.String)

    #relationships
    well = db.relationship("Well", back_populates="user")

    # serialize_rules
    serialize_rules = ("-well",)

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        # utf-8 encoding and decoding is required in python3
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8')
        )
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    

    #validations
    # need to add a validation to make sure that
    # one user can have many wells but
    # one well can only one user


class Project(db.Model, SerializerMixin):
    __tablename__ = "Project_table"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)

    #relationships
    well = db.relationship("Well", back_populates="project")

    # serialize_rules
    serialize_rules = ("-well",)


class Pricing(db.Model, SerializerMixin):
    __tablename__ = "Pricing_table"

    id = db.Column(db.Integer, primary_key=True)

    oil_price = db.Column(db.Float)
    methane_price = db.Column(db.Float)
    helium_price = db.Column(db.Float)
    ethane_price =  db.Column(db.Float)
    propane_price =  db.Column(db.Float)
    i_butane_price  = db.Column(db.Float)
    n_butane_price = db.Column(db.Float)
    i_pentane_price = db.Column(db.Float)
    n_pentane_price = db.Column(db.Float)
    hexane_plus_price = db.Column(db.Float)




