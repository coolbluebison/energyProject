import React, { useState } from 'react';


function ProductionAssumptions() {
    


}



function Trynew() {
    // State to keep track of divs
    const [assumptions, setAssumptions] = useState([
        {
            id: 'Initial-Production-Rate-Oil',
            label: 'Initial Production Rate - Oil (Bbl/day): ',
            placeholder: 'e.g. 1,000 (bbl/day)'
        }
    ]);

    const handleInputChange = (e, index) => {
        // Handle the input change here
    };

    const handleLabelChange = (e, index) => {
        const newAssumptions = [...assumptions];
        newAssumptions[index].label = e.target.value;
        setAssumptions(newAssumptions);
    };

    const addNewAssumption = () => {
        setAssumptions([...assumptions, {
            id: `assumption-${assumptions.length + 1}`,
            label: 'New Assumption: ',
            placeholder: 'Enter value...'
        }]);
    };



    return (
        <div>
            {assumptions.map((assumption, index) => (
                <div key={assumption.id} id={assumption.id}>
                    <input 
                        value={assumption.label}
                        onChange={(e) => handleLabelChange(e, index)}
                        placeholder="Assumption name"
                    />
                    <input 
                        onChange={(e) => handleInputChange(e, index)} 
                        type="text" 
                        placeholder={assumption.placeholder} 
                        pattern="^\d+(\.\d+)?$" 
                    />
                </div>
            ))}
            <button onClick={addNewAssumption}>Add New Assumption</button>
        </div>
    );
}

export default Trynew;
