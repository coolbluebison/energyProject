import React from 'react'
import * as math from 'mathjs' 



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

        
    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>

        <br></br >
        <h2>Single  Well Financial Summary</h2>
        
        <table style={{ margin: 'auto', borderCollapse: 'collapse', width: '60%', textAlign: 'left' }}>
            <thead>
            <tr style={{ borderBottom: '2px solid black' }}>
                <th style={{ padding: '10px' }}>Metric</th>
                <th style={{ padding: '10px' }}>Value</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td style={{ padding: '10px' }}>Net Present Value - NPV10</td>
                <td style={{ padding: '10px' }}>{`$ ${npv10} MM`}</td>
            </tr>
            <tr>
                <td style={{ padding: '10px' }}>Internal Rate of Return - IRR</td>
                <td style={{ padding: '10px' }}>{`${irr} %`}</td>
            </tr>
            <tr>
                <td style={{ padding: '10px' }}>Return on Investment - ROI</td>
                <td style={{ padding: '10px' }}>{`${roi} %`}</td>
            </tr>
            <tr>
                <td style={{ padding: '10px' }}>Total Revenue</td>
                <td style={{ padding: '10px' }}>{`$ ${total_net_revenues} MM`}</td>
            </tr>
            <tr>
                <td style={{ padding: '10px' }}>Realized Oil Price ($/bbl)</td>
                <td style={{ padding: '10px' }}>{`$ TBD ${0}`}</td>
            </tr>
            <tr>
                <td style={{ padding: '10px' }}>Realized Gas Price ($/Mcf)</td>
                <td style={{ padding: '10px' }}>{`$ TBD ${0}`}</td>
            </tr>
            </tbody>
        </table>
        </div>
    )
}


export default SingleWellFinSummary;