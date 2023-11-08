import React, { useState } from "react";
import Button from '@mui/material/Button'




function CreateWell() {


    // Add a name for the well
    
    // Start with uploading a curve

    const [wellName, setWellName] = useState("");
    const [file, setFile] = useState(null);
    
    function handleFileChange(e){
        e.preventDefault()
        let file_to_upload = event.target.files[0]
        setFile(file_to_upload)
    }

    function handleWellNameChange(event) {
      setWellName(event.target.value);
    }

    function handleFormSubmit(e) {
        e.preventDefault()
        if  (!file) {
            alert('Please select a file first!')
            return;
        }

        let formData = new FormData();
        formData.append('well_name', wellName); // Append the well name to the form data
        formData.append('file_to_upload', file)


        fetch('http://127.0.0.1:5555/Upload_curve', {
            method: 'POST',
            body: formData,
          })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            alert('Type curve uploaded successfully!');
          })
          .catch(error => {
            console.error('Error:', error);
            alert('Error uploading type curve!');
          });
        console.log(wellName)
        console.log(formData)
    }

    return (
        <div>
          <h2>Create New Well</h2>
          <br></br>
          <br></br>
          <h4>Upload Your Type Curve CSV File</h4>
          <form onSubmit={handleFormSubmit}>
            
            <label htmlFor="well_name">New Well Name: </label>
            <input id="well_name" onChange ={handleWellNameChange} type="text" placeholder='Enter Well Name Here' />

            <br></br>
            <br></br>
            <h4>Upload Your Type Curve CSV File</h4>
            <input type="file" onChange={handleFileChange} accept=".csv" />
            <br></br>
            <br></br>
            <br></br>

            <></>
            <Button variant="outlined" type="submit">Create Well</Button>
          </form>
        </div>
    )
   
}

export default CreateWell;

