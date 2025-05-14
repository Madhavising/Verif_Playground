import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";

import { baseUrl } from "../api";
import { getUserDetails } from "../utils/auth";
import { setUser } from "../store/slice/userSclice";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      email: formData.email,
      password: formData.password,
      ...(isLogin
        ? {}
        : {
          companyName: formData.companyName,
          firstName: formData.firstName,
          lastName: formData.lastName,
        }),
    };

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(`${baseUrl}${endpoint}`, payload);
      console.log("response", response)

      if (!response.status) throw new Error("Authentication failed.");

      if (isLogin && response.data.token) {
        localStorage.setItem("token", response.data.token);

        try {
          const user = await getUserDetails(response.data.token);
          dispatch(setUser({ ...user, token: response.data.token }));
          window.location.reload();
        } catch (err) {
          alert("Login succeeded, but fetching user details failed.");
        }
      }

      if (!isLogin) {
        alert("Registration successful! Please login.");
        setFormData({
          companyName: "",
          firstName: "",
          lastName: "",
          email: "",
          password: "",
        });
        setIsLogin(true);
      }
    } catch (err) {
      const errorMsg =
        err.response?.data?.error ||
        err.response?.data?.message ||
        err.message ||
        "An unexpected error occurred";
      alert(errorMsg);
    }
  };

  const handleSwitchMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({
      companyName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side */}
      <div className="hidden md:flex flex-1 flex-col justify-center bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white relative overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-red-500 to-yellow-500 opacity-20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0], x: [0, 20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative z-10 text-start px-10">
          <h1 className="text-5xl font-extrabold mb-4">Welcome to Verif Playground</h1>
          <p className="text-lg font-medium">
            {isLogin ? "Sign in to continue" : "Register to get started"}
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-red-600">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <input type="text" name="companyName" placeholder="Company Name" required value={formData.companyName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
                <input type="text" name="firstName" placeholder="First Name" required value={formData.firstName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
                <input type="text" name="lastName" placeholder="Last Name" required value={formData.lastName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
              </>
            )}
            <input type="email" name="email" placeholder="Email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
            <div className="relative">
              <input type={showPassword ? "text" : "password"} name="password" placeholder="Password" required value={formData.password} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
              <span className="absolute right-3 top-4 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
            <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
              {isLogin ? "Login" : "Register"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button onClick={handleSwitchMode} className="ml-2 text-red-600 underline">
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

