import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';



function SelectWell({ setProjectId }) {

  // Hold the fetched wells
  // Ideally will change this in the future to wells that belong to the user only
  const [projects, setProjects] = useState([])
  const [choice, setChoice] = useState("") 

  // Hold the selected well   

  useEffect(() => {
    // Fetch wells when the component is mounted
    fetch('http://127.0.0.1:5555/Project_table')
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => console.error('Error fetching wells:', error));
  }, []);

  const handleProjectChange = (event) => {
    const projectId = event.target.value;
    setChoice(projectId);
  };

  const handleSubmit = () => {
    if (choice) {
      setProjectId(choice)
    } 
    else {
      alert('Please select a well before submitting.');
    }
  };

  return (
    <div>

      <h2>Select a Project</h2>
      
      <Select size="small" variant="standard" value={choice} onChange={handleProjectChange}>
        {projects.map((project) => (
          <MenuItem key={project.id} value={project.id}>
            {`${project.id} - ${project.name}`}
          </MenuItem>
        ))}
      </Select>
      <br></br>
      <br></br>
      <Button variant="outlined" onClick={handleSubmit}>Select</Button>
    </div>
  );
}

export default SelectWell;
