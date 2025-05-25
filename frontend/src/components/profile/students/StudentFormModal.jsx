import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiPlus,
  FiSearch,
  FiUser,
  FiCalendar,
  FiMail,
  FiPhone,
  FiUpload,
} from "react-icons/fi";
import {
  FaVenusMars,
  FaSchool,
  FaUserGraduate,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { updateStudent } from "../../../api/students";
import { toast, ToastContainer } from "react-toastify";
import axios from 'axios';

const BASE_URL = import.meta.env;

const StudentFormModal = ({ student, onClose, setStudent }) => {
  const [ studentData, setstudentData] = useState({
    firstName: student?.firstName || "",
    lastName: student?.lastName || "",
    address: student?.address || "",
    gender: student?.gender || "",
    dateOfBirth: student?.dateOfBirth || "",
    contactInfo: {
      phone: student?.contactInfo?.phone || "",
      email: student?.contactInfo?.email || "",
    },
    profilePicFile: student?.profilePicFile,
    profilePicPreview: student?.profilePicPreview,
    parentContact: [
      {
        name: student?.parentContact[0]?.name || "",
        relationship: student?.parentContact[0]?.relationship || "",
        phone: student?.parentContact[0]?.phone || "",
        email: student?.parentContact[0]?.email || "",
      },
    ],
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setstudentData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setstudentData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleParentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParents = [... studentData.parentContact];
    updatedParents[index] = {
      ...updatedParents[index],
      [name]: value,
    };
    setstudentData((prev) => ({
      ...prev,
      parentContact: updatedParents,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setstudentData((prev) => ({
        ...prev,
        profilePicFile: file,
        profilePicPreview: previewUrl,
      }));
    }
  };

  const addParentContact = () => {
    setstudentData((prev) => ({
      ...prev,
      parentContact: [
        ...prev.parentContact,
        { name: "", relationship: "", phone: "", email: "" },
      ],
    }));
  };

  const removeParentContact = (index) => {
    const updatedParents =  studentData.parentContact.filter((_, i) => i !== index);
    setstudentData((prev) => ({
      ...prev,
      parentContact: updatedParents,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    
    try {
      const formData = new FormData();
      
      // Append simple fields
      formData.append('firstName', studentData.firstName || '');
      formData.append('lastName', studentData.lastName || '');
      formData.append('gender', studentData.gender || '');
      formData.append('dateOfBirth', studentData.dateOfBirth || '');
      formData.append('address', studentData.address || '');
  
      // Ensure nested objects exist and have proper defaults
      const contactInfo = studentData.contactInfo || {};
      const parentContact = studentData.parentContact || [];
      
      // Stringify with proper error handling
      formData.append('contactInfo', JSON.stringify({
        email: contactInfo.email || '',
        phone: contactInfo.phone || ''
      }));
      
      formData.append('parentContact', JSON.stringify(
        parentContact.map(parent => ({
          name: parent.name || '',
          relationship: parent.relationship || '',
          phone: parent.phone || '',
          email: parent.email || ''
        }))
      ));
      
      // Append profile picture if it exists
      if (studentData.profilePicFile) {
        formData.append('profilePic', studentData.profilePicFile);
      }
  
      const response = await fetch(`${BASE_URL.VITE_BASE_URL_UPDATE_STUDENT}/${student._id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update student');
      }
  
      const data = await response.json();
      console.log(data)
      setStudent(data.student);
      toast.success('Student updated successfully!');
      onClose(true);
    } catch (error) {
      console.error('Error updating student:', error);
      toast.error(error.message || 'Failed to update student');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
       <ToastContainer position="top-center" autoClose={3000} />
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
                <FaUserGraduate className="text-2xl text-white" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">
                Update Student
              </h2>
            </div>
            <button
              onClick={() => onClose(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <IoMdClose className="text-2xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Personal Details Section */}  
            <div className="p-6 bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FaVenusMars className="text-pink-600" />
                <span>Personal Details</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      name="firstName"
                      value={ studentData.firstName}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                       
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiUser className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={ studentData.lastName}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      name="gender"
                      value={ studentData.gender}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
                      
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FaVenusMars className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={ studentData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                       
                      max={new Date().toISOString().split("T")[0]}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <FiCalendar className="text-gray-400" />
                    </div>
                  </div>
                </div>

                {/* Profile Picture Upload */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profile Picture
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="relative group">
                      <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden border-2 border-gray-300 group-hover:border-indigo-500 transition-colors">
                        { studentData.profilePicPreview ? (
                          <img
                            src={ studentData.profilePicPreview}
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <FiUser className="text-gray-400 text-2xl" />
                        )}
                      </div>
                      <input
                        type="file"
                        id="profilePicInput"
                        name="profilePic"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="border-2 border-gray-200 border-dashed rounded-xl p-4 text-center hover:border-indigo-500 transition-colors">
                        <label
                          htmlFor="profilePicInput"
                          className="cursor-pointer"
                        >
                          <FiUpload className="mx-auto text-gray-400 mb-2" />
                          <p className="text-sm text-gray-600">
                            { studentData.profilePicFile
                              ?  studentData.profilePicFile.name
                              : "Click to upload or drag and drop"}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG up to 2MB
                          </p>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FiPhone className="text-blue-600" />
                <span>Contact Information</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={ studentData.contactInfo.email}
                      onChange={handleContactChange}
                      className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                       
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiMail className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      name="phone"
                      value={ studentData.contactInfo.phone}
                      onChange={handleContactChange}
                      className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                       
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <FiPhone className="text-gray-400" />
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={ studentData.address}
                    onChange={handleInputChange}
                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    placeholder="Enter full address..."
                  />
                </div>
              </div>
            </div>

            {/* Parent/Guardian Section */}
            <div className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                <FaChalkboardTeacher className="text-green-600" />
                <span>Parent/Guardian Details</span>
              </h3>

              { studentData.parentContact.map((parent, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-4 rounded-xl shadow-sm mb-4 relative"
                >
                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => removeParentContact(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <IoMdClose className="text-lg" />
                    </button>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={parent.name}
                        onChange={(e) => handleParentChange(index, e)}
                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                         
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship <span className="text-red-500">*</span>
                      </label>
                      <select
                        name="relationship"
                        value={parent.relationship}
                        onChange={(e) => handleParentChange(index, e)}
                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                         
                      >
                        <option value="">Select Relationship</option>
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Guardian">Guardian</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={parent.phone}
                        onChange={(e) => handleParentChange(index, e)}
                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                         
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={parent.email}
                        onChange={(e) => handleParentChange(index, e)}
                        className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>
                </motion.div>
              ))}

              <button
                type="button"
                onClick={addParentContact}
                className="w-full py-2 border-2 border-dashed border-gray-300 rounded-xl hover:border-indigo-500 text-gray-500 hover:text-indigo-600 transition-all"
              >
                <FiPlus className="inline mr-2" />
                Add Another Parent/Guardian
              </button>
            </div>

            {/* Form Actions */}
            <div className="mt-8 flex justify-end space-x-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => onClose(false)}
                className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
              >
                Cancel
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
              >
                Complete Updation
              </motion.button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default StudentFormModal;
