import React from "react";
import { Bar, Line } from "react-chartjs-2";
import * as math from 'mathjs' 


// MUI X charts
import {  BarChart } from '@mui/x-charts';

import { styled } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import Paper from '@mui/material/Paper';

import { Box, ThemeProvider } from '@mui/system';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';





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

  // Styled Paper Here
  // const Item = styled(Paper)(({ theme }) => ({
  //   ...theme.typography.body2,
  //   textAlign: 'center',
  //   color: theme.palette.text.primary,
  //   display: "flex",
  //   lineHeight: '60px',
  // }));
  
  // const darkTheme = createTheme({ palette: { mode: 'dark' } });
  // const lightTheme = createTheme({ palette: { mode: 'light' } });


  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
      },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
      border: 0,
  },
  }));

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
    <>
      <TableContainer>
      <Table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%', textAlign: 'left' }} aria-label="a dense table">
        <TableHead>
          <TableRow style={{ borderBottom: '2px solid black' }}>
            <TableCell align="center">Production Component</TableCell>
            <TableCell align="center">Total Production</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell align="center">Oil (bbl)</TableCell>
            <TableCell align="center">{total_oil_produced} bbl</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Methane (mcf)</TableCell>
            <TableCell align="center">{total_methane_produced} mcf</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Helium (mcf)</TableCell>
            <TableCell align="center">{total_helium_produced} mcf</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Ethane (gal)</TableCell>
            <TableCell align="center">{total_ethane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Propane (gal)</TableCell>
            <TableCell align="center">{total_propane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">I-Butane (gal)</TableCell>
            <TableCell align="center">{total_i_butane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">N-Butane (gal)</TableCell>
            <TableCell align="center">{total_n_butane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">I-Pentane (gal)</TableCell>
            <TableCell align="center">{total_i_pentane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">N-Pentane (gal)</TableCell>
            <TableCell align="center">{total_n_pentane_produced} gal</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="center">Hexane Plus (gal)</TableCell>
            <TableCell align="center">{total_hexane_plus_produced} gal</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      </TableContainer>
    </>
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



  // const ItemSheet = styled(Sheet)(({ theme }) => ({
  //   backgroundColor:
  //     theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  //   ...theme.typography['body-sm'],
  //   padding: theme.spacing(1),
  //   textAlign: 'center',
  //   borderRadius: 4,
  //   color: theme.vars.palette.text.secondary,
  // }));




  return (
    <div>
      <div>

          <Paper borderColor='black' elevation={1} >              
            <h2 align="center">Revenue/EBITDA</h2>
          </Paper>

          <Grid xs container spacing={0.5}>

            <Item sx={{ flexGrow: 1 }} elevation={3}>              
              <Bar data={data} options={options1} />
            </Item>
            
          </Grid>

          <br></br>

          <Paper borderColor='black' elevation={1} >              
            <h2 align="center">EBITDA/CAPEX</h2>
          </Paper>

          <Grid xs container spacing={0.5}>
            <Item sx={{ flexGrow: 1 }} elevation={3}>              
              <Bar data={data2} options={options2} />
            </Item>
          </Grid>

          <br></br>

          <Paper borderColor='black' elevation={1} >              
            <h2 align="center">Projected Production</h2>
          </Paper>

          <Item sx={{ flexGrow: 1 }} elevation={3}>              
            {projectedTable}
          </Item>


       

        
        
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
