import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { getTeacherById, updateTeacher } from "../../../api/teacher";
import { useParams, useNavigate } from "react-router-dom";
import AdvancedEducationSpinner from "../../Spinner";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { ToastContainer, toast } from 'react-toastify';

function UpdateTeacher() {
  const [teacher, setTeacher] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState("");
  const [profilePicture, setProfilePicture] = useState(
    "https://eskooly.com/bb/uploads/employees/no-image.png"
  ); // Default image URL

  const { id } = useParams();
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const teacherData = await getTeacherById(id);
        if (teacherData?.success) {
          setTeacher(teacherData.teacher);
        } else {
          setError("Failed to fetch teacher data");
        }
      } catch (err) {
        setError("An error occurred while fetching teacher data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstName" || name === "lastName") {
      // Handle nested fullName object
      setTeacher({
        ...teacher,
        fullName: {
          ...teacher.fullName,
          [name]: value,
        },
      });
    } else {
      setTeacher({ ...teacher, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !teacher.fullName.firstName ||
      !teacher.fullName.lastName ||
      !teacher.email ||
      !teacher.contactNumber ||
      !teacher.designation ||
      !teacher.education ||
      !teacher.salary ||
      !teacher.address
    ) {
      setFormError("Please fill in all the fields.");
      return;
    }
    setFormError("");
    console.log(teacher)
    try {
      const data  = await updateTeacher(id, teacher);
      if (data?.data?.success) {
        toast.success("Teacher details updated successfully!");
        navigate("/all-teachers"); // Navigate back to teacher list
      } else {
        toast.error("email or phone allready registered !");
      }
    } catch (err) {
      toast.error("An error occurred while updating teacher details.");
    }
  };

  // Handle profile picture change
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(URL.createObjectURL(file)); // Create a local URL for the selected image
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full mt-[20%]">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div>
      <ToastContainer />
      <Header />
      <div className="min-h-screen bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] pt-20 flex gap-10 justify-center mx-auto flex items-center bg-gray-100 p-4">
        <div className="bg-gradient-to-br from-indigo-50 via-white to-indigo-100 shadow-xl rounded-lg p-6 w-full max-w-3xl">
          <button
            onClick={() => navigate(-1)} // Navigate back to previous page
            className="text-indigo-600 flex items-center mb-4 hover:text-indigo-800"
          >
            <IoChevronBackCircleSharp className="mr-2 text-3xl" /> Go Back
          </button>
          <h2 className="text-3xl font-extrabold text-indigo-700 mb-6 text-center">
            Update Teacher Details
          </h2>
          {formError && (
            <p className="text-center text-red-500 mb-4">{formError}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Picture */}
            <div className="flex flex-col items-center mb-6">
              <img
                src={profilePicture}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <input
                type="file"
                name="profilePicture"
                id="profilePicture"
                accept="image/*"
                onChange={handleProfilePictureChange}
                className="px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
              />
            </div>

            {/* Name */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="firstName"
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={teacher.fullName?.firstName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's first name"
                  required
                />
              </div>
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="lastName"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={teacher.fullName?.lastName || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's last name"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={teacher.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's email"
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="contactNumber"
                >
                  Phone
                </label>
                <input
                  type="tel"
                  name="contactNumber"
                  id="contactNumber"
                  value={teacher.contactNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's phone"
                  required
                />
              </div>
            </div>

            {/* Designation and Education */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="designation"
                >
                  Designation
                </label>
                <input
                  type="text"
                  name="designation"
                  id="designation"
                  value={teacher.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's designation"
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="education"
                >
                  Education
                </label>
                <input
                  type="text"
                  name="education"
                  id="education"
                  value={teacher.education}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's education"
                  required
                />
              </div>
            </div>

            {/* Salary and Address */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="salary"
                >
                  Salary
                </label>
                <input
                  type="number"
                  name="salary"
                  id="salary"
                  value={teacher.salary}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's salary"
                  required
                />
              </div>

              <div className="flex-1">
                <label
                  className="block text-sm font-medium text-indigo-800 mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={teacher.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-indigo-300 rounded-lg shadow-md focus:outline-none focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition"
                  placeholder="Enter teacher's address"
                  required
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              >
                Update Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateTeacher;
