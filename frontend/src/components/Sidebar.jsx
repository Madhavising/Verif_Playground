import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-full max-w-xs transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:static lg:h-auto lg:block`}
    >
      <div className="p-6 w-full">
        <h1 className="text-xl font-bold mb-4">Dashboard</h1>
        <p className="text-sm text-gray-400">Manage your features efficiently</p>
        <nav className="space-y-4 mt-5 w-full">
          {[
            { to: "/", label: "Home" },
            { to: "/uvm-reg-block", label: "UVM REG Block" },
            { to: "/docSphere", label: "DocSphere" },
            { to: "/autoVerify", label: "AutoVerify" },
            { to: "/regressionTracker", label: "Regression Tracker" },
            { to: "/dataHub", label: "DataHub" },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="block py-2 px-4 rounded hover:bg-red-600 w-full"
              onClick={toggleSidebar}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;