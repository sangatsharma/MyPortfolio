"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDarkMode: false,
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: ReactNode;
}

const updateMetaThemeColor = (dark: boolean) => {
  const metaTag = document.querySelector('meta[name="theme-color"]');
  const themeColor = dark ? "#1a1a1a" : "#2980b9";
  if (metaTag) {
    metaTag.setAttribute("content", themeColor);
  } else {
    const newMetaTag = document.createElement("meta");
    newMetaTag.setAttribute("name", "theme-color");
    newMetaTag.setAttribute("content", themeColor);
    document.head.appendChild(newMetaTag);
  }
};

const updateHtmlClass = (isDark: boolean) => {
  const html = document.documentElement;
  const body = document.body;
  if (isDark) {
    html.classList.add("dark");
    body.className = "dark-mode";
  } else {
    html.classList.remove("dark");
    body.className = "light-mode";
  }
};

const getInitialTheme = (): boolean => {
  if (typeof window !== "undefined") {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      return savedTheme === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return true;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(getInitialTheme);

  useEffect(() => {
    updateMetaThemeColor(isDarkMode);
    updateHtmlClass(isDarkMode);

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!localStorage.getItem("theme")) {
        setIsDarkMode(e.matches);
        updateMetaThemeColor(e.matches);
        updateHtmlClass(e.matches);
      }
    };

    mediaQuery.addEventListener("change", handleSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", handleSystemThemeChange);
    };
  }, [isDarkMode]);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }
  return context;
};
