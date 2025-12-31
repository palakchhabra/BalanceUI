"use client";

import { useState, useEffect } from "react";
import { BottomSheet, Button, Toggle } from "@balanceui/core";
import Cookies from "js-cookie";
import { COOKIE_NAMES, type CookiePreferences } from "@/lib/cookies-client";

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    necessary: true, // Always true, can't be disabled
    analytics: false,
    functional: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = Cookies.get(COOKIE_NAMES.COOKIE_CONSENT);
    if (!consent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => {
        setShowBanner(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPrefs = JSON.parse(consent);
        setPreferences(savedPrefs);
      } catch (error) {
        console.error("Error parsing cookie preferences:", error);
      }
    }
  }, []);

  const saveConsent = (prefs: CookiePreferences) => {
    // Save preferences to cookie
    Cookies.set(COOKIE_NAMES.COOKIE_CONSENT, JSON.stringify(prefs), {
      expires: 365, // 1 year
      sameSite: "Lax",
      secure: process.env.NODE_ENV === "production",
    });

    // Save to localStorage for easy access
    if (typeof window !== "undefined") {
      localStorage.setItem(COOKIE_NAMES.COOKIE_CONSENT, JSON.stringify(prefs));
    }

    setShowBanner(false);
    setShowDetails(false);

    // Reload page to apply cookie settings
    window.location.reload();
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      functional: true,
      marketing: true,
    });
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      functional: false,
      marketing: false,
    });
  };

  const handleSavePreferences = () => {
    saveConsent(preferences);
  };

  if (!showBanner) return null;

  return (
    <BottomSheet
      open={showBanner}
      onClose={() => {
        // Prevent closing without making a choice
        // Users must click Accept All, Reject All, or Save Preferences
      }}
      title={showDetails ? "Cookie Preferences" : "🍪 Cookie Consent"}
      size="lg"
      closeOnOverlayClick={false}
      closeOnEscape={false}
      showHandle={true}
    >
      {!showDetails ? (
        // Simple Banner View
        <div className="space-y-4">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
          >
            We use cookies to enhance your experience, store your search history, and analyze site usage. 
            By clicking "Accept All", you consent to our use of cookies.{" "}
            <a
              href="/privacy"
              className="underline"
              style={{ color: "var(--bu-primary, #1976d2)" }}
            >
              Learn more
            </a>
          </p>
          <div className="flex justify-center pt-4">
            <Button
              variant="solid"
              onClick={handleAcceptAll}
              style={{ 
                maxWidth: "200px",
                width: "100%",
                minWidth: "150px"
              }}
            >
              Accept All
            </Button>
          </div>
        </div>
      ) : (
        // Detailed Preferences View
        <div className="space-y-6">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
          >
            Choose which cookies you want to accept. You can change these settings at any time.
          </p>

          <div className="space-y-4">
            {/* Necessary Cookies */}
            <div
              className="p-4 rounded-lg border"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                backgroundColor: "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))",
                borderRadius: "var(--bu-radius-md, 10px)",
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                  >
                    Necessary Cookies
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  >
                    Essential for the website to function properly. These cannot be disabled.
                  </p>
                </div>
                <div
                  className="ml-4 px-3 py-1 rounded text-sm font-medium"
                  style={{
                    backgroundColor: "var(--bu-success, #4caf50)",
                    color: "var(--bu-on-success, #ffffff)",
                    borderRadius: "var(--bu-radius-sm, 8px)",
                  }}
                >
                  Always Active
                </div>
              </div>
            </div>

            {/* Analytics Cookies */}
            <div
              className="p-4 rounded-lg border"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                backgroundColor: preferences.analytics
                  ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
                  : "transparent",
                borderRadius: "var(--bu-radius-md, 10px)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                  >
                    Analytics Cookies
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  >
                    Help us understand how visitors interact with our website by collecting and reporting information anonymously.
                  </p>
                </div>
                <Toggle
                  checked={preferences.analytics}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, analytics: checked })
                  }
                />
              </div>
            </div>

            {/* Functional Cookies */}
            <div
              className="p-4 rounded-lg border"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                backgroundColor: preferences.functional
                  ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
                  : "transparent",
                borderRadius: "var(--bu-radius-md, 10px)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                  >
                    Functional Cookies
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  >
                    Enable enhanced functionality and personalization, such as remembering your search history and preferences.
                  </p>
                </div>
                <Toggle
                  checked={preferences.functional}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, functional: checked })
                  }
                />
              </div>
            </div>

            {/* Marketing Cookies */}
            <div
              className="p-4 rounded-lg border"
              style={{
                borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
                backgroundColor: preferences.marketing
                  ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.02))"
                  : "transparent",
                borderRadius: "var(--bu-radius-md, 10px)",
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4
                    className="font-semibold mb-1"
                    style={{ color: "var(--bu-fg, rgba(0, 0, 0, 0.87))" }}
                  >
                    Marketing Cookies
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))" }}
                  >
                    Used to deliver personalized advertisements and track campaign performance.
                  </p>
                </div>
                <Toggle
                  checked={preferences.marketing}
                  onChange={(checked) =>
                    setPreferences({ ...preferences, marketing: checked })
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t"
            style={{
              borderColor: "var(--bu-border, rgba(0, 0, 0, 0.12))",
            }}
          >
            <Button
              variant="solid"
              onClick={handleSavePreferences}
              style={{ width: "100%" }}
            >
              Save Preferences
            </Button>
            <div className="flex gap-2">
              <Button
                variant="stroke"
                onClick={() => setShowDetails(false)}
                style={{ flex: 1 }}
              >
                Back
              </Button>
              <Button
                variant="stroke"
                onClick={handleRejectAll}
                style={{ flex: 1 }}
              >
                Reject All
              </Button>
            </div>
          </div>
        </div>
      )}
    </BottomSheet>
  );
}

