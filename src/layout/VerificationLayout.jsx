// import React from "react";
// import { Link } from "react-router-dom";
// import Sidebar from "../components/Sidebar";
// import SequenceBlock from "../components/SequenceBlock";
// import AgentBlock from "../components/AgentBlock";
// import VerificationEnvironment from "../components/VerificationEnvironment";
// import { useNavigate } from "react-router-dom";

// const VerificationLayout = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate("/uvm-reg-block");
//   };

//   return (
//     <div className="flex min-h-screen">
//       {/* Sidebar */}
//       <div className="w-64 bg-blue-600 text-white fixed top-0 bottom-0">
//         <Sidebar />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 ml-64 p-6 bg-red-200">
//         <div className="heading text-center mb-6">
//           <h1 className="text-3xl font-bold text-black">Welcome to VERiF Playground!</h1>
//           <p className="mt-2 text-lg text-black">
//             Experience an interactive platform with cutting-edge designs.
//           </p>
//         </div>

//         {/* UVM REG Block Button */}
//         <div className="flex justify-end gap-4 mb-10">
//           <button
//             onClick={handleClick}
//             className="bg-black text-white font-bold px-4 py-2 rounded border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all"
//           >
//             UVM REG Block
//           </button>
//         </div>

//         {/* Test Block */}
//         <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-600 w-full max-w-4xl mx-auto text-center rounded-lg shadow-md">
//           <div className="font-bold text-white text-2xl mb-4">Test</div>

//           <SequenceBlock />

//           {/* Verification Environment Block */}
//           <div className="flex flex-col sm:flex-row border p-4 bg-gradient-to-r from-red-400 to-red-300 rounded-lg shadow-md mt-8 gap-10">
//             <AgentBlock />
//             <VerificationEnvironment />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VerificationLayout;

import React from "react";
import { useNavigate } from "react-router-dom";
import SequenceBlock from "../components/SequenceBlock";
import AgentBlock from "../components/AgentBlock";
import VerificationEnvironment from "../components/VerificationEnvironment";

const VerificationLayout = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/uvm-reg-block");
  };

  return (
    <div>
      <div className="heading text-center mt-11 mb-6">
        <h1 className="text-3xl mt-3 font-bold text-black">
          Welcome to VERiF Playground!
        </h1>
      </div>

      {/* UVM REG Block Button */}
      {/* <div className="flex justify-end gap-4 mb-10">
        <button
          onClick={handleClick}
          className="bg-black text-white font-bold px-4 py-2 rounded border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all"
        >
          UVM REG Block
        </button>
      </div> */}

      {/* Test Block */}
      <div className="p-6 bg-gradient-to-r from-gray-400 to-gray-600 w-full max-w-4xl mx-auto text-center rounded-lg shadow-md">
        <div className="font-bold text-white text-2xl mb-4">Test</div>

        <SequenceBlock />

        {/* Verification Environment Block */}
        <div className="flex flex-col sm:flex-row border p-4 bg-gradient-to-r from-red-400 to-red-300 rounded-lg shadow-md mt-8 gap-10">
          <AgentBlock />
          <VerificationEnvironment />
        </div>
      </div>
    </div>
  );
};

export default VerificationLayout;
