import { motion } from "framer-motion";

const ASICVerification = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-6 h-full ">
      {/* Title Section */}
      <div className="text-center mb-10">
        <h1
          className="text-4xl font-extrabold text-zinc-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          ASIC Verification
        </h1>
      </div>

      {/* GIF Section */}
      <div className="relative w-full max-w-3xl mb-8">
        <img
          src="/src/assets/autoVerify.gif"
          alt="ASIC Verification GIF"
          className="w-full h-auto rounded-lg shadow-2xl"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
};

export default ASICVerification;
