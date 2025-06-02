import React from "react";
import ScoreboardAndFunctionalCoverage from "./ScoreboardAndFunctionalCoverage";

const VerificationEnvironment = () => {
  return (
    <div className="font-semibold text-center mb-4">
      Verification Environment
      {/* Scoreboard and Functional Coverage */}
      <ScoreboardAndFunctionalCoverage />
      <button className="mt-9 bg-gray-200 text-center p-2 w-28 mx-au,to rounded ">
        CFG
      </button>
    </div>
  );
};

export default VerificationEnvironment;
