import React, { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import { motion } from 'framer-motion'
import { FaGoogle, FaMicrosoft, FaCheck } from 'react-icons/fa'

function PrincipalSignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    password: '',
    gender: '',
    street:'',
    city:'',
    state:'',
    postalCode:''
  })
  const [agreeTC, setAgreeTC] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const validate = {
    email: (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
    contactNumber: (number) => /^[6-9]\d{9}$/.test(number),
    password: (password) => 
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/.test(password),
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    const newErrors = {}

    if (!agreeTC) {
      toast.error('Please accept terms & conditions')
      setIsLoading(false)
      return
    }

    Object.entries(formData).forEach(([key, value]) => {
      if (!value) newErrors[key] = 'This field is required'
    })

    if (!validate.email(formData.email)) newErrors.email = 'Invalid email address'
    if (!validate.contactNumber(formData.contactNumber)) newErrors.contactNumber = 'Invalid mobile number'
    if (!validate.password(formData.password)) newErrors.password = 'Password must contain: 8+ chars, uppercase, lowercase, number, and special character'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      setIsLoading(false)
      return
    }

    try {
      const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_REGISTER, {
        ...formData
      })

      if (res.status === 201) {
        localStorage.setItem('token', res.data.principal.token.token)
        toast.success('Account created successfully! Redirecting...')
        setTimeout(() => navigate('/dashboard'), 2000)
      }
    } catch (error) {
      console.log(error)
      toast.error(error.response?.data?.msg || 'Registration failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-6xl"
      >
        <div className="flex flex-col md:flex-row">
          {/* Left Section */}
          <div className="w-full md:w-1/2 p-8 md:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Create School Account
              </h1>
              <p className="text-gray-600 mt-2">
                Start managing your school operations efficiently
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {['name', 'email', 'contactNumber', 'password', 'street', 'city', 'state', 'postalCode'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
                    {field.replace('_', ' ')}
                  </label>
                  <div className="relative">
                    <input
                      name={field}
                      type={field === 'password' ? (showPassword ? 'text' : 'password') : field === 'email' ? 'email' : 'text'}
                      value={formData[field]}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors[field] ? 'border-red-500' : 'border-gray-300'
                      } focus:ring-2 focus:ring-blue-500 transition-all`}
                      placeholder={`Enter your ${field.replace('_', ' ')}`}
                    />
                    {field === 'password' && (
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        {showPassword ? (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                          </svg>
                        ) : (
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        )}
                      </button>
                    )}
                  </div>
                  {errors[field] && (
                    <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
                  )}
                </div>
              ))}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Gender
                </label>
                <div className="flex gap-4">
                  {['Male', 'Female'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, gender: option }))}
                      className={`flex-1 py-2 rounded-lg border ${
                        formData.gender === option 
                          ? 'border-blue-500 bg-blue-50 text-blue-600'
                          : 'border-gray-300 hover:border-blue-300'
                      } transition-all`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setAgreeTC(!agreeTC)}
                  className={`w-6 h-6 rounded border-2 flex items-center justify-center mr-3 ${
                    agreeTC 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300 hover:border-blue-400'
                  } transition-colors`}
                >
                  {agreeTC && <FaCheck className="text-white text-sm" />}
                </button>
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <a href="/terms" className="text-blue-600 hover:underline">
                    Terms & Conditions
                  </a>
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-6 rounded-lg font-medium text-white ${
                  isLoading 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700'
                } transition-all`}
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </motion.button>

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-4 bg-white text-gray-500 text-sm">OR CONTINUE WITH</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaGoogle className="text-red-500" />
                  <span>Google</span>
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <FaMicrosoft className="text-blue-500" />
                  <span>Microsoft</span>
                </button>
              </div>

              <p className="text-center text-gray-600 text-sm mt-6">
                Already have an account?{' '}
                <Link to="/signin" className="text-blue-600 font-medium hover:underline">
                  Login here
                </Link>
              </p>
            </form>
          </div>

          {/* Right Section */}
          <div className="hidden md:block w-1/2 relative bg-gradient-to-b from-blue-600 to-indigo-600">
            <img
              src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
              alt="School illustration"
              className="w-full h-full object-cover mix-blend-overlay opacity-90"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white text-center">
              <h2 className="text-2xl font-bold mb-3">Transform Your School Management</h2>
              <p className="opacity-90">
                Join thousands of educational institutions using our platform
              </p>
            </div>
          </div>
        </div>
      </motion.div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  )
}

export default PrincipalSignUp