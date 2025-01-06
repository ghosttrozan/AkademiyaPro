import React, { useState, useEffect } from 'react';
import Header from '../../dashboard/Header';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { createSchool } from '../../../api/authentication';

function SchoolProfile() {
  const principalId = useSelector((state) => state.principal._id);
  const { _id, name, logo, contactNumber, address, establishedYear, schoolType, tagLine, schoolEmail, schoolWebsite } = useSelector((state) => state.school);

  const [profile, setProfile] = useState({
    logo: logo || '',
    name: name || '',
    tagline: tagLine || '',
    phone: contactNumber || "XXXXXXXXXX",
    email: schoolEmail || "example@gmail.com",
    website: schoolWebsite || "www.example.com",
    address: address || "",
    schoolType: schoolType || "",
    establishedYear: establishedYear || ""
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
        establishedYear
      });
    }
  }, [_id, logo, name, tagLine, contactNumber, schoolEmail, schoolWebsite, address, schoolType, establishedYear]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfile({ ...profile, logo: reader.result });
      reader.readAsDataURL(file);
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

    if (!profile.name || !profile.tagline || !profile.phone || !profile.email || !profile.website || !profile.address || !profile.schoolType || !profile.establishedYear) {
      toast.error("All fields are required");
      return;
    }

    if (!validateEmail(profile.email)) {
      toast.error("Invalid Email");
      return;
    }

    if (!validateMobileNumber(profile.phone)) {
      toast.error("Invalid contact number. Please enter a 10-digit mobile number.");
      return;
    }

    const res = await createSchool(profile, principalId);
    if (res) {
      toast.success("School created successfully");
    } else {
      toast.error("Already registered");
    }
  }

  const handleUpdateSchool = async () => {
    const res = await createSchool(profile, principalId);  // Use an update API if available.
    if (res) {
      toast.success("School updated successfully");
    } else {
      toast.error("Failed to update");
    }
  };

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6">Update Profile</h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-2/3">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">School Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Logo Upload */}
              <div className="col-span-2 md:col-span-1 flex flex-col items-center justify-center">
                <div className="w-32 h-32 border-2 border-dashed rounded-full flex items-center justify-center">
                  {profile.logo ? (
                    <img
                      src={profile.logo}
                      alt="Logo"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-sm text-gray-400">Your Logo Here</span>
                  )}
                </div>
                <label
                  htmlFor="logo"
                  className="mt-2 bg-purple-500 text-white px-4 py-2 rounded-md cursor-pointer text-sm hover:bg-purple-600 transition"
                >
                  Change Logo
                  <input
                    type="file"
                    id="logo"
                    accept="image/*"
                    className="hidden"
                    onChange={handleLogoChange}
                  />
                </label>
              </div>

              {/* Form Inputs */}
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Name of Institute<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Institute Name"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Target Line<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="tagline"
                  value={profile.tagline}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Target Line"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Phone Number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Website
                </label>
                <input
                  type="text"
                  name="website"
                  value={profile.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Website URL"
                />
              </div>

              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Address<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={profile.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  School Type<span className="text-red-500">*</span>
                </label>
                <select
                  name="schoolType"
                  value={profile.schoolType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                >
                  <option value="">Select Standard</option>
                  <option value="Middle">Middle School  (8th)</option>
                  <option value="Secondary">Secondary (10th)</option>
                  <option value="Senior Secondary">Senior Secondary (12th)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">
                  Established Year<span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="establishedYear"
                  value={profile.establishedYear}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Established Year"
                />
              </div>
            </div>
            <div className='flex gap-4'>
              <button
                onClick={() => handleCreateSchool(profile)}
                className={`mt-6 ${_id ? "bg-green-300" : "bg-green-600 hover:bg-green-800"} text-white px-4 py-2 rounded-md text-sm transition`}
              >
                Register School
              </button>
              {_id && (
                <button
                  onClick={handleUpdateSchool}
                  className="mt-6 bg-yellow-600 text-white px-4 py-2 rounded-md text-sm hover:bg-yellow-800 transition"
                >
                  Update School
                </button>
              )}
            </div>
          </div>

          {/* School Preview */}
          <div className="bg-white shadow-lg rounded-lg p-6 w-full lg:w-1/3">
            <h2 className="text-lg font-semibold text-gray-700 mb-6">School Preview</h2>
            <div className="flex flex-col items-center">
              <div className="w-24 h-24 border-2 rounded-full overflow-hidden">
                {profile.logo ? (
                  <img
                    src={`${profile.logo}`}
                    alt="Logo"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full text-gray-400">
                    Your Logo Here
                  </div>
                )}
              </div>
              <h3 className="mt-2 text-xl font-semibold text-gray-700">{profile.name}</h3>
              <p className="text-sm text-center break-words text-gray-500 w-full">{profile.tagline}</p>

            </div>
            <div className="mt-4 flex flex-col gap-4 text-lg text-gray-600">
              <p>
                <strong>Phone No:</strong> {profile.phone}
              </p>
              <p>
                <strong>Email:</strong> {profile.email}
              </p>
              <p>
                <strong>Website:</strong> {profile.website || "----------"}
              </p>
              <p>
                <strong>Address:</strong> {profile.address || "----------"}
              </p>
              <p>
                <strong>School Standard :</strong> {profile.schoolType || "----------"}
              </p>
              <p>
                <strong>Established Year :</strong> {profile.establishedYear || "----------"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SchoolProfile;
