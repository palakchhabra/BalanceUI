// This file is kept for backward compatibility but styles are now in CSS
// The component now uses inline styles with CSS classes for better Material Design support

import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  position: "relative",
  width: 48,
  height: 28,
  cursor: "pointer",
  outline: "none",
};

export const trackStyle = (checked: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  borderRadius: 14,
  background: checked
    ? "var(--bu-primary, #1976d2)"
    : "var(--bu-surface-variant, rgba(0, 0, 0, 0.38))",
  transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
});

export const knobStyle = (
  checked: boolean,
  active: boolean
): CSSProperties => ({
  position: "absolute",
  top: 2,
  left: checked ? 22 : 2,
  width: 24,
  height: 24,
  borderRadius: "50%",
  background: checked 
    ? "var(--bu-on-primary, #ffffff)"
    : "var(--bu-surface, #ffffff)",
  transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow: active
    ? checked
      ? "0 2px 8px rgba(25, 118, 210, 0.4), 0 0 0 8px rgba(25, 118, 210, 0.1)"
      : "0 2px 8px rgba(0, 0, 0, 0.2), 0 0 0 8px rgba(0, 0, 0, 0.05)"
    : checked
    ? "0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)"
    : "0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)",
});
