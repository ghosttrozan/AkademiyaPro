import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Typewriter } from "react-simple-typewriter";
import { ToastContainer, toast } from "react-toastify";
import { getSchool, principalSignIn } from "../api/authentication";
import { Link, useNavigate } from "react-router-dom";
import { setSchool } from "../features/school/schoolSlice";
import { setPrincipal } from "../features/principal/principalSlice";

const PrincipalSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Simple email regex
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  async function handleSignIn(e) {
    e.preventDefault();

    if (!validateEmail(email)) {
      toast.error("Invalid email address");
      return;
    }
    if (!validatePassword(password)) {
      toast.error(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    const principal = await principalSignIn(email, password);

    if (principal) {
      dispatch(setPrincipal(principal));
      toast.success("Login Successful!");

      if (principal.school) {
        try {
          const schoolData = await getSchool(principal.token);
          if (schoolData) {
            dispatch(setSchool(schoolData.school));
            navigate("/dashboard");
            toast.success("School Updated Successfully!");
          }
        } catch (error) {
          console.error("Error fetching school data:", error);
          toast.error("Error fetching school data.");
        }
      } else {
        navigate("/school");
      }
    } else {
      toast.error("Invalid credentials");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <ToastContainer />
      <div className="flex justify-between  bg-white h-screen shadow-lg rounded-lg w-full">
        {/* Left Side - Login Form */}

        <div className="flex items-center justify-center w-1/2">
          <div className="p-8 w-full">
            {/* Logo */}
            <div className="text-center mb-6">
              <h1 className="text-7xl absolute top-10 font-normal text-purple-600 font-serif">
                <Typewriter
                  words={["AcademyPro", "School Management"]}
                  loop={Infinity}
                  cursor
                  cursorStyle="|"
                  typeSpeed={70}
                  deleteSpeed={50}
                  delaySpeed={1000} // Time before starting to delete
                />
              </h1>
            </div>

            {/* Login Form */}
            <form onSubmit={(e) => handleSignIn(e)} className="space-y-6">
              {/* Username Field */}
              <div>
                <label
                  className="block text-gray-700 text-lg font-semibold mb-2"
                  htmlFor="Email"
                >
                  Email
                </label>
                <input
                  id="username"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your username or email"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Password Field */}
              <div>
                <label
                  className="block text-gray-700 text-lg font-semibold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="flex items-center justify-between">
                <label className="inline-flex items-center">
                  <input
                    onClick={() => setRemember((prev) => !prev)}
                    type="checkbox"
                    className="form-checkbox h-5 w-5 text-purple-600 rounded"
                  />
                  <span className="ml-2 text-gray-700 text-sm">
                    Remember me
                  </span>
                </label>
                <a
                  href="#"
                  className="text-sm text-purple-600 font-semibold hover:underline"
                >
                  Forgot Password?
                </a>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-purple-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none hover:bg-purple-700 text-lg transition duration-300"
              >
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center my-6">
                <div className="h-px bg-gray-300 w-full"></div>
                <span className="px-4 text-gray-500">OR</span>
                <div className="h-px bg-gray-300 w-full"></div>
              </div>
              <div className="flex justify-center space-x-4">
                <Link
                  to={"/signup"}
                  className="w-full text-center bg-green-600 text-white font-bold py-3 px-6 rounded-lg focus:outline-none hover:bg-green-700 text-lg transition duration-300"
                >
                  Register your account
                </Link>
              </div>
            </form>
            <h1 className="absolute bottom-4">
              <span className="text-2xl font-bold text-gray-800">
                Powered by{" "}
              </span>
              <span className="text-2xl cursor-pointer font-bold text-blue-500 hover:text-red-600">
                Dev Dominators
              </span>
            </h1>
          </div>
        </div>

        {/* Right Side - School Image */}
        <div className="w-1/2">
          <img
            src="https://www.jagranimages.com/images/newimg/02082022/02_08_2022-digital_school_in_india_with_5g_connectivity_22947019.webp"
            alt="School Building"
            className="w-full h-full rounded-r-lg"
          />
        </div>
      </div>
    </div>
  );
};

export default PrincipalSignIn;
