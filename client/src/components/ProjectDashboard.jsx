import React, {useState, useEffect} from 'react';
// import {useLoaderData} from "react-router-dom"

import DailyProductionGraph from './DailyProductionGraph';
import MonthlyRevenueGraph from './MonthlyRevenueGraph';
import RevenueMarginGraph from './RevenueMarginGraph';
import SingleWellFinSummary from './SingleWellFinSummary';
import SelectProject from './SelectProject';


import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';




function ProjectDashboard() {

    const [data, setData] = useState(undefined)
    const [projectId, setProjectId] = useState(undefined)


    
    useEffect(() =>
        {fetch(`http://127.0.0.1:5555/Project_package/${projectId}`)
        .then((r)=>r.json())
        .then((file)=> setData(file))}
        , [projectId])
 
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        textAlign: 'center',
        color: theme.palette.text.primary,
        display: "flex",
        lineHeight: '60px',
        }));
    

    return (

        <>

            {<SelectProject setProjectId = { setProjectId } Item={Item} />}
            
            <br></br>

            {data?<SingleWellFinSummary param_data = {data} />:<></>}

            {data?<RevenueMarginGraph param_data = {data} Item={Item}/>:<></>}

            {data?<DailyProductionGraph param_data = {data} Item={Item} />:<></>}

            {data?<MonthlyRevenueGraph param_data = {data} Item={Item}/>:<></>}





        </>
    )
}

export default ProjectDashboard