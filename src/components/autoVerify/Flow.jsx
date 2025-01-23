import React from 'react';
import { motion } from 'framer-motion';
import Step from './Step';
import Arrow from './Arrow';

const steps = [
  'Specification',
  'RTL Design',
  'Testbench Development',
  'Simulation',
  'Coverage Analysis',
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // Delay between each child animation
    },
  },
};

const Flow = () => {
  return (
    <motion.div
      className="flex flex-col items-center gap-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <Step text={step} />
          {index < steps.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </motion.div>
  );
};

export default Flow;
