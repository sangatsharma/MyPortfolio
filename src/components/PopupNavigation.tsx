import React, { useState,useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiHome,
  FiBook,
  FiAward,
  FiGrid,
  FiFacebook,
  FiTwitter,
  FiInstagram,
} from "react-icons/fi";
import { FaSearch } from "react-icons/fa";
import Tooltip from "./Socials/Tooltip";

// TypeScript types for navigation items
interface NavItem {
  title: string;
  icon: React.ReactNode;
  shortcut: string;
  category: string;
  route: string;
}

// Sample navigation data
const navItems: NavItem[] = [
  {
    title: "Achievements",
    icon: <FiAward />,
    shortcut: "A",
    category: "Pages",
    route: "/achievements",
  },
  {
    title: "Contact",
    icon: <FiBook />,
    shortcut: "C",
    category: "Pages",
    route: "/guestbook",
  },

  {
    title: "Home",
    icon: <FiHome />,
    shortcut: "H",
    category: "Pages",
    route: "/",
  },

  {
    title: "Projects",
    icon: <FiGrid />,
    shortcut: "P",
    category: "Pages",
    route: "/projects",
  },
  // Social Links
  {
    title: "Facebook",
    icon: <FiFacebook />,
    shortcut: "F",
    category: "Socials",
    route: "https://facebook.com",
  },
  {
    title: "Instagram",
    icon: <FiInstagram />,
    shortcut: "I",
    category: "Socials",
    route: "https://instagram.com",
  },
  {
    title: "Twitter",
    icon: <FiTwitter />,
    shortcut: "T",
    category: "Socials",
    route: "https://twitter.com",
  },
];

const PopupNavigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Close the popup when the Escape key is pressed
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleEscapeKey);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  // First filter: items that start with the search query
  const startWithItems = navItems.filter((item) =>
    item.title.toLowerCase().startsWith(searchQuery.toLowerCase())
  );

  // Second filter: items that include the search query (excluding those that already match "starts with")
  const includeItems = navItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !startWithItems.some((startItem) => startItem.title === item.title)
  );

  // Combine the two lists without duplicates
  const filteredNavItems = [...startWithItems, ...includeItems];

  // Dynamically group by category in the order of appearance
  const groupedNavItems = filteredNavItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, NavItem[]>);
  console.log(groupedNavItems);

  return (
    <>
      {/* Trigger Button */}

      <button
        className="fixed bottom-5 z-20  right-6 md:right-[7rem] bg-gray-400/50 text-white rounded-full p-2 pt-4 w-12 h-12 flex items-center justify-center shadow-lg hover:bg-gray-400 transition"
        onClick={() => setIsOpen(true)}
        aria-label="Open Navigation Search"
      >
        <Tooltip content="Search" placement="top" delay={0.3}>
          <FaSearch size={24} />
        </Tooltip>
      </button>
      {/* Popup */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-md flex z-50 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        >
          <div className="w-full flex justify-center h-96 mx-auto">
            <motion.div
              className="bg-[#10171d]/70 text-white rounded-lg shadow-lg p-6 w-11/12 max-w-lg h-auto fixed"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the popup
            >
              {/* Search Input */}
              <div className="relative mb-4 flex gap-2">
                <FiSearch className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  className="w-full bg-gray-800 text-white py-2 pl-10 pr-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Type a command or search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <span className="my-auto text-gray-400 text-sm">Esc</span>
              </div>

              <div
                className={`${
                  filteredNavItems.length > 6
                    ? "overflow-y-scroll h-72"
                    : "h-auto"
                }`}
              >
                {/* Dynamically Render Filtered Items by Category */}
                {Object.entries(groupedNavItems).map(([category, items]) => (
                  <div key={category}>
                    <h3 className="text-gray-400 text-sm mb-2">{category}</h3>
                    <ul>
                      {items.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between py-2 px-4 rounded hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            setIsOpen(false);
                            item.category === "Socials"
                              ? window.open(item.route, "_blank")
                              : (window.location.href = item.route); // Simulated navigation
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.title}</span>
                          </div>
                          <span className="text-gray-400 text-sm">
                            {item.shortcut}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {filteredNavItems.length === 0 && (
                  <span className="text-gray-500 text-center py-4">
                    No results found
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default PopupNavigation;
