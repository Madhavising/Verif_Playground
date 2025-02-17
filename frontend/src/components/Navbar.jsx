import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = ({ toggleSidebar }) => {
  return (
    <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 shadow-md p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={toggleSidebar} className="lg:hidden">
          <Menu className="w-6 h-6" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <img
            src="/src/assets/logo.jpg"
            alt="Logo"
            className="w-16 h-16 rounded-lg"
          />
          <h1 className="text-xl font-bold tracking-wide">VERiF Playground</h1>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
