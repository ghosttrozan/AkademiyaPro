import React, { useState, useEffect } from "react";
import Header from "../../dashboard/Header";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { createSchool, updateSchool } from "../../../api/school";
import { setSchool } from "../../../features/school/schoolSlice";
import _ from "lodash";
import AdvancedEducationSpinner from "../../Spinner";
import WelcomeAnimation from "../../Animaton";
import { FiUpload, FiSave, FiEdit2, FiGlobe, FiMail, FiPhone, FiHome, FiCalendar } from "react-icons/fi";

function SchoolProfile() {
  const principalId = useSelector((state) => state.principal._id);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const {
    _id,
    name,
    logo,
    contactNumber,
    address,
    establishedYear,
    schoolType,
    tagLine,
    schoolEmail,
    schoolWebsite,
  } = useSelector((state) => state.school);

  const dispatch = useDispatch();

  const [profile, setProfile] = useState({
    logo: logo || "",
    name: name || "",
    tagline: tagLine || "",
    phone: contactNumber || "",
    email: schoolEmail || "",
    website: schoolWebsite || "",
    address: address || "",
    schoolType: schoolType || "",
    establishedYear: establishedYear || "",
  });

  useEffect(() => {
    if (_id) {
      setProfile({
        logo,
        name,
        tagline: tagLine,
        phone: contactNumber,
        email: schoolEmail,
        website: schoolWebsite,
        address,
        schoolType,
        establishedYear,
      });
    }
  }, [
    _id,
    logo,
    name,
    tagLine,
    contactNumber,
    schoolEmail,
    schoolWebsite,
    address,
    schoolType,
    establishedYear,
  ]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoChange = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfile({ ...profile, logo: event.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateMobileNumber = (number) => {
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(number);
  };

  async function handleCreateSchool(profile) {
    if (_id) {
      return toast.error("Already registered");
    }

    if (
      !profile.name ||
      !profile.tagline ||
      !profile.phone ||
      !profile.email ||
      !profile.website ||
      !profile.address ||
      !profile.schoolType ||
      !profile.establishedYear
    ) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(profile.email)) {
      toast.error("Invalid Email");
      return;
    }

    if (!validateMobileNumber(profile.phone)) {
      toast.error(
        "Invalid contact number. Please enter a 10-digit mobile number."
      );
      return;
    }
    
    setLoading(true);
    const response = await createSchool(profile, principalId);
    
    if (response.status === 201) {
      dispatch(setSchool(response.data.school));
      toast.success(response.data.message);
      setLoading(false);
    } else if (response.status === 400) {
      setLoading(false);
      toast.error(response.data.details[0]);
    } else {
      setLoading(false);
      toast.error("Error Occured: " + response?.data?.details[0]);
    }
  }

  const handleUpdateSchool = async () => {
    setLoading(true);
    const res = await updateSchool(profile, _id);
    if (res) {
      dispatch(setSchool(res.school));
      toast.success("School updated successfully");
      setIsEditing(false);
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Failed to update");
    }
  };

  if(loading){
    return (
      <div className="flex fixed w-screen items-center justify-center h-full bg-gray-900">
        <WelcomeAnimation/>
      </div>
    )
  }

  return (
    <div className="bg-gray-900 min-h-screen">
      <ToastContainer position="top-right" autoClose={5000} theme="dark" />
      <Header />
      
      <div className="p-6 min-h-screen">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-6 flex items-center">
            School Profile
            {_id && (
              <button 
                onClick={() => setIsEditing(!isEditing)}
                className="ml-4 p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <FiEdit2 className="w-5 h-5 text-white" />
              </button>
            )}
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Form Section */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 w-full lg:w-2/3">
              <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                School Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Logo Upload */}
                <div className="col-span-2 md:col-span-1 flex flex-col items-center">
                  <div className="relative w-40 h-40 rounded-full border-2 border-dashed border-gray-600 flex items-center justify-center overflow-hidden">
                    {profile.logo ? (
                      <img
                        src={profile.logo}
                        alt="School Logo"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-sm text-gray-400">No logo uploaded</span>
                    )}
                  </div>
                  <label
                    htmlFor="logo"
                    className="mt-4 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg cursor-pointer text-sm transition-colors w-40"
                  >
                    <FiUpload className="mr-2" />
                    {profile.logo ? "Change Logo" : "Upload Logo"}
                  </label>
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                    disabled={!isEditing && _id}
                  />
                </div>

                {/* Form Inputs */}
                <div className="col-span-2 md:col-span-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name of Institute<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Institute Name"
                      disabled={!isEditing && _id}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Tagline<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="tagline"
                      value={profile.tagline}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Your school's tagline"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiPhone className="text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Phone Number"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiMail className="text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="school@example.com"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiGlobe className="text-gray-400" />
                    </div>
                    <input
                      type="url"
                      name="website"
                      value={profile.website}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="https://example.com"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiHome className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full address"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    School Type<span className="text-red-500">*</span>
                  </label>
                  <select
                    name="schoolType"
                    value={profile.schoolType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    disabled={!isEditing && _id}
                  >
                    <option value="">Select School Type</option>
                    <option value="Middle">Middle School (8th)</option>
                    <option value="Secondary">Secondary (10th)</option>
                    <option value="Senior Secondary">
                      Senior Secondary (12th)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Established Year<span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="establishedYear"
                      value={profile.establishedYear}
                      onChange={handleInputChange}
                      className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Established Year"
                      disabled={!isEditing && _id}
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {!_id ? (
                  <button
                    onClick={() => handleCreateSchool(profile)}
                    className="flex items-center justify-center bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                  >
                    <FiSave className="mr-2" />
                    Register School
                  </button>
                ) : isEditing ? (
                  <>
                    <button
                      onClick={handleUpdateSchool}
                      className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      <FiSave className="mr-2" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="flex items-center justify-center bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg text-sm font-medium transition-colors"
                    >
                      Cancel
                    </button>
                  </>
                ) : null}
              </div>
            </div>

            {/* School Preview */}
            <div className="bg-gray-800 shadow-xl rounded-xl p-6 w-full lg:w-1/3">
              <h2 className="text-xl font-semibold text-white mb-6 pb-2 border-b border-gray-700">
                School Preview
              </h2>
              
              <div className="flex flex-col items-center">
                <div className="relative w-32 h-32 rounded-full border-2 border-gray-600 overflow-hidden">
                  {profile.logo ? (
                    <img
                      src={profile.logo}
                      alt="School Logo"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-700 text-gray-400">
                      No Logo
                    </div>
                  )}
                </div>
                
                <h3 className="mt-4 text-2xl font-bold text-center text-white">
                  {profile.name || "Your School Name"}
                </h3>
                
                <p className="mt-2 text-sm text-center text-gray-300">
                  {profile.tagline || "Your school's tagline will appear here"}
                </p>
              </div>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start">
                  <FiPhone className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Phone</p>
                    <p className="text-white">
                      {profile.phone || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiMail className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Email</p>
                    <p className="text-white break-all">
                      {profile.email || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiGlobe className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Website</p>
                    <p className="text-white break-all">
                      {profile.website || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiHome className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Address</p>
                    <p className="text-white">
                      {profile.address || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="text-gray-400 mt-1 mr-3 flex-shrink-0 w-5 h-5 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                      <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">School Type</p>
                    <p className="text-white">
                      {profile.schoolType || "Not provided"}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <FiCalendar className="text-gray-400 mt-1 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-xs text-gray-400">Established</p>
                    <p className="text-white">
                      {profile.establishedYear || "Not provided"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolProfile;