import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-b from-black to-red-500 text-white sticky top-0 z-50 shadow-lg border-b-2 border-red-900">
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/src/assets/logo.jpg" // Replace with the path to your logo
            alt="Logo"
            className="w-25 h-20 rounded-lg"
          />
          <h1 className="text-xl font-bold tracking-wide">VERiF Playground</h1>
        </div>

        {/* <button className="bg-white text-black font-bold px-4 py-2 rounded-full border-2 border-red-500 hover:bg-black hover:text-white transition-all">
          Get Started
        </button> */}
      </div>
    </nav>
  );
};

export default Navbar;
