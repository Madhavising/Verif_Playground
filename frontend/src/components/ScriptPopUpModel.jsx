import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { baseUrl } from "../api";
import axios from "axios";

const UserPopupModal = ({ isOpen, onClose, setRows }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [scriptData, setScriptData] = useState([]);

  const handleScriptClick = async (id) => {
    try {
      const { data } = await axios.get(`${baseUrl}/api/getScript/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });


      setRows(data.data.formData.data);
      onClose();
    } catch (error) {
      console.error("Error handling script click:", error.message);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const getAllXlsxByUser = async () => {
      try {
        const { data } = await axios.get(`${baseUrl}/api/getAllXlsxByUser`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setScriptData(data.data);
        setIsLoading(false);
      } catch (error) {
        console.error("get recentActivity error:", error.message);
      }
    };

    getAllXlsxByUser();
  }, [isOpen]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6">
          <h2 className="text-xl font-semibold mb-4">Loading...</h2>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-auto">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto p-6 relative">
        <h2 className="text-xl font-semibold mb-4">Script List</h2>

        <ul className="space-y-3">
          {scriptData.map((script) => (
            <li
              key={script._id}
              onClick={() => {
                handleScriptClick(script._id);
              }}
              className="flex justify-between items-center border p-3 rounded-lg transition-all duration-200 ease-in-out hover:bg-gray-100 hover:shadow-md hover:scale-[1.01] cursor-pointer"
            >
              <div className="font-medium">{script.fileName}</div>
              <div className="text-sm text-gray-600">{script.fileType}</div>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
        >
          ×
        </button>
      </div>
    </div>
  );
};

UserPopupModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UserPopupModal;
