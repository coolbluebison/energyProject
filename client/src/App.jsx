import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import OperatingAssumptions from "./components/OperatingAssumptions"
import PricingAssumptions from './components/PricingAssumptions'
import DashboardContainer from './components/DashboardContainer.jsx'
import GasCompAssumptions from './components/GasCompAssumptions.jsx'
import Signup from './components/LoginPages/Signup.jsx'
import Login from './components/LoginPages/Login.jsx'
import CreateWell from './components/Create/CreateWell.jsx'
import SelectWell from './components/SelectWell'
import ProjectDashboard from './components/ProjectDashboard'
import Home from "./components/Home"


import {BrowserRouter, Route, NavLink, Outlet, Routes} from 'react-router-dom'
import Paper from '@mui/material/Paper';


import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



function App() {
  const [count, setCount] = useState(0)
  const [wellID, setWellID] = useState("")


  return (
    
    <BrowserRouter >
  
      <Paper elevation={4} square={false}>
        <nav className='nav'>

          <NavLink to="SelectWell" activeclassname="active" >Select</NavLink>
          
          <NavLink to="DashboardContainer" activeclassname="active">Dashboard - Well</NavLink>
          <NavLink to="ProjectDashboard" activeclassname="active">Dashboard - Project</NavLink>


          <NavLink to="OperatingAssumptions" activeclassname="active">Ops Assumptions</NavLink>
          <NavLink to="PricingAssumptions" activeclassname="active">Price Assumptions</NavLink>
          <NavLink to="GasCompAssumptions" activeclassname="active">Gas Assumptions</NavLink>
          <NavLink to="CreateWell" activeclassname="active">Create a New Well</NavLink>
          <NavLink to="Signup" activeclassname="active">Signup</NavLink>
          <NavLink to="Login" activeclassname="active">Login</NavLink>



        </nav>
      </Paper>

      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h8" component="div" sx={{ flexGrow: 1 }}>
            <NavLink to="SelectWell" activeclassname="active" >Well</NavLink>
            
            <NavLink to="DashboardContainer" activeclassname="active">Dashboard-Well</NavLink>
            <NavLink to="ProjectDashboard" activeclassname="active">Dashboard-Project</NavLink>


            <NavLink to="OperatingAssumptions" activeclassname="active">Ops Assumptions</NavLink>
            <NavLink to="PricingAssumptions" activeclassname="active">Price Assumptions</NavLink>
            <NavLink to="GasCompAssumptions" activeclassname="active">Gas Assumptions</NavLink>
            <NavLink to="Signup" activeclassname="active">Signup</NavLink>
            <NavLink to="Login" activeclassname="active">Login</NavLink>

            <NavLink to="CreateWell" activeclassname="active">New Well</NavLink>

          </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar> */}
      <br></br>
      <br></br>


        {/* <nav className="nav">

          <NavLink to="SelectWell" activeclassname="active" >Select Well</NavLink>
          
          <NavLink to="DashboardContainer" activeclassname="active">Dashboard-Single Well</NavLink>
          <NavLink to="ProjectDashboard" activeclassname="active">Dashboard-Project</NavLink>


          <NavLink to="OperatingAssumptions" activeclassname="active">Operating Assumptions</NavLink>
          <NavLink to="PricingAssumptions" activeclassname="active">Pricing Assumptions</NavLink>
          <NavLink to="GasCompAssumptions" activeclassname="active">Gas Composition Assumptions</NavLink>
          <NavLink to="Signup" activeclassname="active">Signup</NavLink>
          <NavLink to="Login" activeclassname="active">Login</NavLink>

          <NavLink to="CreateWell" activeclassname="active">Create a New Well</NavLink>


        </nav> */}


        <Routes>

          <Route path="" element={<Home /> }  />

          <Route path="SelectWell" element={<SelectWell setWellID={setWellID} /> }  />
                    
          <Route path="DashboardContainer" element={<DashboardContainer wellID={wellID}/>}  />
          <Route path="ProjectDashboard" element={<ProjectDashboard />}  />


          <Route path="OperatingAssumptions" element={<OperatingAssumptions wellID={wellID}/>} />
          <Route path="PricingAssumptions" element={<PricingAssumptions wellID={wellID}/>} />
          <Route path="GasCompAssumptions" element={<GasCompAssumptions wellID={wellID}/>} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Login" element={<Login />} />

          <Route path="CreateWell" element={<CreateWell />} />

        </Routes>

    </BrowserRouter>
  
  )
}


export default App
