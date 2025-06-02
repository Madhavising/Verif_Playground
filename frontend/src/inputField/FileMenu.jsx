// FileMenu.jsx
import React, { useState, useRef, useEffect } from "react";

const FileMenu = ({ onAction }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleClickOutside = (e) => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleAction = (action) => {
    onAction(action);
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <button
        onClick={toggleMenu}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          isOpen ? "bg-gray-700 text-white" : "bg-gray-800 text-white hover:bg-gray-700"
        }`}
      >
        File
      </button>

      {isOpen && (
        <div className="absolute z-20 mt-1 w-56 origin-top-left rounded-md bg-white shadow-xl ring-1 ring-black ring-opacity-5">
          <div className="py-1 text-gray-800 text-sm">
            {[
              { label: "New", value: "new" },
              { label: "Open", value: "open" },
              { label: "Save", value: "save" },
              { label: "Download XLS", value: "downloadXLS" },
              { label: "Download PDF", value: "downloadPDF" },
              { label: "Upload Register PDF", value: "uploadRegisterPDF" },
            ].map((item) => (
              <button
                key={item.value}
                onClick={() => handleAction(item.value)}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileMenu;
