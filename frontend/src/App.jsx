// import React, { useState } from "react";
// import { Routes, Route, Navigate } from "react-router-dom";
// import UvmRegBlock from "./uvmRegBlock/UvmRegBlock";
// import Loader from "./layout/Loader";
// import Layout from "./layout/Layout";
// import VerificationLayout from "./layout/VerificationLayout";
// import DataHub from "./features/DataHub";
// import InputField from "./inputField/InputField";
// import DocSphere from "./features/DocSphere";
// import RegressionTracker from "./features/RegressionTracker";
// import AutoVerify from "./features/AutoVerify";
// import ASICVerification from "./features/ASICVerification";
// import AuthPage from "./authPage/AuthPage";

// function App() {
//   const [loading, setLoading] = useState(true);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   const handleLoadComplete = () => setLoading(false);
//   const handleLogin = () => setIsAuthenticated(true);

//   return (
//     <div className="bg-red-200 min-h-screen">
//       {loading ? (
//         <Loader onLoadComplete={handleLoadComplete} />
//       ) : (
//         <Routes>
//           {!isAuthenticated ? (
//             <Route path="*" element={<AuthPage onLogin={handleLogin} />} />
//           ) : (
//             <>
//               <Route path="/" element={<Layout />}>
//                 <Route index element={<VerificationLayout />} />
//                 <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
//                 <Route path="/input-field" element={<InputField />} />
//                 <Route path="/docSphere" element={<DocSphere />} />
//                 <Route path="/autoVerify" element={<AutoVerify />} />
//                 <Route path="/regressionTracker" element={<RegressionTracker />} />
//                 <Route path="/dataHub" element={<DataHub />} />
//                 <Route path="/asicverify" element={<ASICVerification />} />
//               </Route>
//               <Route path="*" element={<Navigate to="/" />} />
//             </>
//           )}
//         </Routes>
//       )}
//     </div>
//   );
// }

// export default App;

import React, { useEffect, useState } from "react";
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
import ASICVerification from "./features/ASICVerification";
import AuthPage from "./authPage/AuthPage";
import Profile from "./components/Profile";

function App() {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const handleLoadComplete = () => {
    setLoading(false);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    
    const timer = setTimeout(() => {
      handleLoadComplete();
    }, 1000); 

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader onLoadComplete={handleLoadComplete} />;
  }

   return (
    <div className="bg-red-200 min-h-screen">
      {loading ? (
        <Loader onLoadComplete={handleLoadComplete} />
      ) : (
        <Routes>
          {!isAuthenticated ? (
            <Route path="*" element={<AuthPage onLogin={handleLogin} />} />
          ) : (
            <>
              <Route path="/" element={<Layout onLogout={handleLogout} />}>
                <Route index element={<VerificationLayout />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/uvm-reg-block" element={<UvmRegBlock />} />
                <Route path="/input-field" element={<InputField />} />
                <Route path="/docSphere" element={<DocSphere />} />
                <Route path="/autoVerify" element={<AutoVerify />} />
                <Route path="/regressionTracker" element={<RegressionTracker />} />
                <Route path="/dataHub" element={<DataHub />} />
                <Route path="/asicverify" element={<ASICVerification />} />
              </Route>
              <Route path="*" element={<Navigate to="/" />} />
            </>
          )}
        </Routes>
      )}
    </div>
  );
}

export default App;
