import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";
// import InputField from "./inputField/InputField";
import Loader from "./layout/Loader";
import Layout from "./layout/Layout";
import VerificationLayout from "./layout/VerificationLayout";
import DataHub from "./features/DataHub";
import InputField from "./inputField/InputField";
import DocSphere from "./features/DocSphere";
import RegressionTracker from "./features/RegressionTracker";
import AutoVerify from "./features/AutoVerify";
import Feature4 from "./features/Feature4";

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
            <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
            <Route path="/input-field" element={<InputField />} />

            <Route path="/docSphere" element={<DocSphere />} />
            <Route path="/autoVerify" element={<AutoVerify />} />
            <Route path="/regressionTracker" element={<RegressionTracker />} />
            <Route path="/dataHub" element={<DataHub />} />

            <Route path="/feature4" element={<Feature4 />} />
          </Route>
        </Routes>
      )}
    </div>
  );
}

export default App;
