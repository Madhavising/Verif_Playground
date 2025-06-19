import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactFlow, {
  addEdge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
  useStoreApi,
} from "reactflow";
import "reactflow/dist/style.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import CustomGateNode from "./nodes/CustomGateNode";
import InputNode from "./nodes/InputNode";
import LEDNode from "./nodes/LEDNode";
import TextNode from "./nodes/TextNode";
import TruthTableModal from "./TruthTableModal";

const nodeTypes = {
  custom: CustomGateNode,
  input: InputNode,
  led: LEDNode,
  text: TextNode,
};

let id = 0;
const getId = () => `node_${id++}`;



const gateComponents = [
  // Logic Gates
  { type: "and", label: "AND Gate", icon: "/assets/nodes/gateIcons/and.png" },
  { type: "or", label: "OR Gate", icon: "/assets/nodes/gateIcons/or.png" },
  { type: "not", label: "NOT Gate", icon: "/assets/nodes/gateIcons/not.png" },
  {
    type: "nand",
    label: "NAND Gate",
    icon: "/assets/nodes/gateIcons/nand.png",
  },
  { type: "nor", label: "NOR Gate", icon: "/assets/nodes/gateIcons/nor.png" },
  { type: "xor", label: "XOR Gate", icon: "/assets/nodes/gateIcons/xor.png" },
  {
    type: "xnor",
    label: "XNOR Gate",
    icon: "/assets/nodes/gateIcons/xnor.png",
  },

  // Inputs / Outputs
  { type: "input", label: "Input", icon: "/assets/nodes/gateIcons/input.svg" },
  {
    type: "output",
    label: "Output",
    icon: "/assets/nodes/gateIcons/output.svg",
  },
  {
    type: "battery",
    label: "Battery",
    icon: "/assets/nodes/gateIcons/battery.svg",
  },

  // Electrical Components
  { type: "wire", label: "Wire", icon: "/assets/nodes/gateIcons/wire.svg" },
  {
    type: "resistor",
    label: "Resistor",
    icon: "/assets/nodes/gateIcons/resistor.png",
  },
  { type: "led", label: "LED", icon: "/assets/nodes/gateIcons/led.svg" },
  {
    type: "capacitor",
    label: "Capacitor",
    icon: "/assets/nodes/gateIcons/capacitor.png",
  },
  {
    type: "capacitor_alt",
    label: "Capacitor",
    icon: "/assets/nodes/gateIcons/capacitor_1.png",
  },
  { type: "diode", label: "Diode", icon: "/assets/nodes/gateIcons/diode.png" },
  {
    type: "zener-diode",
    label: "Zener Diode",
    icon: "/assets/nodes/gateIcons/zener-diode.png",
  },
  {
    type: "electrical",
    label: "Electrical",
    icon: "/assets/nodes/gateIcons/electrical.png",
  },
];

export default function LogicCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [history, setHistory] = useState([]);
  const [future, setFuture] = useState([]);

  const [showTruthTable, setShowTruthTable] = useState(false);
  const [truthTableData, setTruthTableData] = useState([]);
  const [inputLabels, setInputLabels] = useState([]);
  const [outputLabels, setOutputLabels] = useState([]);

  const [showSaveMenu, setShowSaveMenu] = useState(false);

  const simulationTimeout = useRef(null);
  const reactFlowInstance = useReactFlow();
  const store = useStoreApi();

  const downloadAsPNG = async () => {
    const canvasEl = document.querySelector(".react-flow");
    if (!canvasEl) return;

    const canvas = await html2canvas(canvasEl, { useCORS: true });
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "logic-circuit.png";
    link.click();
  };

  const downloadAsPDF = async () => {
    const canvasEl = document.querySelector(".react-flow");
    if (!canvasEl) return;

    const canvas = await html2canvas(canvasEl, { useCORS: true });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "pt", "a4");
    const width = pdf.internal.pageSize.getWidth();
    const height = (canvas.height * width) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, width, height);
    pdf.save("logic-circuit.pdf");
  };

  const generateTruthTable = () => {
    const inputNodes = nodes.filter((n) => n.type === "input");
    const outputNodes = nodes.filter((n) => n.type === "led");

    const signalMap = {};
    inputNodes.forEach((node) => {
      signalMap[node.id] = node.data.value; // Current input state
    });

    const evaluateGate = (type, inputs) => {
      switch (type) {
        case "and":
          return inputs.every(Boolean);
        case "or":
          return inputs.some(Boolean);
        case "not":
          return !inputs[0];
        case "nand":
          return !inputs.every(Boolean);
        case "nor":
          return !inputs.some(Boolean);
        case "xor":
          return inputs.reduce((a, b) => a !== b, false);
        case "xnor":
          return !inputs.reduce((a, b) => a !== b, false);
        default:
          return false;
      }
    };

    let changed = true;
    while (changed) {
      changed = false;
      nodes.forEach((node) => {
        if (node.type !== "custom") return;
        const incoming = edges.filter((e) => e.target === node.id);
        const inputValues = incoming
          .map((e) => signalMap[e.source])
          .filter((v) => v !== undefined);
        if (inputValues.length === 0) return;
        const result = evaluateGate(node.data.label.toLowerCase(), inputValues);
        if (signalMap[node.id] !== result) {
          signalMap[node.id] = result;
          changed = true;
        }
      });
    }

    const inputs = inputNodes.map((n) => (signalMap[n.id] ? 1 : 0));
    const outputs = outputNodes.map((out) => {
      const incoming = edges.find((e) => e.target === out.id);
      return incoming && signalMap[incoming.source] ? 1 : 0;
    });

    setTruthTableData([{ inputs, outputs }]);
    setInputLabels(inputNodes.map((n, i) => n.data.label || `In${i + 1}`));
    setOutputLabels(outputNodes.map((n, i) => n.data.label || `Out${i + 1}`));
    setShowTruthTable(true);
  };

  const snapshot = useCallback(() => {
    setHistory((prev) => [...prev, { nodes, edges }]);
    setFuture([]);
  }, [nodes, edges]);

  const undo = () => {
    if (history.length === 0) return;
    const prev = history[history.length - 1];
    setHistory((h) => h.slice(0, -1));
    setFuture((f) => [...f, { nodes, edges }]);
    setNodes(prev.nodes);
    setEdges(prev.edges);
  };

  const redo = () => {
    if (future.length === 0) return;
    const next = future[future.length - 1];
    setFuture((f) => f.slice(0, -1));
    setHistory((h) => [...h, { nodes, edges }]);
    setNodes(next.nodes);
    setEdges(next.edges);
  };

  const onConnect = useCallback(
    (params) => {
      snapshot();
      setEdges((eds) =>
        addEdge({ ...params, type: "step", data: { active: false } }, eds)
      );
    },
    [snapshot]
  );

  const runSimulation = useCallback(
    (currentNodes, currentEdges) => {
      const signalMap = {};

      // Step 1: Initialize inputs
      currentNodes.forEach((node) => {
        if (node.type === "input") {
          signalMap[node.id] = node.data.value;
        }
      });

      // Step 2: Get input signal for a node handle
      const getInputSignal = (node, handle) => {
        const edge = currentEdges.find(
          (e) => e.target === node.id && e.targetHandle === handle
        );
        if (!edge) return 0;
        return signalMap[edge.source] ?? 0;
      };

      // Step 3: Evaluate basic logic gates
      const evaluateGate = (type, inputs) => {
        switch (type) {
          case "and":
            return inputs.every(Boolean);
          case "or":
            return inputs.some(Boolean);
          case "not":
            return !inputs[0];
          case "nand":
            return !inputs.every(Boolean);
          case "nor":
            return !inputs.some(Boolean);
          case "xor":
            return inputs.reduce((a, b) => a !== b, false);
          case "xnor":
            return !inputs.reduce((a, b) => a !== b, false);
          default:
            return false;
        }
      };

      

      // Step 4: Propagate through standard gates
      let changed = true;
      while (changed) {
        changed = false;

        currentNodes.forEach((node) => {
          if (node.type !== "custom") return;

          const incoming = currentEdges.filter((e) => e.target === node.id);
          const inputs = incoming
            .map((e) => signalMap[e.source])
            .filter((v) => v !== undefined);

          if (inputs.length === 0) return;

          const result = evaluateGate(node.data.label.toLowerCase(), inputs);
          if (signalMap[node.id] !== result) {
            signalMap[node.id] = result;
            changed = true;
          }
        });
      }

      // Step 6: Update LED nodes
      const updatedNodes = currentNodes.map((node) => {
        if (node.type === "led") {
          const incoming = currentEdges.find((e) => e.target === node.id);
          const value = incoming ? signalMap[incoming.source] : false;
          return { ...node, data: { ...node.data, value } };
        }
        return node;
      });

      // Step 7: Update edge colors
      const updatedEdges = currentEdges.map((edge) => ({
        ...edge,
        data: {
          ...edge.data,
          active: !!signalMap[edge.source],
        },
      }));

      // Step 8: Final render
      setNodes(updatedNodes);
      setEdges(updatedEdges);
    },
    [setNodes, setEdges]
  );

  const debouncedRunSimulation = useCallback(
    (updatedNodes = nodes, updatedEdges = edges) => {
      if (simulationTimeout.current) {
        clearTimeout(simulationTimeout.current);
      }
      simulationTimeout.current = setTimeout(() => {
        runSimulation(updatedNodes, updatedEdges);
      }, 200);
    },
    [runSimulation, nodes, edges]
  );

  useEffect(() => {
    debouncedRunSimulation(nodes, edges);
  }, [nodes, edges, debouncedRunSimulation]);

  useEffect(() => {
    return () => clearTimeout(simulationTimeout.current);
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();
      snapshot();
      const droppedType = event.dataTransfer.getData("application/reactflow");
      const position = { x: event.clientX - 100, y: event.clientY - 60 };

      if (droppedType === "input") {
        const nodeId = getId();
        const newNode = {
          id: nodeId,
          type: "input",
          position,
          data: {
            label: "I/P",
            value: false,
            onChange: (val) => {
              setNodes((nds) => {
                const updated = nds.map((n) =>
                  n.id === nodeId
                    ? { ...n, data: { ...n.data, value: val } }
                    : n
                );
                debouncedRunSimulation(updated, edges);
                return updated;
              });
            },
          },
          style: {
            background: "transparent",
            border: "none",
            boxShadow: "none",
          },
        };
        setNodes((nds) => nds.concat(newNode));
        return;
      }

      if (droppedType === "led") {
        const newNode = {
          id: getId(),
          type: "led",
          position,
          data: { label: "LED", value: false },
        };
        setNodes((nds) => nds.concat(newNode));
        return;
      }

      if (droppedType === "text") {
        const nodeId = getId();
        const newNode = {
          id: nodeId,
          type: "text",
          position,
          data: {
            label: "Label",
            onChange: (val) => {
              setNodes((nds) =>
                nds.map((n) =>
                  n.id === nodeId
                    ? { ...n, data: { ...n.data, label: val } }
                    : n
                )
              );
            },
          },
        };
        setNodes((nds) => [...nds, newNode]);
      }

      const gate = gateComponents.find((g) => g.type === droppedType);
      if (!gate) return;

      const newNode = {
        id: getId(),
        type: "custom",
        position,
        data: {
          icon: gate.icon,
          label: gate.type.toUpperCase(),
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, edges, debouncedRunSimulation, snapshot]
  );

  const onDragOver = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };

  const getEdgeColor = (signal) => {
    return signal ? "#00C853" : "#FF1744";
  };

  const saveCircuit = () => {
    const data = { nodes, edges };
    localStorage.setItem("logic-circuit", JSON.stringify(data));
    alert("Circuit saved!");
  };

  const loadCircuit = () => {
    const saved = localStorage.getItem("logic-circuit");
    if (saved) {
      const { nodes: loadedNodes, edges: loadedEdges } = JSON.parse(saved);
      const maxId = Math.max(
        ...loadedNodes.map((n) => parseInt(n.id.split("_")[1]) || 0)
      );
      id = maxId + 1;

      const restoredNodes = loadedNodes.map((node) => {
        if (node.type === "input") {
          return {
            ...node,
            data: {
              ...node.data,
              onChange: (val) => {
                setNodes((nds) => {
                  const updated = nds.map((n) =>
                    n.id === node.id
                      ? { ...n, data: { ...n.data, value: val } }
                      : n
                  );
                  debouncedRunSimulation(updated, loadedEdges);
                  return updated;
                });
              },
            },
          };
        }
        return node;
      });

      setNodes(restoredNodes);
      setEdges(loadedEdges);
      alert("Circuit loaded!");
    } else {
      alert("No saved circuit found.");
    }
  };

  // DELETE selected nodes/edges with Delete or Backspace key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Delete" || event.key === "Backspace") {
        const { nodes: currentNodes, edges: currentEdges } = store.getState();
        const selectedNodes = currentNodes.filter((n) => n.selected);
        const selectedEdges = currentEdges.filter((e) => e.selected);

        if (selectedNodes.length || selectedEdges.length) {
          snapshot();
          reactFlowInstance.deleteElements({
            nodes: selectedNodes,
            edges: selectedEdges,
          });
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [reactFlowInstance, store, snapshot]);

  return (
    <div
      style={{ height: "83vh", width: "100%", backgroundColor: "#fff" }}
      className="-mt-5"
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div
        style={{
          padding: "10px",
          backgroundColor: "#eee",
          display: "flex",
          gap: "10px",
        }}
      >
        <div className="relative">
          <button
            onClick={() => setShowSaveMenu((prev) => !prev)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-colors"
          >
            💾 Save
          </button>

          {showSaveMenu && (
            <div className="absolute z-10 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-44">
              <div
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-t-lg transition-colors"
                onClick={saveCircuit}
              >
                Save to Local
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer transition-colors"
                onClick={downloadAsPNG}
              >
                Download as PNG
              </div>
              <div
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer rounded-b-lg transition-colors"
                onClick={downloadAsPDF}
              >
                Download as PDF
              </div>
            </div>
          )}
        </div>

        <button onClick={loadCircuit}>📂 Load</button>
        <button onClick={undo} disabled={history.length === 0}>
          ↩️ Undo
        </button>
        <button onClick={redo} disabled={future.length === 0}>
          ↪️ Redo
        </button>

        <button onClick={generateTruthTable}>📊 Truth Table</button>
      </div>

      <ReactFlow
        edges={edges.map((e) => ({
          ...e,
          style: {
            stroke: getEdgeColor(e.data?.active),
            strokeWidth: 2,
          },
          type: "step",
        }))}
        nodes={nodes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        minZoom={0.25}
        maxZoom={2}
        fitView
        snapToGrid={true}
        snapGrid={[20, 20]}
      >
        <Background gap={20} color="#ccc" />
        <Controls />
      </ReactFlow>
      <TruthTableModal
        isOpen={showTruthTable}
        onClose={() => setShowTruthTable(false)}
        tableData={truthTableData}
        inputLabels={inputLabels}
        outputLabels={outputLabels}
      />
    </div>
  );
}
