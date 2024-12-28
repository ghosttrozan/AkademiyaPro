import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

function PrincipalSignUp() {

  const [name , setName] = useState("")
  const [email , setEmail] = useState("")
  const [contact , setContact] = useState("")
  const [password , setPassword] = useState("")
  const [gender, setGender] = useState("")
  const navigate = useNavigate()
  const [agreeTC , setagreeTC] = useState(false)

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regex
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    // Regex for 10-digit mobile numbers (adjust based on country)
    const mobileRegex = /^[6-9]\d{9}$/; // For India: starts with 6-9 and has 10 digits.
    return mobileRegex.test(number);
  };


  const validatePassword = (password) => {
    // Strong password criteria: Minimum 8 characters, includes uppercase, lowercase, digit, and special character.
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };
  
 async function handleSubmit(e){

    e.preventDefault()

    if (!agreeTC) {
      toast.error("Accept Condition")
      return
    }

    if(!validateEmail(email)){
      toast.error("Invalid Email")
      return;
    }

    if(!validatePassword(password)){
      toast.error("Invalid password. Please creat a strong password with at least 8 characters, including uppercase, lowercase, digit, and special character.")
      return;
    }

    if(!validateMobileNumber(contact)){
      toast.error("Invalid contact number. Please enter a 10-digit mobile number.")
      return;
    }

    const data = {
      name,
      email,
      contactNumber : contact,
      password,
      gender
    }

    const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_REGISTER, data)

    console.log(res)

    if (res.status === 200) {
      toast.success("Account Created Successfully")
      localStorage.setItem('token' , res.data.principal.token)
      navigate('/dashboard')
      setName("")
      setContact("")
      setEmail("")
      setPassword("")
      setGender("")
    } else {
      toast.error('Failed to sign in account. Please try again.')
    }

    
  }
  

  return (
    <div className="flex h-screen">
      <ToastContainer />
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
            type="number" 
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
              <div onClick={() => setagreeTC((prev) => !prev)} className={`absolute ${agreeTC ? "right-1 bg-blue-400" : "left-1 bg-white"} top-1 w-4 h-4  rounded-full shadow transform transition-transform duration-300 ease-in-out`}></div>
            </label>
            <span className="ml-3 text-sm">Accept our <a href="/terms" className="text-blue-400">Terms & Conditions</a></span>
          </div>

          <button type="submit" className="p-3 bg-blue-500 text-white text-lg rounded hover:bg-blue-600 transition">Sign up</button>
        </form>

        <p className="mt-5 text-sm">
          have an account? <Link to="/signin" className="text-blue-400">Login</Link>
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