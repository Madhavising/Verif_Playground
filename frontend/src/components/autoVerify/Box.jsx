import React from "react";

const Box = ({ text }) => {
  return (
    <div className="bg-blue-500 text-white px-6 py-4 rounded-md shadow-md text-lg font-medium w-64 text-center hover:bg-blue-600 transition duration-300">
      {text}
    </div>
  );
};

export default Box;
