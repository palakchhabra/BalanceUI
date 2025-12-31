"use client";

import { useState, useEffect, useRef } from "react";
import { Input, Button, Card, Badge } from "@balanceui/core";
import { useSearchTracking } from "@/hooks/useSearchTracking";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const { searchHistory, trackSearch } = useSearchTracking();

  // Filter recent searches based on query
  const suggestions = searchHistory
    .filter((entry) => 
      entry.query.toLowerCase().includes(query.toLowerCase()) && 
      entry.query !== query
    )
    .slice(0, 5);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (searchQuery.trim()) {
      await trackSearch(searchQuery.trim());
      setShowSuggestions(false);
      // You can add navigation logic here
      // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      handleSearch(query);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
      setQuery("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleSearch(query);
  };

  return (
    <div ref={searchRef} className="relative" style={{ position: "relative", width: "100%" }}>
      <form onSubmit={handleSubmit} className="flex items-center gap-2" style={{ width: "100%" }}>
        <div className="relative flex-1" style={{ position: "relative", width: "100%" }}>
          <div className="relative" style={{ position: "relative", width: "100%" }}>
            <div
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                zIndex: 1,
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <Input
              type="text"
              placeholder="Search components..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(true)}
              style={{ width: "100%", paddingLeft: "40px", paddingRight: query ? "40px" : "12px" }}
              autoComplete="off"
            />
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  setShowSuggestions(false);
                }}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                  zIndex: 1,
                }}
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
          
          {showSuggestions && (suggestions.length > 0 || query) && (
            <Card
              variant="elevated"
              elevation={8}
              style={{
                position: "absolute",
                top: "calc(100% + 4px)",
                left: 0,
                right: 0,
                marginTop: "0",
                padding: "0.5rem",
                zIndex: 1000,
                maxHeight: "300px",
                overflowY: "auto",
                backgroundColor: "var(--bu-surface, #ffffff)",
                borderRadius: "var(--bu-radius-md, 10px)",
                boxShadow: "var(--bu-elevation-8)",
              }}
            >
              {suggestions.length > 0 && (
                <div className="mb-2">
                  <div className="px-2 py-1 text-xs font-semibold" style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}>
                    Recent Searches
                  </div>
                  {suggestions.map((entry, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setQuery(entry.query);
                        handleSearch(entry.query);
                      }}
                      className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm transition-colors"
                      style={{
                        color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <span>{entry.query}</span>
                    </button>
                  ))}
                </div>
              )}
              {query && (
                <button
                  onClick={() => handleSearch(query)}
                  className="w-full text-left px-2 py-1.5 hover:bg-gray-100 rounded text-sm transition-colors"
                  style={{
                    color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                  <span>Search for "{query}"</span>
                </button>
              )}
            </Card>
          )}
        </div>
        <Button
          type="submit"
          variant="solid"
          size="sm"
          onClick={(e) => {
            e.preventDefault();
            handleSearch(query);
          }}
          disabled={!query.trim()}
          aria-label="Search"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </Button>
      </form>
    </div>
  );
}

