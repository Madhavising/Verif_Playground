import React, { useState } from "react";

const sections = [
  {
    id: "logicGates",
    title: "Logic Gates",
    items: [
      { type: "and", label: "AND", icon: "/assets/nodes/gateIcons/and.png" },
      { type: "or", label: "OR", icon: "/assets/nodes/gateIcons/or.png" },
      { type: "not", label: "NOT", icon: "/assets/nodes/gateIcons/not.png" },
      { type: "nand", label: "NAND", icon: "/assets/nodes/gateIcons/nand.png" },
      { type: "nor", label: "NOR", icon: "/assets/nodes/gateIcons/nor.png" },
      { type: "xor", label: "XOR", icon: "/assets/nodes/gateIcons/xor.png" },
      { type: "xnor", label: "XNOR", icon: "/assets/nodes/gateIcons/xnor.png" },
    ],
  },
  {
    id: "basicComponents",
    title: "Basic Components",
    items: [
      {
        type: "input",
        label: "Input",
        icon: "/assets/nodes/gateIcons/input.svg",
      },
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
      {
        type: "resistor",
        label: "Resistor",
        icon: "/assets/nodes/gateIcons/resistor.svg",
      },
      { type: "led", label: "LED", icon: "/assets/nodes/gateIcons/led.svg" },
      { type: "text", label: "Text", icon: "/assets/nodes/gateIcons/text.svg" },
    ],
  },
  {
    id: "electrical",
    title: "Electrical",
    items: [
      { type: "wire", label: "Wire", icon: "/assets/nodes/gateIcons/wire.svg" },
      {
        type: "resistor",
        label: "Resistor",
        icon: "/assets/nodes/gateIcons/resistor.png",
      },
      {
        type: "capacitor",
        label: "Capacitor",
        icon: "/assets/nodes/gateIcons/capacitor.png",
      },
      {
        type: "capacitor_1",
        label: "Capacitor",
        icon: "/assets/nodes/gateIcons/capacitor_1.png",
      },
      {
        type: "diode",
        label: "Diode",
        icon: "/assets/nodes/gateIcons/diode.png",
      },
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
    ],
  },
];

function LogicPalette() {
  const [collapsedSections, setCollapsedSections] = useState({});
  const [isVisible, setIsVisible] = useState(true);

  const toggleSection = (id) => {
    setCollapsedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <>
      {/* Slide Tab Button (center-left of palette) */}
      {/* Collapse Toggle Button */}
      <div
        className={`fixed z-50 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${
          isVisible ? "right-[288px]" : "right-0"
        }`}
      >
        <button
          onClick={() => setIsVisible((prev) => !prev)}
          className="bg-blue-600 text-white w-6 h-10 flex items-center justify-center rounded-l-md shadow hover:bg-blue-700"
        >
          {isVisible ? "⮜" : "⮞"}
        </button>
      </div>

      {/* Palette Panel */}
      <div
        className={`fixed top-0  right-0 h-full w-72 bg-gray-50 border-l border-gray-300 p-4 overflow-y-auto shadow-md z-40 transform transition-transform duration-300 ${
          isVisible ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="space-y-4 mt-16">
          {sections.map((section) => {
            const isCollapsed = collapsedSections[section.id];
            return (
              <div
                key={section.title}
                className="bg-white rounded-lg border border-gray-200 shadow-sm"
              >
                <div
                  className="flex justify-between items-center px-3 py-2 bg-gray-100 cursor-pointer"
                  onClick={() => toggleSection(section.id)}
                >
                  <h3 className="text-sm font-bold text-gray-700">
                    {section.title}
                  </h3>
                  <span className="text-gray-600 text-xs">
                    {isCollapsed ? "▶" : "▼"}
                  </span>
                </div>
                {!isCollapsed && (
                  <div className="grid grid-cols-3 gap-3 px-3 pb-3 pt-2">
                    {section.items.map((item) => (
                      <div
                        key={item.type}
                        draggable
                        onDragStart={(e) => onDragStart(e, item.type)}
                        className="group w-full aspect-square bg-gray-100 border border-gray-300 rounded-md flex items-center justify-center cursor-grab hover:border-blue-500 hover:shadow transition relative"
                      >
                        <img
                          src={item.icon}
                          alt={item.label}
                          className="max-w-[60%] max-h-[60%]"
                        />
                        <span className="absolute text-[10px] text-white bg-black px-1 rounded opacity-0 group-hover:opacity-100 transition mt-14">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LogicPalette;
