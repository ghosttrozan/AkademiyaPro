import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../../dashboard/Header";
import { getClassById } from "../../../api/class";
import AdvancedEducationSpinner from "../../Spinner";
import { FiArrowLeft, FiUsers, FiCalendar, FiBook, FiDollarSign } from "react-icons/fi";
import { FaChalkboardTeacher, FaBullhorn, FaBook } from "react-icons/fa";
import { GiCash } from "react-icons/gi";
import { Bar, Pie } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js';

// Register chart components
Chart.register(...registerables);

function ClassDetails() {
  const { id } = useParams();
  const [classData, setClassData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchClassData = async () => {
      try {
        const response = await getClassById(id);
        if (response?.success) {
          setClassData(response.class);
        } else {
          setError(response?.message || "Failed to fetch class data");
        }
      } catch (err) {
        setError("An error occurred while fetching class data");
      } finally {
        setLoading(false);
      }
    };

    fetchClassData();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!classData) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <p>Class not found</p>
      </div>
    );
  }

  // Prepare data for charts
  const feeData = {
    labels: ['Yearly Fee', 'Monthly Fee', 'Late Fee'],
    datasets: [
      {
        data: [classData.yearlyFee, classData.monthlyFee, classData.feeDetails.lateFee],
        backgroundColor: ['#4F46E5', '#10B981', '#F59E0B'],
        borderColor: ['#4F46E5', '#10B981', '#F59E0B'],
        borderWidth: 1,
      },
    ],
  };

  const subjectsData = {
    labels: classData.subjects.map(subject => subject.name),
    datasets: [
      {
        data: classData.subjects.map(() => 100), // Equal distribution for demo
        backgroundColor: ['#EC4899', '#3B82F6', '#10B981', '#F59E0B'],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      <div className="container mt-16 mx-auto px-4 py-6">
        {/* Back Button */}
        <Link
          to="/all-classes"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to All Classes
        </Link>

        {/* Class Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="flex items-center">
                <h1 className="text-3xl font-bold text-gray-800">
                  Class {classData.className} - {classData.section}
                </h1>
                <span className={`ml-3 px-3 py-1 text-xs font-semibold rounded-full ${
                  classData.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {classData.status.charAt(0).toUpperCase() + classData.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                Created: {new Date(classData.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-4 md:mt-0 flex space-x-3">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Edit Class
              </button>
              <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
                Delete Class
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "overview" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("overview")}
          >
            <FiBook className="mr-2" />
            Overview
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "students" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("students")}
          >
            <FiUsers className="mr-2" />
            Students ({classData.students.length})
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "fees" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("fees")}
          >
            <FiDollarSign className="mr-2" />
            Fee Structure
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "announcements" ? "text-blue-600 border-b-2 border-blue-600" : "text-gray-500 hover:text-gray-700"}`}
            onClick={() => setActiveTab("announcements")}
          >
            <FaBullhorn className="mr-2" />
            Announcements
          </button>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Class Information */}
              <div className="lg:col-span-2">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Class Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaChalkboardTeacher className="text-blue-500 mr-3" />
                      <h3 className="font-medium text-gray-700">Class Teacher</h3>
                    </div>
                    <Link 
                      to={`/teacher/${classData.teacher[0]?.teacherId}`}
                      className="text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {classData.teacher[0]?.teacherName || "Not Assigned"}
                    </Link>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FiUsers className="text-blue-500 mr-3" />
                      <h3 className="font-medium text-gray-700">Total Students</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">{classData.students.length}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <FaBook className="text-blue-500 mr-3" />
                      <h3 className="font-medium text-gray-700">Subjects</h3>
                    </div>
                    <div className="space-y-1">
                      {classData.subjects.map((subject, index) => (
                        <p key={index} className="text-gray-700">{subject.name}</p>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-center mb-2">
                      <GiCash className="text-blue-500 mr-3" />
                      <h3 className="font-medium text-gray-700">Yearly Fee</h3>
                    </div>
                    <p className="text-2xl font-bold text-gray-800">₹{classData.yearlyFee}</p>
                  </div>
                </div>

                {/* Subjects Distribution Chart */}
                {classData.subjects.length > 0 && (
                  <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Subjects</h3>
                    <div className="h-64">
                      <Pie 
                        data={subjectsData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: {
                            legend: {
                              position: 'right',
                            },
                          },
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Stats */}
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
                
                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-500">
                    <h3 className="font-medium text-gray-700 mb-1">Fee Status</h3>
                    <p className="text-3xl font-bold text-blue-600">
                      {classData.feeDetails.installmentCount} Installment
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      {classData.feeDetails.lateFee > 0 ? 
                        `Late fee: ₹${classData.feeDetails.lateFee}` : 
                        'No late fees'}
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-500">
                    <h3 className="font-medium text-gray-700 mb-1">Class Status</h3>
                    <p className="text-xl font-bold text-green-600">
                      {classData.status === 'active' ? 'Active' : 'Inactive'}
                    </p>
                    <p className="text-sm text-gray-500 mt-1">
                      Since {new Date(classData.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-500">
                    <h3 className="font-medium text-gray-700 mb-1">Recent Activity</h3>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-700">No recent updates</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "students" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Student Roster</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Add Student
                </button>
              </div>

              {classData.students.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Roll No</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {classData.students.map((student, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                                <FiUsers className="text-blue-600" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">{student.name || `Student ${index + 1}`}</div>
                                <div className="text-sm text-gray-500">{student.email || 'No email'}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              index % 2 === 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {index % 2 === 0 ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                            <button className="text-red-600 hover:text-red-900">Remove</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-12">
                  <FiUsers className="mx-auto text-5xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Students Enrolled</h3>
                  <p className="text-gray-500 mb-6">This class currently has no students. Add students to get started.</p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Add First Student
                  </button>
                </div>
              )}
            </div>
          )}

          {activeTab === "fees" && (
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Fee Structure</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-2">Fee Breakdown</h3>
                  <div className="h-64">
                    <Pie 
                      data={feeData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                          },
                          tooltip: {
                            callbacks: {
                              label: function(context) {
                                return `₹${context.raw}`;
                              }
                            }
                          }
                        },
                      }}
                    />
                  </div>
                </div>

                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <h3 className="font-medium text-gray-700 mb-4">Fee Details</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Yearly Fee</p>
                      <p className="text-2xl font-bold text-gray-800">₹{classData.yearlyFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Monthly Fee</p>
                      <p className="text-xl font-medium text-gray-800">₹{classData.monthlyFee}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Installments</p>
                      <p className="text-xl font-medium text-gray-800">{classData.feeDetails.installmentCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 mb-1">Late Fee</p>
                      <p className="text-xl font-medium text-gray-800">₹{classData.feeDetails.lateFee}</p>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-lg font-medium text-gray-700 mb-4">Payment History</h3>
              <div className="bg-gray-50 p-6 rounded-lg text-center">
                <p className="text-gray-500">No payment history available</p>
              </div>
            </div>
          )}

          {activeTab === "announcements" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">Announcements</h2>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  New Announcement
                </button>
              </div>

              {classData.announcements && classData.announcements.length > 0 ? (
                <div className="space-y-4">
                  {classData.announcements.map((announcement, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border-l-4 border-blue-500">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-800">{announcement.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(announcement.date).toLocaleDateString()}
                          </p>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                          </svg>
                        </button>
                      </div>
                      <p className="mt-2 text-gray-700">{announcement.content}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <FaBullhorn className="mx-auto text-5xl text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-700 mb-2">No Announcements</h3>
                  <p className="text-gray-500 mb-6">There are no announcements for this class yet.</p>
                  <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Create First Announcement
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ClassDetails;