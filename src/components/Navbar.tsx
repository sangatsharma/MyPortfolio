import React, { useState } from "react";
import { motion } from "framer-motion";
import { Sling as Hamburger } from "hamburger-react";
import { useThemeContext } from "../context/ThemeContext";
import { DarkModeSwitch } from "react-toggle-dark-mode";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useThemeContext();
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  const navVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        delayChildren: 0.3,
        staggerChildren: 0.1,
      },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.nav
      className="bg-transparent backdrop-blur-md sticky top-0 z-50 w-full"
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <motion.div className="flex items-center" variants={linkVariants}>
            <h1 className="text-3xl font-bold text-white">SS</h1>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div
            className="hidden md:flex space-x-4"
            variants={linkVariants}
          >
            {navLinks.map((link) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-white px-3 py-2 rounded-md text-md font-medium bg-opacity-90 hover:bg-gray-500 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.label}
              </motion.a>
            ))}
           <span className="hover:scale-125 transition-all ease-in"> 
           <DarkModeSwitch
            
            style={{ marginBottom: "0.5rem", marginTop: "0.4rem" }}
            checked={!isDarkMode}
            onChange={toggleTheme}
            size={24}
            moonColor="white"
            sunColor="yellow"
          
          />
            </span> 
          </motion.div>

          {/* Mobile Hamburger */}
          <div className="flex md:hidden">
          <DarkModeSwitch
              style={{  marginTop: "0.7rem",marginRight:"0.5rem" }}
              checked={!isDarkMode}
              onChange={toggleTheme}
              size={26}
              moonColor="white"
              sunColor="yellow"
            />
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              color="white"
            />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        
        <motion.div
          className="md:hidden bg-transparent backdrop-blur-3xl text-center w-full h-screen "
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="block text-white px-4 py-3 hover:text-black hover:bg-gray-50 transition-all duration-300"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </motion.a>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
