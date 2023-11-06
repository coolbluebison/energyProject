#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import json

# Local imports
from app import app
from models import db, Well, Assumptions, GasConcentration, ProductionCurve, Project, User, Pricing


def seed_user():
    # Creating sample data for User
    user1 = User(
        username="johnsmith",
        email = "john@mail.com",
        _password_hash = "hashed_password"
    )

    user2 = User(
        username = "jennyhello",
        email = "jenny@mail.com",
        _password_hash = "hashed_password_again"
    )

    # Add users to session
    db.session.add(user1)
    db.session.add(user2)

def seed_well():
    # Creating sample data for Well
    well1 = Well( name="JuansWell", coordinates= "11.11, 22.22", production_curve_id=1, gas_concentration_id=1, assumption_id=1, project_id=1, user_id=1)
    well2 = Well( name="LegendaryWell", coordinates= "12.22, 32.32", production_curve_id=2, gas_concentration_id=2, assumption_id=2, project_id=2, user_id=2)

    db.session.add(well1)
    db.session.add(well2)


def seed_assumptions():
    # Creating sample data for Assumptions 
    assumptions1 = Assumptions(
        net_revenue_interest = 0.85,
        working_interest = 1,
        list_of_oil_deducts = json.dumps({"nymex_oil_pricing_deduct":10.0, "oil_transportation_cost":5.0, "oil_processing_cost":5.0}),
        list_of_gas_deducts = json.dumps({"hhub_gas_pricing_deduct":1.0, "gas_transportation_cost":0.5, "gas_procesing_cost":0.5}),
        severance_tax = 0.04,
        ad_valorem_tax = 0.03,
        total_monthly_opex = 5000,
        drilling_costs = 500000,
        completion_costs = 500000,
        pipeline_costs = 500000,
        contingency_costs = 500000,
        prod_start_month = "January",
        prod_start_year = "2024"

    )

     # Creating sample data for Assumptions 
    assumptions2 = Assumptions(
        net_revenue_interest = 0.70,
        working_interest = 1,
        list_of_oil_deducts = json.dumps({"nymex_oil_pricing_deduct":10.0, "oil_transportation_cost":5.0, "oil_processing_cost":5.0}),
        list_of_gas_deducts = json.dumps({"hhub_gas_pricing_deduct":1.0, "gas_transportation_cost":0.5, "gas_procesing_cost":0.5}),
        severance_tax = 0.04,
        ad_valorem_tax = 0.03,
        total_monthly_opex = 7000,
        drilling_costs = 500000,
        completion_costs = 500000,
        pipeline_costs = 500000,
        contingency_costs = 500000,
        prod_start_month = "January",
        prod_start_year = "2024"    
        
    )

    db.session.add(assumptions1)
    db.session.add(assumptions2)


def seed_gas_concentrations():
    # Creating sample data for the gas concentrations table
    gas_sample_1 = GasConcentration(
        methane=0.50,
        ethane=0.10,
        propane=0.10,
        i_butane=0.05,
        n_butane=0.05,
        i_pentane=0.05,
        n_pentane=0.05,
        hexane_plus=0.05,
        helium=0.02,
        other=0.03
    )

    gas_sample_2 = GasConcentration(
        methane=0.40,
        ethane=0.20,
        propane=0.00,
        i_butane=0.05,
        n_butane=0.05,
        i_pentane=0.05,
        n_pentane=0.05,
        hexane_plus=0.05,
        helium=0.12,
        other=0.03
    )

    db.session.add(gas_sample_1)
    db.session.add(gas_sample_2)


def seed_curves():
    # Trying to create two sample production curves
    curve1 = ProductionCurve(type_curve=json.dumps([
            {"Month": 0, "Oil_Production (Bbl)": "22,800", "Total_Gas_Production (Mcf)": "44,460"},
            {"Month": 1, "Oil_Production (Bbl)": "20,668", "Total_Gas_Production (Mcf)": "40,484"},
            {"Month": 2, "Oil_Production (Bbl)": "17,244", "Total_Gas_Production (Mcf)": "34,082"},
            {"Month": 3, "Oil_Production (Bbl)": "14,723", "Total_Gas_Production (Mcf)": "29,360"},
            {"Month": 4, "Oil_Production (Bbl)": "12,796", "Total_Gas_Production (Mcf)": "25,748"},
            {"Month": 5, "Oil_Production (Bbl)": "11,280", "Total_Gas_Production (Mcf)": "22,902"},
            {"Month": 6, "Oil_Production (Bbl)": "10,059", "Total_Gas_Production (Mcf)": "20,608"},
            {"Month": 7, "Oil_Production (Bbl)": "9,058", "Total_Gas_Production (Mcf)": "18,724"},
            {"Month": 8, "Oil_Production (Bbl)": "8,223", "Total_Gas_Production (Mcf)": "17,150"},
            {"Month": 9, "Oil_Production (Bbl)": "7,516", "Total_Gas_Production (Mcf)": "15,819"},
            {"Month": 10, "Oil_Production (Bbl)": "6,912", "Total_Gas_Production (Mcf)": "14,679"},
            {"Month": 11, "Oil_Production (Bbl)": "6,391", "Total_Gas_Production (Mcf)": "13,693"},
            {"Month": 12, "Oil_Production (Bbl)": "5,936", "Total_Gas_Production (Mcf)": "12,833"},
            {"Month": 13, "Oil_Production (Bbl)": "5,536", "Total_Gas_Production (Mcf)": "12,076"},
            {"Month": 14, "Oil_Production (Bbl)": "5,182", "Total_Gas_Production (Mcf)": "11,406"},
            {"Month": 15, "Oil_Production (Bbl)": "4,867", "Total_Gas_Production (Mcf)": "10,810"},
            {"Month": 16, "Oil_Production (Bbl)": "4,585", "Total_Gas_Production (Mcf)": "10,275"},
            {"Month": 17, "Oil_Production (Bbl)": "4,331", "Total_Gas_Production (Mcf)": "9,793"},
            {"Month": 18, "Oil_Production (Bbl)": "4,101", "Total_Gas_Production (Mcf)": "9,357"},
            {"Month": 19, "Oil_Production (Bbl)": "3,892", "Total_Gas_Production (Mcf)": "8,961"},
            {"Month": 20, "Oil_Production (Bbl)": "3,702", "Total_Gas_Production (Mcf)": "8,599"},
            {"Month": 21, "Oil_Production (Bbl)": "3,528", "Total_Gas_Production (Mcf)": "8,268"},
            {"Month": 22, "Oil_Production (Bbl)": "3,368", "Total_Gas_Production (Mcf)": "7,965"},
            {"Month": 23, "Oil_Production (Bbl)": "3,220", "Total_Gas_Production (Mcf)": "7,685"},
            {"Month": 24, "Oil_Production (Bbl)": "3,084", "Total_Gas_Production (Mcf)": "7,426"},
            {"Month": 25, "Oil_Production (Bbl)": "2,958", "Total_Gas_Production (Mcf)": "7,187"},
            {"Month": 26, "Oil_Production (Bbl)": "2,841", "Total_Gas_Production (Mcf)": "6,964"},
            {"Month": 27, "Oil_Production (Bbl)": "2,732", "Total_Gas_Production (Mcf)": "6,757"},
            {"Month": 28, "Oil_Production (Bbl)": "2,630", "Total_Gas_Production (Mcf)": "6,564"},
            {"Month": 29, "Oil_Production (Bbl)": "2,535", "Total_Gas_Production (Mcf)": "6,384"},
            {"Month": 30, "Oil_Production (Bbl)": "2,446", "Total_Gas_Production (Mcf)": "6,215"},
            {"Month": 31, "Oil_Production (Bbl)": "2,362", "Total_Gas_Production (Mcf)": "6,057"},
            {"Month": 32, "Oil_Production (Bbl)": "2,284", "Total_Gas_Production (Mcf)": "5,908"},
            {"Month": 33, "Oil_Production (Bbl)": "2,210", "Total_Gas_Production (Mcf)": "5,768"},
            {"Month": 34, "Oil_Production (Bbl)": "2,140", "Total_Gas_Production (Mcf)": "5,636"},
            {"Month": 35, "Oil_Production (Bbl)": "2,074", "Total_Gas_Production (Mcf)": "5,512"},
            {"Month": 36, "Oil_Production (Bbl)": "2,011", "Total_Gas_Production (Mcf)": "5,394"},
            {"Month": 37, "Oil_Production (Bbl)": "1,952", "Total_Gas_Production (Mcf)": "5,283"},
            {"Month": 38, "Oil_Production (Bbl)": "1,896", "Total_Gas_Production (Mcf)": "5,177"},
            {"Month": 39, "Oil_Production (Bbl)": "1,843", "Total_Gas_Production (Mcf)": "5,078"},
            {"Month": 40, "Oil_Production (Bbl)": "1,793", "Total_Gas_Production (Mcf)": "4,983"},
            {"Month": 41, "Oil_Production (Bbl)": "1,744", "Total_Gas_Production (Mcf)": "4,893"},
            {"Month": 42, "Oil_Production (Bbl)": "1,699", "Total_Gas_Production (Mcf)": "4,807"},
            {"Month": 43, "Oil_Production (Bbl)": "1,655", "Total_Gas_Production (Mcf)": "4,726"},
            {"Month": 44, "Oil_Production (Bbl)": "1,613", "Total_Gas_Production (Mcf)": "4,648"},
            {"Month": 45, "Oil_Production (Bbl)": "1,573", "Total_Gas_Production (Mcf)": "4,574"},
            {"Month": 46, "Oil_Production (Bbl)": "1,535", "Total_Gas_Production (Mcf)": "4,503"},
            {"Month": 47, "Oil_Production (Bbl)": "1,499", "Total_Gas_Production (Mcf)": "4,436"},
            {"Month": 48, "Oil_Production (Bbl)": "1,464", "Total_Gas_Production (Mcf)": "4,371"},
            {"Month": 49, "Oil_Production (Bbl)": "1,430", "Total_Gas_Production (Mcf)": "4,295"},
            {"Month": 50, "Oil_Production (Bbl)": "1,398", "Total_Gas_Production (Mcf)": "4,206"},
            {"Month": 51, "Oil_Production (Bbl)": "1,367", "Total_Gas_Production (Mcf)": "4,122"},
            {"Month": 52, "Oil_Production (Bbl)": "1,337", "Total_Gas_Production (Mcf)": "4,040"},
            {"Month": 53, "Oil_Production (Bbl)": "1,309", "Total_Gas_Production (Mcf)": "3,962"},
            {"Month": 54, "Oil_Production (Bbl)": "1,281", "Total_Gas_Production (Mcf)": "3,887"},
            {"Month": 55, "Oil_Production (Bbl)": "1,255", "Total_Gas_Production (Mcf)": "3,814"},
            {"Month": 56, "Oil_Production (Bbl)": "1,229", "Total_Gas_Production (Mcf)": "3,744"},
            {"Month": 57, "Oil_Production (Bbl)": "1,205", "Total_Gas_Production (Mcf)": "3,677"},
            {"Month": 58, "Oil_Production (Bbl)": "1,181", "Total_Gas_Production (Mcf)": "3,612"},
            {"Month": 59, "Oil_Production (Bbl)": "1,158", "Total_Gas_Production (Mcf)": "3,549"},
            {"Month": 60, "Oil_Production (Bbl)": "1,136", "Total_Gas_Production (Mcf)": "3,488"}
    ]))


    curve2 = ProductionCurve(type_curve=json.dumps([
            {"Month": 0, "Oil_Production (Bbl)": "22,800", "Total_Gas_Production (Mcf)": "44,460"},
            {"Month": 1, "Oil_Production (Bbl)": "20,668", "Total_Gas_Production (Mcf)": "40,484"},
            {"Month": 2, "Oil_Production (Bbl)": "17,244", "Total_Gas_Production (Mcf)": "34,082"},
            {"Month": 3, "Oil_Production (Bbl)": "14,723", "Total_Gas_Production (Mcf)": "29,360"},
            {"Month": 4, "Oil_Production (Bbl)": "12,796", "Total_Gas_Production (Mcf)": "25,748"},
            {"Month": 5, "Oil_Production (Bbl)": "11,280", "Total_Gas_Production (Mcf)": "22,902"},
            {"Month": 6, "Oil_Production (Bbl)": "10,059", "Total_Gas_Production (Mcf)": "20,608"},
            {"Month": 7, "Oil_Production (Bbl)": "9,058", "Total_Gas_Production (Mcf)": "18,724"},
            {"Month": 8, "Oil_Production (Bbl)": "8,223", "Total_Gas_Production (Mcf)": "17,150"},
            {"Month": 9, "Oil_Production (Bbl)": "7,516", "Total_Gas_Production (Mcf)": "15,819"},
            {"Month": 10, "Oil_Production (Bbl)": "6,912", "Total_Gas_Production (Mcf)": "14,679"},
            {"Month": 11, "Oil_Production (Bbl)": "6,391", "Total_Gas_Production (Mcf)": "13,693"},
            {"Month": 12, "Oil_Production (Bbl)": "5,936", "Total_Gas_Production (Mcf)": "12,833"},
            {"Month": 13, "Oil_Production (Bbl)": "5,536", "Total_Gas_Production (Mcf)": "12,076"},
            {"Month": 14, "Oil_Production (Bbl)": "5,182", "Total_Gas_Production (Mcf)": "11,406"},
            {"Month": 15, "Oil_Production (Bbl)": "4,867", "Total_Gas_Production (Mcf)": "10,810"},
            {"Month": 16, "Oil_Production (Bbl)": "4,585", "Total_Gas_Production (Mcf)": "10,275"},
            {"Month": 17, "Oil_Production (Bbl)": "4,331", "Total_Gas_Production (Mcf)": "9,793"},
            {"Month": 18, "Oil_Production (Bbl)": "4,101", "Total_Gas_Production (Mcf)": "9,357"},
            {"Month": 19, "Oil_Production (Bbl)": "3,892", "Total_Gas_Production (Mcf)": "8,961"},
            {"Month": 20, "Oil_Production (Bbl)": "3,702", "Total_Gas_Production (Mcf)": "8,599"},
            {"Month": 21, "Oil_Production (Bbl)": "3,528", "Total_Gas_Production (Mcf)": "8,268"},
            {"Month": 22, "Oil_Production (Bbl)": "3,368", "Total_Gas_Production (Mcf)": "7,965"},
            {"Month": 23, "Oil_Production (Bbl)": "3,220", "Total_Gas_Production (Mcf)": "7,685"},
            {"Month": 24, "Oil_Production (Bbl)": "3,084", "Total_Gas_Production (Mcf)": "7,426"},
            {"Month": 25, "Oil_Production (Bbl)": "2,958", "Total_Gas_Production (Mcf)": "7,187"},
            {"Month": 26, "Oil_Production (Bbl)": "2,841", "Total_Gas_Production (Mcf)": "6,964"},
            {"Month": 27, "Oil_Production (Bbl)": "2,732", "Total_Gas_Production (Mcf)": "6,757"},
            {"Month": 28, "Oil_Production (Bbl)": "2,630", "Total_Gas_Production (Mcf)": "6,564"},
            {"Month": 29, "Oil_Production (Bbl)": "2,535", "Total_Gas_Production (Mcf)": "6,384"},
            {"Month": 30, "Oil_Production (Bbl)": "2,446", "Total_Gas_Production (Mcf)": "6,215"},
            {"Month": 31, "Oil_Production (Bbl)": "2,362", "Total_Gas_Production (Mcf)": "6,057"},
            {"Month": 32, "Oil_Production (Bbl)": "2,284", "Total_Gas_Production (Mcf)": "5,908"},
            {"Month": 33, "Oil_Production (Bbl)": "2,210", "Total_Gas_Production (Mcf)": "5,768"},
            {"Month": 34, "Oil_Production (Bbl)": "2,140", "Total_Gas_Production (Mcf)": "5,636"},
            {"Month": 35, "Oil_Production (Bbl)": "2,074", "Total_Gas_Production (Mcf)": "5,512"},
            {"Month": 36, "Oil_Production (Bbl)": "2,011", "Total_Gas_Production (Mcf)": "5,394"},
            {"Month": 37, "Oil_Production (Bbl)": "1,952", "Total_Gas_Production (Mcf)": "5,283"},
            {"Month": 38, "Oil_Production (Bbl)": "1,896", "Total_Gas_Production (Mcf)": "5,177"},
            {"Month": 39, "Oil_Production (Bbl)": "1,843", "Total_Gas_Production (Mcf)": "5,078"},
            {"Month": 40, "Oil_Production (Bbl)": "1,793", "Total_Gas_Production (Mcf)": "4,983"},
            {"Month": 41, "Oil_Production (Bbl)": "1,744", "Total_Gas_Production (Mcf)": "4,893"},
            {"Month": 42, "Oil_Production (Bbl)": "1,699", "Total_Gas_Production (Mcf)": "4,807"},
            {"Month": 43, "Oil_Production (Bbl)": "1,655", "Total_Gas_Production (Mcf)": "4,726"},
            {"Month": 44, "Oil_Production (Bbl)": "1,613", "Total_Gas_Production (Mcf)": "4,648"},
            {"Month": 45, "Oil_Production (Bbl)": "1,573", "Total_Gas_Production (Mcf)": "4,574"},
            {"Month": 46, "Oil_Production (Bbl)": "1,535", "Total_Gas_Production (Mcf)": "4,503"},
            {"Month": 47, "Oil_Production (Bbl)": "1,499", "Total_Gas_Production (Mcf)": "4,436"},
            {"Month": 48, "Oil_Production (Bbl)": "1,464", "Total_Gas_Production (Mcf)": "4,371"},
            {"Month": 49, "Oil_Production (Bbl)": "1,430", "Total_Gas_Production (Mcf)": "4,295"},
            {"Month": 50, "Oil_Production (Bbl)": "1,398", "Total_Gas_Production (Mcf)": "4,206"},
            {"Month": 51, "Oil_Production (Bbl)": "1,367", "Total_Gas_Production (Mcf)": "4,122"},
            {"Month": 52, "Oil_Production (Bbl)": "1,337", "Total_Gas_Production (Mcf)": "4,040"},
            {"Month": 53, "Oil_Production (Bbl)": "1,309", "Total_Gas_Production (Mcf)": "3,962"},
            {"Month": 54, "Oil_Production (Bbl)": "1,281", "Total_Gas_Production (Mcf)": "3,887"},
            {"Month": 55, "Oil_Production (Bbl)": "1,255", "Total_Gas_Production (Mcf)": "3,814"},
            {"Month": 56, "Oil_Production (Bbl)": "1,229", "Total_Gas_Production (Mcf)": "3,744"},
            {"Month": 57, "Oil_Production (Bbl)": "1,205", "Total_Gas_Production (Mcf)": "3,677"},
            {"Month": 58, "Oil_Production (Bbl)": "1,181", "Total_Gas_Production (Mcf)": "3,612"},
            {"Month": 59, "Oil_Production (Bbl)": "1,158", "Total_Gas_Production (Mcf)": "3,549"},
            {"Month": 60, "Oil_Production (Bbl)": "1,136", "Total_Gas_Production (Mcf)": "3,488"}
    ]))

    db.session.add(curve1)
    db.session.add(curve2)


def seed_project():
    # Creating some sample projects
    project1 = Project(name="ProjectAAA")
    project2 = Project(name="ProjectBBB")

    db.session.add(project1)
    db.session.add(project2)

def seed_pricing():
    # Creating a pricing instance
    pricing1 = Pricing ( oil_price = 30.0,
                       methane_price = 4.0,
                       helium_price = 50.0,
                       ethane_price = 1.0,
                       propane_price = 1.0,
                       i_butane_price = 1.0,
                       n_butane_price = 1.0,
                       i_pentane_price = 1.0,
                       n_pentane_price = 1.0,
                       hexane_plus_price = 1.0 )
    
    db.session.add(pricing1)


if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        seed_user()
        seed_well()
        seed_assumptions()
        seed_gas_concentrations()
        seed_curves()
        seed_project()
        seed_pricing()

        db.session.commit()



