import React, { useState } from 'react'
import axios from 'axios'

function PrincipalSignUp() {

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [contact , setContact] = useState("")
  const [password , setPassword] = useState("")
  const [gender, setGender] = useState("")
  
 async function handleSubmit(e){

    e.preventDefault()

    const data = {
      name,
      email,
      contactNumber : contact,
      password,
      gender
    }

    const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_REGISTER, data)

    localStorage.setItem('token' , res.data.principal.token)

    console.log(res)

    setName("")
    setContact("")
    setEmail("")
    setPassword("")
    setGender("")
  }
  

  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="flex-1 bg-blue-900 text-white p-10 flex flex-col justify-center items-center">
        <h1 className="text-2xl mb-5">School Management System</h1>
        <h2 className="text-xl mb-5">Register your account</h2>

        <form onSubmit={(e) => handleSubmit(e)} className="w-full max-w-sm flex flex-col gap-3">
          {/* input for name email pass contact and gender */}
          <input 
            type="name" 
            onChange={(e)=> setName(e.target.value)}
            value={name}
            placeholder="Your Name *" 
            className="p-3 text-lg text-black rounded border border-gray-300"
            required 
          />
          <input 
            type="email" 
            onChange={(e)=> setEmail(e.target.value)}
            value={email}
            placeholder="Your Email *" 
            className="p-3 text-lg text-black rounded border border-gray-300"
            required 
          />
          
          <input 
            type="contact" 
            placeholder="Your Contact No. *" 
            onChange={(e)=> setContact(e.target.value)}
            value={contact}
            className="p-3 text-lg text-black rounded border border-gray-300"
            required 
          />
          {/* for gender */}
          <select 
            className="p-3 text-lg rounded border text-gray-700 border-gray-300" 
            name='select'
            value={gender}
            onChange={(e)=> setGender(e.target.value) }
            required
          >
            <option value="" disabled>Select Gender *</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input 
            type="password" 
            placeholder="Choose Password *" 
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            className="p-3 text-lg rounded border text-gray-700 border-gray-300"
            required 
          />

          <div className="flex items-center mt-3">
            <label className="relative inline-block w-10 h-6">
              <input type="checkbox" className="sr-only" />
              <div className="w-full h-full bg-gray-300 rounded-full shadow-inner"></div>
              <div className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 ease-in-out"></div>
            </label>
            <span className="ml-3 text-sm">Accept our <a href="/terms" className="text-blue-400">Terms & Conditions</a></span>
          </div>

          <button type="submit" className="p-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition">Sign up</button>
        </form>

        <p className="mt-5 text-sm">
          have an account? <a href="/login" className="text-blue-400">Login</a>
        </p>
      </div>

      {/* Right Section */}
      <div className="flex-1 bg-gray-100 p-10 flex flex-col justify-center items-center text-center">
        <h1 className="text-3xl font-bold">Start managing <span className="text-blue-500">free</span> now!</h1>
        <p className="mt-3 text-lg">eSkooly is a 100% free online <strong>Training</strong> management software for a lifetime with no limitations.</p>
        <div className="mt-5">
          {/* Add an illustration or image here */}
          <img src="https://eskooly.com/assets/images/illustrations/mockups/landing3/signup1.png" alt="Illustration" className="w-full max-w-sm h-full" />
        </div>
      </div>
    </div>
  );
}

export default PrincipalSignUp