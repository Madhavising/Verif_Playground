import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { baseUrl_1, baseUrl } from "../api";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

function UVMRegBlock() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Idle"); // Idle | Processing | Success | Error
  const location = useLocation();
  const { id } = location.state || {};


  useEffect(() => {
    const fetchScript = async () => {
      if (!id) return;

      try {
        const { data } = await axios.get(`${baseUrl}/api/getScript/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const decodedText = atob(data.data.base64);
        setResult(decodedText);

      } catch (error) {
        console.error("Error fetching script:", error.message);
      }
    };

    fetchScript();
  }, [id]);


  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };
  const onDrop = useCallback((acceptedFiles) => {
    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      setFileName(uploadedFile.name);
      setFile(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleScriptRun = () => {
    if (!file) {
      alert("Please upload a file first.");
      return;
    }
    setStatus("Processing");
    setLoading(true);
    sendCSVToServer(file);
  };

  const sendCSVToServer = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await fetch(`${baseUrl_1}/generate-uvm-ral-base/`, {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const apiResult = await response.json();
        const decodedText = atob(apiResult.file);
        setResult(decodedText);

        await axios.post(`${baseUrl}/api/createScript`, {
          fileType: "base64",
          base64: apiResult.file,
          fileName: file.name.split(".")[0] + "." + "uvm_script",
          userId: user.userData._id,
          organization: user.userData.companyName,
        });

        setStatus("Success");
        setStep(3);
      } else {
        setStatus("Error");
        console.error("Upload failed");
      }
    } catch (err) {
      setStatus("Error");
      console.error("Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const downloadScript = () => {
    const blob = new Blob([result], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "uvm_script.sv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const saveScript = () => {
    if (!result) {
      alert("Nothing to save!");
      return;
    }
    const saved = {
      name: fileName || "uvm_script.sv",
      content: result,
      timestamp: new Date().toLocaleString(),
    };
    const existing = JSON.parse(localStorage.getItem("uvmScripts") || "[]");
    existing.unshift(saved);
    localStorage.setItem("uvmScripts", JSON.stringify(existing));
    navigate("/dashboard");
  };

  return (
    <div className="h-full bg-gray-50 px-2 py-2 font-sans">
      {/* Back Button + Title */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={handleBack}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-white border border-blue-100 px-4 py-2 rounded-lg shadow-sm transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h2 className="text-3xl font-bold text-center w-full -ml-8">
          Automate UVM Register Block
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT SECTION */}
        <div className="space-y-6">
          {/* Step Tracker */}
          <div className="bg-white border rounded-xl shadow-sm px-5 py-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📌 Steps Overview
            </h3>
            <ol className="relative border-l border-gray-300 space-y-4 ml-2">
              <li className="ml-4">
                <div
                  className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-blue-600" : "bg-gray-400"
                    } absolute -left-1.5 top-1.5`}
                ></div>
                <h4 className="font-medium">Upload File</h4>
                <p className="text-xs text-gray-500">
                  Choose the Excel sheet to convert.
                </p>
              </li>
              <li className="ml-4">
                <div
                  className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-blue-600" : "bg-gray-400"
                    } absolute -left-1.5 top-1.5`}
                ></div>
                <h4 className="font-medium">Generate Script</h4>
                <p className="text-xs text-gray-500">
                  Submit the file to generate UVM script.
                </p>
              </li>
              <li className="ml-4">
                <div
                  className={`w-3 h-3 rounded-full ${step === 3 ? "bg-blue-600" : "bg-gray-400"
                    } absolute -left-1.5 top-1.5`}
                ></div>
                <h4 className="font-medium">Save or Download</h4>
                <p className="text-xs text-gray-500">
                  View and download/save the result.
                </p>
              </li>
            </ol>
          </div>

          {/* Upload */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              📂 Upload Register File
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Drag & drop or click below to upload Excel (.xlsx or .csv) file.
            </p>
            <div
              {...getRootProps()}
              className="p-6 border-2 border-dashed rounded-xl text-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p className="text-blue-500 font-medium">
                  Drop your file here...
                </p>
              ) : (
                <p className="text-gray-500">
                  {fileName || "Click to browse file"}
                </p>
              )}
            </div>
          </div>

          {/* Generate Script */}
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
              ⚙️ Generate Script
            </h3>
            <p className="text-sm text-gray-500 mb-3">
              Submit your file for automatic conversion to UVM SystemVerilog.
            </p>
            <button
              onClick={() => {
                setStep(2);
                handleScriptRun();
              }}
              disabled={!file || loading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded disabled:opacity-50"
            >
              {loading ? "Processing..." : "Generate Script"}
            </button>
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="relative bg-white border rounded-xl p-4 h-[626px] flex flex-col">
          {/* Top bar: Status left, buttons right */}
          <div className="flex justify-between items-center mb-4">
            {/* Status Display */}
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm w-max">
              <div
                className={`w-3 h-3 rounded-full ${status === "Idle"
                  ? "bg-gray-400"
                  : status === "Processing"
                    ? "bg-yellow-500 animate-pulse"
                    : status === "Success"
                      ? "bg-green-500"
                      : "bg-red-500"
                  }`}
              ></div>
              <p className="text-sm font-medium text-gray-700">{status}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={downloadScript}
                disabled={!result}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded disabled:opacity-50 transition"
                title="Download script"
              >
                Download
              </button>
              <button
                onClick={saveScript}
                disabled={!result}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50 transition"
                title="Save script"
              >
                Save
              </button>
            </div>
          </div>

          {/* Script display */}
          <div className="flex-grow border rounded p-4 bg-gray-50 overflow-auto whitespace-pre-wrap text-sm font-mono text-gray-800">
            {result ? (
              result
            ) : (
              <p className="text-gray-400 italic text-center mt-20">
                Script will appear here after generation...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UVMRegBlock;
