import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

// Helper function to track mouse movement
const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  return mousePosition;
};

const AuthPage = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { x, y } = useMousePosition();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target); // Get form data
    const data = Object.fromEntries(formData.entries()); 

    try {
      const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
      const response = await axios.post(
        `http://localhost:3000${endpoint}`,
        data
      );

      alert(response.data.message);

      if (isLogin) {
        localStorage.setItem("token", response.data.token); // Save token
        onLogin();
        navigate("/");
      }
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section - Animated Info Panel */}
      <div className="hidden md:flex flex-1 flex-col justify-center bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white relative overflow-hidden">
        {/* Parallax Effect on Background Circles */}
        <motion.div
          className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-red-500 to-yellow-500 opacity-20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.5, 1],
            rotate: [0, 360, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tr from-pink-600 to-red-500 opacity-25 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -360, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Interactive Background based on Mouse Movement */}
        <motion.div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-tr from-red-500 to-pink-600 opacity-20 rounded-full blur-3xl"
          animate={{
            x: x / 100,
            y: y / 100,
            scale: [1, 1.05, 1],
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        {/* Animated Text with Smooth Transitions */}
        <div className="relative z-10 text-start px-10">
          {/* Title */}
          <motion.h1
            className="text-5xl font-extrabold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.2,
              }}
              className="inline-block mr-4"
            >
              Welcome to
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.4,
              }}
              className="inline-block mr-4"
            >
              Verif
            </motion.span>
            <motion.span
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: 0.6,
              }}
              className="inline-block"
            >
              Playground
            </motion.span>
          </motion.h1>

          {/* Subheading with Smooth Fade-in */}
          <motion.p
            className="text-lg font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            {isLogin
              ? "Sign in to start verifying and interacting with dynamic content!"
              : "Experience the power of simplicity and innovation in a secure environment."}
          </motion.p>
        </div>
      </div>

      {/* Right Section - Form */}
      <div className="flex-1 flex items-center justify-center bg-white p-6">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-bold text-center text-red-600">
            {isLogin ? "Welcome Back" : "Create an Account"}
          </h2>
          <form className="space-y-5" onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="Your company email"
                    required
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                    />
                    <span
                      className="absolute right-3 top-4 cursor-pointer text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Your organization"
                    required
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Your first name"
                    required
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Your last name"
                    required
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    required
                    className="rounded border-gray-300 text-red-600"
                  />
                  <label
                    htmlFor="agreeToTerms"
                    className="ml-2 text-sm text-gray-600"
                  >
                    I agree to the{" "}
                    <a href="#" className="text-red-600 hover:underline">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </>
            )}
            {isLogin && (
              <>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="Enter your password"
                      required
                      className="w-full bg-gray-100 border border-gray-300 rounded-lg p-3 focus:ring focus:ring-red-500"
                    />
                    <span
                      className="absolute right-3 top-4 cursor-pointer text-gray-600"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <a href="#" className="text-md text-blue-500 hover:underline">
                    Forgot Password?
                  </a>
                </div>
              </>
            )}
            <button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 py-3 rounded-lg font-medium shadow-lg transition"
              disabled={!agreeToTerms && !isLogin}
            >
              {isLogin ? "Login" : "Sign Up"}
            </button>
          </form>
          <p className="text-center text-sm text-gray-600">
            {isLogin ? "Don't have an account?" : "Already a member?"}{" "}
            <button
              type="button"
              className="text-red-600 hover:underline font-medium"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
