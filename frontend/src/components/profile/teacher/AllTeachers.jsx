import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { getAllTeacher } from "../../../api/teacher";

function EmployeeList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    birthDate: "",
    classes: [],
    contactNumber: "",
    designation: "",
    education: "",
    email: "",
    fatherName: "",
    fullName: { firstName: "", lastName: "" },
    gender: "",
    joiningDate: "",
    role: "Teacher",
    salary: "",
    school: "",
    subjects: [],
    _id: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function getTeachers() {
      const teachers = await getAllTeacher();
      if (teachers.length > 0) {
        setEmployees(teachers);
      }
    }
    getTeachers();
  }, []);

  const handleDeleteEmployee = (id) => {
    setEmployees((prevEmployees) =>
      prevEmployees.filter((employee) => employee.id !== id)
    );
  };

  const handleAddEmployee = () => {
    if (newEmployee.name && newEmployee.role) {
      const newId = employees.length + 1;
      setEmployees([...employees, { id: newId, ...newEmployee }]);
      setNewEmployee({ name: "", role: "", avatar: "", email: "" });
      setIsModalOpen(false);
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    // console.log(employee)
    employee.fullName.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="bg-gradient-to-r from-blue-200 via-blue-400 to-blue-200 min-h-screen">
        <Header />
        <div className="container mt-16 mx-auto p-8">
          <h1 className="text-4xl font-semibold text-white mb-8">
            Employee List
          </h1>

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
              onClick={() => setSearchTerm("")}
            >
              Clear
            </button>
          </div>

          {/* Employee Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <div
                  key={employee._id}
                  className="bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 p-6"
                >
                  <div className="text-center">
                    <img
                      src={employee.avatar || "https://imgs.search.brave.com/sUZwJ20CCZf0kYOx8OffaRakk-cklwF81AKt7Drs-zk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzYwMzkyOS9waG90/by9wb3J0cmFpdC1v/Zi1tYXR1cmUtYnVz/aW5lc3NtYW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWZ3/YldhNjBkOUJfdTEt/N3d3VUhVcS1YUzZQ/VmsteHY3WnBlbUQ4/S0MyX2c9"}
                      alt={`${employee.fullName.firstName} ${employee.fullName.lastName}`}
                      className="rounded-full w-32 h-32 mx-auto mt-4 mb-6 shadow-lg"
                    />
                    <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                      {employee.fullName.firstName} {employee.fullName.lastName}
                    </h3>
                    <p className="text-xl text-gray-600 mb-2">
                      {employee.role}
                    </p>
                    <p className="text-lg text-gray-500 mb-4">
                      {employee.email}
                    </p>
                    <p className="text-lg text-gray-500">
                      {employee.contactNumber || "N/A"}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex justify-center mt-4 space-x-4">
                      {/* View Teacher Button */}
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-300"
                        onClick={() =>
                          alert("View Teacher functionality to be implemented")
                        }
                      >
                        View
                      </button>

                      {/* Edit Button */}
                      <button
                        className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded transition-all duration-300"
                        onClick={() =>
                          alert("Edit functionality to be implemented")
                        }
                      >
                        Edit
                      </button>

                      {/* Delete Button */}
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-all duration-300"
                        onClick={() => handleDeleteEmployee(employee._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full text-center p-10">
                <div className="bg-red-100 text-red-600 p-6 rounded-lg shadow-md inline-block">
                  <h3 className="text-3xl font-bold mb-4">No Teachers Found</h3>
                  <p className="text-lg text-gray-600">
                    We couldn't find any teacher in your school. Please try
                    again later.
                  </p>
                </div>
              </div>
            )}
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
                <h2 className="text-2xl font-semibold mb-4">
                  Add New Employee
                </h2>
                <input
                  type="text"
                  placeholder="Name"
                  value={newEmployee.name}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, name: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={newEmployee.role}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, role: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                />
                <input
                  type="text"
                  placeholder="Avatar URL"
                  value={newEmployee.avatar}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, avatar: e.target.value })
                  }
                  className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newEmployee.email}
                  onChange={(e) =>
                    setNewEmployee({ ...newEmployee, email: e.target.value })
                  }
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
    </div>
  );
}

export default EmployeeList;
