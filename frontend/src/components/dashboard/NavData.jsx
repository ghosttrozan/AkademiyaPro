import React from "react";
import { PiStudentFill, PiChalkboardTeacherFill } from "react-icons/pi";
import { BsPersonWorkspace, BsGraphUpArrow } from "react-icons/bs";
import { FaMoneyBillTrendUp, FaCertificate } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SiGoogleclassroom } from "react-icons/si";

const DashboardCard = ({ title, count, thisMonthCount, logo, bg, to }) => {
  const CardContent = () => (
    <div className={`${bg} hover:shadow-lg transition-all duration-300 cursor-pointer text-white rounded-xl flex items-center justify-between p-5 h-full`}>
      <div>
        <h2 className="text-md font-medium mb-1">{title}</h2>
        <div className="text-2xl font-bold mb-2">{count}</div>
        <div className="text-xs opacity-90 flex items-center gap-1">
          <BsGraphUpArrow className="text-sm" /> 
          <span>This Month: {thisMonthCount}</span>
        </div>
      </div>
      <div className="text-4xl opacity-80">
        {logo}
      </div>
    </div>
  );

  return to ? (
    <Link to={to}>
      <CardContent />
    </Link>
  ) : (
    <CardContent />
  );
};

function NavData() {

  const {students, teachers, classes} = useSelector((state) => state.school);

  return (
    <div className="mt-24 px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <DashboardCard 
          title="Total Students" 
          count={students.length} 
          thisMonthCount="0" 
          logo={<PiStudentFill />} 
          bg="bg-[#2C3E50]"
          to="/students"
        />
        <DashboardCard 
          title="Total Teachers" 
          count={teachers.length}
          thisMonthCount="0" 
          logo={<PiChalkboardTeacherFill />} 
          bg="bg-[#27AE60]"
          to="/all-teachers"
        />
        <DashboardCard 
          title="Total Classes" 
          count={classes.length} 
          thisMonthCount="₹0" 
          logo={<SiGoogleclassroom />} 
          bg="bg-[#F39C12]"
          to={'/all-classes'}
        />
        <DashboardCard 
          title="Total Collection" 
          count="₹0" 
          thisMonthCount="₹0" 
          logo={<FaMoneyBillTrendUp />} 
          bg="bg-[#5453AB]"
        />
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 flex flex-col md:flex-row items-center justify-between p-6 rounded-xl shadow-sm">
        <div className="mb-4 md:mb-0">
          <div className="flex items-center gap-2 mb-2">
            <h2 className="text-lg font-semibold text-blue-800">Welcome to Admin Dashboard</h2>
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
              <FaCertificate className="text-blue-500" /> Verified
            </span>
          </div>
          <p className="text-sm text-gray-600 mb-1">Your account is fully verified and ready to use</p>
          <p className="text-xs text-gray-500">Enjoy India's leading education management platform</p>
        </div>
        <img 
          className="w-28 h-28 object-contain" 
          src="https://cdn-icons-png.flaticon.com/512/3976/3976626.png" 
          alt="Education illustration" 
        />
      </div>
    </div>
  );
}

export default NavData;