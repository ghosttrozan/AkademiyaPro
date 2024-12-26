import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  useEffect(() => {
    if (!token) {
      // Redirect to signup page if token is not present
      navigate('/signup')
    } 
  } , [])

  return (
    <div>Dashboard</div>
  )
}

export default Dashboard