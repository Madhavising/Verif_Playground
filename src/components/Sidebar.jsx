import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full fixed mt-16 p-6 shadow-lg">
      {/* Sidebar Header */}
      <div className="mb-8">
        <h1 className="text-xl font-bold text-gray-100 tracking-wide">
          Dashboard
        </h1>
        <p className="text-sm text-gray-400">
          Manage your features efficiently
        </p>
      </div>

      {/* Navigation */}
      <nav>
        <ul className="space-y-6 font-bold text-base">
          <li>
            <Link
              to="/"
              className="block py-2 px-4 rounded-md  text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/uvm-reg-block"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              UVM REG Block
            </Link>
          </li>
          {/* <li>
            <Link
              to="/input-field"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Input Field
            </Link>
          </li> */}
          <li>
            <Link
              to="/texteditor"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Text Editor
            </Link>
          </li>
          <li>
            <Link
              to="/feature2"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Feature 2
            </Link>
          </li>
          <li>
            <Link
              to="/feature3"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Feature 3
            </Link>
          </li>
          <li>
            <Link
              to="/feature4"
              className="block py-2 px-4 rounded-md text-gray-200 hover:bg-red-600 hover:text-white transition-all duration-200"
            >
              Feature 4
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
