import React from "react";
import { Bar } from 'react-chartjs-2'
import * as math from 'mathjs' 


function DailyRevenueGraph({param_data}) {

    let model = param_data["model"]

    // Getting oil revenue data
    let net_oil_revenue = model["net_revenue_oil"]
    let net_oil_revenue_list = []
    
    for (let element in net_oil_revenue) {
        net_oil_revenue_list.push(net_oil_revenue[element])
    }

    // Getting gas revenue data
    let net_gas_revenue = model["net_revenue_methane"]
    let net_gas_revenue_list = []

    for (let element in net_gas_revenue) {
        net_gas_revenue_list.push(net_gas_revenue[element])
    }

    // Getting gas revenue data
    let net_helium_revenue = model["net_revenue_helium"]
    let net_helium_revenue_list = []

    for (let element in net_helium_revenue) {
        net_helium_revenue_list.push(net_helium_revenue[element])
    }

    // Getting ethane ngl revenue data
    let net_ethane_revenue = model["net_revenue_ethane"]
    let net_ethane_revenue_list = []

    for (let element in net_ethane_revenue) {
        net_ethane_revenue_list.push(net_ethane_revenue[element])
    }

    // Getting propane ngl revenue data
    let net_propane_revenue = model["net_revenue_propane"]
    let net_propane_revenue_list = []

    for (let element in net_propane_revenue) {
        net_propane_revenue_list.push(net_propane_revenue[element])
    }

    // Getting i-butane ngl revenue data
    let net_i_butane_revenue = model["net_revenue_i_butane"]
    let net_i_butane_revenue_list = []

    for (let element in net_i_butane_revenue) {
        net_i_butane_revenue_list.push(net_i_butane_revenue[element])
    }

    // Getting n-butane ngl revenue data
    let net_n_butane_revenue = model["net_revenue_n_butane"]
    let net_n_butane_revenue_list = []

    for (let element in net_n_butane_revenue) {
        net_n_butane_revenue_list.push(net_n_butane_revenue[element])
    }

    // Getting i-pentane ngl revenue data
    let net_i_pentane_revenue = model["net_revenue_i_pentane"]
    let net_i_pentane_revenue_list = []

    for (let element in net_i_pentane_revenue) {
        net_i_pentane_revenue_list.push(net_i_pentane_revenue[element])
    }

    // Getting n-pentane ngl revenue data
    let net_n_pentane_revenue = model["net_revenue_n_pentane"]
    let net_n_pentane_revenue_list = []

    for (let element in net_n_pentane_revenue) {
        net_n_pentane_revenue_list.push(net_n_pentane_revenue[element])
    }

    // Getting hexane_plus ngl revenue data
    let net_hexane_plus_revenue = model["net_revenue_hexane_plus"]
    let net_hexane_plus_revenue_list = []

    for (let element in net_hexane_plus_revenue) {
        net_hexane_plus_revenue_list.push(net_hexane_plus_revenue[element])
    }



    // Setting the oil revenue data for charts
    const oil_revenue_data = {
        labels: Array.from({length : 60}, (_, i) => i + 1),
        datasets: [{
            label: "Oil Revenues ($)",
            data:  net_oil_revenue_list,
            backgroundColor: 'darkgreen',
            borderColor: 'darkgreen',
            borderWidth: 0.5,
            fill: true
        }]
    }

    // Setting the methane revenue data for charts
    const methane_revenue_data = {
        labels: Array.from({length : 60}, (_, i) => i + 1),
        datasets: [{
            label: "Methane Revenues ($)",
            data:  net_gas_revenue_list,
            backgroundColor: 'darkred',
            borderColor: 'darkred',
            borderWidth: 0.5,
            fill: true
        }]
    }

    // Setting the methane revenue data for charts
    const helium_revenue_data = {
        labels: Array.from({length : 60}, (_, i) => i + 1),
        datasets: [{
            label: "Helium Revenues ($)",
            data:  net_gas_revenue_list,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
            borderWidth: 0.5,
            fill: true
        }]
    }

    // Setting the ethane revenue data for charts
    const ethane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "Ethane Revenues ($)",
        data: net_ethane_revenue_list,
        backgroundColor: 'darkblue', // Set the color as needed
        borderColor: 'darkblue', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the propane revenue data for charts
    const propane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "Propane Revenues ($)",
        data: net_propane_revenue_list,
        backgroundColor: 'darkorange', // Set the color as needed
        borderColor: 'darkorange', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the i-butane revenue data for charts
    const i_butane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "i-Butane Revenues ($)",
        data: net_i_butane_revenue_list,
        backgroundColor: 'purple', // Set the color as needed
        borderColor: 'purple', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the n-butane revenue data for charts
    const n_butane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "n-Butane Revenues ($)",
        data: net_n_butane_revenue_list,
        backgroundColor: 'darkcyan', // Set the color as needed
        borderColor: 'darkcyan', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the i-pentane revenue data for charts
    const i_pentane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "i-Pentane Revenues ($)",
        data: net_i_pentane_revenue_list,
        backgroundColor: 'darkviolet', // Set the color as needed
        borderColor: 'darkviolet', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the n-pentane revenue data for charts
    const n_pentane_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "n-Pentane Revenues ($)",
        data: net_n_pentane_revenue_list,
        backgroundColor: 'gold', // Set the color as needed
        borderColor: 'gold', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };
    
    // Setting the hexane_plus revenue data for charts
    const hexane_plus_revenue_data = {
        labels: Array.from({ length: 60 }, (_, i) => i + 1),
        datasets: [{
        label: "Hexane Plus Revenues ($)",
        data: net_hexane_plus_revenue_list,
        backgroundColor: 'darkgray', // Set the color as needed
        borderColor: 'darkgray', // Set the border color as needed
        borderWidth: 0.5,
        fill: true,
        }]
    };


    const revenue_options = {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Monthly Revenues ($)',
            },
          },
        },
      };


    return (

        <>
            <h2>Monthly Revenues</h2>
            <Bar data={oil_revenue_data} options={revenue_options} />
            <></>
            <Bar data={methane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={helium_revenue_data} options={revenue_options} />
            <></>
            <Bar data={ethane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={propane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={i_butane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={n_butane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={i_pentane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={n_butane_revenue_data} options={revenue_options} />
            <></>
            <Bar data={hexane_plus_revenue_data} options={revenue_options} />


        </>
    
    )
}

export default DailyRevenueGraph