#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, jsonify, make_response, session
from flask_restful import Resource
from werkzeug.utils import secure_filename
import json
import os
import pandas as pd



# Local imports
from config import app, db, api

# Add your model imports
from models import Well, Assumptions, GasConcentration, ProductionCurve, Project, User, Pricing
# Import the Single Well Model
import singlewellmodel
import projectlevelmodel


class PackageSend(Resource):
    
    def get(self, id):
        try:
            package = singlewellmodel.calculate_cash_flows(id)

            return package, 200
        except Exception as e:
            return {"error": str(e)}, 500

api.add_resource(PackageSend, '/Model_package/<int:id>')


class ProjectPackageSend(Resource):
    
    def get(self, id):
        
        try:
            package = projectlevelmodel.project_level_economics(id)

            return package, 200
        except Exception as e:
            return {"error": str(e)}, 500

api.add_resource(ProjectPackageSend, '/Project_package/<int:id>')



# Routes

class UserNorm(Resource):
    
    # get all users
    def get(self):
        users_to_get = User.query.all()
        data = [user.to_dict() for user in users_to_get]

        return data, 200
    
    # post a new user
    def post(self):
        user_to_create = request.get_json()

        try: 
            new_user = User(
                username = user_to_create["username"],
                email = user_to_create["email"],
                password_hash = user_to_create["password"]
            )
            
            db.session.add(new_user)
            db.session.commit()
            return new_user.to_dict(), 201
        
        except Exception as e:
            print(e.__str__())
            raise Exception("There was an error while creating the user")

api.add_resource(UserNorm, '/User_table')


class UserById(Resource):
    
    def get(self, id):
        
        user_to_choose = User.query.filter_by(id=id).first() 

        return user_to_choose.to_dict(), 200
    
    def patch(self, id):

        data_to_patch_from = request.get_json()

        user_to_choose = User.query.filter_by(id=id).first() 

        if user_to_choose != None:
            for field in data_to_patch_from:
                setattr(user_to_choose, field ,data_to_patch_from[field])
        else:
            return {'error':'the user does not exist'}, 404
        
    def delete(self, id):

        user_to_choose = User.query.filter_by(id=id).first() 

        if user_to_choose != None:
            db.session.delete(user_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the user does not exist'}, 404

api.add_resource(UserById, '/User_table/<int:id>')



class WellNorm(Resource):

    # get all wells
    def get(self):
        wells_to_get = Well.query.all()

        data = [well.to_dict() for well in wells_to_get]

        return data, 200
    
    # post a new well
    def post(self):
        well_to_create = request.get_json()

        try: 
            new_well = Well(
                name = well_to_create["name"],
                coordinates = well_to_create.get("coordinates", None),
            )
            
            db.session.add(new_well)
            db.session.commit()
            return new_well.to_dict(), 201
        
        except:
            raise Exception("There was an error while creating the well")

api.add_resource(WellNorm, "/Well_table")


class WellById(Resource):

    def get(self, id):
        well_to_choose = Well.query.filter_by(id=id).first()
        if well_to_choose:
            return well_to_choose.to_dict(), 200
        else:
            return {'error': 'the well does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()

        try: 
            well_to_choose = Well.query.filter_by(id=id).first()

            for field in data_to_patch_from:
                setattr(well_to_choose, field, data_to_patch_from[field])

            db.session.commit()
            return well_to_choose.to_dict(), 200
        
        except Exception as e:
            print(e)
            return {'error':'the well does not exist'}, 404
        

    def delete(self, id):
        well_to_choose = Well.query.filter_by(id=id).first()

        if well_to_choose:
            db.session.delete(well_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the well does not exist'}, 404

api.add_resource(WellById, '/Well_table/<int:id>')


# class WellByIdAssumptions(Resource):

#     def get(self, id):
#         assumptions_to_choose = (Well.query.filter_by(id=id).first())["assumptions"]
        
#         if assumptions_to_choose:
#             return assumptions_to_choose.to_dict(), 200
#         else:
#             return {'error': 'the well does not exist'}, 404


#     def patch(self, id):
#         data_to_patch_from = request.get_json()

#         try: 
#             assumptions_to_choose = (Well.query.filter_by(id=id).first())["assumptions"]

#             for field in data_to_patch_from:
#                 setattr(assumptions_to_choose, field, data_to_patch_from[field])

#             db.session.commit()
#             return assumptions_to_choose.to_dict(), 200
        
#         except Exception as e:
#             print(e)
#             return {'error':'the well does not exist'}, 404

# api.add_resource(WellByIdAssumptions, '/Well_table/<int:id>/assumptions')



class AssumptionsNorm(Resource):

    # Get all assumptions
    def get(self):
        assumptions_to_get = Assumptions.query.all()
        data = [assumption.to_dict() for assumption in assumptions_to_get]

        return data, 200

    # Post a new assumption
    def post(self):
        assumption_to_create = request.get_json()

        try:
            new_assumption = Assumptions(
                net_revenue_interest = assumption_to_create['net_revenue_interest'],
                working_interest = assumption_to_create['working_interest'],
                operations_assumptions = assumption_to_create['operations_assumptions'],
                opex_assumptions = assumption_to_create['opex_assumptions'],
                capex_assumptions = assumption_to_create['capex_assumptions'],
                # Add other fields as necessary
            )

            db.session.add(new_assumption)
            db.session.commit()
            return new_assumption.to_dict(), 201

        except:
            return {"error": "There was an error while creating the assumption"}, 500

api.add_resource(AssumptionsNorm, '/Assumptions_table')

class AssumptionById(Resource):

    def get(self, id):
        assumption_to_choose = Assumptions.query.filter_by(id=id).first()
        if assumption_to_choose:
            return assumption_to_choose.to_dict(), 200
        else:
            return {'error': 'the assumption does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()

        try: 
            assumption_to_choose = Assumptions.query.filter_by(id=id).first()
            for field in data_to_patch_from:
                setattr(assumption_to_choose, field, data_to_patch_from[field])
            db.session.commit()
            return assumption_to_choose.to_dict(), 200
        except Exception as e:
            print(e)
            
            return {'error':'the assumption does not exist'}, 404

    def delete(self, id):
        assumption_to_choose = Assumptions.query.filter_by(id=id).first()

        if assumption_to_choose:
            db.session.delete(assumption_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the assumption does not exist'}, 404

api.add_resource(AssumptionById, '/Assumptions_table/<int:id>')


class GasConcentrationNorm(Resource):

    # Get all gas concentrations
    def get(self):
        concentrations_to_get = GasConcentration.query.all()
        data = [concentration.to_dict() for concentration in concentrations_to_get]

        return data, 200

    # Post a new gas concentration
    def post(self):
        concentration_to_create = request.get_json()

        try:
            new_concentration = GasConcentration(
                methane = concentration_to_create.get('methane', None),
                ethane = concentration_to_create.get('ethane', None),
                propane = concentration_to_create.get('propane', None),
                i_butane = concentration_to_create.get('i_butane', None),
                n_butane = concentration_to_create.get('n_butane', None),
                i_pentane = concentration_to_create.get('i_pentane', None),
                n_pentane = concentration_to_create.get('n_pentane', None),
                hexane_plus = concentration_to_create.get('hexane_plus', None),
                helium = concentration_to_create.get('helium', None),
                other = concentration_to_create.get('other', None)
                # Add other fields as necessary
            )

            db.session.add(new_concentration)
            db.session.commit()
            return new_concentration.to_dict(), 201

        except:
            return {"error": "There was an error while creating the gas concentration"}, 500

api.add_resource(GasConcentrationNorm, '/Gas_concentration_table')

class GasConcentrationById(Resource):

    def get(self, id):
        concentration_to_choose = GasConcentration.query.filter_by(id=id).first()
        if concentration_to_choose:
            return concentration_to_choose.to_dict(), 200
        else:
            return {'error': 'the gas concentration does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()
        concentration_to_choose = GasConcentration.query.filter_by(id=id).first()

        if concentration_to_choose:
            for field in data_to_patch_from:
                setattr(concentration_to_choose, field, data_to_patch_from[field])
            db.session.commit()
            return concentration_to_choose.to_dict(), 200
        else:
            return {'error':'the gas concentration does not exist'}, 404

    def delete(self, id):
        concentration_to_choose = GasConcentration.query.filter_by(id=id).first()

        if concentration_to_choose:
            db.session.delete(concentration_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the gas concentration does not exist'}, 404

api.add_resource(GasConcentrationById, '/Gas_concentration_table/<int:id>')


class ProductionCurveNorm(Resource):

    # Get all production curves
    def get(self):
        curves_to_get = ProductionCurve.query.all()
        data = [curve.to_dict() for curve in curves_to_get]

        return data, 200

    # Post a new production curve
    def post(self):
        curve_to_create = request.get_json()

        try:
            new_curve = ProductionCurve(
                type_curve = curve_to_create['type_curve'],
                # Add other fields as necessary
            )

            db.session.add(new_curve)
            db.session.commit()
            return new_curve.to_dict(), 201

        except:
            return {"error": "There was an error while creating the production curve"}, 500

api.add_resource(ProductionCurveNorm, '/Production_curve_table')

class ProductionCurveById(Resource):

    def get(self, id):
        curve_to_choose = ProductionCurve.query.filter_by(id=id).first()
        if curve_to_choose:
            return curve_to_choose.to_dict(), 200
        else:
            return {'error': 'the production curve does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()
        curve_to_choose = ProductionCurve.query.filter_by(id=id).first()

        if curve_to_choose:
            for field in data_to_patch_from:
                setattr(curve_to_choose, field, data_to_patch_from[field])
            db.session.commit()
            return curve_to_choose.to_dict(), 200
        else:
            return {'error':'the production curve does not exist'}, 404

    def delete(self, id):
        curve_to_choose = ProductionCurve.query.filter_by(id=id).first()

        if curve_to_choose:
            db.session.delete(curve_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the production curve does not exist'}, 404

api.add_resource(ProductionCurveById, '/Production_curve_table/<int:id>')


class ProjectNorm(Resource):

    # Get all projects
    def get(self):
        projects_to_get = Project.query.all()
        data = [project.to_dict() for project in projects_to_get]

        return data, 200

    # Post a new project
    def post(self):
        project_to_create = request.get_json()

        try:
            new_project = Project(
                name = project_to_create['name'],
                # Add other fields as necessary
            )

            db.session.add(new_project)
            db.session.commit()
            return new_project.to_dict(), 201

        except:
            return {"error": "There was an error while creating the project"}, 500

api.add_resource(ProjectNorm, '/Project_table')

class ProjectById(Resource):

    def get(self, id):
        project_to_choose = Project.query.filter_by(id=id).first()
        if project_to_choose:
            return project_to_choose.to_dict(), 200
        else:
            return {'error': 'the project does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()
        project_to_choose = Project.query.filter_by(id=id).first()

        if project_to_choose:
            for field in data_to_patch_from:
                setattr(project_to_choose, field, data_to_patch_from[field])
            db.session.commit()
            return project_to_choose.to_dict(), 200
        else:
            return {'error':'the project does not exist'}, 404

    def delete(self, id):
        project_to_choose = Project.query.filter_by(id=id).first()

        if project_to_choose:
            db.session.delete(project_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the project does not exist'}, 404

api.add_resource(ProjectById, '/Project_table/<int:id>')



## Routes for pricing table

class PricingNorm(Resource):
    
    def get(self):
        pricings_to_get = Pricing.query.all()
        data = [pricing.to_dict() for pricing in pricings_to_get]

        return data, 200

    def post(self):
        pricing_to_create = request.get_json()

        try:
            new_pricing = Pricing(
                oil_price = pricing_to_create['oil_price'],
                methane_price = pricing_to_create['methane_price'],
                helium_price = pricing_to_create['helium_price'],
                ethane_price = pricing_to_create['ethane_price'],
                propane_price = pricing_to_create['propane_price'],
                i_butane_price = pricing_to_create['i_butane_price'],
                n_butane_price = pricing_to_create['n_butane_price'],
                i_pentane_price = pricing_to_create['i_pentane_price'],
                n_pentane_price = pricing_to_create['n_pentane_price'],
                hexane_plus_price = pricing_to_create['hexane_plus_price']
            )

            db.session.add(new_pricing)
            db.session.commit()
            return new_pricing.to_dict(), 201
        
        except: 
            return {"error": "There was an error while creating the pricing instance"}, 500

api.add_resource(PricingNorm, '/Pricing_table')


class PricingById(Resource):

    def get(self, id):
        pricing_to_choose = Pricing.query.filter_by(id=id).first()
        if pricing_to_choose:
            return pricing_to_choose.to_dict(), 200
        else:
            return {'error': 'the project does not exist'}, 404

    def patch(self, id):
        data_to_patch_from = request.get_json()
        pricing_to_choose = Pricing.query.filter_by(id=id).first()

        if pricing_to_choose:
            for field in data_to_patch_from:
                setattr(pricing_to_choose, field, data_to_patch_from[field])
            db.session.commit()
            return pricing_to_choose.to_dict(), 200
        else:
            return {'error':'the pricing does not exist'}, 404

    def delete(self, id):
        pricing_to_choose = Pricing.query.filter_by(id=id).first()

        if pricing_to_choose:
            db.session.delete(pricing_to_choose)
            db.session.commit()
            return {}, 204
        else:
            return {'error':'the pricing does not exist'}, 404

api.add_resource(PricingById, '/Pricing_table/<int:id>') 


# make login
class Login(Resource):
    def post(self):
        data = request.get_json()
        username = data['username']
        password = data['password']
        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return user.to_dict(), 200
        return {'error': 'Unauthorized'}, 401
    
api.add_resource(Login, '/login')



# Making upload file

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'csv'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


class UploadCurve(Resource):
    
    def post(self):
        # Checking if the post request has the file
        
        if 'file_to_upload' not in request.files:
            return {'error': 'There is no file part in the upload'}, 400
        
        file = request.files['file_to_upload']
        well_name = request.form['well_name']

        print('starting here !!!!')
        print(request)
        print(well_name)

        if file.filename == '':
            return {'error': 'No selected file'}, 400
        
        if file:
            filename = secure_filename(file.filename)

            filepath = os.path.join('upload_folder', filename)

            file.save(filepath)

            # read the csv file into a DataFrame
            df = pd.read_csv(filepath)

            # Process the DataFrame as needed, e.g., convert to JSON
            json_data = df.to_json(orient='records')

            new_gas_concentration = GasConcentration(methane=1.0,
                                                        ethane=0.0,
                                                        propane=0.0,
                                                        i_butane=0.0,
                                                        n_butane=0.0,
                                                        i_pentane=0.0,
                                                        n_pentane=0.0,
                                                        hexane_plus=0.0,
                                                        helium=0.0,
                                                        other=0.0)
            
            db.session.add(new_gas_concentration)

            new_ops_assumptions = Assumptions(
                                                net_revenue_interest = 0.85,
                                                working_interest = 1,
                                                list_of_oil_deducts = json.dumps({"nymex_oil_pricing_deduct":0.0, "oil_transportation_cost":0.0, "oil_processing_cost":0.0}),
                                                list_of_gas_deducts = json.dumps({"hhub_gas_pricing_deduct":0.0, "gas_transportation_cost":0.0, "gas_procesing_cost":0.0}),
                                                severance_tax = 0.00,
                                                ad_valorem_tax = 0.00,
                                                total_monthly_opex = 0,
                                                drilling_costs = 0,
                                                completion_costs = 0,
                                                pipeline_costs = 0,
                                                contingency_costs = 0
                                            )

            db.session.add(new_ops_assumptions)

            new_curve = ProductionCurve(type_curve=json_data)
            db.session.add(new_curve)
            db.session.flush()

            new_well = Well(name=well_name, production_curve_id=new_curve.id, assumption_id=new_ops_assumptions.id, gas_concentration_id=new_gas_concentration.id)
            
            db.session.add(new_well)
            db.session.commit()
            
            # Remove the file if not needed anymore
            # os.remove(filepath)
            
            # Respond with the JSON data
            return {'type_curve': json_data}, 200

        return {'error': 'Invalid file type'}, 400

api.add_resource(UploadCurve, '/Upload_curve')




@app.route('/')
def index():
    return '<h1>Phase 4 Project Server</h1>'


if __name__ == '__main__':
    app.run(port=5555, debug=True)

