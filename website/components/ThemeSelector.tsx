"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@balanceui/core";
import { useTheme } from "./ThemeProvider";

const themes = [
  { name: "calm-blue" as const, label: "Calm Blue", color: "#ffffff" },
  { name: "salt-pepper" as const, label: "Salt Pepper", color: "#ffffff" },
  { name: "quiet-luxury" as const, label: "Quiet Luxury", color: "#fafaf9" },
  { name: "gothic-noir" as const, label: "Gothic Noir", color: "#0f172a" },
  { name: "cherry-blossom" as const, label: "Cherry Blossom", color: "#fefcfb" },
  { name: "lavender-fields" as const, label: "Lavender Fields", color: "#fafaf9" },
  { name: "beachfront-views" as const, label: "Beachfront Views", color: "#fefcfb" },
  { name: "frozen-lake" as const, label: "Frozen Lake", color: "#0f172a" },
  { name: "golden-hour" as const, label: "Golden Hour", color: "#fefcfb" },
  { name: "stone-path" as const, label: "Stone Path", color: "#faf9f7" },
  { name: "cappuccino" as const, label: "Cappuccino", color: "#fafaf9" },
  { name: "coastal-morning" as const, label: "Coastal Morning", color: "#fefcfb" },
  { name: "desert-dusk" as const, label: "Desert Dusk", color: "#fefcfb" },
  { name: "fresh-peach" as const, label: "Fresh Peach", color: "#fefcfb" },
  { name: "minty-fresh" as const, label: "Minty Fresh", color: "#fefcfb" },
  { name: "ocean-tide" as const, label: "Ocean Tide", color: "#fefcfb" },
  { name: "soft-spring" as const, label: "Soft Spring", color: "#fefcfb" },
  { name: "autumn-leaves" as const, label: "Autumn Leaves", color: "#fefcfb" },
  { name: "winter-chill" as const, label: "Winter Chill", color: "#0f172a" },
  { name: "summer-breeze" as const, label: "Summer Breeze", color: "#fefcfb" },
  { name: "us-black-white" as const, label: "US Black & White", color: "#ffffff" },
];

export function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const currentTheme = themes.find(t => t.name === theme) || themes[0];

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="stroke"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        style={{ minWidth: "160px", justifyContent: "space-between" }}
      >
        <span className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: currentTheme.color }} />
          {currentTheme.label}
        </span>
        <span>{isOpen ? "▲" : "▼"}</span>
      </Button>
      
      {isOpen && (
        <div
          role="listbox"
          aria-label="Theme selector"
          className="absolute right-0 mt-2 w-56 rounded-lg border border-gray-200 bg-white shadow-xl z-50"
          style={{ maxHeight: "500px", overflowY: "auto" }}
        >
          <div className="p-2 space-y-1">
            {themes.map((t) => {
              const isSelected = theme === t.name;
              return (
                <button
                  key={t.name}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  data-theme={t.name}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (theme !== t.name) {
                      setTheme(t.name);
                    }
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded text-sm transition-colors flex items-center gap-2 ${
                    isSelected
                      ? "bg-black text-white font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2 flex-1">
                    <div
                      className="w-4 h-4 rounded border border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: t.color }}
                    />
                    <span>{t.label}</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={isSelected}
                    readOnly
                    className="w-4 h-4 cursor-pointer flex-shrink-0"
                    style={{ 
                      accentColor: isSelected ? "#ffffff" : "#000000",
                      filter: isSelected ? "brightness(0) invert(1)" : "none"
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
