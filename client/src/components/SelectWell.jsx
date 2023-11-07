import React, { useState, useEffect } from "react";

import Button from '@mui/material/Button'


function SelectWell({ setWellID }) {

  // Hold the fetched wells
  // Ideally will change this in the future to wells that belong to the user only
  const [wells, setWells] = useState([]) 
  // Hold the selected well   
  const [selectedWellId, setSelectedWellId] = useState('')

  useEffect(() => {
    // Fetch wells when the component is mounted
    fetch('http://127.0.0.1:5555/Well_table')
      .then((response) => response.json())
      .then((wellsData) => setWells(wellsData))
      .catch((error) => console.error('Error fetching wells:', error));
  }, []);

  const handleWellChange = (event) => {
    const wellId = event.target.value;
    setSelectedWellId(wellId);
  };

  const handleSubmit = () => {
    if (selectedWellId) {
      setWellID(selectedWellId)
    } 
    else {
      alert('Please select a well before submitting.');
    }
  };

  return (
    <div>

      <h3>Select a Well</h3>
      
      <select value={selectedWellId} onChange={handleWellChange}>
        <option value="">Select a well</option>
        {wells.map((well) => (
          <option key={well.id} value={well.id}>
            {`${well.id} - ${well.name}`}
          </option>
        ))}
      </select>
      <br></br>
      <br></br>
      <Button variant="outlined" color="primary" onClick={handleSubmit}>Confirm Selection</Button>
    </div>
  );
}

export default SelectWell;
