import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

function UVMRegBlock() {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [isScriptRunning, setIsScriptRunning] = useState(false);

  const navigate = useNavigate();

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

  const sendCSVToServer = async () => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch(
        // "http://3.145.185.106:8000/generate-uvm-ral-base/",
         "https://python.verifplay.com/generate-uvm-ral-base/",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const apiResult = await response.json();
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
    <div className="  bg-gray-100 flex flex-col items-center mx-auto py-16">
      <main className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 mt-8">
        <h2 className="text-xl font-semibold text-center mb-6">
          Automate Your UVM Register Block Generation
        </h2>

        {/* Center Column: File Upload & Controls */}
        <div className="space-y-6">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-center text-gray-700 mb-4">
              Upload Excel File
            </h3>
            <div className="flex items-center justify-between">
              <input
                type="file"
                className="border border-gray-300 rounded px-2 py-1 w-full"
                onChange={handleFileChange}
              />
              <button
                onClick={handleInputField}
                className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Enter Data Manually
              </button>
            </div>
            {fileName && (
              <p className="text-sm text-gray-500 mt-2">
                File Selected: {fileName}
              </p>
            )}
          </div>

          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <div className="flex items-center justify-between">
              <span>Run Script</span>
              <input
                type="checkbox"
                className="toggle toggle-blue"
                checked={isScriptRunning}
                onChange={handleSwitchChange}
              />
            </div>
            {loading && (
              <div className="text-center mt-4">
                <span className="text-blue-500">Processing...</span>
              </div>
            )}
          </div>

          <div className="bg-gray-50 flex flex-col justify-center items-center md:flex-row gap-4 p-6 rounded-lg shadow-sm">
            <button
              onClick={downloadScript}
              className="w-full md:w-auto bg-green-500 text-white py-2 px-6 rounded-lg hover:bg-green-600 transition "
              disabled={!result}
            >
              Download Script
            </button>

            <button
              onClick={handleSave}
              className="w-full md:w-auto bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Save
            </button>
          </div>
        </div>

        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-700">Output:</h3>
            <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
      </main>
    </div>
  );
}

export default UVMRegBlock;
