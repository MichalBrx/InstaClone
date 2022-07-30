import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './App'
import Login from './Login'
import Scroll from "./Scroll"
import { BrowserRouter, Route, Routes } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>


    <Routes>
      <Route path="Register" element={<Register />} />
      <Route path="Login" element={<Login />} />
      <Route path='/' element={<Scroll />} />
    </Routes>

</BrowserRouter>
)
