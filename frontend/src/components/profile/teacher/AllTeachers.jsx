import React, { useEffect, useState } from 'react';
import Header from '../../dashboard/Header';
import { getAllTeacher } from '../../../api/teacher';

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Aakash', role: 'Teacher', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', email: 'aakash@example.com' },
    { id: 2, name: 'Priya', role: 'Teacher', avatar: 'https://randomuser.me/api/portraits/women/2.jpg', email: 'priya@example.com' },
    { id: 3, name: 'Ravi', role: 'Administrator', avatar: 'https://randomuser.me/api/portraits/men/2.jpg', email: 'ravi@example.com' },
    { id: 4, name: 'Neha', role: 'Counselor', avatar: 'https://randomuser.me/api/portraits/women/3.jpg', email: 'neha@example.com' },
  ]);
  const [newEmployee, setNewEmployee] = useState({ name: '', role: '', avatar: '', email: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect( () => {
    async function getTeachers () {
      const response = await getAllTeacher();
      console.log(response)
    }
    getTeachers();
  },[])

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) => prevEmployees.filter((employee) => employee.id !== id));
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      const newId = employees.length + 1;
      setEmployees([...employees, { id: newId, ...newEmployee }]);
      setNewEmployee({ name: '', role: '', avatar: '', email: '' });
      setIsModalOpen(false);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 min-h-screen">
      <Header />
      <div className="container mt-16 mx-auto p-8">
        <h1 className="text-4xl font-semibold text-white mb-8">Employee List</h1>

        {/* Search Bar Section */}
        <div className="flex items-center mb-6">
          <input
            type="text"
            placeholder="Search Employees"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 rounded-md px-6 py-3 w-full md:w-1/2 lg:w-1/3 mr-4 focus:ring-2 focus:ring-indigo-500"
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-6 rounded transition-all duration-300"
            onClick={() => setSearchTerm('')}
          >
            Clear
          </button>
        </div>

        {/* Employee Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredEmployees.map((employee) => (
            <div
              key={employee.id}
              className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 p-4"
            >
              <img
                src={employee.avatar}
                alt={employee.name}
                className="rounded-full w-24 h-24 mx-auto mt-4 mb-6 shadow-md"
              />
              <div className="text-center">
                <h3 className="text-2xl font-semibold text-gray-800">{employee.name}</h3>
                <p className="text-lg text-gray-600">{employee.role}</p>
                <p className="text-sm text-gray-500">{employee.email}</p>
                <div className="flex justify-center mt-4 space-x-4">
                  <button
                    className="text-yellow-500 hover:text-yellow-700 transition-colors duration-300"
                    onClick={() => alert('Edit functionality to be implemented')}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 transition-colors duration-300"
                    onClick={() => handleDeleteEmployee(employee.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add New Employee Button */}
        <div className="mt-8 flex justify-center">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300"
            onClick={() => setIsModalOpen(true)}
          >
            Add New Employee
          </button>
        </div>

        {/* Modal for Adding New Employee */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg w-1/3">
              <h2 className="text-2xl font-semibold mb-4">Add New Employee</h2>
              <input
                type="text"
                placeholder="Name"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Role"
                value={newEmployee.role}
                onChange={(e) => setNewEmployee({ ...newEmployee, role: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
              />
              <input
                type="text"
                placeholder="Avatar URL"
                value={newEmployee.avatar}
                onChange={(e) => setNewEmployee({ ...newEmployee, avatar: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
              />
              <input
                type="email"
                placeholder="Email"
                value={newEmployee.email}
                onChange={(e) => setNewEmployee({ ...newEmployee, email: e.target.value })}
                className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
              />
              <div className="flex justify-between">
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleAddEmployee}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default EmployeeList;
