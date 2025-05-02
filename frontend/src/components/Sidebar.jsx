// import React from "react";
// import { Link } from "react-router-dom";

// const Sidebar = ({ isOpen, toggleSidebar }) => {
//   return (
//     <div
//       className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-full max-w-xs transform ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 lg:static lg:h-auto lg:block`}
//     >
//       <div className="p-6 w-full">
//         <h1 className="text-xl font-bold mb-4"><Link to="/dashboard">Dashboard</Link></h1>
//         <p className="text-sm text-gray-400">Manage your features efficiently</p>
//         <nav className="space-y-4 mt-5 w-full">
//           {[
//             { to: "/verificationLayout", label: "Home" },
//             // { to:"/dashboard", label:"Dashboard"},
//             { to: "/uvm-reg-block", label: "UVM REG Block" },
//             { to: "/docSphere", label: "DocSphere" },
//             { to: "/autoVerify", label: "AutoVerify" },
//             { to: "/regressionTracker", label: "Regression Tracker" },
//             { to: "/dataHub", label: "DataHub" },
//           ].map((item, index) => (
//             <Link
//               key={index}
//               to={item.to}
//               className="block py-2 px-4 rounded hover:bg-red-600 w-full"
//               onClick={toggleSidebar}
//             >
//               {item.label}
//             </Link>
//           ))}
//         </nav>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Home, Box, FileText, CheckCircle2, BarChart, Database, X } from "lucide-react";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();

  const navItems = [
    { to: "/verificationLayout", label: "Home", icon: <Home size={20} /> },
    { to: "/uvm-reg-block", label: "UVM REG Block", icon: <Box size={20} /> },
    { to: "/docSphere", label: "DocSphere", icon: <FileText size={20} /> },
    { to: "/autoVerify", label: "AutoVerify", icon: <CheckCircle2 size={20} /> },
    { to: "/regressionTracker", label: "Regression Tracker", icon: <BarChart size={20} /> },
    { to: "/dataHub", label: "DataHub", icon: <Database size={20} /> },
  ];

  return (
    <div
      className={`fixed inset-y-16 left-0 z-40 w-20 bg-white border-r shadow-md transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static`}
    >
      

      {/* Sidebar Content */}
      <div className="flex flex-col mt-8 items-center py-6 space-y-6">
        <Link to="/dashboard" onClick={toggleSidebar} className="text-blue-600">
          <LayoutDashboard size={26} />
        </Link>

        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.to;
          return (
            <Link
              key={idx}
              to={item.to}
              onClick={toggleSidebar}
              className={`group relative flex items-center justify-center w-10 h-10 rounded-full hover:bg-blue-100 ${
                isActive ? "bg-blue-100 text-blue-600" : "text-gray-600"
              }`}
            >
              {item.icon}
              {/* Tooltip */}
              <span className="absolute left-full ml-2 w-max bg-gray-800 text-white text-xs rounded px-2 py-1 opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
