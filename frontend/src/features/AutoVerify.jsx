import React, { useState, useEffect } from "react";

const frames = [
  "frame_1.png",
  "frame_2.png",
  "frame_3.png",
  "frame_4.png",
  "frame_5.png",
  "frame_6.png",
  "frame_7.png",
  "frame_8.png",
  "frame_9.png",
  "frame_10.png",
  "frame_11.png",
  "frame_12.png",
  "frame_13.png",
  "frame_14.png",
  "frame_15.png",
  "frame_16.png",
  "frame_17.png",
  "frame_18.png",
  "frame_19.png",
  "frame_20.png",
  "frame_21.png",
  "frame_22.png",
  "frame_23.png",
  "frame_24.png",
  "frame_25.png",
  "frame_26.png",
  "frame_27.png",
  "frame_28.png",
  "frame_29.png",
  "frame_30.png",
  "frame_31.png",
  "frame_32.png",
  "frame_33.png",
  "frame_34.png",
  "frame_35.png",
  "frame_36.png",
  "frame_37.png",
  "frame_38.png",
  "frame_39.png",
  "frame_40.png",
  "frame_41.png",
  "frame_42.png",
  "frame_43.png",
  "frame_44.png",
  "frame_45.png",
  "frame_46.png",
  "frame_47.png",
  "frame_48.png",
  "frame_49.png",
  "frame_50.png",
  "frame_51.png",
  "frame_52.png",
  "frame_53.png",
  "frame_54.png",
  "frame_55.png",
];

const AutoVerify = () => {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => (prevFrame + 1) % frames.length);
    }, 1500); // Change image every second

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100 p-4">
      {/* <h2 className="text-2xl font-bold mb-4">Workflow Step {currentFrame + 1}</h2> */}
      <img
        src={`/assets/${frames[currentFrame]}`}
        alt={`Frame ${currentFrame + 1}`}
        className="w-1/2 h-auto border-4 border-gray-300 shadow-lg rounded-lg"
      />
    </div>
  );
};
export default AutoVerify;
