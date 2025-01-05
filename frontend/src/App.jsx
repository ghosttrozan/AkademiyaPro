import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrincipalSignUp from './pages/PrincipalSignUp'
import Dashboard from './components/dashboard/Dashboard';
import PrincipalSignIn from './pages/PrincipalSignIn';
import LandingPage from './components/LandingPage';

function App() {
  return (

    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/signup' element={<PrincipalSignUp />} />
        <Route path='/signin' element={<PrincipalSignIn />} />
      </Routes>
    </Router>
    
  )
}

export default App


