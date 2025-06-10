import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Home,
  Box,
  Send,
  FileText,
  CheckCircle2,
  BarChart,
  Database,
  ChevronLeft,
  ChevronRight,
  CircuitBoard,
} from "lucide-react";

const navItems = [
  { to: "/intrapediaHome", label: "Home", icon: Home },
  { to: "/input-field", label: "Create Register Map", icon: Box },
  { to: "/docSphere", label: "DocSphere", icon: FileText },
    { to: "/circuit-diagram", label: "Circuit Daigram", icon: CircuitBoard },
  { to: "/demo-request-page", label: "Request", icon: Send },
  { to: "/autoVerify", label: "AutoVerify", icon: CheckCircle2 },
  { to: "/regressionTracker", label: "Tracker", icon: BarChart },
  { to: "/dataHub", label: "DataHub", icon: Database },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-[#1e1e2f] text-gray-300 transition-all duration-300 ease-in-out 
      ${isOpen ? "w-64" : "w-16"} fixed z-50 border-r border-gray-700`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Top Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          <Link to="/dashboard" className="flex items-center gap-2">
            <LayoutDashboard size={22} />
            {isOpen && (
              <span className="text-sm font-semibold text-white tracking-wide">
                Dashboard
              </span>
            )}
          </Link>
          <button onClick={toggleSidebar} className="hidden lg:inline-block text-gray-400 hover:text-white">
            {isOpen ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {navItems.map(({ to, label, icon: Icon }, index) => {
            const isActive = location.pathname === to;

            return (
              <Link
                key={index}
                to={to}
                className={`group relative flex items-center px-3 py-2 rounded-md transition-colors duration-200 text-sm
                ${isActive ? "bg-blue-600 text-white" : "hover:bg-gray-700 hover:text-white"}
                `}
              >
                <Icon
                  size={20}
                  className={`min-w-[20px] transition-transform duration-300 ${
                    isActive ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}
                />
                {isOpen && <span className="ml-3">{label}</span>}

                {!isOpen && (
                  <span className="absolute left-16 top-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded z-50 opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Toggle */}
        <div className="px-4 py-4 border-t border-gray-700 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-400 hover:text-white"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
