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



import {BrowserRouter, Route, NavLink, Outlet, Routes} from 'react-router-dom'


// const userLoader = async () => {
//   const response = await fetch("http://127.0.0.1:5555/Model_package/1")
//   return response.json()
// }


function App() {
  const [count, setCount] = useState(0)
  const [wellID, setWellID] = useState("")

  return (
    
    <BrowserRouter >
  
        <nav className="nav">

          <NavLink to="SelectWell" activeclassname="active" >Select Well</NavLink>
          
          <NavLink to="DashboardContainer" activeclassname="active">Dashboard-Single Well</NavLink>
          <NavLink to="ProjectDashboard" activeclassname="active">Dashboard-Project</NavLink>


          <NavLink to="OperatingAssumptions" activeclassname="active">Operating Assumptions</NavLink>
          <NavLink to="PricingAssumptions" activeclassname="active">Pricing Assumptions</NavLink>
          <NavLink to="GasCompAssumptions" activeclassname="active">Gas Composition Assumptions</NavLink>
          <NavLink to="Signup" activeclassname="active">Signup</NavLink>
          <NavLink to="Login" activeclassname="active">Login</NavLink>

          <NavLink to="CreateWell" activeclassname="active">Create a New Well</NavLink>


        </nav>

        <Routes>

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
