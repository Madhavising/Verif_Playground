import React from "react";
import { ReactFlowProvider } from "reactflow";
import LogicPalette from "./LogicPalette";
import LogicCanvas from "./LogicCanvas";

export default function CircuitDiagram() {
  return (
    <div style={{ display: "flex", position: "relative" }}>
      <div style={{ flexGrow: 1, marginTop: 0 }}>
        <LogicPalette />
      </div>
      <ReactFlowProvider>
        <LogicCanvas />
      </ReactFlowProvider>
    </div>
  );
}
