import React from 'react'
import ReactDOM from 'react-dom/client'
import Register from './pages/App'
import Login from './pages/Login'
import Scroll from "./pages/Scroll"
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { store } from './app/store'
import { Provider } from 'react-redux'
import {authApi} from './app/api/authAPI'






store.dispatch(authApi.endpoints.getAllUsers.initiate({})) 
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>

<Provider store={store}>
    <Routes>
      <Route path='/' element={<Scroll />} />
      <Route path="Register" element={<Register />} />
      <Route path="Login" element={<Login />} />

    </Routes>
    </Provider>

</BrowserRouter>
)
