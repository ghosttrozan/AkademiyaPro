import React, { useState, useEffect } from "react";
import { getAllTeacher } from "../../../api/teacher";
import Header from "../../dashboard/Header";
import { ToastContainer, toast } from "react-toastify";
import { createClass } from "../../../api/class";
import { Link, useNavigate } from "react-router-dom";

const RegisterClassForm = () => {
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [yearlyFee, setYearlyFee] = useState("");
  const [subjects, setSubjects] = useState([{ name: " " }]);
  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch teachers for select input
    async function fetchTeachers() {
      const teacher = await getAllTeacher();
      console.log(teacher)
      if(teacher.length === 0){
        toast.error("Register atleast one teacher");
        setTimeout(() => navigate("/all-teachers"), 2000);
        return;
      }
      setTeachers(teacher);
    }

    fetchTeachers();
  }, []);

  const handleAddSubject = () => {
    setSubjects([...subjects, { name: "" }]);
  };

  const handleRemoveSubject = (index) => {
    const updatedSubjects = subjects.filter((_, i) => i !== index);
    setSubjects(updatedSubjects);
  };

  const handleSubjectChange = (e, index) => {
    const updatedSubjects = subjects.map((subject, i) =>
      i === index ? { name: e.target.value } : subject
    );
    setSubjects(updatedSubjects);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!className || !section || !yearlyFee || !selectedTeacher) {
      toast.error("Please fill all required fields");
      return;
    }
    const formData = {
      className,
      section,
      yearlyFee,
      subjects,
      teacher: [selectedTeacher],
    };
    const res = await createClass(formData);

    if (res?.class) {
      toast.success("Class registered successfully");
      setClassName("");
      setSection("");
      setYearlyFee("");
      setSubjects([{ name: "" }]);
      setSelectedTeacher("");
    } else {
      toast.error(res?.data?.message);
    }
  };

  return (
    <div className="">
      <ToastContainer />
      <Header />
      <div className="flex relative justify-start">
        <Link
          to="/all-classes" // Replace with the route you want to go back to
          className="bg-blue-500 absolute top-24 left-4 text-white py-2 px-4 rounded-lg font-semibold shadow-md hover:bg-blue-600 transition duration-300"
        >
          Go Back
        </Link>
      </div>
      <div className="bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] p-9 h-screen">
        <div className="bg-white p-6 mt-20 rounded-lg shadow-xl w-full max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6 text-center">
            Register Class
          </h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            <div className="flex flex-col">
              <label htmlFor="className" className="text- mb-2">
                Class Name
              </label>
              <input
                id="className"
                type="text"
                value={className}
                onChange={(e) => setClassName(e.target.value)}
                className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="section" className="mb-2">
                Section
              </label>
              <input
                id="section"
                type="text"
                value={section}
                onChange={(e) => setSection((e.target.value).toUpperCase())}
                className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="yearlyFee" className="  mb-2">
                Yearly Fee
              </label>
              <input
                id="yearlyFee"
                type="number"
                value={yearlyFee}
                onChange={(e) => setYearlyFee(e.target.value)}
                className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="teacher" className="  mb-2">
                Select Teacher
              </label>
              <select
                id="teacher"
                value={selectedTeacher}
                onChange={(e) => setSelectedTeacher(e.target.value)}
                className="p-3 rounded-lg border-2 border-gray-300 focus:border-indigo-500 focus:outline-none"
              >
                <option value="">Select a teacher</option>
                {teachers.map((teacher) => (
                  <option key={teacher._id} value={[teacher._id]}>
                    {teacher.fullName.firstName}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex flex-col col-span-2">
              <label htmlFor="subjects" className="  mb-2">
                Subjects
              </label>
              {subjects.map((subject, index) => (
                <div key={index} className="flex space-x-4 mb-4">
                  <input
                    type="text"
                    value={subject.name}
                    onChange={(e) => handleSubjectChange(e, index)}
                    className="p-3 rounded-lg border-2 border-gray-300 w-full focus:border-indigo-500 focus:outline-none"
                    placeholder="Subject Name"
                  />
                  {subjects.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSubject(index)}
                      className="bg-red-500 text-white p-3 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={handleAddSubject}
                className="bg-blue-500 text-white p-3 rounded-lg mt-4"
              >
                Add Subject
              </button>
            </div>

            <div className="col-span-2 flex justify-center mt-6">
              <button
                type="submit"
                className="bg-green-600 text-white py-3 px-6 rounded-lg shadow-lg"
              >
                Register Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterClassForm;
