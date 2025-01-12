import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../dashboard/Header";
import { getTeacherById } from "../../../api/teacher";
import { useTable, usePagination, useSortBy } from "react-table";
import { FaUserCircle } from "react-icons/fa"; // Profile Icon
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { jsPDF } from "jspdf";
import AdvancedEducationSpinner from "../../Spinner";

function TeacherDetail() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [attendanceData, setAttendanceData] = useState([
    { date: "2025-01-01", status: "Present" },
    { date: "2025-01-02", status: "Absent" },
    { date: "2025-01-03", status: "Leave" },
    { date: "2025-01-04", status: "Present" },
    { date: "2025-01-05", status: "Absent" },
    { date: "2025-01-06", status: "Present" },
    { date: "2025-01-07", status: "Leave" },
  ]);
  const [salaryStatus, setSalaryStatus] = useState({
    basicSalary: 30000,
    bonus: 5000,
    deductions: 2000,
    netSalary: 0,
  });
  const salaryHistory = [
    {
      date: "2024-01-15",
      basicSalary: 50000,
      bonus: 5000,
      deductions: 2000,
      netSalary: 53000,
    },
    {
      date: "2024-02-15",
      basicSalary: 50000,
      bonus: 6000,
      deductions: 2500,
      netSalary: 54000,
    },
    // Add more historical data as needed
  ];

  const { id } = useParams();

  useEffect(() => {
    const fetchTeacherData = async () => {
      setLoading(true);
      setError(null);
      try {
        const teacherData = await getTeacherById(id);
        if (teacherData?.success) {
          setTeacher(teacherData.teacher);
          setLoading(false);
        } else {
          setError("Failed to fetch teacher data");
        }
      } catch (err) {
        setError("An error occurred while fetching teacher data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeacherData();
  }, [id]);

  // Calculate net salary
  useEffect(() => {
    setSalaryStatus((prevState) => ({
      ...prevState,
      netSalary: prevState.basicSalary + prevState.bonus - prevState.deductions,
    }));
  }, [salaryStatus.basicSalary, salaryStatus.bonus, salaryStatus.deductions]);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
        sortType: (rowA, rowB) =>
          new Date(rowA.values.date) - new Date(rowB.values.date),
      },
      {
        Header: "Status",
        accessor: "status",
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    pageCount,
    setPageSize,
    state: { pageIndex, pageSize },
  } = useTable({ columns, data: attendanceData }, useSortBy, usePagination);

  const downloadPDF = () => {
    const doc = new jsPDF();

    // Add teacher details to the PDF
    doc.setFont("helvetica", "normal");
    doc.text(`Teacher Details`, 14, 20);
    doc.text(
      `Full Name: ${teacher?.fullName.firstName} ${teacher?.fullName.lastName}`,
      14,
      30
    );
    doc.text(`Role: ${teacher?.role}`, 14, 40);
    doc.text(`Designation: ${teacher?.designation}`, 14, 50);
    doc.text(`Email: ${teacher?.email}`, 14, 60);
    doc.text(`Contact: ${teacher?.contactNumber}`, 14, 70);
    doc.text(`Father's Name: ${teacher?.fatherName}`, 14, 80);
    doc.text(`Education: ${teacher?.education}`, 14, 90);
    doc.text(`Gender: ${teacher?.gender}`, 14, 100);
    doc.text(
      `Birthdate: ${new Date(teacher?.birthDate).toLocaleDateString()}`,
      14,
      110
    );
    doc.text(
      `Joining Date: ${new Date(teacher?.joiningDate).toLocaleDateString()}`,
      14,
      120
    );
    doc.text(`Salary: ₹${teacher?.salary}`, 14, 130);
    doc.text(`Address: ${teacher?.address}`, 14, 140);

    // Save the PDF
    doc.save("teacher-details.pdf");
  };

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="bg-gradient-to-r from-blue-300 via-blue-100 to-blue-300 min-h-screen">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center h-full w-full mt-[20%]">
          <AdvancedEducationSpinner />
        </div>
      ) : (
        <div className="container pt-24 mx-auto p-8">
          <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
            {/* Profile Details Section */}
            <div className="md:w-1/3 relative bg-white p-6 rounded-xl shadow-2xl border-2 border-gray-300">
              <h1
                onClick={() => window.history.back()}
                className="absolute top-2 cursor-pointer text-4xl text-gray-400 left-2"
              >
                <IoChevronBackCircleSharp />
              </h1>
              <h1 className="text-3xl font-semibold text-black mb-4 text-center">
                Teacher Details
              </h1>
              <div className="flex flex-col gap-2 items-center mb-8">
                <FaUserCircle className="text-gray-400 text-7xl mb-4" />
                <div className="bg-white p-4 rounded-lg shadow-lg w-full">
                  <h2 className="text-4xl text-center font-extrabold text-gray-700 mb-3">
                    {teacher?.fullName.firstName} {teacher?.fullName.lastName}
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <p className="text-lg text-gray-700 mb-2">
                      Role:{" "}
                      <span className="text-indigo-600 font-semibold">
                        {teacher?.role}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Designation:{" "}
                      <span className="text-indigo-600 font-semibold">
                        {teacher?.designation}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Email:{" "}
                      <span className="text-indigo-600">{teacher?.email}</span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Contact:{" +91"}
                      <span className="text-indigo-600">
                        {teacher?.contactNumber}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Father's Name:{" "}
                      <span className="text-indigo-600">
                        {teacher?.fatherName}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Education:{" "}
                      <span className="text-indigo-600">
                        {teacher?.education}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Gender:{" "}
                      <span className="text-indigo-600">{teacher?.gender}</span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Birthdate:{" "}
                      <span className="text-indigo-600">
                        {new Date(teacher?.birthDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Joining Date:{" "}
                      <span className="text-indigo-600">
                        {new Date(teacher?.joiningDate).toLocaleDateString()}
                      </span>
                    </p>
                    <p className="text-lg text-gray-700 mb-2">
                      Salary: ₹
                      <span className="text-indigo-600">{teacher?.salary}</span>
                    </p>
                    {/* Address Details */}
                    <p className="text-lg text-gray-700 mb-2">
                      Address:{" "}
                      <span className="text-indigo-600">
                        {teacher?.address}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Button to download PDF */}
              <button
                onClick={downloadPDF}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700"
              >
                Download Profile as PDF
              </button>
            </div>

            {/* Salary & Attendance Section */}
            <div className="md:w-2/3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8 rounded-lg shadow-2xl border border-gray-200">
              <h3 className="text-3xl font-semibold text-white mb-6 text-center">
                Salary & Attendance
              </h3>

              {/* Salary Status Section */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-8">
                <div className="text-center bg-blue-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-blue-700">Basic Salary</h4>
                  <p className="text-3xl text-blue-600">
                    ₹{salaryStatus.basicSalary}
                  </p>
                </div>
                <div className="text-center bg-green-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-green-700">Bonus</h4>
                  <p className="text-3xl text-green-600">
                    ₹{salaryStatus.bonus}
                  </p>
                </div>
                <div className="text-center bg-yellow-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-yellow-700">Deductions</h4>
                  <p className="text-3xl text-yellow-600">
                    ₹{salaryStatus.deductions}
                  </p>
                </div>
                <div className="text-center bg-red-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-red-700">Net Salary</h4>
                  <p className="text-3xl text-red-600">
                    ₹{salaryStatus.netSalary}
                  </p>
                </div>
              </div>

              {/* Salary Payment Status */}
              <div className="flex items-center justify-between bg-indigo-100 p-4 rounded-lg shadow-md mb-8">
                <div>
                  <h4 className="font-semibold text-indigo-700 text-xl">
                    Salary Status
                  </h4>
                  <p className="text-lg text-indigo-600">
                    {salaryStatus.isPaid ? "Paid" : "Not Paid"}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-indigo-700 text-xl">
                    Salary Date
                  </h4>
                  <p className="text-lg text-indigo-600">
                    {new Date(salaryStatus.paymentDate).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Salary History Section */}
              <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Salary History
                </h4>
                <table className="table-auto w-full text-sm border-collapse mb-6">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Date
                      </th>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Basic Salary
                      </th>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Bonus
                      </th>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Deductions
                      </th>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Net Salary
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salaryHistory.map((historyItem, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                          {new Date(historyItem.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2">
                          ₹{historyItem.basicSalary}
                        </td>
                        <td className="px-4 py-2">₹{historyItem.bonus}</td>
                        <td className="px-4 py-2">₹{historyItem.deductions}</td>
                        <td className="px-4 py-2">₹{historyItem.netSalary}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Attendance Section */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="text-center bg-green-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-green-700">Presents</h4>
                  <p className="text-3xl text-green-600">
                    {
                      attendanceData.filter((item) => item.status === "Present")
                        .length
                    }
                  </p>
                </div>
                <div className="text-center bg-yellow-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-yellow-700">Leaves</h4>
                  <p className="text-3xl text-yellow-600">
                    {
                      attendanceData.filter((item) => item.status === "Leave")
                        .length
                    }
                  </p>
                </div>
                <div className="text-center bg-red-100 p-6 rounded-lg shadow-lg">
                  <h4 className="font-semibold text-red-700">Absents</h4>
                  <p className="text-3xl text-red-600">
                    {
                      attendanceData.filter((item) => item.status === "Absent")
                        .length
                    }
                  </p>
                </div>
              </div>

              {/* Attendance History Table */}
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold text-gray-800 mb-4">
                  Attendance History
                </h4>
                <table className="table-auto w-full text-sm border-collapse mb-6">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="px-4 py-2 text-left text-indigo-600">
                        Date
                      </th>
                      <th className="px-4 py-2 text-center text-indigo-600">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((attendanceItem, index) => (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">
                          {new Date(attendanceItem.date).toLocaleDateString()}
                        </td>
                        <td className="px-4 py-2 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-white ${
                              attendanceItem.status === "Present"
                                ? "bg-green-500"
                                : attendanceItem.status === "Leave"
                                ? "bg-yellow-500"
                                : "bg-red-500"
                            }`}
                          >
                            {attendanceItem.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDetail;
