import React, {useState, useEffect} from 'react';
// import {useLoaderData} from "react-router-dom"

import DailyProductionGraph from './DailyProductionGraph';
import MonthlyRevenueGraph from './MonthlyRevenueGraph';
import RevenueMarginGraph from './RevenueMarginGraph';
import SingleWellFinSummary from './SingleWellFinSummary';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';



function DashboardContainer({wellID}) {

    const [data, setData] = useState(undefined)

    useEffect(() => {fetch(`http://127.0.0.1:5555/Model_package/${wellID}`)
    .then((r)=>r.json())
    .then((file)=> setData(file))}, []
    )            
    
    console.log(data)


    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        display: "flex",
        lineHeight: '60px',
      }));



    return (

        <>

            {data?              
                <h2 align="center" color="black"></h2>
            :<h2>Please Select a Well First</h2>}

            {data?<SingleWellFinSummary param_data = {data} Item={Item} />:<></>}

            {data?<RevenueMarginGraph param_data = {data} Item={Item} />:<></>}
            
            {data?<DailyProductionGraph param_data = {data} Item={Item} />:<></>}

            {data?<MonthlyRevenueGraph param_data = {data} Item={Item} />:<></>}


        </>
    )
}

export default DashboardContainer