import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoEyeClosed, GoEye } from "react-icons/go";
import { FiUser, FiMail, FiPhone, FiLock, FiCamera, FiSave, FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { updatePrincipal } from "../../../api/authentication";
import { setPrincipal } from "../../../features/principal/principalSlice";
import Header from "../../dashboard/Header";
import { useNavigate } from "react-router-dom";

const PrincipalProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { _id, name, email, contactNumber, gender, image } = useSelector(
    (state) => state.principal
  );

  const [formData, setFormData] = useState({
    name,
    email,
    password: "",
    phone: contactNumber,
    designation: "Principal",
    gender,
    profilePic: image,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProfilePicChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, profilePic: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.email) {
      if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    }
    if (formData.phone) {
      if (!validateMobileNumber(formData.phone)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    }
    if (formData.password) {
      if (formData.password && !validatePassword(formData.password)) {
      toast.error("Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character");
      return;
    }
    }

    try {
      const update = await updatePrincipal(formData);
      if (update) {
        dispatch(setPrincipal(update.principal));
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
    window.location.reload();
    toast.info("Logged out successfully!");
  };

  return (
    <div className="bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] min-h-screen">
      <ToastContainer position="top-center" autoClose={5000} theme="dark" />
      <Header />
      
      <div className="pt-24 p-6 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Profile Section */}
          <div className="lg:w-1/3 bg-gray-800 p-6 rounded-xl shadow-xl">
            <div className="flex flex-col items-center mb-8">
              <div className="relative w-32 h-32 rounded-full border-2 border-gray-600 mb-6 group">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center">
                    <FiUser className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute bottom-0 right-0 bg-blue-600 p-2 rounded-full cursor-pointer hover:bg-blue-700 transition-colors">
                  <FiCamera className="text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePicChange}
                    className="hidden"
                  />
                </label>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">{formData.name}</h3>
              <p className="text-gray-400 mb-6">{formData.designation}</p>
              
              <div className="w-full space-y-4 text-gray-300">
                <div className="flex items-center">
                  <FiMail className="mr-3 text-gray-400" />
                  <span>{formData.email}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="mr-3 text-gray-400" />
                  <span>{formData.phone || "Not provided"}</span>
                </div>
                <div className="flex items-center">
                  <FiUser className="mr-3 text-gray-400" />
                  <span>{formData.gender || "Not specified"}</span>
                </div>
              </div>
            </div>
            
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              <FiLogOut className="mr-2" />
              Logout
            </button>
          </div>

          {/* Edit Form */}
          <div className="lg:w-2/3 bg-gray-800 p-8 rounded-xl shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-8 border-b border-gray-700 pb-4">
              Edit Profile
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <FiUser className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number
                </label>
                <div className="relative">
                  <FiPhone className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  New Password
                </label>
                <div className="relative">
                  <FiLock className="absolute left-3 top-3 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-3 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrincipalProfile;