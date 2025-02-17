import React from "react";

const SequenceBlock = () => {
  return (
    <>
      <div className="flex justify-start mx-16  ">
        <button className="bg-yellow-300 p-2 w-40 mt-1 rounded font-medium">
          Sequence
        </button>
      </div>
      <div className="mx-20 relative ">
        <svg
          fill="#000000"
          width="133px"
          height="165px" // Increase the height of the SVG
          viewBox="0 2 24 40" // Adjusted the viewBox
          id="up-down-arrows"
          className="icon flat-line absolute"
          style={{ top: "calc(100% + 7px)" }} // Position the SVG just below the Sequence component
        >
          <g id="SVGRepo_iconCarrier">
            {/* Upward Arrow */}
            <line
              x1="12"
              y1="33" // Start of the vertical line
              x2="12"
              y2="3" // End of the vertical line
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.4,
              }}
            ></line>
            <polyline
              points="15 6 12 3 9 6"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.4,
              }}
            ></polyline>

            {/* Downward Arrow */}
            <polyline
              points="15 30 12 33 9 30"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.4,
              }}
            ></polyline>
          </g>
        </svg>
      </div>
    </>
  );
};

export default SequenceBlock;
