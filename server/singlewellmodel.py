import pandas as pd 
import json


from config import app

from models import Well, Assumptions, GasConcentration, ProductionCurve, Project, User


oil_price = 60.0
gas_price = 3.0


def get_type_well(id):

    type_curve_to_get = (ProductionCurve.query.filter_by(id=id).first()).to_dict()
    type_curve_data = json.loads(type_curve_to_get["type_curve"])
    df = pd.DataFrame(type_curve_data)

    print(df)


with app.app_context():
    get_type_well(1)




























