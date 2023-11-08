import React, {useEffect, useState} from "react"
import Button from '@mui/material/Button'


function PricingAssumptions({wellID}) {

    const [pricingAssumptions, setPricingAssumptions] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:5555/Pricing_table/1')
        .then((response) => (response.json()))
        .then((file) => { setPricingAssumptions(file) } )
    }, [])


    function handleSubmit(e) {

        e.preventDefault()

        fetch('http://127.0.0.1:5555/Pricing_table/1', {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(pricingAssumptions),
        })
        .then(response => response.json())
        .then(data => {
            // console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        })
    }

    function handleInputChange(e) {

        e.preventDefault()

        const { id, value } = e.target

        const updatedData = { ...pricingAssumptions, [id]: parseFloat(value) }
        setPricingAssumptions(updatedData)
    }


    return (
        <>
            <form onSubmit={(e) => handleSubmit(e)}>
                <h2>Enter Pricing Assumptions</h2>

                <div id="oil_price">
                    <label htmlFor="oil_price">Avg. Oil Price During Period ($/Bbl): </label>
                    <input id="oil_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $75/bbl" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="methane_price">
                    <label htmlFor="methane_price">Avg. Gas Price During Period ($/Mcf): </label>
                    <input id="methane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $4/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="ethane_price">
                    <label htmlFor="ethane_price">Avg. Ethane Price During Period ($/gal): </label>
                    <input id="ethane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="propane_price">
                    <label htmlFor="propane_price">Avg. Propane Price During Period ($/gal): </label>
                    <input id="propane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="i_butane_price">
                    <label htmlFor="i_butane_price">Avg. I-Butane Price During Period ($/gal): </label>
                    <input id="i_butane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="n_butane_price">
                    <label htmlFor="i_butane_price">Avg. N-Butane Price During Period ($/gal): </label>
                    <input id="i_butane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="i_pentane_price">
                    <label htmlFor="i_pentane_price">Avg. I-Pentane Price During Period ($/gal): </label>
                    <input id="i_pentane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="n_pentane_price">
                    <label htmlFor="i_pentane_price">Avg. N-Pentane Price During Period ($/gal): </label>
                    <input id="i_pentane_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="hexane_plus_price">
                    <label htmlFor="hexane_plus_price">Avg. Hexane-Plus Price During Period ($/gal): </label>
                    <input id="hexane_plus_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $1/gal" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <div id="helium_price">
                    <label htmlFor="helium_price">Avg. Helium Price During Period ($/Mcf): </label>
                    <input id="helium_price" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder="e.g. $4/Mcf" pattern="^\d+(\.\d+)?$"/>
                </div>

                <br></br>

                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </>
    )
}

export default PricingAssumptions