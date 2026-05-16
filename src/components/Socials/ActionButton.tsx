import React, { useState } from "react";
import { motion } from "framer-motion";

interface ActionButtonProps {
  text: string;
  isDarkMode: boolean;
  onClick: () => void;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  text,
  isDarkMode,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  // Refined theme configuration with black-focused palette
  const themes = {
    light: {
      background: "bg-white",
      text: "text-black",
      border: "border-gray-200",
      accentColor: "bg-black",
      hoverBackground: "bg-gray-100",
      hoverShadow: "hover:shadow-md hover:shadow-gray-300/50",
    },
    dark: {
      background: "bg-gray-100",
      text: "text-black",
      border: "border-gray-800",
      accentColor: "bg-green-500",
      hoverBackground: "bg-gray-900",
      hoverShadow: "hover:shadow-md hover:shadow-gray-800/50",
    },
  };

  const currentTheme = isDarkMode ? themes.dark : themes.light;

  return (
    <motion.div className="relative group">
      <motion.button
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.1 },
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onClick}
        className={`
          relative 
          z-10
          h-12
          flex w-auto
          items-center 
          justify-center 
          gap-2
          px-3 
          py-2 
          mt-2
          rounded-xl 
          border 
          transition-all 
          duration-300 
          ease-in-out
          ${currentTheme.background}
          ${currentTheme.text}
          ${currentTheme.border}
          ${currentTheme.hoverShadow}
          overflow-hidden
        `}
      >
        {/* Bottom Border Hover Effect */}
        <motion.span
          initial={{ width: "0%" }}
          animate={{
            width: isHovered ? "100%" : "0%",
            left: isHovered ? "0%" : "50%",
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          className={`
            absolute 
            bottom-0 
            h-1 
            ${currentTheme.accentColor}
          `}
        />

        {/* Button Content */}
        <motion.div
          className="flex items-center gap-3 z-20"
          animate={{
            transition: { duration: 0.3 },
          }}
        >
          <motion.span
            animate={{
              letterSpacing: isHovered ? "0.03em" : "0em",
            }}
            transition={{ duration: 0.3 }}
            className="font-semibold tracking-wide uppercase text-sm"
          >
            {text}
          </motion.span>
        </motion.div>
      </motion.button>
    </motion.div>
  );
};
