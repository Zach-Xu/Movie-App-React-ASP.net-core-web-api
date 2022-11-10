import React, { createContext, useState } from 'react'
import Auth from './components/Auth/Auth'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import 'react-toastify/dist/ReactToastify.css';
export const AuthContext = createContext()

export default function App() {

  const [auth, setAuth] = useState({
    userID: '',
    firstName: '',
    lastName: ''
  })

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='*' element={<Home />} />
      </Routes>
    </AuthContext.Provider>
  )
}
