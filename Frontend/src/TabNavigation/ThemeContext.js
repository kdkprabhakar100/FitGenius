import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [enableDarkTheme, setEnableDarkTheme] = useState(true); // Initial theme state

  const toggleTheme = () => {
    setEnableDarkTheme(prev => !prev); // Toggle between true and false
  };

  return (
    <ThemeContext.Provider value={{ enableDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
