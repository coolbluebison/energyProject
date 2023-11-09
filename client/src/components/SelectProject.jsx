import React, { useState, useEffect } from "react";
import Button from '@mui/material/Button'

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';




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


  const [projectName, setProjectName] = useState("");
  function handleProjectNameChange(event) {
    setProjectName(event.target.value);
  }

  function handleFormSubmit(e) {
    e.preventDefault()

    let formData = new FormData();
    formData.append('project_name', projectName); // Append the well name to the form data


    fetch('http://127.0.0.1:5555/Project_table', {
        method: 'POST',
        body: formData,
      })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        alert('New Project Created Successfully');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error Creting the New Project');
      });
}


  return (
    <>
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

      <br></br>
      <br></br>
      <h2>OR</h2>
      <br></br>

      <div>
        <h2>Create a New Project</h2>

        <form onSubmit={handleFormSubmit}>
          <TextField  variant="standard" size="small" label="Well Name" id="well_name" onChange ={handleProjectNameChange} type="text" placeholder='Enter Well Name Here' />
          <br></br>
          <br></br>
          <Button variant="outlined" type="submit">Create Well</Button>

        </form>
      </div>
    </>
  );
}

export default SelectWell;


// Select a project 
// OR Create a Project
// Enter Project Name
// Post the name to backend
// db.session.add()