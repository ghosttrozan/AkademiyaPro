import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../../dashboard/Header";
import { getTeacherById } from "../../../api/teacher";
import { useTable, usePagination, useSortBy } from "react-table";
import { FaUserCircle, FaFilePdf, FaMoneyBillWave, FaCalendarAlt, FaChartPie } from "react-icons/fa";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { jsPDF } from "jspdf";
import AdvancedEducationSpinner from "../../Spinner";
import { FiClock, FiDollarSign, FiCalendar, FiUserCheck, FiUserX } from "react-icons/fi";

function TeacherDetail() {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("attendance");
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
    netSalary: 33000,
    isPaid: true,
    paymentDate: "2025-01-31"
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
    {
      date: "2024-03-15",
      basicSalary: 50000,
      bonus: 4000,
      deductions: 1500,
      netSalary: 52500,
    },
    {
      date: "2024-04-15",
      basicSalary: 50000,
      bonus: 7000,
      deductions: 3000,
      netSalary: 54000,
    },
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
  } = useTable({ columns, data: attendanceData }, useSortBy);

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

  // Calculate attendance stats
  const attendanceStats = {
    present: attendanceData.filter(item => item.status === "Present").length,
    absent: attendanceData.filter(item => item.status === "Absent").length,
    leave: attendanceData.filter(item => item.status === "Leave").length,
    total: attendanceData.length
  };

  return (
    <div className="bg-gradient-to-br mt-16 from-blue-50 to-indigo-100 min-h-screen">
      <Header />
      {loading ? (
        <div className="flex items-center justify-center h-screen w-full">
          <AdvancedEducationSpinner />
        </div>
      ) : (
        <div className="container mx-auto px-4 py-6">
          {/* Back Button */}
          <button 
            onClick={() => window.history.back()}
            className="flex items-center text-indigo-600 hover:text-indigo-800 mb-4 transition-colors"
          >
            <IoChevronBackCircleSharp className="mr-2 text-2xl" />
            <span className="font-medium">Back to Teachers</span>
          </button>

          {/* Main Content */}
          <div className="flex justify-center items-center flex-col lg:flex-row gap-6">
            {/* Profile Card */}
            <div className="w-full lg:w-1/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-center">
                  <div className="flex justify-center">
                    <FaUserCircle className="text-white text-7xl" />
                  </div>
                  <h1 className="text-2xl font-bold text-white mt-4">
                    {teacher?.fullName.firstName} {teacher?.fullName.lastName}
                  </h1>
                  <p className="text-indigo-100">{teacher?.designation}</p>
                </div>

                {/* Profile Details */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <FiClock className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-gray-500">Joining Date</p>
                        <p className="font-medium">
                          {new Date(teacher?.joiningDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <FiDollarSign className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-gray-500">Salary</p>
                        <p className="font-medium">₹{teacher?.salary}</p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <FiCalendar className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-gray-500">Birthdate</p>
                        <p className="font-medium">
                          {new Date(teacher?.birthDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center">
                      <div className="bg-indigo-100 p-3 rounded-full mr-4">
                        <FiUserCheck className="text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-gray-500">Gender</p>
                        <p className="font-medium">{teacher?.gender}</p>
                      </div>
                    </div>
                  </div>

                  <hr className="my-6 border-gray-200" />

                  {/* Contact Info */}
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">Contact Information</h3>
                  <div className="space-y-3">
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Email:</span>
                      <span className="font-medium">{teacher?.email}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Phone:</span>
                      <span className="font-medium">+91 {teacher?.contactNumber}</span>
                    </p>
                    <p className="flex items-center">
                      <span className="text-gray-500 w-24">Address:</span>
                      <span className="font-medium">{teacher?.address}</span>
                    </p>
                  </div>

                  <button
                    onClick={downloadPDF}
                    className="mt-6 w-full flex items-center justify-center px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg shadow hover:shadow-md transition-all"
                  >
                    <FaFilePdf className="mr-2" />
                    Download Profile
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content */}
            <div className="w-full lg:w-2/3">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Tabs */}
                <div className="flex border-b border-gray-200">
                  <button
                    className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "attendance" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("attendance")}
                  >
                    <FaCalendarAlt className="mr-2" />
                    Attendance
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "salary" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("salary")}
                  >
                    <FaMoneyBillWave className="mr-2" />
                    Salary
                  </button>
                  <button
                    className={`px-6 py-3 font-medium text-sm flex items-center ${activeTab === "stats" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-500 hover:text-gray-700"}`}
                    onClick={() => setActiveTab("stats")}
                  >
                    <FaChartPie className="mr-2" />
                    Statistics
                  </button>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === "attendance" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-4 text-gray-800">Attendance History</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {attendanceData.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    item.status === "Present" 
                                      ? "bg-green-100 text-green-800" 
                                      : item.status === "Leave" 
                                        ? "bg-yellow-100 text-yellow-800" 
                                        : "bg-red-100 text-red-800"
                                  }`}>
                                    {item.status}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === "salary" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-800">Salary Information</h3>
                      
                      {/* Current Salary */}
                      <div className="bg-indigo-50 rounded-lg p-6 mb-8">
                        <h4 className="text-lg font-medium text-indigo-800 mb-4">Current Salary Status</h4>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500">Basic Salary</p>
                            <p className="text-2xl font-bold text-indigo-600">₹{salaryStatus.basicSalary}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500">Bonus</p>
                            <p className="text-2xl font-bold text-green-600">+₹{salaryStatus.bonus}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm">
                            <p className="text-sm text-gray-500">Deductions</p>
                            <p className="text-2xl font-bold text-red-600">-₹{salaryStatus.deductions}</p>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm border-2 border-indigo-200">
                            <p className="text-sm text-gray-500">Net Salary</p>
                            <p className="text-2xl font-bold text-indigo-700">₹{salaryStatus.netSalary}</p>
                          </div>
                        </div>
                        <div className={`mt-4 p-3 rounded-lg ${salaryStatus.isPaid ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          <p className="font-medium">
                            {salaryStatus.isPaid 
                              ? `Salary paid on ${new Date(salaryStatus.paymentDate).toLocaleDateString()}`
                              : "Salary pending for this month"}
                          </p>
                        </div>
                      </div>

                      {/* Salary History */}
                      <h4 className="text-lg font-medium text-gray-800 mb-4">Salary History</h4>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Basic</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bonus</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Salary</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {salaryHistory.map((item, index) => (
                              <tr key={index}>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {new Date(item.date).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">₹{item.basicSalary}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-green-600">+₹{item.bonus}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-red-600">-₹{item.deductions}</td>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold">₹{item.netSalary}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === "stats" && (
                    <div>
                      <h3 className="text-xl font-semibold mb-6 text-gray-800">Attendance Statistics</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-green-500">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4">
                              <FiUserCheck size={24} />
                            </div>
                            <div>
                              <p className="text-gray-500">Present</p>
                              <p className="text-3xl font-bold">{attendanceStats.present}</p>
                              <p className="text-sm text-gray-500">
                                {((attendanceStats.present / attendanceStats.total) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-yellow-500">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600 mr-4">
                              <FiCalendar size={24} />
                            </div>
                            <div>
                              <p className="text-gray-500">Leave</p>
                              <p className="text-3xl font-bold">{attendanceStats.leave}</p>
                              <p className="text-sm text-gray-500">
                                {((attendanceStats.leave / attendanceStats.total) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 border-red-500">
                          <div className="flex items-center">
                            <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4">
                              <FiUserX size={24} />
                            </div>
                            <div>
                              <p className="text-gray-500">Absent</p>
                              <p className="text-3xl font-bold">{attendanceStats.absent}</p>
                              <p className="text-sm text-gray-500">
                                {((attendanceStats.absent / attendanceStats.total) * 100).toFixed(1)}% of total
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-6 rounded-lg shadow-sm">
                        <h4 className="text-lg font-medium text-gray-800 mb-4">Attendance Overview</h4>
                        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                          <p className="text-gray-400">Attendance chart would be displayed here</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TeacherDetail;