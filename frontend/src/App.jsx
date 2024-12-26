import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrincipalSignUp from './pages/PrincipalSignUp'
import Dashboard from './Dashboard';
import PrincipalSignIn from './pages/PrincipalSignIn';
import LandingPage from './LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<LandingPage/>} />
        <Route path='/signup' element={<PrincipalSignUp />} />
        <Route path='/signin' element={<PrincipalSignIn />} />
      </Routes>
    </Router>
  )
}

export default App


