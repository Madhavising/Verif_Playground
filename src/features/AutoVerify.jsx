// // import React from 'react';
// // import Flow from '../components/autoVerify/Flow';

// // const AutoVerify = () => {
// //   return (
// //     <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //     <Flow />
// //   </div>
// //   );
// // };

// // export default AutoVerify;

// import React from "react";

// const AutoVerify = () => {
//   const steps = [
//     {
//       title: "Generate Stimulus",
//       description:
//         "Create the test inputs that will drive the DUT, such as signal values or test patterns.",
//     },
//     {
//       title: "Apply Stimulus to the DUT",
//       description:
//         "Apply the generated stimulus to the DUT, simulating various operating conditions.",
//     },
//     {
//       title: "Capture the Response",
//       description:
//         "Capture the DUT's output or response to the applied stimulus.",
//     },
//     {
//       title: "Check for Correctness",
//       description:
//         "Compare the captured response with the expected results to verify correctness.",
//     },
//     {
//       title: "Measure Progress Against Verification Goals",
//       description:
//         "Evaluate the overall progress and coverage against verification goals.",
//     },
//   ];

//   return (
//     <div className="flex flex-col items-center py-8">
//       <h1 className="text-3xl font-bold mb-6">Verification Workflow</h1>
//       <div className="flex flex-col space-y-8 w-full md:w-2/3">
//         {steps.map((step, index) => (
//           <div key={index} className="relative">
//             {/* Box for each step */}
//             <div
//               className="p-6 bg-blue-100 border rounded-lg shadow-lg"
//               style={{ minHeight: "120px" }}
//             >
//               <h2 className="text-xl font-semibold">{step.title}</h2>
//               <p className="mt-2 text-gray-700">{step.description}</p>
//             </div>

//             {/* Arrow for each step except the last one */}
//             {index < steps.length - 1 && (
//               <div className="absolute right-0 top-[calc(100%+10px)]">
//                 <div className="w-0 h-0 border-l-8 border-l-transparent border-r-8 border-r-transparent border-t-8 border-t-blue-500"></div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AutoVerify;

import React from "react";

import autoVerifyGif from "../assets/autoVerify.gif";

function AutoVerify() {
  return (
    <div className="p-6 mt-20 ">
      {/* Use an img tag to display the GIF */}
      <h1 className="text-2xl font-extrabold text-gray-900">Automated Verification</h1>
      {/* <img src={autoVerifyGif} alt="Auto Verify Animation" className="w-[80vw] h-[70vh]" /> */}
    </div>
  );
}

export default AutoVerify;


