import React, {useState, useEffect} from 'react';
// import {useLoaderData} from "react-router-dom"

import DailyProductionGraph from './DailyProductionGraph';
import MonthlyRevenueGraph from './MonthlyRevenueGraph';
import RevenueMarginGraph from './RevenueMarginGraph';
import SingleWellFinSummary from './SingleWellFinSummary';



function DashboardContainer({wellID}) {

    const [data, setData] = useState(undefined)

    useEffect(() => {fetch(`http://127.0.0.1:5555/Model_package/${wellID}`)
    .then((r)=>r.json())
    .then((file)=> setData(file))}, []
    )            
    
    console.log(data)



    return (

        <>
            {data?<SingleWellFinSummary param_data = {data} />:<></>}

            {data?<RevenueMarginGraph param_data = {data} />:<></>}
            
            {data?<DailyProductionGraph param_data = {data} />:<></>}

            {data?<MonthlyRevenueGraph param_data = {data} />:<></>}


        </>
    )
}

export default DashboardContainer