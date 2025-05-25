import React, { useEffect, useState } from "react";
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
import { verifyPrincipal } from "../../api/authentication";
import { getSchool } from "../../api/school";
import { setPrincipal } from "../../features/principal/principalSlice";
import { useDispatch } from "react-redux";
import { setSchool } from "../../features/school/schoolSlice";
import AdvancedEducationSpinner from "../Spinner";
import Footer from "./Footer";

function Dashboard() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token")
    if(!token){
      navigate("/signin");
    }
    const fetchData = async () => {
      try {
        const principal = await verifyPrincipal();
        if(!principal){
          navigate('/signin')
        }
        dispatch(setPrincipal(principal));
        
        const {school} = await getSchool();
        console.log(school)
        dispatch(setSchool(school));
        
        setLoading(false);
      } catch (error) {
        toast.error("Session expired. Please login again.");
        navigate("/signin");
      }
    };

    fetchData();
  }, [dispatch, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <AdvancedEducationSpinner />
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen bg-[url('https://pro.eskooly.com/assets/images/banner/banner-bg-3.jpg')]">
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      
      <div className="mx-auto px-2 sm:px-6 lg:px-8 py-6">
        {/* Top Cards Section */}
        <NavData />
        
        {/* Financial Overview Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <ExpenseIncomeChart />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <EstimatedFeeCard />
          </div>
        </div>
        
        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-3 bg-gray-50 text-sm text-gray-500">
              School Analytics
            </span>
          </div>
        </div>
        
        {/* Student Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <ClassWiseStudentsChart />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AttendancePercentage />
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AttendanceTracker />
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <AcademicCalendar />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <Footer />
          </div>
      </div>
    </div>
  );
}

export default Dashboard;