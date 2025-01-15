import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";
import InputField from "./inputField/InputField";
import Loader from "./layout/Loader";
import Layout from "./layout/Layout";
import VerificationLayout from "./layout/VerificationLayout";
import Feature1 from "./features/Feature1";
import Feature2 from "./features/Feature2";
import Feature3 from "./features/Feature3";
import Feature4 from "./features/Feature4";
import TextEditor from "./features/TextEditor";

function App() {
  const [loading, setLoading] = useState(true);

  const [manualData, setManualData] = useState([]);
  const [useManualInput, setUseManualInput] = useState(false);

  const handleManualDataSubmit = (data) => {
    setManualData(data);
    setUseManualInput(true);
  };

  const handleLoadComplete = () => {
    setLoading(false);
  };

  return (
    <div className="bg-red-200 w-full h-screen">
      {loading ? (
        <Loader onLoadComplete={handleLoadComplete} />
      ) : (
        <Routes>
          {/* Apply Layout to routes requiring a fixed sidebar */}
          <Route path="/" element={<Layout />}>
            <Route index element={<VerificationLayout />} />
            {/* <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
            <Route path="/input-field" element={<InputField />} /> */}
            <Route
              path="/uvm-reg-block"
              element={
                <UvmRegBlock
                  useManualInput={useManualInput}
                  manualData={manualData}
                  setUseManualInput={setUseManualInput}
                />
              }
            />
            <Route
              path="/input-field"
              element={<InputField onSubmit={handleManualDataSubmit} />}
            />
            <Route path="/texteditor" element={<TextEditor />} />
            <Route path="/feature1" element={<Feature1 />} />
            <Route path="/feature2" element={<Feature2 />} />
            <Route path="/feature3" element={<Feature3 />} />
            <Route path="/feature4" element={<Feature4 />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
