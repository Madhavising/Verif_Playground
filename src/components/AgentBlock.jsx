import React from "react";

const AgentBlock = () => {
  return (
    <div className="border p-4 bg-gradient-to-r from-blue-300 to-blue-100 rounded-lg shadow-md">
      <div className="relative">
        <div className="absolute -top-4 left-4 bg-gray-300 px-2 text-sm font-semibold">
          Agent 1
        </div>

        <div className="mt-4 ml-auto bg-gray-400 text-center rounded  p-2 w-40 ">
          CFG
        </div>
      </div>

      {/* Sequencer */}
      <div className="flex mx-10 mt-5">
        <div className="">
          <button className="bg-yellow-200 text-center p-2 w-40 rounded font-medium">
            Sequencer
          </button>
        </div>
      </div>

      {/* add both side arrow */}
      <div className="flex mx-16 ">
        <svg
          fill="#000000"
          width="133px"
          height="60px"
          viewBox="0 0 24 24"
          id="up-down-arrows"
          data-name="Flat Line"
          xmlns="http://www.w3.org/2000/svg"
          className="icon flat-line"
        >
          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {/* Upward Arrow */}
            <line
              id="up-primary"
              x1="12"
              y1="21"
              x2="12"
              y2="3"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.5,
              }}
            ></line>
            <polyline
              id="up-primary-2"
              data-name="up-primary"
              points="15 6 12 3 9 6"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.6,
              }}
            ></polyline>

            {/* Downward Arrow */}
            <line
              id="down-primary"
              x1="12"
              y1="3"
              x2="12"
              y2="21"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.6,
              }}
            ></line>
            <polyline
              id="down-primary-2"
              data-name="down-primary"
              points="15 18 12 21 9 18"
              style={{
                fill: "none",
                stroke: "#000000",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 0.6,
              }}
            ></polyline>
          </g>
        </svg>
      </div>

      {/* Driver and Monitor */}
      <div className="flex justify-around gap-5">
        <div>
          <div className="">
            <button className="bg-orange-300 text-center p-2 w-40 rounded font-medium mb-4">
              Driver
            </button>
          </div>
          {/* add arrows */}
          <div className="flex   ">
            {/* Downward Arrow SVG */}
            <svg
              fill="#000000"
              width="133px"
              height="60px"
              viewBox="-10 0 24 24"
              id="down-arrow"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line h-16"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <line
                  id="primary"
                  x1="12"
                  y1="3"
                  x2="12"
                  y2="21"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 0.6,
                  }}
                ></line>
                <polyline
                  id="primary-2"
                  data-name="primary"
                  points="15 18 12 21 9 18"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 0.6,
                  }}
                ></polyline>
              </g>
            </svg>

            {/* up-arrow  */}
            <svg
              fill="#000000"
              width="133px"
              height="60px"
              viewBox="10 0 24 24"
              id="up-arrow"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line h-16"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <line
                  id="primary"
                  x1="12"
                  y1="21"
                  x2="12"
                  y2="3"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 0.6,
                  }}
                ></line>
                <polyline
                  id="primary-2"
                  data-name="primary"
                  points="15 6 12 3 9 6"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 0.6,
                  }}
                ></polyline>
              </g>
            </svg>
          </div>
          <div className="">
            <button className="bg-blue-500 text-center p-2 w-40 rounded">
              Virtual Interface
            </button>
          </div>
        </div>
        <div
          className=""
          style={{
            position: "relative", // Ensures the div can be positioned
            top: "-80px", // Moves the div upward
          }}
        >
          {/* Corner Up Right */}
          <div
            className=""
            style={{
              position: "relative", // Ensures the div can be positioned
              top: "-4px", // Moves the div upward
              left: "60px",
            }} // Ensure proper positioning and alignment
          >
            <svg
              width="210px"
              height="110px"
              viewBox="0 0 80 24" // Increased width for additional space
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#000000"
                stroke-width="0.24000000000000005"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  stroke="#000000" /* Lighter stroke color */
                  strokeWidth="0.6"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  // stroke-width="0.384"
                  d="M20 19v-6.5a3 3 0 013-3h60M76.5 6L80 9.5 76.5 13" // Added an offset to move the arrow
                ></path>
              </g>
            </svg>
          </div>

          <div
            className=""
            style={{
              position: "relative", // Ensures the div can be positioned
              top: "-30px", // Moves the div upward
              right: "50px",
            }}
          >
            <div className=" flex mx-8  ">
              <button className="bg-orange-200 text-center p-2 w-40 rounded font-medium mb-4">
                Monitor
              </button>
            </div>
            {/* Corner down-right arrow */}

            <svg
              fill="none"
              width="170px" /* Adjust width for a longer flat line */
              height="150px"
              viewBox="0 0 50 24" /* Extend viewBox horizontally for more space */
              xmlns="http://www.w3.org/2000/svg"
              style={{
                position: "absolute",
                bottom: "10px", // Adjust spacing from bottom
                left: "150px", // Adjust spacing from right
                
              }}
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M6 5v6.5a3 3 0 003 3h40M45.5 18L50 14.5 45.5 11" /* Extended flat horizontal line */
                  stroke="#000000" /* Lighter stroke color */
                  strokeWidth="0.47" /* Reduced stroke width for a lighter effect */
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
            </svg>

            {/* up-arrow  */}
            <svg
              fill="#000000"
              width="133px"
              height="60px"
              viewBox="-15 0 24 24"
              id="up-arrow"
              data-name="Flat Line"
              xmlns="http://www.w3.org/2000/svg"
              className="icon flat-line h-16"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <line
                  id="primary"
                  x1="12"
                  y1="21"
                  x2="12"
                  y2="3"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "0.6",
                  }}
                ></line>
                <polyline
                  id="primary-2"
                  data-name="primary"
                  points="15 6 12 3 9 6"
                  style={{
                    fill: "none",
                    stroke: "#000000",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: "0.6",
                  }}
                ></polyline>
              </g>
            </svg>

            <div className="">
              <button className="bg-blue-500 text-center p-2 w-40 rounded">
                Virtual Interface
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentBlock;
