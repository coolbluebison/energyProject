import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import * as math from 'mathjs' 


import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import { Box, ThemeProvider } from '@mui/system';


import Paper from '@mui/material/Paper';


function DailyProductionGraph({param_data, Item}) {
    
    let model =  param_data["model"]
    
    
    // Daily Oil Production Curve Params
  
    let oil_prod =  model["oil_bbl"]

    let oil_prod_list = []

    for (let element in oil_prod) {
      oil_prod_list.push(oil_prod[element])
    }

    const dailyOil  = math.multiply(oil_prod_list, 1/30)

    let disp_dates = model["disp_date"]
    let x_values = []
  
    for (let x in disp_dates){
      x_values.push(disp_dates[x])
    }
  

    // Array.from({ length: 60}, (_, i) => i + 1)

    // Daily Oil Production Curve
    const oil_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Oil Production (Bopd)',
        data: dailyOil,
        borderColor: 'darkgreen',
        fill: false
      }]
    };

    const oil_options = {
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
            text: 'Production Rate',
          },
        },
      },
    };  
      


    // Daily methane production params
    let methane_prod =  model["methane_mcf"]
    let methane_prod_list = []

    for (let element in methane_prod) {
      methane_prod_list.push(methane_prod[element])
    }

    const dailyMethane  = math.multiply(methane_prod_list, 1/30)

    // Daily Methane Production Curve
    const methane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Methane Production (Mcfpd)',
        data: dailyMethane,
        borderColor: 'darkred',
        fill: false
      }]
    };

    const methane_options = {
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
            text: 'Production Rate',
          },
        },
      },
    };
    
    
    // Daily NGLs production params
    let helium_prod =  model["helium_mcf"]
    let helium_prod_list = []

    for (let element in helium_prod) {
      helium_prod_list.push(helium_prod[element])
    }

    const dailyHelium  = math.multiply(helium_prod_list, 1/30)

    const helium_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Helium Production (Mcfpd)',
        data: dailyHelium,
        borderColor: 'orange',
        fill: false
      }]
    };

    const helium_options = {
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
            text: 'Production Rate',
          },
        },
      },
    };


    // Daily NGL Params Calculations
    let ethane_prod =  model["ethane_gal"]
    let propane_prod = model["propane_gal"]
    let i_butane_prod = model["i_butane_gal"]
    let n_butane_prod = model["n_butane_gal"]
    let i_pentane_prod = model["i_pentane_gal"]
    let n_pentane_prod = model["n_pentane_gal"]
    let hexane_plus_prod = model["hexane_plus_gal"]

    let ethane_prod_list = []
    let propane_prod_list = []
    let i_butane_prod_list = []
    let n_butane_prod_list = []
    let i_pentane_prod_list = []
    let n_pentane_prod_list = []
    let hexane_plus_prod_list = []

    for (let element in ethane_prod) {
      ethane_prod_list.push(ethane_prod[element])
    }
    for (let element in propane_prod) {
      propane_prod_list.push(propane_prod[element])
    }
    for (let element in i_butane_prod) {
      i_butane_prod_list.push(i_butane_prod[element])
    }
    for (let element in n_butane_prod) {
      n_butane_prod_list.push(n_butane_prod[element])
    }
    for (let element in i_pentane_prod) {
      i_pentane_prod_list.push(i_pentane_prod[element])
    }
    for (let element in n_pentane_prod) {
      n_pentane_prod_list.push(n_pentane_prod[element])
    }
    for (let element in hexane_plus_prod) {
      hexane_plus_prod_list.push(hexane_plus_prod[element])
    }

    const dailyEthane  = math.multiply(ethane_prod_list, 1/30)
    const dailyPropane  = math.multiply(propane_prod_list, 1/30)
    const dailyIButane  = math.multiply(i_butane_prod_list, 1/30)
    const dailyNButane  = math.multiply(n_butane_prod_list, 1/30)
    const dailyIPentane  = math.multiply(i_pentane_prod_list, 1/30)
    const dailyNPentane  = math.multiply(n_pentane_prod_list, 1/30)
    const dailyHexanePlus  = math.multiply(hexane_plus_prod_list, 1/30)

    const ethane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Ethane Production (gallons/day)',
        data: dailyEthane,
        borderColor: 'pink',
        fill: false
      }]
    };

    const propane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Propane Production (gallons/day)',
        data: dailyPropane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const i_butane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'I-Butane Production (gallons/day)',
        data: dailyIButane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const n_butane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'N-Butane Production (gallons/day)',
        data: dailyNButane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const i_pentane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'I-Pentane Production (gallons/day)',
        data: dailyIPentane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const n_pentane_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'N-Pentane Production (gallons/day)',
        data: dailyNPentane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const hexane_plus_data = {
      labels: x_values, // For months
      datasets:[{
        label: 'Hexane+ Production (gallons/day)',
        data: dailyHexanePlus,
        borderColor: 'grey',
        fill: false
      }]
    };

    const ngl_options = {
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
            text: 'Production Rate',
          },
        },
      },
    };

 
    return (
      <div>

        <Paper borderColor='black' elevation={1} >              
          <h2 align="center">Daily Production Curves</h2>
        </Paper>

        <br></br>
        <div>
          
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs container spacing={0.5}>            
              <Item sx={{ flexGrow: 1 }} elevation={3}>              
                <Line data={oil_data} options={oil_options} />
              </Item>
            </Grid>
          
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}> 
                <Line data={methane_data} options={methane_options} />
              </Item>            
            </Grid>
          </Grid>
          
          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                  <Line data={helium_data} options={helium_options} />
              </Item>    
            </Grid>

            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={ethane_data} options={ngl_options} />
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={propane_data} options={ngl_options} />
              </Item>    
            </Grid>
            
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={i_butane_data} options={ngl_options} />
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={n_butane_data} options={ngl_options} />
              </Item>    
            </Grid>
            
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={i_pentane_data} options={ngl_options} />
              </Item>
            </Grid>
          </Grid>

          <Grid container spacing={3} sx={{ flexGrow: 1 }}>
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={n_pentane_data} options={ngl_options} />
              </Item>    
            </Grid>
            
            <Grid xs container spacing={0.5}>
              <Item sx={{ flexGrow: 1 }} elevation={3}>
                <Line data={hexane_plus_data} options={ngl_options} />
              </Item>
            </Grid>
          </Grid>

        </div>
      </div>
    );
}


export default DailyProductionGraph;

/// ---------------------
