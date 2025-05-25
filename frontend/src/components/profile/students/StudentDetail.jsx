import React, { useEffect, useState } from 'react';
import { FiCalendar, FiUser, FiMail, FiPhone, FiBook, FiHome, FiBarChart2, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaVenusMars, FaSchool, FaChalkboardTeacher } from 'react-icons/fa';
import { Line, Radar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale } from 'chart.js';
import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { getStudentById, updateStudent, deleteStudentById } from '../../../api/students';
import { toast, ToastContainer } from 'react-toastify';
import Header from '../../dashboard/Header';
import StudentFormModal from './StudentFormModal'; // You'll need to create this component

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, RadialLinearScale, RadialLinearScale);

const StudentDetails = () => {
  const [student, setStudent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    async function fetchStudent() {
      try {
        const response = await getStudentById(studentId);
        if (response) {
          setStudent(response.student);
        }
      } catch (error) {
        console.error(error);
        toast.error('Failed to fetch student details.');
        navigate('/');
      }
    }
    fetchStudent();
  }, [studentId, navigate]);

  const handleDelete = async () => {
    try {
      await deleteStudentById(studentId);
      toast.success('Student deleted successfully!');
      navigate('/students');
      setStudent([])
       // Redirect to student directory after deletion
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete student.');
    } finally {
      setIsDeleting(false);
    }
  };

  const confirmDelete = () => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this student?</p>
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={() => {
              toast.dismiss();
              setIsDeleting(false);
            }}
            className="px-3 py-1 bg-gray-200 rounded-md"
          >
            Cancel
          </button>
          <button 
            onClick={() => {
              toast.dismiss();
              handleDelete();
            }}
            className="px-3 py-1 bg-red-500 text-white rounded-md"
          >
            Delete
          </button>
        </div>
      </div>,
      {
        autoClose: false,
        closeButton: false,
      }
    );
  };

  // Mock data - replace with real data from your API
  const attendanceData = [
    { date: '2023-03-01', status: 'present' },
    { date: '2023-03-02', status: 'absent' },
    { date: '2023-03-03', status: 'late' },
    // ... more data
  ];

  const performanceData = {
    labels: ['Math', 'Science', 'English', 'History', 'Art'],
    datasets: [{
      label: 'Scores',
      data: [85, 90, 78, 88, 82],
      backgroundColor: 'rgba(99, 102, 241, 0.2)',
      borderColor: 'rgb(99, 102, 241)',
    }]
  };

  const gradeHistory = {
    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
    datasets: [{
      label: 'Overall Grade',
      data: [82, 85, 88, 90],
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4,
    }]
  };

  if (!student) {
    return <div className="min-h-screen bg-gray-50 flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="bg-indigo-600 mt-16 text-white pb-20">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            className="mb-6 flex items-center text-gray-200 hover:text-white"
            onClick={() => window.history.back()}
          >
            ← Back to Directory
          </motion.button>

          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 rounded-full bg-indigo-700 flex items-center justify-center shadow-xl">
              {student?.profilePic ? (
                <img src={student?.profilePic} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <FiUser className="text-4xl" />
              )}
            </div>

            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-4xl font-bold mb-2">
                    {student?.firstName} {student?.lastName}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-200">
                    <span className="flex items-center">
                      <FaSchool className="mr-2" /> Class {student?.className}
                    </span>
                    <span className="flex items-center">
                      <FaVenusMars className="mr-2" /> {student?.gender}
                    </span>
                    <span className="flex items-center">
                      <FiCalendar className="mr-2" /> 
                      {new Date(student?.dateOfBirth).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsEditing(true)}
                    className="p-2 bg-indigo-500 rounded-full hover:bg-indigo-400"
                    title="Edit Student"
                  >
                    <FiEdit2 className="text-white" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={confirmDelete}
                    className="p-2 bg-red-500 rounded-full hover:bg-red-400"
                    title="Delete Student"
                  >
                    <FiTrash2 className="text-white" />
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 -mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Personal Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Personal Details Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiUser className="mr-2 text-indigo-600" /> Personal Details
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <FiMail className="text-gray-500 mr-2" />
                  <span>{student?.contactInfo?.email || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <FiPhone className="text-gray-500 mr-2" />
                  <span>{student?.contactInfo?.phone || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <FiHome className="text-gray-500 mr-2" />
                  <span>{student?.address || 'N/A'}</span>
                </div>
              </div>
            </motion.div>

            {/* Parent/Guardian Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-indigo-600" /> Parents
              </h2>
              <div className="space-y-4">
                {student?.parentContact?.map((parent, index) => (
                  <div key={index} className="border-l-4 border-indigo-100 pl-4">
                    <h3 className="font-medium">{parent?.name}</h3>
                    <p className="text-sm text-gray-600">{parent?.relationship}</p>
                    <div className="text-sm text-gray-600">
                      <p>{parent?.phone}</p>
                      <p>{parent?.email}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Performance */}
          <div className="lg:col-span-2 space-y-6">
            {/* Attendance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <FiCalendar className="mr-2 text-indigo-600" /> Attendance
              </h2>
              <div className="grid grid-cols-7 gap-2 mb-4">
                {attendanceData.map((day, index) => (
                  <div 
                    key={index}
                    className={`h-8 rounded-lg flex items-center justify-center text-sm
                      ${day.status === 'present' ? 'bg-green-100 text-green-800' :
                        day.status === 'absent' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}
                  >
                    {new Date(day.date).getDate()}
                  </div>
                ))}
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-100 mr-2" /> Present
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-red-100 mr-2" /> Absent
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-yellow-100 mr-2" /> Late
                </div>
              </div>
            </motion.div>

            {/* Performance Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold mb-6 flex items-center">
                <FiBarChart2 className="mr-2 text-indigo-600" /> Academic Performance
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Radar Chart */}
                <div>
                  <h3 className="font-medium mb-4">Subject-wise Performance</h3>
                  <Radar data={performanceData} />
                </div>

                {/* Grade Progress */}
                <div>
                  <h3 className="font-medium mb-4">Grade History</h3>
                  <Line data={gradeHistory} />
                </div>
              </div>

              {/* Exam Results Table */}
              <div className="mt-6">
                <h3 className="font-medium mb-4">Recent Exam Results</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left text-gray-600 border-b">
                        <th className="pb-2">Subject</th>
                        <th className="pb-2">Marks</th>
                        <th className="pb-2">Grade</th>
                        <th className="pb-2">Rank</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="py-3">Mathematics</td>
                        <td>92/100</td>
                        <td>A+</td>
                        <td>#2</td>
                      </tr>
                      {/* Add more rows */}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      {isEditing && (
        <StudentFormModal
          student={student}
          onClose={() => setIsEditing(false)}
          setStudent={(data) => setStudent(data)}
        />
      )}
    </div>
  );
};

export default StudentDetails;