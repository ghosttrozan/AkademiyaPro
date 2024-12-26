import React, { useState } from "react";
import axios from "axios";

const PrincipalSignIn = () => {
  const [userType, setUserType] = useState("Admin");
  const [username , setUsername] = useState("")
  const [password , setPassword] = useState("")
 
 async function handleSubmit(e){
    e.preventDefault();

    const data = {
      // userType, not defined in api will make a new page for it
      username,
      password,
    }

    const res = await axios.post(import.meta.env.VITE_BASE_URL_PRINCIPAL_LOGIN, data)

    // localStorage.setItem('token' , res.data.principal.token)

    console.log(res)

    setUsername("")
    setPassword("")
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Section */}
      <div className="w-1/2 bg-white flex flex-col items-center justify-center p-10">
        {/* Logo */}
        <h1 className="text-4xl font-bold text-gray-700 mb-8">
          <span className="text-blue-500">School management</span>
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          I do not have an account yet
        </p>

        {/* User Type Selection */}
        <div className="flex justify-center mb-6">
          {["Admin", "Employee", "Student"].map((type) => (
            <button
              key={type}
              onClick={() => setUserType(type)}
              className={`px-4 py-2 mx-2 rounded-full border ${
                userType === type
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:shadow-md`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Login Form */}
        <form className="w-3/4 space-y-4" onSubmit={(e)=>{handleSubmit(e)}}>
          <input
            type="username"
            onChange={(e)=> setUsername(e.target.value)}
            value={username}
            placeholder="User name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            onChange={(e)=> setPassword(e.target.value)}
            value={password}
            placeholder="Password"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex items-center">
            <input type="checkbox" id="rememberMe" className="mr-2" />
            <label htmlFor="rememberMe" className="text-gray-600">
              Remember Me
            </label>
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Log in
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-4">
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password?
          </a>
        </p>
      </div>

      {/* Right Section */}
      <div className="w-1/2 bg-blue-500 text-white flex flex-col justify-center items-center p-10">
        <h2 className="text-3xl font-bold mb-4">Start managing now</h2>
        <p className="text-center mb-8">
          Stop struggling with common tasks and focus on the real choke points.
          Discover a fully-featured & 100% Free School management platform.
        </p>
        <button className="px-6 py-3 bg-white text-blue-500 rounded-lg hover:bg-gray-100">
          Get started
        </button>
        <img
          src="https://eskooly.com/bb/asserts/images/illustrations/drawings/login4.png" // Replace with your image URL
          alt="Illustration"
          className="mt-8"
        />
      </div>
    </div>
  );
};

export default PrincipalSignIn;
