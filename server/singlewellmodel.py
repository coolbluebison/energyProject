import pandas as pd 
import json


from config import app

from models import Well, Assumptions, GasConcentration, ProductionCurve, Project, User


oil_price = 60.0
gas_price = 3.0
methane_price =  1.0
ethane_price =  1.0
propane_price =  1.0
i_butane_price  = 1.0
n_butane_price = 1.0
i_pentane_price = 1.0
n_pentane_price = 1.0
hexane_plus_price = 1.0


def get_type_well(id):
    # getting the type curve and converting into a dataframe for vectorized calculations

    well_to_get = (Well.query.filter_by(id=id).first()).to_dict()
    type_curve_to_get = well_to_get["production_curve"]["type_curve"]
    type_curve_data = json.loads(type_curve_to_get)
    type_curve_df = pd.DataFrame(type_curve_data)

    type_curve_df = type_curve_df.drop("Month", axis=1) 

    type_curve_df.iloc[:,0] = type_curve_df.iloc[:,0].str.replace(',', '').astype(float)
    type_curve_df.iloc[:,1] = type_curve_df.iloc[:,1].str.replace(',', '').astype(float)


    print(type_curve_df)
    return type_curve_df

def get_gas_concentration(id):
    # getting the gas concentrations

    well_to_get = (Well.query.filter_by(id=id).first()).to_dict()
    gas_concentration_to_get = well_to_get["gas_concentration"]

    # print(gas_concentration_to_get)

    methane =  gas_concentration_to_get["methane"]
    ethane =  gas_concentration_to_get["ethane"]
    propane =  gas_concentration_to_get["propane"]
    i_butane  = gas_concentration_to_get["i_butane"]
    n_butane = gas_concentration_to_get["n_butane"]
    i_pentane = gas_concentration_to_get["i_pentane"]
    n_pentane = gas_concentration_to_get["n_pentane"]
    hexane_plus = gas_concentration_to_get["hexane_plus"]
    helium = gas_concentration_to_get["helium"]

    return methane, ethane, propane, i_butane, n_butane, i_pentane, n_pentane, hexane_plus, helium

def process_curve(id):
    type_curve_df = get_type_well(id)
    methane, ethane, propane, i_butane, n_butane, i_pentane, n_pentane, hexane_plus, helium = get_gas_concentration(id)

    ethane_factor = 26.745
    propane_factor = 27.555
    i_butane_factor = 32.714
    n_butane_factor = 31.529
    i_pentane_factor = 36.606
    n_pentane_factor = 36.219
    hexane_plus_factor = 43.295

    ethane_gpm = (ethane_factor)*ethane*(14.73/14.696)
    propane_gpm = (propane_factor)*propane*(14.73/14.696)
    i_butane_gpm = (i_butane_factor)*i_butane*(14.73/14.696)
    n_butane_gpm = (n_butane_factor)*n_butane*(14.73/14.696)
    i_pentane_gpm = (i_pentane_factor)*i_pentane*(14.73/14.696)
    n_pentane_gpm = (n_pentane_factor)*n_pentane*(14.73/14.696)
    hexane_plus_gpm = (hexane_plus_factor)*hexane_plus*(14.73/14.696)

    # Assinging the oil
    type_curve_df["oil_bbl"] = type_curve_df.iloc[:,0]
    
    # Calculating the residual gas and helium
    type_curve_df["methane_mcf"] = type_curve_df.iloc[:,1]*methane
    type_curve_df["helium_mcf"] = type_curve_df.iloc[:,1]*helium

    # Calculating the NGLs
    type_curve_df["ethane_gal"] = type_curve_df.iloc[:,1]*ethane_gpm
    type_curve_df["propane_gal"] = type_curve_df.iloc[:,1]*propane_gpm
    type_curve_df["i_butane_gal"] = type_curve_df.iloc[:,1]*i_butane_gpm
    type_curve_df["n_butane_gal"] = type_curve_df.iloc[:,1]*n_butane_gpm
    type_curve_df["i_pentane_gal"] = type_curve_df.iloc[:,1]*i_pentane_gpm
    type_curve_df["n_pentane_gal"] = type_curve_df.iloc[:,1]*n_pentane_gpm
    type_curve_df["hexane_plus_gal"] = type_curve_df.iloc[:,1]*hexane_plus_gpm

    processed_curve_df = type_curve_df[["oil_bbl", "methane_mcf", "ethane_gal", "propane_gal", "i_butane_gal", "n_butane_gal", "i_pentane_gal", "n_pentane_gal", "hexane_plus_gal"]]

    print(processed_curve_df)
    return processed_curve_df


def net_production(id):
    processed_curve_df = process_curve(id)

    well_to_get = (Well.query.filter_by(id=id).first()).to_dict()
    net_revenue_interest = well_to_get["assumptions"]["net_revenue_interest"]
    working_interest = well_to_get["assumptions"]["working_interest"]

    processed_curve_df["net_revenue_interest"] = net_revenue_interest
    processed_curve_df["net_revenue_interest"] = working_interest

    print(processed_curve_df["helium_mcf"])

    # processed_curve_df["net_oil_bll"] = processed_curve_df["oil_bbl"]*net_revenue_interest*working_interest
    # processed_curve_df["net_methane_mcf"] = processed_curve_df["methane_mcf"]*net_revenue_interest*working_interest 
    # processed_curve_df["net_helium_mcf"] = processed_curve_df["helium_mcf"]*net_revenue_interest*working_interest
    # processed_curve_df["net_ethane_gal"] = processed_curve_df["ethane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_propane_gal"] = processed_curve_df["propane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_i_butane_gal"] = processed_curve_df["i_butane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_n_butane_gal"] = processed_curve_df["n_butane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_i_pentane_gal"] = processed_curve_df["i_pentane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_n_pentane_gal"] = processed_curve_df["n_pentane_gal"]*net_revenue_interest*working_interest
    # processed_curve_df["net_hexane_plus_gal"] = processed_curve_df["net_hexane_plus_gal"]*net_revenue_interest*working_interest

    # print(processed_curve_df)


with app.app_context():
    net_production(1)


























