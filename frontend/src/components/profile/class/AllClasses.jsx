import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { Link } from "react-router-dom";
import { getAllClasses } from "../../../api/class";
import AdvancedEducationSpinner from "../../Spinner";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";

function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClasses = async () => {
      const response = await getAllClasses();
      setLoading(false);
      if (!response?.classes) {
        console.error(response?.message);
        return;
      }
      setClasses(response?.classes);
    };
    fetchClasses();
  }, []);

  if (loading) {
    return (
      <div className="flex mt-[20%] items-center justify-center h-full">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="">
        <div className="p-6 bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
              All Classes
            </h1>

            {classes.length > 0 ? (
              <div className="p-6 min-h-screen">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {classes.map((classItem, index) => {
                    const totalStudents = classItem.students.length;
                    const girlsPercentage = Math.round(
                      (classItem.students.girls / totalStudents) * 100
                    );
                    const boysPercentage = 100 - girlsPercentage;

                    return (
                      <div
                        key={index}
                        className="bg-gradient-to-b cursor-pointer from-white to-gray-50 rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-6 transform hover:-translate-y-1 relative"
                      >
                        {/* Edit & Delete Icons */}
                        <div className="absolute top-6 right-4 flex space-x-2">
                          <button
                            onClick={() => editClass(index)}
                            className="text-gray-500 hover:text-gray-800 text-2xl transition"
                          >
                            <RiEdit2Fill />
                          </button>
                          <button
                            onClick={() => deleteClass(index)}
                            className="text-red-500 hover:text-red-700 text-2xl transition"
                          >
                           <MdDeleteOutline />
                          </button>
                        </div>

                        {/* Class Information */}
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                          Class: {classItem.className}
                        </h2>
                        <h3 className="text-xl text-gray-500 mb-4">
                          Section: <span className="text-blue-600 font-bold">{classItem.section}</span>
                        </h3>
                        <p className="text-lg flex items-center text-gray-700">
                          Total Students {<h1 className="text-2xl ml-1 text-red-600 mr-1"><GiGraduateCap /></h1> } :{" "} 
                          <span className="font-bold ml-2 text-blue-600">
                            {totalStudents} 
                          </span>
                        </p>
                        <Link to={`/teacher/${classItem?.teacher[0]?.teacherId}`}>
                        <p className="text-lg text-gray-700 mt-2">
                          Class Teacher : {" "}
                          <span className="text-blue-600 font-bold">
                            {classItem?.teacher[0]?.teacherName || "Not Assigned"}
                          </span>
                        </p>
                        </Link>

                        {/* Girls vs Boys Progress */}
                        <div className="flex justify-around mt-6">
                          {/* Girls Progress */}
                          <div className="relative w-24 h-24">
                            <svg className="transform -rotate-90 w-full h-full">
                              <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="10%"
                              />
                              <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="transparent"
                                stroke="#f472b6"
                                strokeWidth="10%"
                                strokeDasharray="282"
                                strokeDashoffset={`${
                                  282 - (282 * girlsPercentage) / 100
                                }`}
                                style={{
                                  transition:
                                    "stroke-dashoffset 0.5s ease-in-out",
                                }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-sm font-semibold text-gray-800">
                                {girlsPercentage}%
                              </span>
                              <span className="text-xs text-pink-500">
                                Girls
                              </span>
                            </div>
                          </div>

                          {/* Boys Progress */}
                          <div className="relative w-24 h-24">
                            <svg className="transform -rotate-90 w-full h-full">
                              <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="transparent"
                                stroke="#e5e7eb"
                                strokeWidth="10%"
                              />
                              <circle
                                cx="50%"
                                cy="50%"
                                r="45%"
                                fill="transparent"
                                stroke="#60a5fa"
                                strokeWidth="10%"
                                strokeDasharray="282"
                                strokeDashoffset={`${
                                  282 - (282 * boysPercentage) / 100
                                }`}
                                style={{
                                  transition:
                                    "stroke-dashoffset 0.5s ease-in-out",
                                }}
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                              <span className="text-sm font-semibold text-gray-800">
                                {boysPercentage}%
                              </span>
                              <span className="text-xs text-blue-500">
                                Boys
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-6 text-center">
                          <button className="px-5 py-2 bg-blue-600 text-white font-semibold rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105">
                            View Details
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex mt-8 items-center justify-center">
                  <Link
                    to={"/register-class"}
                    className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg shadow hover:bg-blue-700 hover:shadow-xl transition-transform transform hover:scale-105"
                  >
                    Register New Class
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <p className="text-lg text-gray-500 mb-6">
                  No class registered yet. Start by adding a new class!
                </p>
                <Link
                  to={"/register-class"}
                  className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register New Class
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllClasses;
