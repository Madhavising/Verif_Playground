// import React, { useState } from "react";
// import { Routes, Route } from "react-router-dom";
// import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";
// import Loader from "./layout/Loader";
// import Layout from "./layout/Layout";
// import VerificationLayout from "./layout/VerificationLayout";
// import DataHub from "./features/DataHub";
// import InputField from "./inputField/InputField";
// import DocSphere from "./features/DocSphere";
// import RegressionTracker from "./features/RegressionTracker";
// import AutoVerify from "./features/AutoVerify";
// import Feature4 from "./features/Feature4";
// import ASICVerification from "./features/ASICVerification";
// import AuthPage from "./authPage/AuthPage";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoadComplete = () => {
//     setLoading(false);
//   };

//   const handleLogin = () => {
//     setIsAuthenticated(true);
//   };

//   return (
//     <div className="bg-red-200 w-full h-screen">
//       {loading ? (
//         <Loader onLoadComplete={handleLoadComplete} />
//       ) :  (
//         <Routes>
//           {/* Apply Layout to routes requiring a fixed sidebar */}
//           <Route path="/auth" element={<AuthPage />} />
//           <Route path="/" element={<Layout />}>
         
//             <Route index element={<VerificationLayout />} />
//             <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
//             <Route path="/input-field" element={<InputField />} />
//             <Route path="/docSphere" element={<DocSphere />} />
//             <Route path="/autoVerify" element={<AutoVerify />} />
//             <Route path="/regressionTracker" element={<RegressionTracker />} />
//             <Route path="/dataHub" element={<DataHub />} />
//             <Route path="/asicverify" element={<ASICVerification />} />
//             <Route path="/feature4" element={<Feature4 />} />
//           </Route>
//         </Routes>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";
import Loader from "./layout/Loader";
import Layout from "./layout/Layout";
import VerificationLayout from "./layout/VerificationLayout";
import DataHub from "./features/DataHub";
import InputField from "./inputField/InputField";
import DocSphere from "./features/DocSphere";
import RegressionTracker from "./features/RegressionTracker";
import AutoVerify from "./features/AutoVerify";
import Feature4 from "./features/Feature4";
import ASICVerification from "./features/ASICVerification";
import AuthPage from "./authPage/AuthPage";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <div className="bg-red-200 w-full h-screen">
      {loading ? (
        <Loader onLoadComplete={handleLoadComplete} />
      ) : (
        <Routes>
          {/* Always show AuthPage first if not authenticated */}
          {!isAuthenticated ? (
            <Route path="*" element={<AuthPage onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Layout />}>
                <Route index element={<VerificationLayout />} />
                <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
                <Route path="/input-field" element={<InputField />} />
                <Route path="/docSphere" element={<DocSphere />} />
                <Route path="/autoVerify" element={<AutoVerify />} />
                <Route path="/regressionTracker" element={<RegressionTracker />} />
                <Route path="/dataHub" element={<DataHub />} />
                <Route path="/asicverify" element={<ASICVerification />} />
                <Route path="/feature4" element={<Feature4 />} />
              </Route>
              {/* Redirect any unknown routes to home */}
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
