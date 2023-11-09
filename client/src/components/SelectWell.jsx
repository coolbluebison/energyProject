import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'


import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';






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
    console.log(wellId)
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

      <h2>Select a Well</h2>
      
      <Select 
        size = 'small'
        value={selectedWellId} 
        placeHolder="Select a well" 
        variant = "standard"
        onChange={(event) => handleWellChange(event)}
        
        >

        {/* <Option value="">Select a well</Option> */}


        {wells.map((well) => (
          <MenuItem key={well.id} value={well.id}>
            {`${well.id} - ${well.name}`}
          </MenuItem>
        
        ))}
      
      </Select>
      
      <br></br>
      <br></br>
      
      <Button variant="outlined" color="primary" onClick={handleSubmit}>Confirm Selection</Button>
    </div>
  );

}

export default SelectWell;
