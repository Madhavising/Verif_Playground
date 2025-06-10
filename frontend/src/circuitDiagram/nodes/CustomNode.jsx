import React, { useState } from "react";
import { Handle, Position } from "reactflow";

export default function CustomNode({ id, data, isConnectable }) {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || id);

  const handleDoubleClick = () => {
    setEditing(true);
  };

  const handleBlur = () => {
    setEditing(false);
    data.onLabelChange?.(id, label); // Update label in main state
  };

  return (
    <div onDoubleClick={handleDoubleClick} style={{ padding: 6, border: "1px solid #444", borderRadius: 6 }}>
      {/* Editable Label */}
      {editing ? (
        <input
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          style={{ fontSize: "0.8rem", width: "80px" }}
        />
      ) : (
        <div style={{ fontSize: "0.9rem", fontWeight: "bold" }}>{label}</div>
      )}

      {/* Handles for wiring */}
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <Handle type="source" position={Position.Right} isConnectable={isConnectable} />
    </div>
  );
}
