import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed  inset-y-0 left-0 bg-gray-800 text-white w-64 transform ${
        isOpen ? "translate-x-0 " : "-translate-x-full "
      } lg:translate-x-0  transition-transform duration-300 ease-in-out z-40 lg:static lg:h-auto lg:block`}
    >
      <div className="p-6 ">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <p className="text-sm text-gray-400">
          Manage your features efficiently
        </p>
        <nav className="space-y-4 mt-5">
          <Link
            to="/"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            Home
          </Link>
          <Link
            to="/uvm-reg-block"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            UVM REG Block
          </Link>
          <Link
            to="/docSphere"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            DocSphere
          </Link>
          <Link
            to="/autoVerify"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            AutoVerify
          </Link>
          <Link
            to="/regressionTracker"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            Regression Tracker
          </Link>
          <Link
            to="/dataHub"
            className="block py-2 px-4 rounded hover:bg-red-600"
            onClick={toggleSidebar}
          >
            DataHub
          </Link>
        
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
