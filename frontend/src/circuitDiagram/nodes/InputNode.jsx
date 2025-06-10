// import React from "react";
// import { Handle, Position } from "reactflow";

// function InputNode({ data, isConnectable }) {
//   const toggle = () => data.onChange(!data.value);

//   return (
//     <div style={{ textAlign: "center", padding: 2, background: "#eee", borderRadius: 4 }}>
//       <button onClick={toggle}>
//         {data.label}: {data.value ? "ON" : "OFF"}
//       </button>
//       <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
//     </div>
//   );
// }

// export default InputNode;


import React from "react";
import { Handle, Position } from "reactflow";

function InputNode({ data, isConnectable }) {
  const toggle = () => data.onChange(!data.value);

  return (
    <div className="w-16 h-8 bg-white border border-gray-300 rounded-lg flex items-center justify-center shadow-sm relative">
      <button
        onClick={toggle}
        className="text-xs  text-gray-800 bg-gray-100 px-2 py-1 rounded hover:bg-gray-200 transition"
      >
        {data.label}: {data.value ? "ON" : "OFF"}
      </button>

      <Handle
        type="source"
        position={Position.Right}
        isConnectable={isConnectable}
        className="w-1 h-1 bg-gray-600 absolute right-0 top-1/2 transform -translate-y-1/2"
      />
    </div>
  );
}

export default InputNode;
