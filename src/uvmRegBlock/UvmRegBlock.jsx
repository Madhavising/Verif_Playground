// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import * as XLSX from "xlsx";

// function UVMRegBlock() {
//   const [loading, setLoading] = useState(false);
//   const [fileName, setFileName] = useState("");
//   const [result, setResult] = useState("");
//   const [file, setFile] = useState(null);
//   const [isScriptRunning, setIsScriptRunning] = useState(false);

//   const navigate = useNavigate();

//   const handleInputField = () => {
//     navigate("/input-field");
//   };

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

//   const sendCSVToServer = async () => {
//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const response = await fetch(
//         "http://3.145.185.106:8000/generate-uvm-ral-base/",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       if (response.ok) {
//         const apiResult = await response.json();
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

//   return (
//     <div className="min-h-screen h-screen bg-gray-100 flex flex-col items-center mx-auto py-16">
//       {/* <header className="w-full bg-red-600 text-white py-4 shadow-md px-0">
//         <h1 className="text-center text-2xl font-bold">UVM Reg Block Tool</h1>
//       </header> */}

//       <main className="w-full max-w-5xl bg-white shadow-lg rounded-lg p-8 mt-8">
//         <h2 className="text-xl font-semibold text-center mb-6">
//           Automate Your UVM Register Block Generation
//         </h2>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column: Options */}
//           <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
//             <h3 className="font-bold text-center text-gray-700">Options</h3>
//             <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//               uvm_mem
//             </button>
//             <button className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//               uvm_reg_map
//             </button>
//           </div>

//           {/* Center Column: File Upload & Controls */}
//           <div className="col-span-2 space-y-6">
//             <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <h3 className="font-bold text-center text-gray-700 mb-4">
//                 Upload Excel File
//               </h3>
//               <div className="flex items-center justify-between">
//                 <input
//                   type="file"
//                   className="border border-gray-300 rounded px-2 py-1 w-full"
//                   onChange={handleFileChange}
//                 />
//                 <button
//                   onClick={handleInputField}
//                   className="ml-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
//                 >
//                   Enter Data Manually
//                 </button>
//               </div>
//               {fileName && (
//                 <p className="text-sm text-gray-500 mt-2">
//                   File Selected: {fileName}
//                 </p>
//               )}
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <div className="flex items-center justify-between">
//                 <span>Run Script</span>
//                 <input
//                   type="checkbox"
//                   className="toggle toggle-blue"
//                   checked={isScriptRunning}
//                   onChange={handleSwitchChange}
//                 />
//               </div>
//               {loading && (
//                 <div className="text-center mt-4">
//                   <span className="text-blue-500">Processing...</span>
//                 </div>
//               )}
//             </div>

//             <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
//               <button
//                 onClick={downloadScript}
//                 className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
//                 disabled={!result}
//               >
//                 Download Script
//               </button>
//             </div>
//           </div>
//         </div>

//         {result && (
//           <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
//             <h3 className="font-bold text-gray-700">Output:</h3>
//             <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
//               {result}
//             </pre>
//           </div>
//         )}
//       </main>

//       {/* <footer className="w-full bg-blue-600 text-white py-4 mt-10">
//         <p className="text-center text-sm">&copy; 2025 UVM Tools. All Rights Reserved.</p>
//       </footer> */}
//     </div>
//   );
// }

// export default UVMRegBlock;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const UvmRegBlock = ({ useManualInput, manualData, setUseManualInput }) => {
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [file, setFile] = useState(null);
  const [isScriptRunning, setIsScriptRunning] = useState(false);

  const navigate = useNavigate();

  const handleManualInputData = () => {
    setUseManualInput(true);
    navigate("/input-field");
  };

  const handleProcessData = () => {
    if (useManualInput) {
      console.log("Processing manual data:", manualData);
    } else {
      console.log("Processing uploaded file");
    }
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
        "http://3.145.185.106:8000/generate-uvm-ral-base/",
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
        alert("Upload failed. Please try again.");
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

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Automate Your UVM Register Block Generation
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Options Section */}
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm space-y-4">
            <h3 className="text-lg font-semibold text-gray-700 text-center">
              Options
            </h3>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              uvm_mem
            </button>
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              uvm_reg_map
            </button>
          </div>

          {/* File Upload Section */}
          <div className="col-span-2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 text-center">
                Upload Excel File
              </h3>
              <div className="flex flex-col lg:flex-row items-center gap-4">
                <input
                  type="file"
                  className="border border-gray-300 rounded px-4 py-2 w-full"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handleManualInputData}
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
                >
                  Enter Data Manually
                </button>
                <button
                  onClick={handleProcessData}
                  className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
                >
                  Process Data
                </button>
              </div>
              {fileName && (
                <p className="text-sm text-gray-500 mt-2">
                  File Selected: {fileName}
                </p>
              )}
            </div>

            {/* Run Script Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Run Script</span>
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

            {/* Download Script Section */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
              <button
                onClick={downloadScript}
                className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
                disabled={!result}
              >
                Download Script
              </button>
            </div>
          </div>
        </div>

        {/* Output Section */}
        {result && (
          <div className="mt-8 bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="font-bold text-gray-700">Output:</h3>
            <pre className="bg-gray-100 p-4 rounded mt-2 text-sm overflow-auto">
              {result}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default UvmRegBlock;
