import React, { useEffect, useState } from "react"
import Button from '@mui/material/Button'


function GasCompAssumptions({wellID}) {

    const [data, setData] = useState([])
    const [gasCompAssumptions, setGasCompAssumptions] = useState([])

    const well_to_get_id = wellID

    useEffect(()=>{
        fetch(`http://127.0.0.1:5555/Well_table/${well_to_get_id}`)
        .then((response) => response.json())
        .then((file) => {
            setData(file)
            fetch(`http://127.0.0.1:5555/Gas_concentration_table/${file.gas_concentration_id}`)
            .then((response) => response.json())
            .then((file) => setGasCompAssumptions(file))})
    }, [])



    function handleSubmit(e) {
        e.preventDefault()


        fetch(`http://127.0.0.1:5555/Gas_concentration_table/${gasCompAssumptions.id}`, {
            method: 'PATCH',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(gasCompAssumptions),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.error("There was an error updating the data", error);
        });
    }



    // Function to handle other basic input changes
    function handleInputChange(e) {
        e.preventDefault()
        const { id, value } = e.target
        const updatedData = { ...gasCompAssumptions, [id]: parseFloat(value) }
        setGasCompAssumptions(updatedData)
    }


    return (

        <>
            <h2>Enter Gas Composition Here</h2>

            <form onSubmit={(e) => handleSubmit(e)} >
                
                <h4>Gas Composition Details</h4>

                <div id="methane">
                    <label htmlFor="methane">Methane (%): </label>
                    <input id="methane" onChange ={(e) => {handleInputChange(e)}} type="text" placeholder={gasCompAssumptions["methane"]?gasCompAssumptions["methane"]:0} />
                </div>

                <div id="ethane">
                <label htmlFor="ethane">Ethane (%): </label>
                <input
                    id="ethane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["ethane"] ? gasCompAssumptions["ethane"] : 0}
                />
                </div>

                <div id="propane">
                <label htmlFor="propane">Propane (%): </label>
                <input
                    id="propane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["propane"] ? gasCompAssumptions["propane"] : 0}
                />
                </div>

                <div id="i_butane">
                <label htmlFor="i_butane">i-Butane (%): </label>
                <input
                    id="i_butane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["i_butane"] ? gasCompAssumptions["i_butane"] : 0}
                />
                </div>

                <div id="n_butane">
                <label htmlFor="n_butane">n-Butane (%): </label>
                <input
                    id="n_butane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["n_butane"] ? gasCompAssumptions["n_butane"] : 0}
                />
                </div>

                <div id="i_pentane">
                <label htmlFor="i_pentane">i-Pentane (%): </label>
                <input
                    id="i_pentane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["i_pentane"] ? gasCompAssumptions["i_pentane"] : 0}
                />
                </div>

                <div id="n_pentane">
                <label htmlFor="n_pentane">n-Pentane (%): </label>
                <input
                    id="n_pentane"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["n_pentane"] ? gasCompAssumptions["n_pentane"] : 0}
                />
                </div>

                <div id="hexane_plus">
                <label htmlFor="hexane_plus">Hexane Plus (%): </label>
                <input
                    id="hexane_plus"
                    onChange={(e) => {
                    handleInputChange(e);
                    }}
                    type="text"
                    placeholder={gasCompAssumptions["hexane_plus"] ? gasCompAssumptions["hexane_plus"] : 0}
                />
                </div>

                <div id="other">
                    <label htmlFor="other">Other (%): </label>
                    <input
                        id="other"
                        onChange={(e) => {
                        handleInputChange(e);
                        }}
                        type="text"
                        placeholder={gasCompAssumptions["other"] ? gasCompAssumptions["other"] : 0}
                    />
                </div>


                <br></br>
                <Button variant="outlined" type="submit">Submit</Button>
            </form>
        </>
    )
}


export default GasCompAssumptions