import React from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrincipalSignUp from './pages/PrincipalSignUp'
import Dashboard from './Dashboard';
import PrincipalSignIn from './pages/PrincipalSignIn';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard/>} />
        <Route path='/signup' element={<PrincipalSignUp />} />
        <Route path='/dashboard' element={<PrincipalSignIn />} />
      </Routes>
    </Router>
  )
}

export default App


