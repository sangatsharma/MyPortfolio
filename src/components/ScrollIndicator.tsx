import React from "react";
import { motion } from "framer-motion";

const ScrollIndicator: React.FC = () => {
  return (
    <div className="flex justify-center md:justify-start p-10 items-center h-20 mt-5 relative z-10">
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, 15, 0] }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <p className="text-sm font-medium text-gray-100">Scroll Down</p>
        <motion.div
          className="flex flex-col items-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="{`w-6 h-6 text-gray-100 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
        <motion.div
          className="flex flex-col items-center "
          initial={{ opacity: 1 }}
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-gray-100 animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
        
      </motion.div>
    </div>
  );
};

export default ScrollIndicator;
