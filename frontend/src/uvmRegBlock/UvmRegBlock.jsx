// import axios from "axios";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { baseUrl_1, baseUrl } from "../api";

// function UVMRegBlock() {
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [result, setResult] = useState("");
//   const [file, setFile] = useState(null);
//   const [isScriptRunning, setIsScriptRunning] = useState(false);

//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       setFile(file);
//     }
//   };

//   const handleSwitchChange = () => {
//     if (!file) {
//       alert("Please upload a file first.");
//       return;
//     }
//     setLoading(true);
//     setIsScriptRunning(true);
//     sendCSVToServer(file);
//   };

//   const sendCSVToServer = async (file) => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(`${baseUrl_1}/generate-uvm-ral-base/`, {
//         method: "POST",
//         body: formData,
//       });

//       if (response.ok) {
//         const apiResult = await response.json();

//         let formData = {
//           userId: user.userData._id,
//           file: apiResult.file,
//           fileName: file.name,
//           name: user.userData.firstName + " " + user.userData.lastName,
//           organization: user.userData.companyName,
//         };

//         await axios.post(`${baseUrl}/api/createScript`, formData);
//         const decodedText = atob(apiResult.file);
//         setResult(decodedText);
//       } else {
//         console.error("Upload failed");
//       }
//     } catch (error) {
//       console.error("Error during file upload:", error);
//     } finally {
//       setLoading(false);
//       setIsScriptRunning(false);
//     }
//   };

//   const downloadScript = () => {
//     if (!result) {
//       alert("No script available to download.");
//       return;
//     }

//     const blob = new Blob([result], { type: "text/plain" });
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "processed_script.txt";
//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   const handleSave = () => {
//     if (!result) {
//       alert("Nothing to save!");
//       return;
//     }

//     const savedFile = {
//       name: fileName || "unnamed_script.txt",
//       content: result,
//       timestamp: new Date().toLocaleString(),
//     };

//     const existing = JSON.parse(localStorage.getItem("uvmScripts") || "[]");
//     existing.unshift(savedFile);
//     localStorage.setItem("uvmScripts", JSON.stringify(existing));

//     navigate("/dashboard");
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 py-10 px-6">
//       <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8">
//         {/* Back Button */}
//         <button
//           onClick={() => navigate("/")}
//           className="mb-6 text-blue-600 hover:underline font-semibold"
//         >
//           ← Back to Home
//         </button>

//         {/* Heading */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           Automate UVM Register Block
//         </h2>

//         {/* Upload Section */}
//         <section className="bg-gray-50 p-6 rounded-xl border border-dashed border-gray-300 mb-6 text-center">
//           <h3 className="text-lg font-semibold text-gray-700 mb-4">Upload Excel File</h3>
//           <label
//             htmlFor="file-upload"
//             className="inline-block cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2 rounded-md shadow transition"
//           >
//             Choose File
//           </label>
//           <input
//             id="file-upload"
//             type="file"
//             className="hidden"
//             onChange={handleFileChange}
//           />
//           {fileName && (
//             <p className="text-sm text-gray-600 mt-3">
//               File Selected: <span className="font-medium">{fileName}</span>
//             </p>
//           )}
//         </section>

//         {/* Script Toggle */}
//         <section className="flex items-center justify-between bg-gray-50 p-5 rounded-xl border border-gray-200 mb-6">
//           <span className="text-gray-700 font-medium text-base">Run Script</span>
//           <input
//             type="checkbox"
//             className="form-checkbox h-6 w-6 text-blue-600"
//             checked={isScriptRunning}
//             onChange={handleSwitchChange}
//           />
//         </section>

//         {/* Loading Message */}
//         {loading && (
//           <p className="text-center text-blue-600 font-semibold mb-5">
//             Processing your script...
//           </p>
//         )}

//         {/* Action Buttons */}
//         <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-6">
//           <button
//             onClick={downloadScript}
//             disabled={!result}
//             className={`w-full md:w-auto px-6 py-2 rounded-lg text-white font-semibold transition ${
//               result
//                 ? "bg-green-500 hover:bg-green-600"
//                 : "bg-green-300 cursor-not-allowed"
//             }`}
//           >
//             Download Script
//           </button>
//           <button
//             onClick={handleSave}
//             className="w-full md:w-auto px-6 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white font-semibold transition"
//           >
//             Save
//           </button>
//         </div>

//         {/* Output Script */}
//         {result && (
//           <div className="mt-8 bg-gray-100 p-5 rounded-xl shadow-inner overflow-auto max-h-64">
//             <h4 className="font-bold text-gray-700 mb-3">Generated Script:</h4>
//             <pre className="text-sm text-gray-800 whitespace-pre-wrap">{result}</pre>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default UVMRegBlock;

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { baseUrl_1, baseUrl } from "../api";
import axios from "axios";


function UVMRegBlock() {
  const [step, setStep] = useState(1);
  const [fileName, setFileName] = useState("");
  const [file, setFile] = useState(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("Idle"); // Idle | Processing | Success | Error

  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

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
          fileName: file.name,
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
      <h2 className="text-3xl font-bold text-center  mb-5">
        Automate UVM Register Block
      </h2>
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
                  className={`w-3 h-3 rounded-full ${
                    step >= 1 ? "bg-blue-600" : "bg-gray-400"
                  } absolute -left-1.5 top-1.5`}
                ></div>
                <h4 className="font-medium">Upload File</h4>
                <p className="text-xs text-gray-500">
                  Choose the Excel sheet to convert.
                </p>
              </li>
              <li className="ml-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step >= 2 ? "bg-blue-600" : "bg-gray-400"
                  } absolute -left-1.5 top-1.5`}
                ></div>
                <h4 className="font-medium">Generate Script</h4>
                <p className="text-xs text-gray-500">
                  Submit the file to generate UVM script.
                </p>
              </li>
              <li className="ml-4">
                <div
                  className={`w-3 h-3 rounded-full ${
                    step === 3 ? "bg-blue-600" : "bg-gray-400"
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
                className={`w-3 h-3 rounded-full ${
                  status === "Idle"
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
