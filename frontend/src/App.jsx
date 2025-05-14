import React, { useEffect, useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
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
import Loader from "./layout/Loader";
import Profile from "./components/Profile";
import Loading from "./components/Loading";
import Dashboard from "./components/Dashboard";

import DemoRequestPage from "./components/DemoRequestPage";
import WaveInput from "./inputField/WaveInput.jsx";

function App() {
  const navigate = useNavigate();
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
      setLoading(false);
      navigate("/login");
      return;
    }

    fetchUserDetails(token);
  }, [dispatch, navigate]);

  if (error) {
    return <div className="App text-red-600 p-4">Error: {error}</div>;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-red-200 min-h-screen">
     <Routes>
  <Route path="/" element={
    isAuthenticated ? <Navigate to="/dashboard" replace /> : <AuthPage />
  } />
  
  {isAuthenticated && (
    <Route path="/" element={<Layout />}>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<Profile />} />
      <Route path="verificationLayout" element={<VerificationLayout />} />
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
  )}

  {/* Catch-all: Redirect unknown paths */}
  <Route path="*" element={<Navigate to="/" replace />} />
</Routes>

    </div>
  );
}

export default App;

