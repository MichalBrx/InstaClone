import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './Register';
import Login from './pages/Login';
import Main from './pages/main';
import { BrowserRouter, Route, Routes } from 'react-router-dom';



export default  function Index() {
  return (
    <BrowserRouter>

      <Routes> 
        <Route index path="Register" element={<Register />} />
        <Route path='Login' element={<Login />} />
        <Route path='Main' element={<Main />} />
      </Routes>

    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);

