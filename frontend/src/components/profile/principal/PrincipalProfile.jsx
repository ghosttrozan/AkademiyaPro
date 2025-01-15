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
  const { _id, name, email, contactNumber, gender , image } = useSelector(
    (state) => state.principal
  );

  console.log(image)

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
    setFormData({ ...formData, profilePic: e.target.files[0] });
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
      window.location.reload(); // Redirect to login
    }, 1000);
  };

  return (
    <div className="bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] h-screen">
      <ToastContainer />
      <Header />
      <div className="flex pt-24 flex-col lg:flex-row gap-8 p-6 max-w-6xl mx-auto font-poppins">
        {/* Left Section: Profile Details */}
        <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg flex flex-col justify-between h-full">
          <div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full mx-auto flex items-center justify-center text-white text-3xl font-bold mb-6 shadow-md">
                {formData.profilePic ? (
                  <img
                    src={formData.profilePic}
                    alt="Profile"
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <img src={image} alt="" />
                )}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {formData.name}
              </h3>
            </div>
            <div className="space-y-4 text-base text-gray-700">
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
                <span className="font-semibold text-gray-900">
                  Designation:
                </span>{" "}
                {formData.designation}
              </p>
            </div>
          </div>
          <button
            className="w-full mt-8 bg-red-600 text-white py-2 rounded-lg font-semibold text-base hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>

        {/* Right Section: Edit Profile */}
        <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Phone
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <button
                  type="button"
                  className="absolute top-2 text-2xl right-3 text-gray-500"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <RxEyeOpen /> : <GoEyeClosed />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Upload Profile Picture
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
            >
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PrincipalProfile;
