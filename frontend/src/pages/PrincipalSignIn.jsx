import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { ToastContainer, toast } from "react-toastify";
import { principalSignIn } from "../api/authentication";
import { getSchool } from "../api/school";
import { Link, useNavigate } from "react-router-dom";
import { setSchool } from "../features/school/schoolSlice";
import { setPrincipal } from "../features/principal/principalSlice";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FaGoogle, FaMicrosoft } from "react-icons/fa";
import { motion } from "framer-motion";

const PrincipalSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  async function handleSignIn(e) {
    e.preventDefault();
    setIsLoading(true);

    if (!validateEmail(email)) {
      toast.error("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must contain: 8+ characters, uppercase, lowercase, number, and special character"
      );
      setIsLoading(false);
      return;
    }

    try {
      const principal = await principalSignIn(email, password);

      if (principal) {
        dispatch(setPrincipal(principal));
        toast.success("Welcome back!");

        if (principal.school) {
          const schoolData = await getSchool(principal.token);
          if (schoolData) {
            dispatch(setSchool(schoolData.school));
            navigate("/dashboard");
          }
        } else {
          navigate("/school");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Invalid credentials");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <ToastContainer position="top-center" autoClose={3000} />
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden w-full max-w-6xl"
      >
        {/* Left Side - Login Form */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
          <div className="text-center mb-8">
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600 mb-2"
            >
              <Typewriter
                words={["AcademiyaPro", "School Management"]}
                loop={Infinity}
                cursor
                cursorStyle="|"
                typeSpeed={70}
                deleteSpeed={50}
                delaySpeed={2000}
              />
            </motion.h1>
            <p className="text-gray-600">Sign in to your administrator account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSignIn} className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                autoFocus
              />
            </div>

            <div className="relative">
              <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all pr-12"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-10 text-gray-500 hover:text-purple-600 transition-colors"
              >
                {showPassword ? <GoEyeClosed size={30} /> : <GoEye size={30} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                  className="h-5 w-5 text-purple-600 rounded focus:ring-purple-500"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-sm text-purple-600 font-medium hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 rounded-lg font-medium text-white transition-all ${
                isLoading
                  ? 'bg-purple-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-md'
              }`}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
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
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaGoogle className="text-red-500" />
                <span>Google</span>
              </button>
              <button
                type="button"
                className="flex items-center justify-center space-x-2 py-2 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaMicrosoft className="text-blue-500" />
                <span>Microsoft</span>
              </button>
            </div>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-purple-600 font-medium hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>

          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} AcademyPro. All rights reserved.
              <br />
              <span className="font-medium">Powered by Dev Dominators</span>
            </p>
          </div>
        </div>

        {/* Right Side - School Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-600/20 to-indigo-600/20"></div>
          <img
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="Students learning"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white bg-gradient-to-t from-black/80 to-transparent">
            <h2 className="text-2xl font-bold mb-2">Transform Your School Management</h2>
            <p className="opacity-90">
              Join thousands of schools using AcademyPro to streamline their administration
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default PrincipalSignIn;