"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type Theme = 
  | "calm-blue"
  | "salt-pepper"
  | "quiet-luxury"
  | "gothic-noir"
  | "cherry-blossom"
  | "lavender-fields"
  | "beachfront-views"
  | "frozen-lake"
  | "golden-hour"
  | "stone-path"
  | "cappuccino"
  | "coastal-morning"
  | "desert-dusk"
  | "fresh-peach"
  | "minty-fresh"
  | "ocean-tide"
  | "soft-spring"
  | "autumn-leaves"
  | "winter-chill"
  | "summer-breeze"
  | "us-black-white";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("calm-blue");
  const [mounted, setMounted] = useState(false);

  const applyTheme = (newTheme: Theme) => {
    if (typeof window === "undefined") return;

    // Get html element
    const htmlElement = document.documentElement;
    
    // Remove all existing theme attributes
    htmlElement.removeAttribute("data-bu-theme");
    
    // Set data attribute for theme on html element - CSS will handle the rest
    // This only affects BalanceUI components, not the website background
    htmlElement.setAttribute("data-bu-theme", newTheme);
    
    // Always keep website background white and text black
    // Theme only applies to BalanceUI components, not the page background
    document.documentElement.style.setProperty("--background", "#ffffff");
    document.documentElement.style.setProperty("--foreground", "#000000");
    document.documentElement.style.setProperty("--text-primary", "#000000");
    document.documentElement.style.setProperty("--text-secondary", "#333333");
    
    localStorage.setItem("balanceui-theme", newTheme);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    applyTheme(newTheme);
    // Force a re-render by triggering a small delay to ensure DOM updates
    setTimeout(() => {
      // This ensures the theme is fully applied
      const htmlElement = document.documentElement;
      if (htmlElement.getAttribute("data-bu-theme") !== newTheme) {
        htmlElement.setAttribute("data-bu-theme", newTheme);
      }
    }, 0);
  };

  useEffect(() => {
    setMounted(true);
    const savedTheme = (localStorage.getItem("balanceui-theme") as Theme) || "calm-blue";
    setThemeState(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Always provide context, even before mount
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

