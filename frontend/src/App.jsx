import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import PrincipalSignUp from "./pages/PrincipalSignUp";
import Dashboard from "./components/dashboard/Dashboard";
import PrincipalSignIn from "./pages/PrincipalSignIn";
import LandingPage from "./components/LandingPage";
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
    if (!token) {
      navigate("/");
      return;
    }

    const fetchPrincipalData = async () => {
      try {
        // Verify Principal Token
        const principalData = await verifyPrincipal(token);
        if (!principalData) {
          toast.error("Verification failed. Redirecting to sign-in.");
          navigate("/signin");
          return;
        }

        // Update Principal Data
        console.log("Principal Data:", principalData);
        dispatch(setPrincipal(principalData));
        toast.success("Login Successful!");
        navigate("/dashboard");

        // Fetch School Data if Principal is linked to a school
        if (principalData.school) {
          await fetchSchoolData();
        } 
        if(!principalData.school) {
          navigate("/school");
        }
      } catch (error) {
        console.error("Error fetching principal data:", error);
        toast.error("Error verifying principal data. Please try again.");
        navigate("/signin");
      }
    };

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
    </Routes>
  );
}

export default App;
