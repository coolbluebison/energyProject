import pandas as pd

from config import app

from models import Well, Assumptions, GasConcentration, ProductionCurve, Project, User, Pricing

import numpy_financial as npf

import singlewellmodel


# Choose a project
# Lets say project 1, aka AAA
# Get all the wells associated with that project
# Get all well_ids associated with that project

# Get the single well models for all of the projects
# Add them together, whenever the timeframes match each other

project_id = 1 

def project_level_economics(project_id):

    wells_to_get = Well.query.filter_by(project_id=project_id)

    wells_to_get_list = [well.to_dict() for well in wells_to_get]

    well_id_list = [well["id"] for well in wells_to_get_list]

    empty_list = []

    for id in well_id_list:
        empty_list.append((pd.DataFrame(singlewellmodel.calculate_cash_flows(id)["model"])).set_index("Date"))
    
    combined_df = pd.concat(empty_list)

    combined_sum = combined_df.groupby(combined_df.index).sum()

    combined_sum.index = pd.to_datetime(combined_sum.index, format='%m/%d/%Y')

    combined_sum = combined_sum.sort_index()

    npv10 = npf.npv(0.1, combined_sum["cash_flows"])

    irr = npf.irr(combined_sum["cash_flows"])

    if irr == None:
        irr = 0

    combined_sum = combined_sum.drop("Month",axis=1)

    combined_sum = combined_sum.reset_index()

    combined_sum["disp_date"] =  (pd.to_datetime(combined_sum["Date"])).dt.strftime("%b-%y")

    combined_sum['Date'] = combined_sum['Date'].apply(lambda x: x.isoformat())

    print(combined_sum)
    print(f"IRR is {irr*100:.2f}%")
    print(f"NPV10 is ${npv10:.2f}")

    project_package = { "model": combined_sum.to_dict(), "irr":irr, "npv":npv10 }

    return project_package


with app.app_context():
    project_level_economics(project_id)


