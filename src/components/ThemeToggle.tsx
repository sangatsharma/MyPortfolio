
import { motion } from "framer-motion";
import { useThemeContext } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeContext();

  return (
    <div className="flex justify-center items-center">
      <button
        onClick={toggleTheme}
        className="relative w-14 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center px-1"
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-white shadow-md"
          layout
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
          initial={{ x: isDarkMode ? 20 : 0 }}
        />
        <motion.span
          className="absolute left-2 text-xs font-bold text-black dark:text-white"
          initial={{ opacity: isDarkMode ? 1 : 0 }}
          animate={{ opacity: isDarkMode ? 1 : 0 }}
        >
          🌙
        </motion.span>
        <motion.span
          className="absolute right-2 text-xs font-bold text-black dark:text-white"
          initial={{ opacity: isDarkMode ? 0 : 1 }}
          animate={{ opacity: isDarkMode ? 0 : 1 }}
        >
          ☀️
        </motion.span>
      </button>
    </div>
  );
};

export default ThemeToggle;
