import React, { useState, useEffect } from "react";
import { redirect, useNavigate } from "react-router-dom";
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
import { motion } from "framer-motion";
import Header from "../../dashboard/Header";
import { getAllStudents, registerStudent } from "../../../api/students";
import { getAllClasses } from "../../../api/class";
import { ToastContainer, toast } from "react-toastify";
import AdvancedEducationSpinner from "../../Spinner";

const StudentsManagement = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [classes, setClasses] = useState([]);
  const [filters, setFilters] = useState({
    class: "",
    gender: "",
    search: "",
  });

  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    gender: "Male",
    dateOfBirth: "",
    classId: "",
    className: "",
    contactInfo: {
      phone: "",
      email: "",
    },
    profilePicFile: null,
    profilePicPreview: null,
    parentContact: [
      {
        name: "",
        relationship: "",
        phone: "",
        email: "",
      },
    ],
  });

  // Mock data - replace with API call in real implementation
  useEffect(() => {
    async function fetchStudent() {
      const { students } = await getAllStudents();
      const { classes } = await getAllClasses();
      if (!classes) {
        toast.error("first register the class");
        navigate("/register-class");
        return;
      }
      setClasses(classes);
      console.log(classes);
      console.log(students);
      setStudents(students);
      setFilteredStudents(students);
      setLoading(false);
    }
    fetchStudent();
  }, []);

  // Apply filters
  useEffect(() => {
    let result = students;

    if (filters.class) {
      result = result.filter((student) =>
        student.className.includes(filters.class)
      );
    }

    if (filters.gender) {
      result = result.filter((student) => student.gender === filters.gender);
    }

    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (student) =>
          student.firstName.toLowerCase().includes(searchTerm) ||
          student.lastName.toLowerCase().includes(searchTerm) ||
          student.className.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredStudents(result);
  }, [filters, students]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [name]: value,
      },
    }));
  };

  const handleParentChange = (index, e) => {
    const { name, value } = e.target;
    const updatedParents = [...formData.parentContact];
    updatedParents[index] = {
      ...updatedParents[index],
      [name]: value,
    };
    setFormData((prev) => ({
      ...prev,
      parentContact: updatedParents,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const previewUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        profilePicFile: file,
        profilePicPreview: previewUrl,
      }));
    }
  };

  // Clean up object URLs
  useEffect(() => {
    return () => {
      if (formData.profilePicPreview) {
        URL.revokeObjectURL(formData.profilePicPreview);
      }
    };
  }, [formData.profilePicPreview]);

  const addParentContact = () => {
    setFormData((prev) => ({
      ...prev,
      parentContact: [
        ...prev.parentContact,
        { name: "", relationship: "", phone: "", email: "" },
      ],
    }));
  };

  const removeParentContact = (index) => {
    const updatedParents = formData.parentContact.filter((_, i) => i !== index);
    setFormData((prev) => ({
      ...prev,
      parentContact: updatedParents,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Call the API
      const response = await registerStudent(formData);

      console.log("Student registered successfully:", response);

      // Reset form and hide
      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        gender: "Male",
        dateOfBirth: "",
        classId: "",
        className: "",
        contactInfo: {
          phone: "",
          email: "",
        },
        profilePicFile: null,
        profilePicPreview: null,
        parentContact: [
          {
            name: "",
            relationship: "",
            phone: "",
            email: "",
          },
        ],
      });

      setShowAddForm(false);

      // Refresh student list
      const { students } = await getAllStudents();
      setStudents(students);
      setFilteredStudents(students);
    } catch (error) {
      console.error("Error registering student:", error);
      // Handle error (show error message to user)
    }
  };

  const viewStudentDetails = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  console.log(filteredStudents);

  return (
    <div>
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] mt-16 min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
          >
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-indigo-600 rounded-xl shadow-lg">
                <FaUserGraduate className="text-3xl text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-200 font-[Poppins]">
                Student Directory
                <span className="block text-sm text-indigo-300 font-normal mt-1">
                  {students?.length} Registered Students
                </span>
              </h1>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddForm(true)}
              className="mt-4 md:mt-0 bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center"
            >
              <FiPlus className="mr-2 text-lg" />
              Enroll New Student
            </motion.button>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white p-5 rounded-2xl shadow-sm mb-8 border border-indigo-50"
          >
            <div className="flex flex-col md:flex-row gap-4 items-end">
              <div className="flex-1 w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Students
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, class, or contact..."
                    className="pl-10 w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                    value={filters.search}
                    onChange={(e) =>
                      setFilters({ ...filters, search: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <div className="w-full md:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Class
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNy40MSA4LjU5TDEyIDEzLjE3bDQuNTktNC41OEwxOCAxMGwtNiA2LTYtNiAxLjQxLTEuNDF6Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.5rem]"
                    value={filters.class}
                    onChange={(e) =>
                      setFilters({ ...filters, class: e.target.value })
                    }
                  >
                    <option value="">All Classes</option>
                    {classes.map((val) => (
                      <option value={val.className}>
                        Class {val.className}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-48">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Filter by Gender
                  </label>
                  <select
                    className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNNy40MSA4LjU5TDEyIDEzLjE3bDQuNTktNC41OEwxOCAxMGwtNiA2LTYtNiAxLjQxLTEuNDF6Ii8+PC9zdmc+')] bg-no-repeat bg-[right_1rem_center] bg-[length:1.5rem]"
                    value={filters.gender}
                    onChange={(e) =>
                      setFilters({ ...filters, gender: e.target.value })
                    }
                  >
                    <option value="">All Genders</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Students Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredStudents?.map((student, index) => (
              <motion.div
                key={student._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden"
                onClick={() => viewStudentDetails(student._id)}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-14 h-14 rounded-2xl bg-indigo-100 flex items-center justify-center shadow-inner">
                        {student.profilePic ? (
                          <img
                            src={student.profilePic}
                            alt="Profile"
                            className="w-full h-full rounded-2xl object-cover"
                          />
                        ) : (
                          <FiUser className="text-indigo-600 text-2xl" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {student.firstName} {student.lastName}
                        </h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <FaChalkboardTeacher className="text-gray-500 text-sm" />
                          <span className="text-sm text-gray-600">
                            Class {student.className}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FiMail className="text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {student.contactInfo.email}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 p-3 bg-indigo-50 rounded-xl">
                      <div className="p-2 bg-white rounded-lg shadow-sm">
                        <FiPhone className="text-indigo-600" />
                      </div>
                      <span className="text-sm text-gray-700">
                        {student.contactInfo.phone}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-indigo-100 p-4 bg-gradient-to-r from-indigo-50 to-blue-50">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <FiCalendar className="text-gray-500 text-sm" />
                      <span className="text-sm text-gray-600">
                        D.O.B -
                        {new Date(student.dateOfBirth).toLocaleDateString(
                          "en-IN",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        student.gender === "Male"
                          ? "bg-blue-100 text-blue-800"
                          : student.gender === "Female"
                          ? "bg-pink-100 text-pink-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {student.gender}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Add Student Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
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
                        Enroll New Student
                      </h2>
                    </div>
                    <button
                      onClick={() => setShowAddForm(false)}
                      className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      <IoMdClose className="text-2xl" />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Academic Information Section */}
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl shadow-sm">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center space-x-2">
                        <FaSchool className="text-indigo-600" />
                        <span>Academic Information</span>
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Class/Grade <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="classId"
                              value={formData.classId}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
                              required
                            >
                              <option value="">Select Class</option>
                              {classes.map((val) => (
                                <option value={val._id}>
                                  Class - {val.className}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ClassName <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <select
                              name="className"
                              value={formData.className}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
                              required
                            >
                              <option value="">Select Class</option>
                              {classes.map((val) => (
                                <option value={val.className}>
                                  Class - {val.className}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

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
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
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
                            value={formData.lastName}
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
                              value={formData.gender}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none bg-white"
                              required
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
                            Date of Birth{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
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
                                {formData.profilePicPreview ? (
                                  <img
                                    src={formData.profilePicPreview}
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
                                    {formData.profilePicFile
                                      ? formData.profilePicFile.name
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
                              value={formData.contactInfo.email}
                              onChange={handleContactChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
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
                              value={formData.contactInfo.phone}
                              onChange={handleContactChange}
                              className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 pr-10 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                              required
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
                            value={formData.address}
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

                      {formData.parentContact.map((parent, index) => (
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
                                required
                              />
                            </div>

                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Relationship{" "}
                                <span className="text-red-500">*</span>
                              </label>
                              <select
                                name="relationship"
                                value={parent.relationship}
                                onChange={(e) => handleParentChange(index, e)}
                                className="w-full border-2 border-gray-200 rounded-xl py-3 px-4 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
                                required
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
                                required
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
                        onClick={() => setShowAddForm(false)}
                        className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all font-medium"
                      >
                        Cancel Enrollment
                      </motion.button>

                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-xl shadow-md hover:shadow-lg transition-all font-medium"
                      >
                        Complete Enrollment
                      </motion.button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentsManagement;
