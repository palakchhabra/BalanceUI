"use client";

import { useState, useEffect, useCallback } from "react";
import { getSearchHistoryFromCookie, setSearchHistoryCookie, isCookieAllowed } from "@/lib/cookies-client";

export interface SearchEntry {
  query: string;
  timestamp: number;
  page?: string;
}

export function useSearchTracking() {
  const [searchHistory, setSearchHistory] = useState<SearchEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadSearchHistory() {
      try {
        // Try to get from API first
        const response = await fetch("/api/search");
        if (response.ok) {
          const data = await response.json();
          setSearchHistory(
            data.history.map((h: any) => ({
              query: h.query,
              timestamp: h.timestamp,
              page: h.page,
            }))
          );
        } else {
          // Fallback to cookie
          const cookieHistory = getSearchHistoryFromCookie();
          setSearchHistory(
            cookieHistory.map((query, index) => ({
              query,
              timestamp: Date.now() - (cookieHistory.length - index) * 1000,
            }))
          );
        }
      } catch (error) {
        console.error("Error loading search history:", error);
        // Fallback to cookie
        const cookieHistory = getSearchHistoryFromCookie();
        setSearchHistory(
          cookieHistory.map((query, index) => ({
            query,
            timestamp: Date.now() - (cookieHistory.length - index) * 1000,
          }))
        );
      } finally {
        setLoading(false);
      }
    }

    loadSearchHistory();
  }, []);

  const trackSearch = useCallback(async (query: string, page?: string) => {
    if (!query || query.trim().length === 0) return;

    // Check if functional cookies are allowed (for search history)
    if (!isCookieAllowed("functional")) {
      console.log("Search tracking disabled: functional cookies not allowed");
      return;
    }

    const searchEntry: SearchEntry = {
      query: query.trim(),
      timestamp: Date.now(),
      page: page || window.location.pathname,
    };

    try {
      // Update local state
      setSearchHistory((prev) => {
        const filtered = prev.filter((h) => h.query !== searchEntry.query);
        const updated = [searchEntry, ...filtered].slice(0, 50);
        return updated;
      });

      // Update cookie immediately
      const queries = [searchEntry.query, ...searchHistory.map((h) => h.query)].slice(0, 10);
      setSearchHistoryCookie(queries);

      // Send to API (only if analytics cookies are allowed)
      if (isCookieAllowed("analytics")) {
        await fetch("/api/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ query: searchEntry.query, page: searchEntry.page }),
        });
      }
    } catch (error) {
      console.error("Error tracking search:", error);
    }
  }, [searchHistory]);

  const clearHistory = useCallback(async () => {
    setSearchHistory([]);
    setSearchHistoryCookie([]);
  }, []);

  return {
    searchHistory,
    loading,
    trackSearch,
    clearHistory,
  };
}

