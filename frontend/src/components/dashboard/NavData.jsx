import React from "react";
import { PiStudentFill } from "react-icons/pi";
import { BsPersonWorkspace } from "react-icons/bs";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import { Link } from "react-router-dom";

const DashboardCard = ({ title, count, thisMonthCount, logo, bg }) => {
  return (
    <div className={`${bg} hover:shadow-2xl cursor-pointer text-white rounded-2xl flex items-center justify-between rounded-lg p-6 shadow-md`}>
     <div>
     <h2 className="text-lg font-semibold mb-2">{title}</h2>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-sm pt-4">This Month: {thisMonthCount}</div>
     </div>
     <div>
      <h1 className="text-5xl">
      {logo}
      </h1>
     </div>
    </div>
  );
};
function NavData() {
  
  return <div className="mt-24 px-8">
     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      <DashboardCard title="Total Students" count="8" thisMonthCount="0" logo={<PiStudentFill />} bg="bg-[#5453AB]"/>
      <Link to={'/all-teachers'}>
      <DashboardCard title="Total Employees" count="0" thisMonthCount="0" logo={<BsPersonWorkspace />} bg="bg-[#A1A3D9]" /> </Link>
      <DashboardCard title="Revenue" count="₹0" thisMonthCount="₹0" logo="₹" bg="bg-[#FB8993]"/>
      <DashboardCard title="Total Profit" count="₹0" thisMonthCount="₹0" logo={<FaMoneyBillTrendUp />} bg="bg-[#6B8CF6]"/>
    </div>
    <div className="bg-pink-100 mt-6 flex items-center justify-between py-4 w-[65%] px-20 rounded-lg shadow-md">
     <div className="">
     <h2 className="text-lg text-pink-600 font-semibold ">Welcome to Admin Dashboard</h2>
      <p className="text-sm mt-2 text-gray-400">Your Account is Verified! 👍</p>
      <p className="text-sm text-gray-400">Enjoy India's No.1 Education Software.</p>
     </div>
     <img className="w-28" src="https://eskooly.com/bb/assets/images/admin-message.png" alt="" />
    </div>
  </div>;
}

export default NavData;
