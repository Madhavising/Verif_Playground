import React from 'react';
import { motion } from 'framer-motion';

const arrowVariants = {
  hidden: { opacity: 0, x: -30 }, // Start off-screen
  show: { opacity: 1, x: 0 },     // Slide into view
};

const Arrow = () => {
  return (
    <motion.div
      className="text-blue-500"
      variants={arrowVariants}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 4v16m8-8H4"
        />
      </svg>
    </motion.div>
  );
};

export default Arrow;
