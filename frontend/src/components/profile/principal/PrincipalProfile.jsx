import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoEyeClosed } from "react-icons/go";
import { RxEyeOpen } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { updatePrincipal } from "../../../api/authentication";
import { setPrincipal } from "../../../features/principal/principalSlice";
import Header from "../../dashboard/Header";

const PrincipalProfile = () => {
  const dispatch = useDispatch();
  const { _id, name, email, contactNumber, gender } = useSelector(
    (state) => state.principal
  );

  const [formData, setFormData] = useState({
    name,
    email,
    password: "",
    phone: contactNumber,
    designation: "Principal",
    gender,
    profilePic: null,
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (!validateEmail(formData.email)) {
      toast.error("Please enter a valid email");
      return;
    }
    if (!validateMobileNumber(formData.phone)) {
      toast.error("Please enter a valid mobile number");
      return;
    }
    if (!validatePassword(formData.password)) {
      toast.error("Please enter a strong password");
      return;
    }

    const update = await updatePrincipal(formData);

    if (update) {
      dispatch(setPrincipal(update.principal));
      toast.success("Profile updated successfully");
      return;
    }

    toast.error("Try again");
    return;
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out successfully!");
    setTimeout(() => {
      window.location.reload() // Redirect to login
    }, 1000);
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="flex mt-6 flex-col lg:flex-row gap-10 p-10 max-w-7xl mx-auto font-poppins">
        {/* Left Section: Profile Details */}
        <div className="lg:w-1/3 bg-gray-100 p-8 rounded-lg shadow-lg">
          <div className="text-center">
            <div className="w-32 h-32 bg-purple-300 rounded-full mx-auto flex items-center justify-center text-white text-5xl font-bold mb-6 shadow-md">
              {formData.profilePic ? (
                <img
                  src={URL.createObjectURL(formData.profilePic)}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                formData.name.charAt(0)
              )}
            </div>
            <h3 className="text-3xl font-extrabold text-gray-800 mb-4">
              {formData.name}
            </h3>
          </div>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              <span className="font-semibold text-gray-900">Name:</span>{" "}
              {formData.name}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Email:</span>{" "}
              {formData.email}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Gender:</span>{" "}
              {formData.gender}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Phone:</span>{" "}
              {formData.phone}
            </p>
            <p>
              <span className="font-semibold text-gray-900">Designation:</span>{" "}
              {formData.designation}
            </p>
            <button
              className="w-full mt-6 bg-red-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-red-700"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>

        {/* Right Section: Update Form */}
        <div className="w-full sm:w-2/3 md:w-1/2 lg:w-2/3 bg-white p-8 rounded-lg shadow-md border">
          <h2 className="text-4xl font-extrabold text-purple-600 mb-6">
            Update Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-purple-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-purple-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div className="relative">
              <label className="block text-lg font-semibold text-purple-700">
                Password
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute bottom-0 right-4 transform -translate-y-2/4 text-purple-600"
              >
                {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
              </button>
            </div>

            <div>
              <label className="block text-lg font-semibold text-purple-700">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-purple-700">
                Designation
              </label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleInputChange}
                className="w-full mt-2 p-3 border rounded-lg focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            <button className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-700">
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrincipalProfile;
