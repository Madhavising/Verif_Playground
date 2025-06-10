import React from "react";
import { Handle, Position } from "reactflow";

function LEDNode({ data }) {
  const color = data.value ? "lime" : "darkred";

  return (
    <div style={{ textAlign: "center", padding: 10, background: "#222", borderRadius: 8 }}>
      <div style={{
        width: 20, height: 20, borderRadius: "50%",
        backgroundColor: color, margin: "auto"
      }}></div>
      <div style={{ color: "#fff" }}>{data.label}</div>
      <Handle type="target" position={Position.Left} />
    </div>
  );
}

export default LEDNode;

