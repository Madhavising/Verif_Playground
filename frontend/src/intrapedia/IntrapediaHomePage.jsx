import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const IntrapediaHomePage = () => {
  const navigate = useNavigate();

  const pages = [
    { name: "Projects", path: "/projects" },
    { name: "Support", path: "/dashboard" },
    { name: "AutoVerify", path: "/autoVerify" },
    { name: "DocShare ", path: "/docSphere" },
    { name: "Tracker", path: "/regressionTracker" },
    { name: "Request", path: "/demo-request-page" },
    { name: "DataHub", path: "/dataHub" },
    { name: "RAL", path: "/uvm-reg-block" },

    // { name: "Tools", path: "/tools" },
  ];

  // Split pages into left and right
  const leftPages = pages.slice(0, pages.length / 2);
  const rightPages = pages.slice(pages.length / 2);

  const radius = 200; // Distance from center

  return (
    <div className="h-full flex flex-col items-center justify-center bg-white px-4 py-10 ">
      {/* Title */}

      <div className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-bold text-blue-900">
          Andgate Intrapedia.
        </h1>
      </div>

      {/* Main Content */}
      <div className="relative w-[700px] h-[400px] mb-10">
        {/* Central Logo */}
        <div className="absolute top-1/2 left-1/2 w-[250px] h-[250px] -translate-x-1/2 -translate-y-1/2 bg-white   rounded-full flex items-center justify-center ">
          <img
            src="/assets/intrapediaImg.png"
            alt="Intrapedia Logo"
            className="w-[400px] h-[400px] object-cover"
          />
        </div>

        {/* Left Side Links - curved vertically */}

        {leftPages.map((page, index) => {
          const angle = ((index + 1) / (leftPages.length + 1)) * Math.PI * 0.8; // reduced from π to 0.8π
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

        {/* right Side Links  */}

        {rightPages.map((page, index) => {
          const angle = ((index + 1) / (rightPages.length + 1)) * Math.PI * 0.8; // reduced angle
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

      {/* Search Bar */}
      <div className="flex items-center bg-white border border-gray-300 rounded-full shadow-md overflow-hidden w-full max-w-md mt-4">
        <input
          type="text"
          placeholder="Search Andgate..."
          className="flex-grow px-5 py-3 text-gray-700 placeholder-gray-400 outline-none text-[15px]"
        />
        <button className="bg-blue-600 hover:bg-blue-700 px-5 py-3 text-white transition rounded-r-full">
          <FaSearch size={18} />
        </button>
      </div>
    </div>
  );
};

export default IntrapediaHomePage;
