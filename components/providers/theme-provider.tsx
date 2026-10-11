"use client";

import { createContext, useContext, useEffect } from "react";

type Theme = "light";

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Permanently remove dark mode class and clear any legacy theme setting
    if (typeof document !== "undefined") {
      document.documentElement.classList.remove("dark");
      try {
        localStorage.removeItem("insyt-corp-theme");
      } catch {
        // ignore storage errors
      }
    }
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "light", toggleTheme: () => {}, setTheme: () => {} }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  return context || { theme: "light", toggleTheme: () => {}, setTheme: () => {} };
}
