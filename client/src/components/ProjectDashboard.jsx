import React, {useState, useEffect} from 'react';
// import {useLoaderData} from "react-router-dom"

import DailyProductionGraph from './DailyProductionGraph';
import MonthlyRevenueGraph from './MonthlyRevenueGraph';
import RevenueMarginGraph from './RevenueMarginGraph';
import SingleWellFinSummary from './SingleWellFinSummary';
import SelectProject from './SelectProject';



function ProjectDashboard() {

    const [data, setData] = useState(undefined)
    const [projectId, setProjectId] = useState(undefined)

    // Okay so just show the SelectProject
    // Once projectId is selected
    // try:
    // if successful, then stop
    // 

    
    useEffect(() =>
        {fetch(`http://127.0.0.1:5555/Project_package/${projectId}`)
        .then((r)=>r.json())
        .then((file)=> setData(file))}
        , [projectId])
 
    


    return (

        <>

            {<SelectProject setProjectId = { setProjectId } />}
            
            <br></br>

            {data?<DailyProductionGraph param_data = {data} />:<></>}

            {data?<MonthlyRevenueGraph param_data = {data} />:<></>}

            {data?<RevenueMarginGraph param_data = {data} />:<></>}

            {data?<SingleWellFinSummary param_data = {data} />:<></>}

        </>
    )
}

export default ProjectDashboard