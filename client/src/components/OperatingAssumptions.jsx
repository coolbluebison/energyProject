import React, { useState, useEffect } from "react";



function OperatingAssumptions() {
    
    // Getting the data associated with the well
    const [data, setData] = useState([]);
    const [assumptions, setAssumptions] = useState([]);
    
    const well_to_get_id = 2

    useEffect(() => {
        fetch(`http://127.0.0.1:5555/Well_table/${well_to_get_id}`)
            .then((response) => response.json())
            .then((file) => {
                setData(file)
                fetch(`http://127.0.0.1:5555/Assumptions_table/${file.assumption_id}`)
                    .then((response) => response.json())
                    .then(file => setAssumptions(file))
            });
    }, []);

    const [oilDeducts, setOilDeducts] = useState(assumptions.list_of_oil_deducts);
    const [gasDeducts, setGasDeducts] = useState(assumptions.list_of_gas_deducts);

    
    function handleSubmit(e) {
        e.preventDefault()

        const { list_of_oil_deducts, list_of_gas_deducts, ...restOfAssumptions } = assumptions;

        const data_to_update = {
            ...restOfAssumptions,
            list_of_oil_deducts: JSON.stringify(oilDeducts),
            list_of_gas_deducts: JSON.stringify(gasDeducts)
        };

        fetch(`http://127.0.0.1:5555/Assumptions_table/${assumptions.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(data_to_update),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        });
    }


    

    // Function ot handle input changes for oil deducts
    function handleOilDeductChange(e) {
        e.preventDefault()
        const { id, value } = e.target;
        const updatedOilDeducts = { ...oilDeducts, [id]: parseFloat(value) };
        setOilDeducts(updatedOilDeducts);
    }
    
    // Function to handle input changes for gas deducts
    function handleGasDeductChange(e) {
        e.preventDefault()
        const { id, value } = e.target;
        const updatedGasDeducts = { ...gasDeducts, [id]: parseFloat(value) };
        setGasDeducts(updatedGasDeducts);
    }

    // Function to handle other basic input changes
    function handleInputChange(e) {
        e.preventDefault()
        const { id, value } = e.target
        const updatedData = { ...assumptions, [id]: parseFloat(value) }
        setAssumptions(updatedData)
    }


    return (
        
            <>
                <h2>Enter Operating Assumptions</h2>


                <form onSubmit={(e) => handleSubmit(e)} >
                    
                    <h4>Net Revenue Interest Assumptions</h4>

                    <div id="net_revenue_interest">
                        <label htmlFor="net_revenue_interest">Net Revenue Interest (%): </label>
                        <input id="net_revenue_interest" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder={assumptions?assumptions["net_revenue_interest"]:0} />
                    </div>


                    <div id="working_interest">
                        <label htmlFor="working_interest">Working Interest (%): </label>
                        <input id="working_interest" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder={assumptions?assumptions["working_interest"]:0}/>
                    </div>


                    <h4>Direct Cost Assumptions</h4>

                    <h5>Oil Pricing Deducts and T&F Costs</h5>

                    <div id="nymex_oil_pricing_deduct">
                        <label htmlFor="nymex_oil_pricing_deduct">Nymex to Delivery Point Pricing Deduct ($/Bbl): </label>
                        <input id="nymex_oil_pricing_deduct" onChange ={(e) => {handleOilDeductChange(e)}} type="text" placeholder="e.g. $3/Bbl" />
                    </div>

                    {/* pattern="^\d+(\.\d+)?$" */}

                    <div id="oil_transportation_deduct">
                        <label htmlFor="oil_transportation_deduct">Oil Transportation Cost - Primary Pipeline ($/Bbl) </label>
                        <input id="oil_transportation_deduct" onChange ={(e) => {handleOilDeductChange(e)}} type="text" placeholder="e.g. $3/Bbl"/>
                    </div>


                    <div id="oil_processing_cost">
                        <label htmlFor="oil_processing_cost">Oil Processing Cost ($/Bbl): </label>
                        <input id="oil_processing_cost" onChange ={(e) => {handleOilDeductChange(e)}} type="text" placeholder="e.g. $1/Bbl"/>
                    </div>

                    
                    <h5>Gas Pricing Deducts and T&F Costs</h5>

                    <div id="hhub_gas_pricing_deduct">
                        <label htmlFor="hhub_gas_pricing_deduct">H Hub to Delivery Point Pricing Deduct ($/Mcf): </label>
                        <input id="hhub_gas_pricing_deduct" onChange ={(e) => {handleGasDeductChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                    </div>


                    <div id="gas_transportation_cost">
                        <label htmlFor="gas_transportation_cost">Gas Transportation Cost - Primary Pipeline ($/Mcf) </label>
                        <input id="gas_transportation_cost" onChange ={(e) => {handleGasDeductChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                    </div>


                    <div id="gas_processing_cost">
                        <label htmlFor="gas_processing_cost">Gas Processing Cost ($/Mcf): </label>
                        <input id="gas_processing_cost" onChange ={(e) => {handleGasDeductChange(e)}} type="text" placeholder="e.g. $0.20/Mcf" pattern="^\d+(\.\d+)?$"/>
                    </div>


                    <h4>Tax Expenses</h4>

                    <div id="severance_tax">
                        <label htmlFor="severance_tax">Severance Tax (%): </label>
                        <input id="severance_tax" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 0.04" />
                    </div>


                    <div id="ad_valorem_tax">
                        <label htmlFor="ad_valorem_tax">Ad Valorem Tax (%): </label>
                        <input id="ad_valorem_tax" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. 0.04" />
                    </div>


                    <h4>Lease Operating Costs</h4>

                    <div id="total_monthly_opex">
                        <label htmlFor="total_monthly_opex">Monthly Well Operating Costs ($Thousands/Month per Well): </label>
                        <input id="total_monthly_opex" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $3000" pattern="^\d+(\.\d+)?$"/>
                    </div>



                    <h4>Capital Expenditures Costs</h4>

                    <div id="drilling_costs">
                        <label htmlFor="drilling_costs">Drilling Costs ($): </label>
                        <input id="drilling_costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100,000" pattern="^\d+(\.\d+)?$"/>
                    </div>

                    <div id="completion_costs">
                        <label htmlFor="completion_costs">Completion Costs ($): </label>
                        <input id="completion_costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100,000" pattern="^\d+(\.\d+)?$"/>
                    </div>

                    <div id="facilities_costs">
                        <label htmlFor="facilities_costs">Facilities Costs ($): </label>
                        <input id="facilities_costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100,000" pattern="^\d+(\.\d+)?$"/>
                    </div>

                    <div id="pipeline_costs">
                        <label htmlFor="pipeline_costs">Pipeline Costs  ($): </label>
                        <input id="pipeline_costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100,000" pattern="^\d+(\.\d+)?$"/>
                    </div>

                    <div id="contingency_costs">
                        <label htmlFor="contingency_costs">Contingency Costs ($): </label>
                        <input id="contingency_costs" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $100,000" pattern="^\d+(\.\d+)?$"/>
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </>
        )
}


// pattern="^(100(\.0{1,2})?|[1-9]\d?(\.\d{1,2})?|\.\d{1,2})%?$

export default OperatingAssumptions
