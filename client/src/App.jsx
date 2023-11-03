import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import OperatingAssumptions from "./components/OperatingAssumptions"
import PricingAssumptions from './components/PricingAssumptions'
import DashboardContainer from './components/DashboardContainer.jsx'
import GasCompAssumptions from './components/GasCompAssumptions.jsx'
import Signup from './components/LoginPages/Signup.jsx'
import Login from './components/LoginPages/Login.jsx'
import CreateWell from './components/Create/CreateWell.jsx'



import {BrowserRouter, Route, NavLink, Outlet, Routes} from 'react-router-dom'


// const userLoader = async () => {
//   const response = await fetch("http://127.0.0.1:5555/Model_package/1")
//   return response.json()
// }


function App() {
  const [count, setCount] = useState(0)

  return (
    
    <BrowserRouter >
  
        <nav className="nav">
          <NavLink to="DashboardContainer" activeclassname="active">Dashboard Try</NavLink>
          <NavLink to="OperatingAssumptions" activeclassname="active">Operating Assumptions</NavLink>
          <NavLink to="PricingAssumptions" activeclassname="active">Pricing Assumptions</NavLink>
          <NavLink to="GasCompAssumptions" activeclassname="active">Gas Composition Assumptions</NavLink>
          <NavLink to="Signup" activeclassname="active">Signup</NavLink>
          <NavLink to="Login" activeclassname="active">Login</NavLink>

          <NavLink to="CreateWell" activeclassname="active">Create a New Well</NavLink>


        </nav>

        <Routes>
          <Route path="DashboardContainer" element={<DashboardContainer/>}  />
          <Route path="OperatingAssumptions" element={<OperatingAssumptions/>} />
          <Route path="PricingAssumptions" element={<PricingAssumptions/>} />
          <Route path="GasCompAssumptions" element={<GasCompAssumptions />} />
          <Route path="Signup" element={<Signup />} />
          <Route path="Login" element={<Login />} />

          <Route path="CreateWell" element={<CreateWell />} />

        </Routes>

    </BrowserRouter>
  
  )
}


export default App
