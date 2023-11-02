import React, {useState, useEffect} from 'react';
// import {useLoaderData} from "react-router-dom"

import DailyProductionGraph from './DailyProductionGraph';
import MonthlyRevenueGraph from './MonthlyRevenueGraph';
import RevenueMarginGraph from './RevenueMarginGraph'



function DashboardContainer() {

    const [data, setData] = useState(undefined)

    useEffect(() => {fetch("http://127.0.0.1:5555/Model_package")
    .then((r)=>r.json())
    .then((file)=> setData(file))}, []
    )            
    
    console.log(data)



    return (

        <>
            {data?<DailyProductionGraph param_data = {data} />:<></>}

            {data?<MonthlyRevenueGraph param_data = {data} />:<></>}

            {data?<RevenueMarginGraph param_data = {data} />:<></>}


        </>
    )
}

export default DashboardContainer