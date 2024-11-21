import React, { useState } from "react";
import { motion } from "framer-motion";
import Hamburger from "hamburger-react";

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav
      className="bg-transparent backdrop-blur-md  sticky top-0 block w-full  "
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="max-w-7xl  mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-3xl font-bold ">SS</h1>
          </div>
          <div className="hidden md:flex space-x-4 mt-4 ">
            {["Home", "About", "Projects", "Skills", "Contact"].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {link}
              </a>
            ))}
          </div>
          <div className="flex md:hidden">
            <Hamburger
              toggled={isOpen}
              toggle={setIsOpen}
              size={24}
              color="white"
            />
          </div>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="md:hidden bg-gray-900"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          transition={{ duration: 0.3 }}
        >
          {["Home", "Blog", "Projects", "Achievements", "Guestbook"].map(
            (link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="block text-white px-4 py-2"
              >
                {link}
              </a>
            )
          )}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
