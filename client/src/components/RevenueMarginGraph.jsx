import React from "react";
import { Bar, Line } from "react-chartjs-2";
import * as math from 'mathjs' 


// MUI X charts
import {  BarChart } from '@mui/x-charts';

import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';

import { Box, ThemeProvider } from '@mui/system';




function RevenueMarginGraph({ param_data, Item }) {
  let model = param_data["model"];

  // Extracting data for EBITDA
  let ebitda = model["ebitda"];
  let ebitdaList = Object.values(ebitda);

  // Extracting data for net revenue
  let totalNetRevenues = model["total_net_revenues"];
  let totalNetRevenuesList = Object.values(totalNetRevenues);

  // Calculating EBITDA margin
  let ebitdaMarginList = ebitdaList.map((ebitda, index) => {
    return (ebitda / totalNetRevenuesList[index]) * 100; // Calculate EBITDA margin as a percentage
  });

  let disp_dates = model["disp_date"]
  let x_values = []

  for (let x in disp_dates){
    x_values.push(disp_dates[x])
  }

  // Extracting data for capex
  let capex = model["capex"]
  let capexList = Object.values(capex)


  // Array.from({ length: 60 }, (_, i) => i + 1)

  const data = {
    labels: x_values,
    datasets: [
        {
            label: "EBITDA Margin (%)",
            data: ebitdaMarginList,
            yAxisID: "margin",
            type: "line",
            borderColor: "orange",
            borderWidth: 2,
            fill: false,
        },

        {
            label: "EBITDA ($)",
            data: ebitdaList,
            yAxisID: "revenue",
            backgroundColor: "darkgrey",
            borderColor: "darkgrey",
            borderWidth: 0.5,
            fill: true,
        },
      
        {
            label: "Total Revenue ($)",
            data: totalNetRevenuesList,
            yAxisID: "revenue",
            backgroundColor: "navy",
            borderColor: "navy",
            borderWidth: 0.5,
            fill: true,
        },
      
    ],
  };

  const options1 = {
    scales: {
      revenue: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Income Figures ($)",
          fontSize: 12,
        },
      },
      margin: {
        type: "linear",
        position: "right",
        min: 0,
        max: 100, // EBITDA margin is expressed as a percentage (0-100)
        title: {
          display: true,
          text: "EBITDA Margin (%)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Months",
        },
      },
    //   y:{
    //     stacked: true
    //   }  
    },
  };

  const options2 = {
    scales: {
      revenue: {
        type: "linear",
        position: "left",
        title: {
          display: true,
          text: "Income Figures ($)",
        },
      },
      // margin: {
      //   type: "linear",
      //   position: "right",
      //   min: 0,
      //   max: 100, // EBITDA margin is expressed as a percentage (0-100)
      //   title: {
      //     display: false,
      //     text: "EBITDA Margin (%)",
      //   },
      //   grid: {
      //     drawOnChartArea: false,
      //   },
      // },
      x: {
        stacked: true,
        title: {
          display: true,
          text: "Months",
        },
      },
    //   y:{
    //     stacked: true
    //   }  
    },
  };


  const data2 = {
    labels: x_values,
    datasets: [
        {
            label: "EBITDA ($)",
            data: ebitdaList,
            yAxisID: "revenue",
            backgroundColor: "navy",
            borderColor: "navy",
            borderWidth: 0.5,
            fill: true,
        },
      
        {
            label: "Capex ($)",
            data: capexList,
            yAxisID: "revenue",
            backgroundColor: "darkgrey",
            borderColor: "darkgrey",
            borderWidth: 0.5,
            fill: true,
        },
      
    ],
  };


  // Production Projections

  let total_oil_produced = math.round(math.sum(Object.values(model["oil_bbl"])));
  let total_methane_produced = math.round(math.sum(Object.values(model["methane_mcf"])));
  let total_helium_produced = math.round(math.sum(Object.values(model["helium_mcf"])));
  let total_ethane_produced = math.round(math.sum(Object.values(model["ethane_gal"])));
  let total_propane_produced = math.round(math.sum(Object.values(model["propane_gal"])));
  let total_i_butane_produced = math.round(math.sum(Object.values(model["i_butane_gal"])));
  let total_n_butane_produced = math.round(math.sum(Object.values(model["n_butane_gal"])));
  let total_i_pentane_produced = math.round(math.sum(Object.values(model["i_pentane_gal"])));
  let total_n_pentane_produced = math.round(math.sum(Object.values(model["n_pentane_gal"])));
  let total_hexane_plus_produced = math.round(math.sum(Object.values(model["hexane_plus_gal"])));
  

  const projectedTable = (
    <div>
      <h2>Projected Production Figures</h2>
      <table className="financial-table">
        <thead>
          <tr>
            <th>Production Component</th>
            <th>Total Production</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Oil (bbl)</td>
            <td>{total_oil_produced} bbl</td>
          </tr>
          <tr>
            <td>Methane (mcf)</td>
            <td>{total_methane_produced} mcf</td>
          </tr>
          <tr>
            <td>Helium (mcf)</td>
            <td>{total_helium_produced} mcf</td>
          </tr>
          <tr>
            <td>Ethane (gal)</td>
            <td>{total_ethane_produced} gal</td>
          </tr>
          <tr>
            <td>Propane (gal)</td>
            <td>{total_propane_produced} gal</td>
          </tr>
          <tr>
            <td>I-Butane (gal)</td>
            <td>{total_i_butane_produced} gal</td>
          </tr>
          <tr>
            <td>N-Butane (gal)</td>
            <td>{total_n_butane_produced} gal</td>
          </tr>
          <tr>
            <td>I-Pentane (gal)</td>
            <td>{total_i_pentane_produced} gal</td>
          </tr>
          <tr>
            <td>N-Pentane (gal)</td>
            <td>{total_n_pentane_produced} gal</td>
          </tr>
          <tr>
            <td>Hexane Plus (gal)</td>
            <td>{total_hexane_plus_produced} gal</td>
          </tr>
        </tbody>
      </table>
    </div>
    )

    const chartSetting = {
      yAxis: [
        {
          label: "EBITDA ($)" 
        }
      ],
      width: 500,
      height: 400,
    };



    const ItemSheet = styled(Sheet)(({ theme }) => ({
      backgroundColor:
        theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
      ...theme.typography['body-sm'],
      padding: theme.spacing(1),
      textAlign: 'center',
      borderRadius: 4,
      color: theme.vars.palette.text.secondary,
    }));


  return (
    <div>
      <h2>Revenue and EBITDA</h2>
      <div>

          <Grid xs container spacing={0.5}>

            <Item sx={{ flexGrow: 1 }} elevation={3}>              
              <Bar data={data} options={options1} />
            </Item>
            
          </Grid>

          <br></br>

          <Grid xs container spacing={0.5}>
            <Item sx={{ flexGrow: 1 }} elevation={3}>              
              <Bar data={data2} options={options2} />
            </Item>
          </Grid>
        
        <Grid container spacing={2} sx={{ flexGrow: 1 }}>

        </Grid>

        

        {projectedTable}
        
{/*         
        <BarChart
          series={ [ { data:ebitdaList, label: "Ebitda($)", color:"#000080", stack: 'total' }, {data:capexList, label: "Capex($)", color:"#A9A9A9", stack:'total' } ] }
          yAxis={[{ labelStyle: {
            fontSize: 40,
          }, }]}

          xAxis= {[{data: x_values, scaleType:'band',
            tickLabelStyle: {
              angle: -45,
              textAnchor: 'end',
              fontSize: 14,
            }
          }]}
          width={1600}
          height={800}
          margin={{
            left: 80,
            right: 80,
            top: 80,
            bottom: 80,
          }}
        
          slotProps={{
            legend: {
              direction: 'row',
              position: {
                vertical: 'top',
                horizontal: 'middle',
              },
              itemMarkWidth: 20,
              itemMarkHeight: 20,
              markGap: 10,
              itemGap: 10,
              labelStyle: {
                fontSize: 15,
                fill: 'black',
              },
        
            }
          }}
        /> */}
      
      </div>
    </div>
  );
}

export default RevenueMarginGraph;
