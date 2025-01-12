import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { deleteTeacher, getAllTeacher, registerTeacher } from "../../../api/teacher";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import AdvancedEducationSpinner from "../../Spinner";

function EmployeeList() {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    birthDate: "",
    contactNumber: "",
    designation: "",
    education: "",
    email: "",
    fatherName: "",
    fullName: { firstName: "", lastName: "" },
    address: "",
    password: "",
    gender: "",
    salary: "",
    subjects: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTeacherId, setSelectedTeacherId] = useState(null);
  const [selectedTeacherName, setSelectedTeacherName] = useState(null);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    async function getTeachers() {
      const teachers = await getAllTeacher();
      if (teachers.length) {
        console.log("teachers Data : ", teachers);
        setEmployees(teachers);
        setLoading(false);
      }
    }
    getTeachers();
  }, []);

  const handleDeleteEmployee = async (teacherId) => {
    const res = await deleteTeacher(teacherId);
    if(res){
      toast.success("Teacher deleted successfully");
      setEmployees(employees.filter((teacher) => teacher._id!== teacherId));
    }
    if(!res){
      toast.error("Failed to delete teacher");
    }
    handleCloseModal();
  };

  const handleAddTeacher = async () => {
    if (
      newEmployee.fullName.firstName &&
      newEmployee.address &&
      newEmployee.contactNumber &&
      newEmployee.gender &&
      newEmployee.password &&
      newEmployee.salary
    ) {
      const newTeacher = await registerTeacher(newEmployee);

      if (newTeacher?.success) {
        setEmployees((prev) => [...prev, newTeacher.teacher]);
        toast.success(newTeacher?.msg);
        setNewEmployee({
          birthDate: "",
          contactNumber: "",
          designation: "",
          education: "",
          email: "",
          fatherName: "",
          fullName: { firstName: "", lastName: "" },
          address: "",
          password: "",
          gender: "",
          salary: "",
          subjects: [],
        });
        setIsModalOpen(false);
        return;
      }
      if (!newTeacher?.success) {
        toast.error(newTeacher?.msg);
        return;
      }
    } else {
      toast.error("All fields are required Try again");
    }
  };

  const filteredEmployees = employees.filter((employee) =>
    // console.log(employee)
    employee.fullName.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteClick = (teacherId , Name) => {
    setSelectedTeacherId(teacherId);
    setSelectedTeacherName(Name);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedTeacherId(null);
  };

  const DeleteTeacherModal = ({ isOpen, onClose, onDelete, teacherId }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-80">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-xl text-gray-600"
          >
            &times;
          </button>
          <h2 className="text-lg font-semibold text-center">Are you sure you want to remove {selectedTeacherName}  ?</h2>
          <div className="flex justify-between mt-4">
            <button
              onClick={() => onDelete(teacherId)}
              className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            >
              Yes, Delete
            </button>
            <button
              onClick={onClose}
              className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };


  return (
    <div>
      <ToastContainer />
      {loading ? (
        <div className="flex items-center justify-center h-full w-full mt-[20%]">
          <AdvancedEducationSpinner />
        </div>
      ) : (
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
                        src={
                          employee.avatar ||
                          "https://imgs.search.brave.com/sUZwJ20CCZf0kYOx8OffaRakk-cklwF81AKt7Drs-zk/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMy/NzYwMzkyOS9waG90/by9wb3J0cmFpdC1v/Zi1tYXR1cmUtYnVz/aW5lc3NtYW4uanBn/P3M9NjEyeDYxMiZ3/PTAmaz0yMCZjPWZ3/YldhNjBkOUJfdTEt/N3d3VUhVcS1YUzZQ/VmsteHY3WnBlbUQ4/S0MyX2c9"
                        }
                        alt={`${employee.fullName.firstName} ${employee.fullName.lastName}`}
                        className="rounded-full w-32 h-32 mx-auto mt-4 mb-6 shadow-lg"
                      />
                      <h3 className="text-3xl font-semibold text-gray-800 mb-2">
                        {employee.fullName.firstName}{" "}
                        {employee.fullName.lastName}
                      </h3>
                      <p className="text-xl text-gray-600 mb-2">
                        {employee.designation}
                      </p>
                      <p className="text-lg text-gray-500 mb-2">
                        {employee.email}
                      </p>
                      <p className="text-lg text-gray-500">
                        +91-{employee.contactNumber || "N/A"}
                      </p>

                      {/* Action Buttons */}
                      <div className="flex justify-center mt-4 space-x-4">
                        {/* View Teacher Button */}
                        <Link to={`/teacher/${employee._id}`}>
                          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded transition-all duration-300">
                            View
                          </button>
                        </Link>

                        {/* Edit Button */}
                        <Link to={`/update-teacher/${employee._id}`}>
                          <button className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-6 rounded transition-all duration-300">
                            Edit
                          </button>
                        </Link>

                        {/* Delete Button */}
                        <button
                          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded transition-all duration-300"
                          onClick={() => handleDeleteClick(employee._id , employee.fullName.firstName)}
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
                    <h3 className="text-3xl font-bold mb-4">
                      No Teachers Found
                    </h3>
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
                <div className="bg-white p-6 rounded-lg w-2/3">
                  <div className="flex mb-4 justify-between w-full">
                    <h2 className="text-2xl font-semibold">Add New Teacher</h2>
                    <h3 className="text-red-400">*All fields are required</h3>
                  </div>
                  <form className="grid grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        type="text"
                        required
                        placeholder="First Name"
                        value={newEmployee.fullName.firstName}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            fullName: {
                              ...newEmployee.fullName,
                              firstName: e.target.value,
                            },
                          })
                        }
                        className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={newEmployee.fullName.lastName}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            fullName: {
                              ...newEmployee.fullName,
                              lastName: e.target.value,
                            },
                          })
                        }
                        className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                      />
                    </div>

                    {/* Email */}
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={newEmployee.email}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          email: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Contact Number */}
                    <input
                      type="text"
                      required
                      placeholder="Contact Number"
                      value={newEmployee.contactNumber}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          contactNumber: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Address */}
                    <textarea
                      placeholder="Address"
                      required
                      value={newEmployee.address}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          address: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    ></textarea>

                    {/* Birth Date */}
                    <div>
                      <p className="text-gray-400 ml-2">date of birth : </p>
                      <input
                        type="date"
                        placeholder="Birth Date"
                        value={newEmployee.birthDate}
                        onChange={(e) =>
                          setNewEmployee({
                            ...newEmployee,
                            birthDate: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                      />
                    </div>

                    {/* Father Name */}
                    <input
                      type="text"
                      placeholder="Father's Name"
                      value={newEmployee.fatherName}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          fatherName: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Designation */}
                    <input
                      type="text"
                      placeholder="Designation"
                      value={newEmployee.designation}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          designation: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Gender */}
                    <select
                      value={newEmployee.gender}
                      required
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          gender: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    >
                      <option value="" disabled>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>

                    {/* Salary */}
                    <input
                      type="number"
                      required
                      placeholder="Salary"
                      value={newEmployee.salary}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          salary: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Education */}
                    <input
                      type="text"
                      placeholder="Qualification"
                      value={newEmployee.education}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          education: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Password */}
                    <input
                      type="text"
                      required
                      placeholder="Password for teacher login"
                      value={newEmployee.password}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          password: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />

                    {/* Subjects */}
                    <input
                      type="text"
                      placeholder="Subjects (comma separated)"
                      value={newEmployee.subjects.join(", ")}
                      onChange={(e) =>
                        setNewEmployee({
                          ...newEmployee,
                          subjects: e.target.value
                            .split(",")
                            .map((s) => s.trim()),
                        })
                      }
                      className="border border-gray-300 rounded-md px-4 py-2 w-full mb-4"
                    />
                  </form>
                  {/* Buttons */}
                  <div className="flex justify-between mt-6">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => setIsModalOpen(false)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleAddTeacher}
                    >
                      Add Teacher
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <DeleteTeacherModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteEmployee}
        teacherId={selectedTeacherId}
      />
        </div>
        
      )}
    </div>
  );
}

export default EmployeeList;
