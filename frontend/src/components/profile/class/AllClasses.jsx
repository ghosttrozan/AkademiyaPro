import React, { useEffect, useState } from "react";
import Header from "../../dashboard/Header";
import { Link } from "react-router-dom";
import { getAllClasses } from "../../../api/class";
import AdvancedEducationSpinner from "../../Spinner";

function AllClasses() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if(loading){
    return <div className="flex mt-[20%] items-center justify-center h-full"><AdvancedEducationSpinner /></div>
  }

  return (
    <div>
      <Header />
      <div className="">
        <div className="p-6 bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')] bg-gray-50 min-h-screen">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
              All Classes
            </h1>

            {classes.length > 0 ? (
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {classes.map((classItem, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg shadow-lg hover:shadow-xl flex gap-4 justify-between transition-shadow p-6"
                    >
                      <div className="">
                      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                        Class {classItem.className}
                        <br />
                        <span className="text-gray-400 text-xl">
                          Section {classItem.section}
                        </span>
                      </h2>
                      <p className="text-gray-600 text-lg">
                        <span className="font-bold text-blue-600">
                          {classItem.students}
                        </span>{" "}
                        {classItem.students === 1 ? "Student" : "Students"}
                      </p>
                      <div className="mt-4">
                        <button className="px-4 py-2 bg-blue-100 text-blue-600 rounded-lg font-semibold hover:bg-blue-200">
                          View Details
                        </button>
                      </div>
                      </div>
                      <div >
                        <Link to={`/teacher/${classItem?.teacher[0]?.teacherId}`}>
                        <h1 className="text-lg font-semibold text-blue-400 hover:text-blue-600 cursor-pointer">{classItem?.teacher[0]?.teacherName}</h1>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex mt-4 items-center justify-center mb-10">
                <Link
                  to={"/register-class"}
                  className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register New Class
                </Link>
                </div>
              </div>
            ) : (
              <div className="text-center bg-white p-10 rounded-lg shadow-lg">
                <p className="text-lg text-gray-500 mb-6">
                  No class registered yet. Start by adding a new class!
                </p>
                <Link
                  to={"/register-class"}
                  className="px-8 py-3 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Register New Class
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllClasses;
