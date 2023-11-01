import React, { useEffect } from 'react'
import Chart from 'chart.js/auto'
import { Line } from 'react-chartjs-2'
import * as math from 'mathjs' 


function DailyProductionGraph({param_data}) {
    
    let model =  param_data["model"]
    
    
    // Daily Oil Production Curve Params
  
    let oil_prod =  model["oil_bbl"]

    let oil_prod_list = []

    for (let element in oil_prod) {
      oil_prod_list.push(oil_prod[element])
    }

    const dailyOil  = math.multiply(oil_prod_list, 1/30)



    // Daily Oil Production Curve
    const oil_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
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
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
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
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
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
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'Ethane Production (gallons/day)',
        data: dailyEthane,
        borderColor: 'pink',
        fill: false
      }]
    };

    const propane_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'Propane Production (gallons/day)',
        data: dailyPropane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const i_butane_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'I-Butane Production (gallons/day)',
        data: dailyIButane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const n_butane_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'N-Butane Production (gallons/day)',
        data: dailyNButane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const i_pentane_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'I-Pentane Production (gallons/day)',
        data: dailyIPentane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const n_pentane_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
      datasets:[{
        label: 'N-Pentane Production (gallons/day)',
        data: dailyNPentane,
        borderColor: 'grey',
        fill: false
      }]
    };

    const hexane_plus_data = {
      labels: Array.from({ length: 60}, (_, i) => i + 1), // For months
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
        <h2>Daily Production Curves</h2>
        <div>
          <Line data={oil_data} options={oil_options} />
          <br></br>
          <Line data={methane_data} options={methane_options} />
          <br></br>
          <Line data={helium_data} options={helium_options} />
          <br></br>
          <Line data={ethane_data} options={ngl_options} />
          <br></br>
          <Line data={propane_data} options={ngl_options} />
          <br></br>
          <Line data={i_butane_data} options={ngl_options} />
          <br></br>
          <Line data={n_butane_data} options={ngl_options} />
          <br></br>
          <Line data={i_pentane_data} options={ngl_options} />
          <br></br>
          <Line data={n_pentane_data} options={ngl_options} />
          <br></br>
          <Line data={hexane_plus_data} options={ngl_options} />

        </div>
      </div>
    );
}


export default DailyProductionGraph;

/// ---------------------
