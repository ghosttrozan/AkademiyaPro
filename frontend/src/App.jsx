import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PrincipalSignUp from "./pages/PrincipalSignUp";
import Dashboard from "./components/dashboard/Dashboard";
import PrincipalSignIn from "./pages/PrincipalSignIn";
import LandingPage from "./components/Landing/LandingPage";
import SchoolProfile from "./components/profile/school/SchoolProfile";
import { useDispatch } from "react-redux";
import { verifyPrincipal } from "./api/authentication";
import { getSchool } from "./api/school";
import { setPrincipal } from "./features/principal/principalSlice";
import { toast } from "react-toastify";
import { setSchool } from "./features/school/schoolSlice";
import PrincipalProfile from "./components/profile/principal/PrincipalProfile";
import AllTeachers from "./components/profile/teacher/AllTeachers";
import TeacherDetails from "./components/profile/teacher/TeacherDetail";
import UpdateTeacher from "./components/profile/teacher/UpdateTeacher";
import AdvancedEducationSpinner from "./components/Spinner";
import AllClasses from "./components/profile/class/AllClasses";
import RegisterClass from "./components/profile/class/RegisterClass";
import ClassDetails from "./components/profile/class/ClassDetail";
import StudentsManagement from "./components/profile/students/AllStudents";
import StudentDetails from "./components/profile/students/StudentDetail";
import UnderConstruction from "./components/UnderConstruction";


function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

function AppRoutes() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");



  useEffect(() => {
    
    const fetchPrincipalData = async () => {
      try {
        const principal = await verifyPrincipal(token)
        if(!principal){
          toast.error('Session Expired, Please Login Again')
          navigate('/')
          return;
        }
        dispatch(setPrincipal(principal))
        fetchSchoolData()
      } catch (error) {
        console.error("Error fetching principal data:", error);
        toast.error("Error fetching principal data.");
      }
    }

    const fetchSchoolData = async () => {
      try {
        const schoolData = await getSchool();
        if (!schoolData) {
          navigate("/school");
          return;
        }
        // Update School Data
        console.log("School Data:", schoolData);
        dispatch(setSchool(schoolData.school));
        toast.success("School Get Successfully!");
        navigate('/dashboard');
      } catch (error) {
        console.error("Error fetching school data:", error);
        toast.error("Error fetching school data.");
      }
    };

    fetchPrincipalData();
  }, [token]);


  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<PrincipalSignUp />} />
      <Route path="/signin" element={<PrincipalSignIn />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/school" element={<SchoolProfile />} />
      <Route path="/principal" element={<PrincipalProfile />} />
      <Route path="/all-teachers" element={<AllTeachers />} />
      <Route path="/teacher/:id" element={<TeacherDetails/>} />
      <Route path="/update-teacher/:id" element={<UpdateTeacher/>} />
      <Route path="/all-classes" element={<AllClasses/>} />
      <Route path="/register-class" element={<RegisterClass/>} />
      <Route path="/class-details/:id" element={<ClassDetails/>} />
      <Route path="/students" element={<StudentsManagement/>} />
      <Route path="/student/:studentId" element={<StudentDetails/>} />
      <Route path="*" element={<UnderConstruction/>} />
    </Routes>
  );
}

export default App;
