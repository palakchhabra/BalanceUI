"use client";

/**
 * Client-side cookie utilities
 * These functions can only be used in client components
 */

export const COOKIE_NAMES = {
  SESSION_ID: "balanceui_session_id",
  USER_EMAIL: "balanceui_user_email",
  SEARCH_HISTORY: "balanceui_search_history",
  COOKIE_CONSENT: "balanceui_cookie_consent",
} as const;

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  functional: boolean;
  marketing: boolean;
}

/**
 * Get cookie consent preferences
 */
export function getCookieConsent(): CookiePreferences | null {
  if (typeof window === "undefined") return null;
  
  try {
    // Try localStorage first (faster)
    const localPrefs = localStorage.getItem(COOKIE_NAMES.COOKIE_CONSENT);
    if (localPrefs) {
      return JSON.parse(localPrefs);
    }
    
    // Fallback to cookie
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAMES.COOKIE_CONSENT}=`))
      ?.split("=")[1];
    
    if (cookieValue) {
      const prefs = JSON.parse(decodeURIComponent(cookieValue));
      // Also save to localStorage for faster access
      localStorage.setItem(COOKIE_NAMES.COOKIE_CONSENT, JSON.stringify(prefs));
      return prefs;
    }
  } catch (error) {
    console.error("Error reading cookie consent:", error);
  }
  
  return null;
}

/**
 * Check if a specific cookie category is allowed
 */
export function isCookieAllowed(category: keyof CookiePreferences): boolean {
  const consent = getCookieConsent();
  if (!consent) return false;
  
  // Necessary cookies are always allowed
  if (category === "necessary") return true;
  
  return consent[category] === true;
}

/**
 * Get search history from cookies (client-side)
 */
export function getSearchHistoryFromCookie(): string[] {
  if (typeof window === "undefined") return [];
  
  try {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_NAMES.SEARCH_HISTORY}=`))
      ?.split("=")[1];
    
    if (cookieValue) {
      return JSON.parse(decodeURIComponent(cookieValue));
    }
  } catch (error) {
    console.error("Error reading search history cookie:", error);
  }
  
  return [];
}

/**
 * Set search history in cookies (client-side)
 */
export function setSearchHistoryCookie(searches: string[]): void {
  if (typeof window === "undefined") return;
  
  try {
    const maxSearches = 10; // Keep last 10 in cookie
    const limitedSearches = searches.slice(0, maxSearches);
    const cookieValue = encodeURIComponent(JSON.stringify(limitedSearches));
    
    document.cookie = `${COOKIE_NAMES.SEARCH_HISTORY}=${cookieValue}; path=/; max-age=${60 * 60 * 24 * 7}; SameSite=Lax`;
  } catch (error) {
    console.error("Error setting search history cookie:", error);
  }
}

