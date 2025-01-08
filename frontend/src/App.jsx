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
import { getSchool, verifyPrincipal } from "./api/authentication";
import { setPrincipal } from "./features/principal/principalSlice";
import { toast } from "react-toastify";
import { setSchool } from "./features/school/schoolSlice";
import PrincipalProfile from "./components/profile/principal/PrincipalProfile";

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
        const principalData = await verifyPrincipal(token);
        if (principalData) {
          dispatch(setPrincipal(principalData));
          fetchSchoolData();
          navigate("/dashboard");
          toast.success("Login Successful!");
        } else {
          toast.error("Verification failed. Redirecting to sign-in.");
          navigate("/signin");
        }
      } catch (error) {
        console.error("Error fetching principal data:", error);
        toast.error("Error fetching principal data. Please try again.");
        navigate("/signin");
      }
    };

    const fetchSchoolData = async () => {
      try {
        const schoolData = await getSchool(token);
        if(!schoolData){
          navigate("/school");
          return;
        }
        if (schoolData) {
          dispatch(setSchool(schoolData.school));
          toast.success("School Updated Successfully!");
        }
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
    </Routes>
  );
}

export default App;
