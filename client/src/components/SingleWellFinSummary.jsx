import React from 'react'
import * as math from 'mathjs' 



import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';


import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';





function SingleWellFinSummary( { param_data }) {

    let model = param_data["model"]    
    let npv10 = (param_data["npv"]/1000000).toFixed(2)
    let irr = ((param_data["irr"]).toFixed(2))*100

    let totalNetRevenues = model["total_net_revenues"];
    let totalNetRevenuesList = Object.values(totalNetRevenues); 
    
    let total_net_revenues = (math.sum(totalNetRevenuesList)/1000000).toFixed(2)

    let free_cash_flows = model['cash_flows']
    let cash_flow_list = Object.values(free_cash_flows)
    let capex = model['capex']
    let capex_list = Object.values(capex)

    let total_of_cash_flows = math.sum(cash_flow_list)
    let total_of_capex = math.sum(capex_list)            

    let roi = (((total_of_cash_flows-total_of_capex)/-(total_of_capex))*100).toFixed(2)

    console.log(npv10)
    console.log('irr', irr)


    // Styled Paper Here
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        display: "flex",
        lineHeight: '60px',
      }));
      
      const darkTheme = createTheme({ palette: { mode: 'dark' } });
      const lightTheme = createTheme({ palette: { mode: 'light' } });


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



        
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>

        <br></br >

        <Paper borderColor='black' elevation={1} >              
          <h2 align="center">Summary Financial Metrics</h2>
        </Paper>

        {/* <br></br> */}

        <Item elevation={3}>
            <br></br>
            <br></br>
            <br></br>
                <TableContainer>
                <Table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%', textAlign: 'left' }}>
                    <TableHead>
                    <TableRow style={{ borderBottom: '2px solid black' }}>
                        <TableCell align='left' style={{ padding: '10px' }}>Metric</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>Value</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Net Present Value - NPV10</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`$ ${npv10} MM`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Internal Rate of Return - IRR</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`${irr} %`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Return on Investment - ROI</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`${roi} %`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Total Revenue</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`$ ${total_net_revenues} MM`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Realized Oil Price ($/bbl)</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`$ TBD ${0}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' style={{ padding: '10px' }}>Realized Gas Price ($/Mcf)</TableCell>
                        <TableCell align='center' style={{ padding: '10px' }}>{`$ TBD ${0}`}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
                </TableContainer>
            <br></br>
        </Item>



        {/* <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="AAA">
                <TableHead>
                <TableRow>
                    <StyledTableCell>Dessert (100g serving)</StyledTableCell>
                    <StyledTableCell align="right">Calories</StyledTableCell>
                    <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
                    <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <StyledTableRow key={row.name}>
                    <StyledTableCell component="th" scope="row">
                        {row.name}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.calories}</StyledTableCell>
                    <StyledTableCell align="right">{row.fat}</StyledTableCell>
                    <StyledTableCell align="right">{row.carbs}</StyledTableCell>
                    <StyledTableCell align="right">{row.protein}</StyledTableCell>
                    </StyledTableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer> */}



        </div>
    )
}


export default SingleWellFinSummary;