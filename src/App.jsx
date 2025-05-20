import { useState } from 'react'

import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Cart from './Pages/Cart'
import { ToastContainer, toast } from 'react-toastify'
import Navbar from './Component/Navbar'
import Viewdetail from './Pages/Viewdetail'
import Auth from './Pages/Auth'
import Buypage from './Pages/Buypage'

function App() {
 
  return (
    <>
    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/view' element={<Viewdetail/>} />
      <Route path='/account' element={<Auth/>} />
      <Route path='/buy' element={<Buypage/>} />

    </Routes>
    <ToastContainer />
    </BrowserRouter>
    </>
  )
}

export default App
