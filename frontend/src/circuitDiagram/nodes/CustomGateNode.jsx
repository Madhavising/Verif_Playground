import { Handle, Position } from "reactflow";

const CustomGateNode = ({ data }) => {
  const label = data.label?.toUpperCase();
  const isLogicGate = ["AND", "OR", "NAND", "NOR", "XOR", "XNOR"].includes(
    label
  );
  const isNotGate = label === "NOT";
  const isLED = label === "LED";
  const isOutput = label === "OUTPUT";
  const isBattery = label === "BATTERY";
  const isResistor = label === "RESISTOR";

  const isWire = label === "WIRE";
  const isDiode = label === "DIODE";
  const isZenerDiode = label === "ZENER-DIODE";
  const isElectrical = label === "ELECTRICAL";
  const isCapacitor = label === "CAPACITOR";
  const isCapacitor_1 = label === "CAPACITOR_1";

  const nodeWidth = data.width || 80;
  const nodeHeight = data.height || 64;

  return (
    <div
      style={{
        position: "relative",
        padding: 10,
        textAlign: "center",
        width: nodeWidth,
        height: nodeHeight,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* INPUT HANDLES */}
      {isLogicGate && (
        <>
          <Handle
            type="target"
            id="in1"
            position={Position.Left}
            style={{ top: "35%", background: "#555", left: 5 }}
          />
          <Handle
            type="target"
            id="in2"
            position={Position.Left}
            style={{ top: "65%", background: "#555", left: 5 }}
          />
        </>
      )}
      {isNotGate && (
        <Handle
          type="target"
          id="in1"
          position={Position.Left}
          style={{ top: "50%", background: "#555", left: 5 }}
        />
      )}
      {(isLED ||
        isOutput ||
        isResistor ||
        isWire ||
        isDiode ||
        isZenerDiode ||
        isElectrical ||
        isCapacitor ||
        isCapacitor_1) && (
        <Handle
          type="target"
          id="in"
          position={Position.Left}
          style={{ top: "50%", background: "#555", left: 3 }}
        />
      )}

      {/* ICON */}
      <img src={data.icon} alt={data.label} width={70} height={70} />

      {/* OUTPUT HANDLE */}
      {(isLogicGate ||
        isNotGate ||
        isBattery ||
        isResistor ||
        isWire ||
        isDiode ||
        isZenerDiode ||
        isElectrical ||
        isCapacitor ||
        isCapacitor_1) && (
        <Handle
          type="source"
          id="out"
          position={Position.Right}
          style={{ top: "50%", background: "#555", right: 3 }}
        />
      )}
    </div>
  );
};

export default CustomGateNode;
