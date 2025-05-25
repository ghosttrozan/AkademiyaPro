import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { Link } from "react-router-dom";
import { getAllClasses, updateClass, deleteClass as deleteClassApi } from "../../../api/class";
import AdvancedEducationSpinner from "../../Spinner";
import { RiEdit2Fill } from "react-icons/ri";
import { MdDeleteOutline } from "react-icons/md";
import { GiGraduateCap } from "react-icons/gi";
import { FaChalkboardTeacher, FaUserGraduate, FaUserFriends } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import EditClassModal from "./EditClassModal";
import ConfirmationModal from "./ConfirmationModal";

function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingClass, setEditingClass] = useState(null);
  const [deletingClassId, setDeletingClassId] = useState(null);

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

  const handleEditClass = (classItem) => {
    setEditingClass(classItem);
  };

  const handleSaveClass = async (updatedData) => {
    try {
      const response = await updateClass(editingClass._id, updatedData);
      if (response.success) {
        setClasses(prev => prev.map(cls => 
          cls._id === editingClass._id ? { ...cls, ...updatedData } : cls
        ));
        setEditingClass(null);
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  const handleDeleteClick = (classId) => {
    setDeletingClassId(classId);
  };

  const confirmDelete = async () => {
    try {
      const response = await deleteClassApi(deletingClassId);
      if (response.success) {
        setClasses(prev => prev.filter(cls => cls._id !== deletingClassId));
      } else {
        console.error(response.message);
      }
    } catch (error) {
      console.error("Error deleting class:", error);
    } finally {
      setDeletingClassId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen w-full bg-gray-50">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header />
      
      {/* Edit Class Modal */}
      {editingClass && (
        <EditClassModal
          classData={editingClass}
          onClose={() => setEditingClass(null)}
          onSave={handleSaveClass}
        />
      )}
      
      {/* Delete Confirmation Modal */}
      {deletingClassId && (
        <ConfirmationModal
          message="Are you sure you want to delete this class? This action cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setDeletingClassId(null)}
        />
      )}
      
      <div className="container mt-16 mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Class Management</h1>
            <p className="text-gray-600 mt-2">
              {classes.length} {classes.length === 1 ? "Class" : "Classes"} registered
            </p>
          </div>
          <Link
            to="/register-class"
            className="mt-4 md:mt-0 flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <FiPlusCircle className="mr-2 text-xl" />
            Register New Class
          </Link>
        </div>

        {/* Classes Grid */}
        {classes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {classes.map((classItem, index) => {
              const totalStudents = classItem.students.length || 0;
              const girlsCount = classItem.students.girls || 0;
              const boysCount = totalStudents - girlsCount;
              const girlsPercentage = totalStudents > 0 ? Math.round((girlsCount / totalStudents) * 100) : 0;
              const boysPercentage = totalStudents > 0 ? 100 - girlsPercentage : 0;

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  {/* Class Header */}
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white">
                    <div className="flex justify-between items-center">
                      <h2 className="text-xl font-bold">
                        {classItem.className} - {classItem.section}
                      </h2>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEditClass(classItem)}
                          className="text-white hover:text-blue-100 transition-colors"
                          title="Edit Class"
                        >
                          <RiEdit2Fill size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(classItem._id)}
                          className="text-white hover:text-red-200 transition-colors"
                          title="Delete Class"
                        >
                          <MdDeleteOutline size={20} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Class Body */}
                  <div className="p-6">
                    {/* Teacher Info */}
                    <div className="flex items-center mb-4">
                      <div className="bg-blue-100 p-3 rounded-full mr-4">
                        <FaChalkboardTeacher className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Class Teacher</p>
                        {classItem?.teacher[0]?.teacherId ? (
                          <Link 
                            to={`/teacher/${classItem?.teacher[0]?.teacherId}`} 
                            className="font-medium text-blue-600 hover:text-blue-800 transition-colors"
                          >
                            {classItem?.teacher[0]?.teacherName}
                          </Link>
                        ) : (
                          <span className="font-medium text-gray-500">Not Assigned</span>
                        )}
                      </div>
                    </div>

                    {/* Students Info */}
                    <div className="flex items-center mb-6">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <FaUserGraduate className="text-green-600 text-xl" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Total Students</p>
                        <p className="font-medium text-gray-800">{totalStudents}</p>
                      </div>
                    </div>

                    {/* Gender Distribution */}
                    <div className="mb-6">
                      <h4 className="text-sm font-medium text-gray-500 mb-3 flex items-center">
                        <FaUserFriends className="mr-2 text-gray-400" />
                        Gender Distribution
                      </h4>
                      <div className="flex items-center justify-between">
                        <div className="flex-1 mr-4">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-pink-500" 
                              style={{ width: `${girlsPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-pink-600">
                              Girls ({girlsCount})
                            </span>
                            <span className="text-xs text-pink-600">
                              {girlsPercentage}%
                            </span>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500" 
                              style={{ width: `${boysPercentage}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between mt-1">
                            <span className="text-xs text-blue-600">
                              Boys ({boysCount})
                            </span>
                            <span className="text-xs text-blue-600">
                              {boysPercentage}%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* View Details Button */}
                    <Link
                      to={`/class-details/${classItem._id}`}
                      className="block w-full text-center px-4 py-2 border border-blue-500 text-blue-500 font-medium rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      View Class Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <GiGraduateCap className="mx-auto text-5xl text-gray-300 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No Classes Found
            </h3>
            <p className="text-gray-500 mb-6">
              You haven't registered any classes yet. Start by adding your first class.
            </p>
            <Link
              to="/register-class"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
            >
              <FiPlusCircle className="mr-2 text-xl" />
              Register New Class
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllClasses;