import React from "react";
import SequenceBlock from "../components/SequenceBlock";
import AgentBlock from "../components/AgentBlock";
import VerificationEnvironment from "../components/VerificationEnvironment";

const VerificationLayout = () => {
  return (
    <div className="mt-32 mb-6">
      {/* Test Block */}
      <div className="p-6 mt-5 bg-gradient-to-r from-gray-400 to-gray-600 w-full max-w-4xl mx-auto text-center rounded-lg shadow-md">
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
