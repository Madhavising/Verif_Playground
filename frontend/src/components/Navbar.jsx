// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { Menu } from "lucide-react";

// const Navbar = ({ toggleSidebar }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//   // Replace this with actual logged-in user info
//   const user = {
//     firstName: "Madhavi",
//     lastName: "Singh",
//   };

//   const initials =
//     user?.firstName?.charAt(0)?.toUpperCase() +
//     user?.lastName?.charAt(0)?.toUpperCase();

//   const handleToggleDropdown = () => {
//     setIsDropdownOpen((prev) => !prev);
//   };

//   const handleLogout = () => {
//     console.log("Logged out");
//     // Add logout logic here
//   };

//   return (
//     <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 shadow-md p-4 flex justify-between items-center w-full">
//       {/* Left: Logo + Menu */}
//       <div className="flex items-center gap-4">
//         <button onClick={toggleSidebar} className="lg:hidden">
//           <Menu className="w-6 h-6" />
//         </button>
//         <Link to="/" className="flex items-center gap-2">
//           <img
//             src="/assets/logo.jpg"
//             alt="Logo"
//             className="w-16 h-16 rounded-lg"
//           />
//           <h1 className="text-xl font-bold tracking-wide">VERiF Playground</h1>
//         </Link>
//       </div>

//       {/* Right: User Profile Dropdown */}
//       <div className="relative">
//         <button
//           onClick={handleToggleDropdown}
//           className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full font-semibold text-sm border-2 border-white shadow-md hover:scale-105 transition-transform"
//         >
//           {initials}
//         </button>

//         {isDropdownOpen && (
//           <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg animate-fade-in transition-all duration-200">
//             <div className="px-4 py-3 border-b border-gray-200">
//               <p className="text-sm font-semibold">
//                 {user.firstName} {user.lastName}
//               </p>
//             </div>
//             <Link
//               to="/profile"
//               className="block px-4 py-2 hover:bg-gray-100 transition-colors"
//               onClick={() => setIsDropdownOpen(false)}
//             >
//               Profile
//             </Link>
//             <button
//               onClick={handleLogout}
//               className="w-full text-left px-4 py-2 hover:bg-gray-100 transition-colors"
//             >
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const initials =
    user?.firstName?.charAt(0)?.toUpperCase() +
    (user?.lastName?.charAt(0)?.toUpperCase() || "");

  const handleToggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsDropdownOpen(false); // Close dropdown
    navigate("/");
    window.location.reload();
  };

  return (
    <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 shadow-md p-4 flex justify-between items-center w-full">
      {/* Left: Logo + Menu */}
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

      {/* Right: User Profile Dropdown */}
      {user && (
        <div className="relative">
          <button
            onClick={handleToggleDropdown}
            className="flex items-center justify-center w-10 h-10 bg-white text-black rounded-full font-semibold text-sm border-2 border-white shadow-md hover:scale-105 transition-transform"
          >
            {initials}
          </button>

          {isDropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white text-black rounded-lg shadow-lg animate-fade-in transition-all duration-200">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-semibold">
                  {user.firstName} {user.lastName}
                </p>
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
