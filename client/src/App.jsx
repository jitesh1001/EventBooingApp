import React from 'react'
import Navbar from "./Components/Navbar"
import { BrowserRouter,Route,Routes } from 'react-router-dom'


import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Dashboard from './Pages/UserDashboard'
import Admin from './Pages/AdminDashboard'
import VerifyOtp from './Pages/VerifyOTP'
import EventDetail  from './Pages/EventDetail'


const App = () => {
  return (
    <div>
     <BrowserRouter> 
     <Navbar/>
      <Routes>
        <Route path = "/" element  = {<Home/>}> </Route>
        <Route path = "/login" element  = {<Login/>}> </Route>
        <Route path = "/register" element  = {<Register/>}> </Route>
        <Route path = "/dashboard" element  = {<Dashboard/>}> </Route>
        <Route path = "/admin" element  = {<Admin/>}> </Route>
        <Route path = "/verify" element = {<VerifyOtp/>}></Route>
         <Route path="/events/:id" element={<EventDetail />} />

      </Routes>
     </BrowserRouter>
    </div>
  )
}

export default App