import React, { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider, createTheme, PaletteMode } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

// Create Context
interface ThemeContextType {
  mode: PaletteMode;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Load theme mode from localStorage or default to "light"
const getStoredTheme = (): PaletteMode => {
  return (localStorage.getItem("mui-mode") as PaletteMode) || "light";
};

export const ThemeProviderCustom: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<PaletteMode>(getStoredTheme);

  // Update localStorage and state on theme change
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";
      localStorage.setItem("mui-mode", newMode);
      return newMode;
    });
  };

  useEffect(() => {
    localStorage.setItem("mui-mode", mode);
  }, [mode]);

  // Create MUI theme
  const theme = createTheme({
    palette: {
      mode,
    },
  });

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

// Custom hook for easy access to the theme context
export const useThemeMode = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useThemeMode must be used within a ThemeProviderCustom");
  }
  return context;
};