import  { useEffect, useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { getUserDetails, isTokenValid } from "./utils/auth";
import { setUser } from "./store/slice/userSclice";

import AuthPage from "./authPage/AuthPage";
import ASICVerification from "./features/ASICVerification";
import AutoVerify from "./features/AutoVerify";
import DataHub from "./features/DataHub";
import DocSphere from "./features/DocSphere";
import RegressionTracker from "./features/RegressionTracker";
import InputField from "./inputField/InputField";
import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";

import Layout from "./layout/Layout";
import VerificationLayout from "./layout/VerificationLayout";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";
import DemoRequestPage from "./components/DemoRequestPage";
import WaveInput from "./inputField/WaveInput.jsx";

import ProtectedRoute from "./routes/protectedRoute.jsx"; 
import IntrapediaHomePage from "./intrapedia/IntrapediaHomePage.jsx";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const fetchUserDetails = async (token) => {
    try {
      const user = await getUserDetails(token);
      dispatch(setUser({ ...user, token }));
      setIsAuthenticated(true);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setError(err.message || "Failed to fetch user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!isTokenValid(token)) {
      setIsAuthenticated(false);
      setLoading(false);
      return;
    }

    fetchUserDetails(token);
  }, [dispatch]);

  if (error) {
    return <div className="App text-red-600 p-4">Error: {error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-red-200 min-h-screen">
      <Routes>
        {/* Public route */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <AuthPage />
            )
          }
        />

        {/* Protected routes wrapped in ProtectedRoute */}
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="intrapediaHome" element={<IntrapediaHomePage />} />
          {/* <Route path="verificationLayout" element={<VerificationLayout />} /> */}
          <Route path="uvm-reg-block" element={<UvmRegBlock />} />
          <Route path="input-field" element={<InputField />} />
          <Route path="wave-input" element={<WaveInput />} />
          <Route path="docSphere" element={<DocSphere />} />
          <Route path="autoVerify" element={<AutoVerify />} />
          <Route path="regressionTracker" element={<RegressionTracker />} />
          <Route path="dataHub" element={<DataHub />} />
          <Route path="asicverify" element={<ASICVerification />} />
          <Route path="demo-request-page" element={<DemoRequestPage />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
