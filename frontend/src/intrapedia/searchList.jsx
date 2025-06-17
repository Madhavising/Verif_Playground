import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { baseUrl } from "../api";
import { convert } from "html-to-text"; // Ensure you have this package installed

const SearchList = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialQuery = searchParams.get("query") || "";
    const [query, setQuery] = useState(initialQuery);
    const [queryData, setQueryData] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch data when query changes
    useEffect(() => {
        if (query.trim() === "") {
            setQueryData([]);
            return;
        }

        setLoading(true);
        // Simulate API call
        const timeout = setTimeout(() => {
            const fetchData = async () => {
                try {
                    const response = await axios.get(
                        `${baseUrl}/api/getAllDocuments?query=${query.toLowerCase()}`,
                        {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
                                'Content-Type': 'application/json'
                            },
                        }
                    );

                    // Use actual response data
                    // console.log("Response data:", response.data.data);
                    setQueryData(response.data?.data || []);
                } catch (error) {
                    console.error("Error fetching query data:", error);
                    setQueryData([]);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }, 300);


        return () => clearTimeout(timeout); // cleanup on re-render
    }, [query]);

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

    return (
        <>

            <div className="w-[80%] mx-auto p-4 bg-gradient-to-r from-white to-gray-100 rounded-xl shadow-lg border border-gray-200">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Type your search..."
                    className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg shadow-inner focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition duration-200"
                />
            </div>
            <div className="w-[90%] mx-auto mt-4">
                {loading ? (
                    <div className="flex justify-center items-center py-10">
                        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <ul className="list-disc pl-5">

                        {queryData.length > 0 ? (
                            queryData.map((item, index) => {
                                {/* console.log("Item:", item.htmlData); */ }
                                const text = convert(item.htmlData, { wordwrap: 130 })
                                {/* console.log("text:", text.split("\n")); */ }
                                const limitedText = text.length > 200 ? text.slice(0, 200) + '...' : text;
                                return (
                                    <li key={index} className="py-2">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => handleNavigation(item.fileName, item.fileType, item._id)}
                                            className="text-blue-600 hover:underline cursor-pointer"
                                        >
                                            {item.fileName || "Untitled"}
                                        </a>

                                        {item.fileType === "html" || item.fileType === "pdf" ? (
                                            <p className="text-gray-600 mt-1">{limitedText}</p>
                                        ) : (
                                            <p className="text-gray-600 mt-1">File: {item.fileType}</p>
                                        )}
                                    </li>

                                );
                            })
                        ) : (
                            <li className="py-2 text-gray-500">No results found</li>
                        )}
                    </ul>
                )}
            </div>

        </>
    );
};

export default SearchList;
