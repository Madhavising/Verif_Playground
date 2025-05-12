import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Navbar at the top */}
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex flex-1 overflow-hidden w-full">
        {/* Sidebar on the left */}
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 bg-gray-100 w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;