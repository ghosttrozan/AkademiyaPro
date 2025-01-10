import React, { useState } from 'react';

function AttendanceTracker() {
  const [absentStudents, setAbsentStudents] = useState([]);
  const [presentEmployees, setPresentEmployees] = useState([]);

  const handleAbsentStudent = (student) => {
    // Logic to add or remove student from absentStudents array
  };

  const handlePresentEmployee = (employee) => {
    // Logic to add or remove employee from presentEmployees array
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-gray-100 p-4 rounded-lg mb-4">
        <h2 className="text-lg font-semibold mb-2">Today Absent Students</h2>
        {absentStudents.length === 0 ? (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>No Student Absent Today Yet!</p>
          </div>
        ) : (
          <ul className="list-disc pl-4">
            {absentStudents.map((student, index) => (
              <li key={index}>{student}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-2">Today Present Employees</h2>
        {presentEmployees.length === 0 ? (
          <div className="text-center text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p>Attendance Not Marked Yet!</p>
          </div>
        ) : (
          <ul className="list-disc pl-4">
            {presentEmployees.map((employee, index) => (
              <li key={index}>{employee}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default AttendanceTracker;
