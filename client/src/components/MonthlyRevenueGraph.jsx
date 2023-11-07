import React from "react";
import { Bar } from 'react-chartjs-2'
import * as math from 'mathjs' 


import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Box, ThemeProvider } from '@mui/system';
import Paper from '@mui/material/Paper';




function DailyRevenueGraph({param_data, Item}) {

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

    let disp_dates = model["disp_date"]
    let x_values = []
  
    for (let x in disp_dates){
      x_values.push(disp_dates[x])
    }

    // Array.from({length : 60}, (_, i) => i + 1)

    // Setting the oil revenue data for charts
    const oil_revenue_data = {
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
        datasets: [{
            label: "Helium Revenues ($)",
            data:  net_helium_revenue_list,
            backgroundColor: 'lightblue',
            borderColor: 'lightblue',
            borderWidth: 0.5,
            fill: true
        }]
    }

    // Setting the ethane revenue data for charts
    const ethane_revenue_data = {
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
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
        labels: x_values,
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
            
            <Paper background-color="black"  elevation={1} >              
                <h2 align="center">Monthly Revenues by Products</h2>
            </Paper>

            <br></br>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>              
                        <Bar data={oil_revenue_data} options={revenue_options} />
                    </Item>    
                </Grid>
                
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={methane_revenue_data} options={revenue_options} />
                    </Item>
                </Grid>
            </Grid>


            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={helium_revenue_data} options={revenue_options} />
                    </Item>    
                </Grid>
                
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>   
                        <Bar data={ethane_revenue_data} options={revenue_options} />
                    </Item>
                </Grid>
            </Grid>

            
            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={propane_revenue_data} options={revenue_options} />
                    </Item>    
                </Grid>
                
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={i_butane_revenue_data} options={revenue_options} />
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={n_butane_revenue_data} options={revenue_options} />
                    </Item>    
                </Grid>
                
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={i_pentane_revenue_data} options={revenue_options} />
                    </Item>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ flexGrow: 1 }}>
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={n_pentane_revenue_data} options={revenue_options} />
                    </Item>    
                </Grid>
                
                <Grid xs container spacing={0.5}>
                    <Item sx={{ flexGrow: 1 }} elevation={3}>
                        <Bar data={hexane_plus_revenue_data} options={revenue_options} />
                    </Item>
                </Grid>
            </Grid>
        </>
    
    )
}

export default DailyRevenueGraph