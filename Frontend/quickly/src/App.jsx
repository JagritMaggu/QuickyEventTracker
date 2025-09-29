import { useState,useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import './App.css'
import Signup from '../Components/Signup'
import Login from '../Components/Login'
import Homepage from '../Components/Homepage'
import CreateEvent from '../Components/CreateEvent'
import MyEvents from '../Components/MyEvents'
import HeroSection from '../Components/HeroSection'
function App() {
 

  return (
    <>
       <Toaster position="top-right" />
    <Routes>
    
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Signup/>}/>  
      <Route path='/createEvent' element={<CreateEvent/>}/>  
      <Route path='/myEvents' element={<MyEvents/>}/>  
      <Route path='/Hero' element={<HeroSection/>}/>  
       <Route path='/' element={<Homepage/>}/>

    </Routes>
    </>
  )
}

export default App
