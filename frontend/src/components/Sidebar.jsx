// import React from "react";
// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, Home, Box, Send, FileText, CheckCircle2, BarChart, Database } from "lucide-react";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   const location = useLocation();

//   const navItems = [
//     { to: "/verificationLayout", label: "Home", icon: <Home size={20} /> },
//     { to: "/uvm-reg-block", label: "UVM REG Block", icon: <Box size={20} /> },
//     { to: "/docSphere", label: "DocSphere", icon: <FileText size={20} /> },
//     { to: "/demo-request-page", label: "Demo Request", icon: <Send size={20} /> },
//     { to: "/autoVerify", label: "AutoVerify", icon: <CheckCircle2 size={20} /> },
//     { to: "/regressionTracker", label: "Regression Tracker", icon: <BarChart size={20} /> },
//     { to: "/dataHub", label: "DataHub", icon: <Database size={20} /> },
//   ];

//   return (
//     <div
//       className={`fixed inset-y-0 left-0 z-40 w-16 bg-gradient-to-b from-gray-900 to-gray-800 shadow-lg transform transition-transform duration-300 ease-in-out ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } lg:translate-x-0 lg:static`}
//     >
//       <div className="flex flex-col items-center py-6 space-y-8">
//         {/* Dashboard Logo */}
//         <Link to="/dashboard" onClick={toggleSidebar} className="text-white">
//           <LayoutDashboard size={26} />
//         </Link>

//         {/* Navigation Links */}
//         {navItems.map((item, idx) => {
//           const isActive = location.pathname === item.to;
//           return (
//             <Link
//               key={idx}
//               to={item.to}
//               onClick={toggleSidebar}
//               className={`group relative flex items-center justify-center w-14 h-14 rounded-full bg-transparent hover:bg-blue-700 transition-all duration-300 ease-in-out ${
//                 isActive
//                   ? "bg-blue-700 text-white border-l-4 border-blue-400"
//                   : "text-white"
//               }`}
//             >
//               {item.icon}
//               {/* Tooltip */}
//               <span className="absolute left-full ml-2 w-max bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-all whitespace-nowrap z-50">
//                 {item.label}
//               </span>
//             </Link>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

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
} from "lucide-react";

const navItems = [
  { to: "/verificationLayout", label: "Home", icon: Home },
  { to: "/uvm-reg-block", label: "UVM REG", icon: Box },
  { to: "/docSphere", label: "DocSphere", icon: FileText },
  { to: "/demo-request-page", label: "Request", icon: Send },
  { to: "/autoVerify", label: "AutoVerify", icon: CheckCircle2 },
  { to: "/regressionTracker", label: "Tracker", icon: BarChart },
  { to: "/dataHub", label: "DataHub", icon: Database },
];

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div
      className={`h-screen bg-gray-900 text-white shadow-xl transition-all duration-300 ease-in-out ${
        isOpen ? "w-64" : "w-20"
      } fixed lg:relative z-50`}
    >
      <div className="flex flex-col h-full justify-between">
        {/* Top: Logo + Toggle */}
        <div className="flex items-center justify-between px-4 py-5">
          <Link to="/dashboard" className="text-white flex items-center gap-2">
            <LayoutDashboard size={24} />
            {isOpen && <span className="text-lg font-semibold">Dashboard</span>}
          </Link>
          <button
            onClick={toggleSidebar}
            className="lg:inline-block hidden text-white"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 px-2 space-y-1">
          {navItems.map(({ to, label, icon: Icon }, index) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={index}
                to={to}
                className={`group relative flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ease-in-out
                  ${
                    isActive
                      ? "bg-blue-600 text-white shadow-md font-semibold"
                      : "text-gray-300 hover:text-white hover:bg-gray-800"
                  }
                `}
              >
                <Icon
                  size={22}
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    isActive ? "text-white" : ""
                  }`}
                />
                {isOpen && (
                  <span className="transition-opacity duration-300">
                    {label}
                  </span>
                )}

                {!isOpen && (
                  <span className="absolute left-20 top-1/2 -translate-y-1/2 whitespace-nowrap bg-black text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50">
                    {label}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom: Toggle Button */}
        <div className="px-4 py-4 border-t border-gray-800 flex justify-center">
          <button
            onClick={toggleSidebar}
            className="bg-gray-800 hover:bg-gray-700 text-white rounded-full p-2 transition-all"
          >
            {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
