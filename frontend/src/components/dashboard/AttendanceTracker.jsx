import React, { useState } from 'react';
import { PiStudentFill, PiChalkboardTeacherFill } from 'react-icons/pi';
import { FaCheckCircle, FaTimesCircle, FaUserPlus } from 'react-icons/fa';
import { MdOutlineEmojiPeople } from 'react-icons/md';

const AttendanceTracker = () => {
  const [absentStudents, setAbsentStudents] = useState([
    { id: 1, name: 'Rahul Sharma', class: '5th A' },
    { id: 2, name: 'Priya Patel', class: '7th B' }
  ]);
  
  const [presentEmployees, setPresentEmployees] = useState([
    { id: 1, name: 'Sunita Gupta', role: 'Math Teacher' },
    { id: 2, name: 'Amit Singh', role: 'Principal' },
    { id: 3, name: 'Neha Verma', role: 'Science Teacher' }
  ]);

  const handleRemoveAbsentStudent = (id) => {
    setAbsentStudents(absentStudents.filter(student => student.id !== id));
  };

  const handleAddEmployeeAttendance = () => {
    // In a real app, this would open a modal/form
    const newEmployee = {
      id: presentEmployees.length + 1,
      name: `New Employee ${presentEmployees.length + 1}`,
      role: 'Staff'
    };
    setPresentEmployees([...presentEmployees, newEmployee]);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
          <MdOutlineEmojiPeople className="text-indigo-500" />
          Daily Attendance
        </h2>
        <span className="text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
          {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' })}
        </span>
      </div>

      <div className="space-y-6">
        {/* Absent Students Section */}
        <div className="border border-red-100 bg-red-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-red-700 flex items-center gap-2">
              <PiStudentFill className="text-red-500" />
              Absent Students ({absentStudents.length})
            </h3>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
              Action Required
            </span>
          </div>
          
          {absentStudents.length === 0 ? (
            <div className="text-center py-4 text-red-500">
              <FaCheckCircle className="mx-auto text-2xl mb-2" />
              <p>Perfect Attendance Today!</p>
              <p className="text-xs text-red-400 mt-1">All students present</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {absentStudents.map(student => (
                <li key={student.id} className="flex justify-between items-center bg-white p-3 rounded-md border border-red-100">
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.class}</p>
                  </div>
                  <button 
                    onClick={() => handleRemoveAbsentStudent(student.id)}
                    className="text-green-500 hover:text-green-700 transition-colors"
                  >
                    <FaCheckCircle />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Present Employees Section */}
        <div className="border border-green-100 bg-green-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-green-700 flex items-center gap-2">
              <PiChalkboardTeacherFill className="text-green-500" />
              Present Staff ({presentEmployees.length})
            </h3>
            <button 
              onClick={handleAddEmployeeAttendance}
              className="text-xs bg-green-100 text-green-700 hover:bg-green-200 px-2 py-1 rounded-full flex items-center gap-1 transition-colors"
            >
              <FaUserPlus size={10} /> Add
            </button>
          </div>
          
          {presentEmployees.length === 0 ? (
            <div className="text-center py-4 text-green-500">
              <FaTimesCircle className="mx-auto text-2xl mb-2" />
              <p>No Attendance Marked Yet</p>
              <p className="text-xs text-green-400 mt-1">Add staff attendance</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {presentEmployees.map(employee => (
                <li key={employee.id} className="flex justify-between items-center bg-white p-3 rounded-md border border-green-100">
                  <div>
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-xs text-gray-500">{employee.role}</p>
                  </div>
                  <span className="text-green-500">
                    <FaCheckCircle />
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-100">
        <div className="text-xs text-gray-500 flex justify-between">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <span>Total Attendance: {presentEmployees.length} staff, {absentStudents.length} absentees</span>
        </div>
      </div>
    </div>
  );
};

export default AttendanceTracker;