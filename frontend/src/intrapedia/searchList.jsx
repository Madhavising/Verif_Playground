// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import { baseUrl } from "../api";
// import { convert } from "html-to-text"; // Ensure you have this package installed

// const SearchList = () => {
//     const navigate = useNavigate();
//     const [searchParams] = useSearchParams();
//     const initialQuery = searchParams.get("query") || "";
//     const [query, setQuery] = useState(initialQuery);
//     const [queryData, setQueryData] = useState([]);
//     const [loading, setLoading] = useState(false);

//     // Fetch data when query changes
//     useEffect(() => {
//         if (query.trim() === "") {
//             setQueryData([]);
//             return;
//         }

//         setLoading(true);
//         // Simulate API call
//         const timeout = setTimeout(() => {
//             const fetchData = async () => {
//                 try {
//                     const response = await axios.get(
//                         `${baseUrl}/api/getAllDocuments?query=${query.toLowerCase()}`,
//                         {
//                             headers: {
//                                 Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
//                                 'Content-Type': 'application/json'
//                             },
//                         }
//                     );

//                     // Use actual response data
//                     // console.log("Response data:", response.data.data);
//                     setQueryData(response.data?.data || []);
//                 } catch (error) {
//                     console.error("Error fetching query data:", error);
//                     setQueryData([]);
//                 } finally {
//                     setLoading(false);
//                 }
//             };

//             fetchData();
//         }, 300);

//         return () => clearTimeout(timeout); // cleanup on re-render
//     }, [query]);

//     const handleNavigation = (type, id) => {
//         if (!id) {
//             console.error("No ID provided for navigation");
//             return;
//         }

//         switch (type) {
//             case "base64":
//                 navigate("/uvm-reg-block", { state: { id } });
//                 break;
//             case "xlsx":
//                 navigate("/input-field", { state: { id } });
//                 break;
//             case "html":
//             case "pdf":
//                 navigate("/docSphere", { state: { id } });
//                 break;
//             default:
//                 console.warn("Unsupported type:", type);
//         }
//     };

//     return (
//         <>

//             <div className="w-[80%] mx-auto p-4 bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-lg border border-gray-200">
//                 <input
//                     type="text"
//                     value={query}
//                     onChange={(e) => setQuery(e.target.value)}
//                     placeholder="Type your search..."
//                     className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
//                 />
//             </div>
//             <div className="w-[90%] mx-auto mt-4">
//                 {loading ? (
//                     <div className="flex justify-center items-center py-10">
//                         <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
//                     </div>
//                 ) : (
//                     <ul className="list-disc pl-5">

//                         {queryData.length > 0 ? (
//                             queryData.map((item, index) => {
//                                 {/* console.log("Item:", item.htmlData); */ }
//                                 const text = convert(item.htmlData, { wordwrap: 130 })
//                                 {/* console.log("text:", text.split("\n")); */ }
//                                 const limitedText = text.length > 200 ? text.slice(0, 200) + '...' : text;
//                                 return (
//                                     <li key={index} className="py-2">
//                                         <a
//                                             href={item.url}
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                             onClick={() => handleNavigation(item.fileType, item._id)}
//                                             className="text-blue-600 hover:underline cursor-pointer"
//                                         >
//                                             {item.fileName || "Untitled"}
//                                         </a>

//                                         {item.fileType === "html" || item.fileType === "pdf" ? (
//                                             <p className="text-gray-600 mt-1">{limitedText}</p>
//                                         ) : (
//                                             <p className="text-gray-600 mt-1">File: {item.fileType}</p>
//                                         )}
//                                     </li>

//                                 );
//                             })
//                         ) : (
//                             <li className="py-2 text-gray-500">No results found</li>
//                         )}
//                     </ul>
//                 )}
//             </div>

//         </>
//     );
// };

// export default SearchList;



import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "../api";
import { convert } from "html-to-text";
import { Search } from "lucide-react";

const SearchList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") || "";
  const [query, setQuery] = useState(initialQuery);
  const [queryData, setQueryData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.trim() === "") {
      setQueryData([]);
      return;
    }

    setLoading(true);
    const timeout = setTimeout(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${baseUrl}/api/getAllDocuments?query=${query.toLowerCase()}`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                "Content-Type": "application/json",
              },
            }
          );
          setQueryData(response.data?.data || []);
        } catch (error) {
          console.error("Error fetching query data:", error);
          setQueryData([]);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }, 400);
    return () => clearTimeout(timeout);
  }, [query]);

  const handleNavigation = (type, id) => {
    if (!id) return;
    switch (type) {
      case "base64":
        navigate("/uvm-reg-block", { state: { id } });
        break;
      case "xlsx":
        navigate("/input-field", { state: { id } });
        break;
      case "html":
      case "pdf":
        navigate("/docSphere", { state: { id } });
        break;
      default:
        console.warn("Unsupported type:", type);
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800 px-4 py-10 flex justify-center overflow-x-hidden">
      <div className="w-full max-w-3xl">
        {/* Search Bar */}
        <div className="relative mb-8">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search documents..."
            className="w-full pl-12 pr-5 py-3 rounded-full border border-gray-300 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Results */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : queryData.length > 0 ? (
          <div className="space-y-6">
            {queryData.map((item, index) => {
              const text = convert(item.htmlData || "", { wordwrap: 130 });
              const snippet = text.length > 300 ? text.slice(0, 300) + "..." : text;
              const fileType = item.fileType?.toUpperCase() || "FILE";

              return (
                <div
                  key={index}
                  onClick={() => handleNavigation(item.fileType, item._id)}
                  className="group cursor-pointer rounded-xl border border-gray-200 hover:shadow-lg transition p-5"
                >
                  {/* <p className="text-xs text-gray-500 mb-1">
                    {item.url?.replace(/^https?:\/\//, "") || "example.com"}
                  </p> */}

                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h2 className="text-lg text-blue-700 font-medium group-hover:underline leading-snug">
                      {item.fileName || "Untitled Document"}
                    </h2>
                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                        fileType === "PDF"
                          ? "bg-red-100 text-red-600"
                          : fileType === "HTML"
                          ? "bg-green-100 text-green-600"
                          : fileType === "XLSX"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      [{fileType}]
                    </span>
                  </div>

                  <p className="text-sm text-gray-700 leading-relaxed line-clamp-4">
                    {fileType === "HTML" || fileType === "PDF"
                      ? snippet
                      : `File type: ${fileType}`}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">No results found</p>
        )}
      </div>
    </div>
  );
};

export default SearchList;
