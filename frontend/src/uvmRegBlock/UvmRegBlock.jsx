import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { baseUrl_1 , baseUrl} from "../api";

function UVMRegBlock({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [isScriptRunning, setIsScriptRunning] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleInputField = () => {
    navigate("/input-field");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      setFile(file);
    }
  };

  const handleSwitchChange = () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
    setLoading(true);
    setIsScriptRunning(true);
    sendCSVToServer(file);
  };

  const sendCSVToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        // "http://3.145.185.106:8000/generate-uvm-ral-base/",
        `${baseUrl_1}/generate-uvm-ral-base/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const apiResult = await response.json();

        let formData = {
          userId: user.userData._id,
          file: apiResult.file,
          fileName: file.name,
          name: user.userData.firstName + " " + user.userData.lastName,
          organization: user.userData.companyName,
        };

        await axios.post(`${baseUrl}/api/createScript`, formData);
        const decodedText = atob(apiResult.file);
        setResult(decodedText);
      } else {
        console.error("Upload failed");
      }
    } catch (error) {
      console.error("Error during file upload:", error);
    } finally {
      setLoading(false);
      setIsScriptRunning(false);
    }
  };

  const downloadScript = () => {
    if (!result) {
      alert("No script available to download.");
      return;
    }

    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "processed_script.txt";
    a.click();

    URL.revokeObjectURL(url);
  };

  const handleSave = () => {
    if (!result) {
      alert("Nothing to save!");
      return;
    }

    // Create an object to save
    const savedFile = {
      name: fileName || "unnamed_script.txt",
      content: result,
      timestamp: new Date().toLocaleString(),
    };

    // Save to localStorage (append to existing files)
    const existing = JSON.parse(localStorage.getItem("uvmScripts") || "[]");
    existing.unshift(savedFile);
    localStorage.setItem("uvmScripts", JSON.stringify(existing));

    // Navigate to dashboard
    navigate("/dashboard");
  };

 return (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
    <div className="relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8">
      {/* Close Button */}
      <button
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
        onClick={onClose}
      >
        &times;
      </button>

      {/* Heading */}
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Automate UVM Register Block
      </h2>

      {/* Upload Section */}
      <section className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 mb-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Excel File</h3>
        <label
          htmlFor="file-upload"
          className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow transition"
        >
          Choose File
        </label>
        <input
          id="file-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {fileName && (
          <p className="text-sm text-gray-600 mt-3">
            File Selected: <span className="font-medium">{fileName}</span>
          </p>
        )}
      </section>

      {/* Script Toggle */}
      <section className="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
        <span className="text-gray-700 font-medium text-base">Run Script</span>
        <input
          type="checkbox"
          className="form-checkbox h-6 w-6 text-blue-600"
          checked={isScriptRunning}
          onChange={handleSwitchChange}
        />
      </section>

      {/* Loading Message */}
      {loading && (
        <p className="text-center text-blue-600 font-semibold mb-5">
          Processing your script...
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
        <button
          onClick={downloadScript}
          disabled={!result}
          className={`w-full md:w-auto px-6 py-2 rounded-lg text-white font-semibold transition ${
            result
              ? 'bg-green-500 hover:bg-green-600'
              : 'bg-green-300 cursor-not-allowed'
          }`}
        >
          Download Script
        </button>
        <button
          onClick={handleSave}
          className="w-full md:w-auto px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
        >
          Save
        </button>
      </div>

      {/* Output Script */}
      {result && (
        <div className="mt-8 bg-gray-100 p-5 rounded-xl shadow-inner overflow-auto max-h-64">
          <h4 className="font-bold text-gray-700 mb-3">Generated Script:</h4>
          <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
        </div>
      )}
    </div>
  </div>
);

}

export default UVMRegBlock;
