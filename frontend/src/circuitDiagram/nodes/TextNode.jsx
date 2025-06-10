import React, { useState, useEffect, useRef } from "react";
import { Handle, Position } from "reactflow";

const TextNode = ({ id, data, selected }) => {
  const [editing, setEditing] = useState(false);
  const [label, setLabel] = useState(data.label || "Text");
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const saveLabel = () => {
    setEditing(false);
    if (data.onChange && typeof data.onChange === "function") {
      data.onChange(label.trim());
    }
  };

  return (
    <div
      style={{
        padding: "4px 10px",
        minWidth: "80px",
        border: selected ? "1.5px solid #3b82f6" : "1px solid transparent",
        borderRadius: "4px",
        backgroundColor: "transparent",
        fontSize: "13px",
        fontFamily: "Segoe UI, sans-serif",
        color: "#222",
        textAlign: "center",
        cursor: "default",
      }}
      onDoubleClick={() => setEditing(true)}
    >
      {editing ? (
        <input
          ref={inputRef}
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          onBlur={saveLabel}
          onKeyDown={(e) => {
            if (e.key === "Enter") saveLabel();
            if (e.key === "Escape") {
              setLabel(data.label); // revert
              setEditing(false);
            }
          }}
          style={{
            width: "100%",
            fontSize: "13px",
            border: "none",
            outline: "none",
            backgroundColor: "transparent",
            textAlign: "center",
          }}
        />
      ) : (
        <span>{label}</span>
      )}

      {/* Optional invisible handles */}
      <Handle type="target" position={Position.Left} style={{ opacity: 0 }} />
      <Handle type="source" position={Position.Right} style={{ opacity: 0 }} />
    </div>
  );
};

export default TextNode;