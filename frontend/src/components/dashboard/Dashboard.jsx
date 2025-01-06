import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Header from "./Header";
import NavData from "./NavData";
import ExpenseIncomeChart from "./ExpenseIncomeChart";
import EstimatedFeeCard from "./EstimatedFeeCard";
import ClassWiseStudentsChart from "./ClassWiseStudentChart";
import AttendancePercentage from "./AttendancePercentage";
import AcademicCalendar from "./AcademicCalendar";
import AttendanceTracker from "./AttendanceTracker";
import { getSchool, verifyPrincipal } from "../../api/authentication";
import { setPrincipal } from "../../features/principal/principalSlice";
import { useDispatch } from "react-redux";
import { setSchool } from "../../features/school/schoolSlice";

function Dashboard() {
  
  

  return (
    <div>
      <ToastContainer />
      <Header />
      <NavData />
      <div className="relative px-6 flex w-full items-center justify-between mb-4">
        <ExpenseIncomeChart />
        <EstimatedFeeCard />
      </div>
      <div className="relative py-2 w-full">
        <div className="absolute bottom-[-20px] w-full h-[2px] bg-gray-300"></div>
      </div>
      <div className="flex mt-4 items-center">
        <ClassWiseStudentsChart />
        <AttendancePercentage />
      </div>
      <div className="flex px-4 mb-4 items-center justify-between ">
        <AttendanceTracker />
        <AcademicCalendar />
      </div>
    </div>
  );
}

export default Dashboard;
