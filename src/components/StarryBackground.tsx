import React from "react";
import { motion } from "framer-motion";

const StarryBackground: React.FC = () => {
  // Generate floating stars (smooth, floating animations)
  const generateStars = (count: number) =>
    Array.from({ length: count }).map((_, index) => (
      <motion.div
        key={`star-${index}`}
        className="absolute bg-white rounded-full"
        style={{
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          top: `${Math.random() * 100}vh`,
          left: `${Math.random() * 100}vw`,
        }}
        animate={{
          x: ["0vw", "2vw", "-1vw", "0vw"], // Random horizontal floating
          y: ["0vh", "-1vh", "1vh", "0vh"], // Random vertical floating
        }}
        transition={{
          duration: Math.random() * 5 + 3, // Smooth floating
          repeat: Infinity,
          repeatType: "loop",
        }}
      />
    ));



  return (
    <div className="fixed inset-0 bg-gradient-to-b from-gray-900 via-black to-gray-800 overflow-hidden">
      {/* Floating stars */}
      {generateStars(25)}
    </div>
  );
};

export default StarryBackground;
