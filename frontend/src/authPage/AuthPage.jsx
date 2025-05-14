// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import axios from "axios";
// import { baseUrl } from "../api"

// const useMousePosition = () => {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const updateMousePosition = (e) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };
//     window.addEventListener("mousemove", updateMousePosition);
//     return () => {
//       window.removeEventListener("mousemove", updateMousePosition);
//     };
//   }, []);

//   return mousePosition;
// };

// const AuthPage = () => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);
//   const [formData, setFormData] = useState({
//     companyName: "",
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//   });

//   const { x, y } = useMousePosition();
//   const navigate = useNavigate();

//   const togglePasswordVisibility = () => setShowPassword(!showPassword);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const payload = {
//       email: formData.email,
//       password: formData.password,
//       ...(isLogin
//         ? {}
//         : {
//             companyName: formData.companyName,
//             firstName: formData.firstName,
//             lastName: formData.lastName,
//           }),
//     };

//     try {
//       const endpoint = isLogin ? "/api/auth/login" : "/api/auth/register";
//       const response = await axios.post(`${baseUrl}${endpoint}`, payload);

//       if (response.data.status) alert("Login Successful.");

//       if (isLogin && response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         navigate('/');
//       }


//       if (!isLogin) {
//         alert("Registration successful! Please login.");
//         setFormData({
//           companyName: "",
//           firstName: "",
//           lastName: "",
//           email: "",
//           password: "",
//         });
//         setIsLogin(true);
//       }
      
//     } catch (err) {
//       const errorMsg =
//         err.response?.data?.error ||
//         err.response?.data?.message ||
//         err.message ||
//         "An unexpected error occurred";
//       alert(errorMsg);
//     }
//   };

//   const handleSwitchMode = () => {
//     setIsLogin((prev) => !prev);

    
//     setFormData({
//       companyName: "",
//       firstName: "",
//       lastName: "",
//       email: "",
//       password: "",
//     });
    
//   };

//   return (
//     <div className="min-h-screen flex">
//       {/* Left Animation Panel */}
//       <div className="hidden md:flex flex-1 flex-col justify-center bg-gradient-to-br from-red-950 via-red-900 to-red-800 text-white relative overflow-hidden">
//         <motion.div
//           className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-tr from-red-500 to-yellow-500 opacity-20 rounded-full blur-3xl"
//           animate={{ scale: [1, 1.5, 1], rotate: [0, 360, 0], x: [0, 20, 0] }}
//           transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-tr from-pink-600 to-red-500 opacity-25 rounded-full blur-3xl"
//           animate={{ scale: [1, 1.3, 1], rotate: [0, -360, 0], y: [0, 15, 0] }}
//           transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
//         />
//         <motion.div
//           className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-tr from-red-500 to-pink-600 opacity-20 rounded-full blur-3xl"
//           animate={{
//             x: x / 100,
//             y: y / 100,
//             scale: [1, 1.05, 1],
//           }}
//           transition={{ type: "spring", stiffness: 300, damping: 20, repeat: Infinity, repeatType: "reverse" }}
//         />
//         <div className="relative z-10 text-start px-10">
//           <motion.h1 className="text-5xl font-extrabold mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
//             <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
//               Welcome to{" "}
//             </motion.span>
//             <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
//               Verif{" "}
//             </motion.span>
//             <motion.span initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
//               Playground
//             </motion.span>
//           </motion.h1>
//           <motion.p className="text-lg font-medium" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
//             {isLogin ? "Sign in to start verifying and interacting with dynamic content!" : "Experience simplicity and innovation in a secure environment."}
//           </motion.p>
//         </div>
//       </div>

//       {/* Right - Auth Form */}
//       <div className="flex-1 flex items-center justify-center bg-white p-6">
//         <div className="max-w-md w-full space-y-6">
//           <h2 className="text-3xl font-bold text-center text-red-600">
//             {isLogin ? "Welcome Back" : "Create an Account"}
//           </h2>
//           <form className="space-y-5" onSubmit={handleSubmit}>
//             {!isLogin && (
//               <>
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700">Company Name</label>
//                   <input type="text" name="companyName" required value={formData.companyName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700">First Name</label>
//                   <input type="text" name="firstName" required value={formData.firstName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-bold text-gray-700">Last Name</label>
//                   <input type="text" name="lastName" required value={formData.lastName} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
//                 </div>
//               </>
//             )}
//             <div>
//               <label className="block text-sm font-bold text-gray-700">Email</label>
//               <input type="email" name="email" required value={formData.email} onChange={handleChange} className="w-full p-3 bg-gray-100 border rounded-lg" />
//             </div>
//             <div>
//               <label className="block text-sm font-bold text-gray-700">Password</label>
//               <div className="relative">
//                 <input
//                   type={showPassword ? "text" : "password"}
//                   name="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full p-3 bg-gray-100 border rounded-lg"
//                 />
//                 <span className="absolute right-3 top-4 cursor-pointer text-gray-600" onClick={togglePasswordVisibility}>
//                   {showPassword ? <FaEyeSlash /> : <FaEye />}
//                 </span>
//               </div>
//             </div>
//             <button type="submit" className="w-full bg-red-600 text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition">
//               {isLogin ? "Login" : "Register"}
//             </button>
//           </form>
//           <p className="text-center text-sm text-gray-600">
//             {isLogin ? "Don't have an account?" : "Already have an account?"}
//             <button onClick={handleSwitchMode} className="ml-2 text-red-600 underline">
//               {isLogin ? "Register" : "Login"}
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthPage;




import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";

import { LOGIN_BASE_URL } from "../api";
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
      const response = await axios.post(`${LOGIN_BASE_URL}${endpoint}`, payload);

      if (!response.data.status) throw new Error("Authentication failed.");

      if (isLogin && response.data.token) {
        localStorage.setItem("token", response.data.token);

        try {
          const user = await getUserDetails(response.data.token);
          dispatch(setUser({ ...user, token: response.data.token }));
          navigate("/dashboard", { replace: true });
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

