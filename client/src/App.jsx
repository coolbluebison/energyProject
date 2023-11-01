import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'


import OperatingAssumptions from "./components/OperatingAssumptions"
import PricingAssumptions from './components/PricingAssumptions'
import DashboardContainer from './components/DashboardContainer.jsx'

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
        </nav>

        <Routes>
          <Route path="DashboardContainer" element={<DashboardContainer/>}  />
          <Route path="OperatingAssumptions" element={<OperatingAssumptions/>} />
          <Route path="PricingAssumptions" element={<PricingAssumptions/>} />
        </Routes>

    </BrowserRouter>
  
  )
}


export default App
