import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Bell } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Utils
  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const initials =
    capitalize(user?.userData?.firstName?.charAt(0)) +
    capitalize(user?.userData?.lastName?.charAt(0) || "");

  const fullName = `${capitalize(user?.userData?.firstName)} ${capitalize(
    user?.userData?.lastName
  )}`.trim();

  // Handlers
  const handleUVMRegBlock = () => navigate("/uvm-reg-block");

  const handleToggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const handleLogout = () => {
    localStorage.clear();
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 shadow-md p-4 flex justify-between items-center w-full">
      {/* === Left: Logo + Sidebar Toggle === */}
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-lg"
          />
          <h1 className="text-xl font-bold tracking-wide">VERiF Playground</h1>
        </Link>
      </div>

      {/* === Right: Authenticated User Options === */}
      {user && (
        <div className="flex items-center gap-4 relative">
          {/* Upload and Create Buttons (Desktop only) */}
          <div className="hidden sm:flex gap-2">
            {/* <button
              onClick={handleUVMRegBlock}
              className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition"
            >
              Upload RAL
            </button>
            <button className="px-4 py-2 bg-white text-black rounded-md hover:bg-gray-200 transition">
              Create File
            </button> */}
          </div>
          <button className="relative w-10 h-10 flex items-center justify-center rounded-full  text-black hover:scale-105 hover:shadow-lg transition-transform">
            <Bell className="w-7 h-7" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          {/* User Initials Button */}
          <button
            onClick={handleToggleDropdown}
            className="w-10 h-10 flex items-center justify-center bg-white text-black rounded-full font-semibold text-sm border-2 border-white shadow-lg hover:scale-105 hover:shadow-xl transition-transform"
          >
            {initials || <FaRegUser />}
          </button>

          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-14 w-48 bg-white text-black rounded-lg shadow-lg animate-fade-in z-10">
              <div className="px-4 py-3 border-b border-gray-200">
                <div className="text-sm font-semibold flex items-center space-x-2">
                  <FaRegUser className="text-xl" />
                  <span>{fullName}</span>
                </div>
              </div>
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                onClick={() => setIsDropdownOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
