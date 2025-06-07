import React, { createContext, useContext, useState, useEffect } from "react";

// Create the context
const ThemeContext = createContext();

// ThemeProvider component
export function ThemeProvider({ children, initialTheme = "light" }) {
  const [theme, setTheme] = useState(initialTheme);

  // Update HTML root class for dark/light mode
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Toggle theme function
  const toggleTheme = () => setTheme((prev) => (prev === "dark" ? "light" : "dark"));

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for easy usage
export function useTheme() {
  return useContext(ThemeContext);
}