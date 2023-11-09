import React from "react";
import Homepic from "./Homepic.png"; 

import Paper from '@mui/material/Paper';


function Home() {
    const image_url = Homepic;

    return (
        <div size="80%">
            
            <Paper >
                <h1>Valore-X</h1>
                <h4>Powering informed decisions with real-time insights into the economics of energy investments</h4>
            </Paper>
            <br></br>
            <img src={image_url} alt="Home" />
        </div>
    );
}

export default Home;