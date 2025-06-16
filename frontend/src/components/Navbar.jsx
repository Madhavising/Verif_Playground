import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bell } from "lucide-react";
import { FaRegUser } from "react-icons/fa6";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const capitalize = (str) =>
    str ? str.charAt(0).toUpperCase() + str.slice(1).toLowerCase() : "";

  const initials =
    capitalize(user?.userData?.firstName?.charAt(0)) +
    capitalize(user?.userData?.lastName?.charAt(0) || "");

  const fullName = `${capitalize(user?.userData?.firstName)} ${capitalize(
    user?.userData?.lastName
  )}`.trim();

  const handleLogout = () => {
    localStorage.clear();
    setIsDropdownOpen(false);
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 border-b border-gray-300 px-4 py-4 flex justify-between items-center w-full shadow-sm">
      {/* Left: Logo Only */}
      <div className="flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/assets/logo.jpg"
            alt="Logo"
            className="w-11 h-11 rounded-md"
          />
          <span className="text-[20px] font-bold font-satoshi text-white tracking-[0.02em] leading-none">
            VERiF Playground
          </span>
        </Link>
      </div>

      {/* Right: User Options */}
      {user && (
        <div className="flex items-center gap-4 relative">
          {/* Notification Bell */}
          <button className="relative text-white hover:text-gray-300 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Button */}
          <button
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-9 h-9 flex items-center justify-center bg-white border border-gray-300 text-black rounded-full font-medium shadow-sm hover:shadow transition"
          >
            {initials || <FaRegUser />}
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-12 w-48 bg-white text-black border border-gray-200 rounded-lg shadow-lg z-10 text-sm">
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="font-medium flex items-center gap-2">
                  <FaRegUser className="text-base" />
                  <span>{fullName}</span>
                </div>
              </div>
              <Link
                to="/profile"
                onClick={() => setIsDropdownOpen(false)}
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 transition"
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
