import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

// Define the shape of the context
interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Create the context with a default value
const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

// Define the props for the provider
interface ThemeProviderProps {
  children: ReactNode;
}

// ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Load theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    updateMetaThemeColor(systemPrefersDark);
    if (savedTheme) {
      setIsDarkMode(savedTheme === "dark");
      updateHtmlClass(savedTheme === "dark");
    } else {

      setIsDarkMode(systemPrefersDark);
      updateHtmlClass(systemPrefersDark);
      
    }

    // Listen for system theme changes
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
        updateHtmlClass(e.matches);
        updateMetaThemeColor(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, []);

  // Toggle theme between dark and light
  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    updateHtmlClass(newTheme);
  };

  // Update the meta theme color for mobile browsers
  const updateMetaThemeColor = (isDarkMode: boolean) => {
    const metaTag = document.querySelector('meta[name="theme-color"]');
    const themeColor = isDarkMode ? "#1a1a1a" : "#2980b9"; // Dark or Light color
    if (metaTag) {
      metaTag.setAttribute("content", themeColor);
    } else {
      // Create the meta tag if it doesn't exist
      const newMetaTag = document.createElement("meta");
      newMetaTag.setAttribute("name", "theme-color");
      newMetaTag.setAttribute("content", themeColor);
      document.head.appendChild(newMetaTag);
    }
  };
  

  // Update the HTML `class` attribute for Tailwind CSS
  const updateHtmlClass = (isDark: boolean) => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the ThemeContext
export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
