import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { baseUrl } from "../api";
import Loading from "../components/Loading";

const IntrapediaHomePage = () => {
  const navigate = useNavigate();
  const [queryData, setQueryData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef(null);

  const pages = [
    { name: "Projects", path: "/projects" },
    { name: "Support", path: "/dashboard" },
    { name: "AutoVerify", path: "/autoVerify" },
    { name: "DocShare", path: "/docSphere" },
    { name: "Tracker", path: "/regressionTracker" },
    { name: "Request", path: "/demo-request-page" },
    { name: "DataHub", path: "/dataHub" },
    { name: "RAL", path: "/uvm-reg-block" },
  ];

  const leftPages = pages.slice(0, pages.length / 2);
  const rightPages = pages.slice(pages.length / 2);
  const radius = 200;

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);
    setLoading(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      if (value.trim() === "") {
        setQueryData([]);
        setIsOpen(false);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `${baseUrl}/api/getScriptByRejex?query=${value.toLowerCase()}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            'Content-Type': 'application/json', // Ensure the content type is set
          },
        }
        );

        if (response.data.status && response.data.data.length > 0) {
          setQueryData(response.data.data);
          setIsOpen(true);
        } else {
          setQueryData([]);
          setIsOpen(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setQueryData([]);
      } finally {
        setLoading(false);
      }
    }, 400); // debounce delay
  };

const handleNavigation = (fileName, type, id) => {
  if (!id) {
    console.error("No ID provided for navigation");
    return;
  }

  const fileFormat = fileName.split('.').pop().toLowerCase();

  if (type === "base64" && fileFormat === "uvm_script") {
    navigate("/uvm-reg-block", { state: { id } });
  } else if (fileFormat === "xlsx") {
    navigate("/input-field", { state: { id } });
  } else if (fileFormat === "html" || fileFormat === "pdf") {
    navigate("/docSphere", { state: { id } });
  } else {
    console.warn("Unsupported type or format:", type, fileFormat);
  }
};


  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      const value = event.target.value;
      navigate(`/searchList?query=${value}`);
      setIsOpen(false);
    }
  };


  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-4 py-10">
      {/* Title */}
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-blue-900">
          Andgate Intrapedia.
        </h1>
      </div>

      {/* Search Bar with Dropdown */}
      <div className="relative w-full max-w-md mt-4">
        <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden">
          <input
            type="text"
            placeholder="Search Andgate..."
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 outline-none text-[15px]"
          />
          <div className="w-6 h-6 mx-4 flex items-center justify-center">
            {loading ? (
              <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaSearch className="text-gray-400" />
            )}
          </div>
        </div>

        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {queryData.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {queryData.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      handleNavigation(item.fileName, item.fileType, item._id);
                      // navigate(`/editor/${item._id}`);
                      setIsOpen(false);
                      setSearchInput("");
                    }}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                  >
                    {item.fileName || "Untitled"}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500 italic">
                No results found.
              </div>
            )}
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="relative w-[700px] h-[400px] mb-10">
        {/* Center Logo */}
        <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-white rounded-full flex items-center justify-center">
          <img
            src="/assets/intrapediaImg.png"
            alt="Intrapedia Logo"
            className="w-[400px] h-[400px] object-cover"
          />
        </div>

        {/* Left Side Buttons */}
        {leftPages.map((page, index) => {
          const angle = ((index + 1) / (leftPages.length + 1)) * Math.PI * 0.8;
          const y = radius * Math.cos(angle);
          const x = radius * Math.sin(angle) * -1;

          return (
            <button
              key={index}
              onClick={() => navigate(page.path)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[15px] font-medium text-black hover:text-white hover:bg-blue-700 px-3 py-1 rounded-full transition"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
              }}
            >
              {page.name}
            </button>
          );
        })}

        {/* Right Side Buttons */}
        {rightPages.map((page, index) => {
          const angle = ((index + 1) / (rightPages.length + 1)) * Math.PI * 0.8;
          const y = radius * Math.cos(angle);
          const x = radius * Math.sin(angle);

          return (
            <button
              key={index}
              onClick={() => navigate(page.path)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 text-[15px] font-medium text-black hover:text-white hover:bg-blue-700 px-3 py-1 rounded-full transition"
              style={{
                top: `calc(50% + ${y}px)`,
                left: `calc(50% + ${x}px)`,
              }}
            >
              {page.name}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default IntrapediaHomePage;
