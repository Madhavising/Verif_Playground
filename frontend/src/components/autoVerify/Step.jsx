import React from 'react';
import { motion } from 'framer-motion';

const stepVariants = {
    hidden: { opacity: 0, y: -20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.2, // Add delay before each step appears
      },
    },
  };
  

const Step = ({ text }) => {

    return (
      <motion.div
        className="bg-blue-500 text-white px-8 py-4 rounded-md shadow-lg text-lg font-medium w-64 text-center"
        variants={stepVariants}
        whileHover={{ scale: 1.1 }}
      >
        {text}
      </motion.div>
    );
  };
  
  
export default Step;
