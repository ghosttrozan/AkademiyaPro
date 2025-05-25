import React, { useEffect, useState } from "react";
import { RiCloseLine } from "react-icons/ri";
import { getAllTeacher } from "../../../api/teacher";
import { motion, AnimatePresence } from "framer-motion";
import { updateClass } from "../../../api/class";

const EditClassModal = ({ classData, onClose, onSave }) => {
  const [teachers, setTeachers] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchTeachers() {
      try {
        const response = await getAllTeacher();
        setTeachers(response || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
      }
    }
    fetchTeachers();
  }, []);

  const [formData, setFormData] = useState({
    className: classData.className || "",
    section: classData.section || "",
    teacherId: classData.teacher[0]?.teacherId || "",
    teacherName: classData.teacher[0]?.teacherName || "Select Teacher",
    monthlyFee: classData.monthlyFee || 0,
    yearlyFee: classData.yearlyFee || 0,
    status: classData.status || "active"
  });

  const filteredTeachers = teachers.filter(teacher =>
    teacher.fullName.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: name === "monthlyFee" || name === "yearlyFee" ? Number(value) : value 
    }));
  };

  const handleTeacherSelect = (teacher) => {
    setFormData({
      ...formData,
      teacherId: teacher._id,
      teacherName: teacher.fullName.firstName + " " + teacher.fullName.lastName
    });
    setIsDropdownOpen(false);
    setSearchTerm("");
  };

  const handleStatusChange = (e) => {
    setFormData({
      ...formData,
      status: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedClass = {
        className: formData.className,
        section: formData.section,
        teacherId: formData.teacherId,
        teacherName: formData.teacherName,
        monthlyFee: formData.monthlyFee,
        yearlyFee: formData.yearlyFee,
        status: formData.status
      };
      
      const response = await updateClass(classData._id, updatedClass);
      console.log("Update response:", response);
      
      if (response) {
        onSave({
          ...updatedClass,
          _id: classData._id,
          teacher: formData.teacherId ? [{
            teacherId: formData.teacherId,
            teacherName: formData.teacherName,
            _id: classData.teacher[0]?._id || ""
          }] : []
        });
      }
    } catch (error) {
      console.error("Error updating class:", error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -20, opacity: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
      >
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <h3 className="text-xl font-bold text-gray-800">Edit Class</h3>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RiCloseLine size={24} />
          </button>
        </div>
        
        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Class Name
            </label>
            <input
              type="text"
              name="className"
              value={formData.className}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Section
            </label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Monthly Fee
            </label>
            <input
              type="number"
              name="monthlyFee"
              value={formData.monthlyFee}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              min="0"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Yearly Fee
            </label>
            <input
              type="number"
              name="yearlyFee"
              value={formData.yearlyFee}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              min="0"
            />
          </div>
          
          <div className="mb-6 relative">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Teacher
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full text-left px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-between items-center"
              >
                <span className={formData.teacherId ? "text-gray-800" : "text-gray-400"}>
                  {formData.teacherName}
                </span>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute z-20 mt-1 w-full bg-white shadow-lg rounded-md py-1 border border-gray-200 max-h-60 overflow-auto"
                  >
                    <div className="px-3 py-2 sticky top-0 bg-white">
                      <input
                        type="text"
                        placeholder="Search teachers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        autoFocus
                      />
                    </div>
                    {filteredTeachers.length > 0 ? (
                      filteredTeachers.map((teacher) => (
                        <motion.div
                          key={teacher._id}
                          whileHover={{ backgroundColor: "#f3f4f6" }}
                          className="px-3 py-2 cursor-pointer"
                          onClick={() => handleTeacherSelect(teacher)}
                        >
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                              {teacher.fullName.firstName.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {teacher.fullName.firstName} {teacher.fullName.lastName}
                              </p>
                              <p className="text-xs text-gray-500">{teacher.teacherId}</p>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="px-3 py-2 text-sm text-gray-500 text-center">
                        No teachers found
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleStatusChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="archived">Archived</option>
            </select>
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <motion.button
              type="button"
              onClick={onClose}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </motion.button>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Save Changes
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default EditClassModal;