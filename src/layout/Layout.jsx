import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="w-full bg-blue-600 text-white shadow-md fixed top-0 z-20">
        <Navbar />
      </div>

      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <div className="w-64 bg-blue-600 fixed top-10 bottom-0">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="flex-1 ml-64 p-6 bg-gray-100">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
