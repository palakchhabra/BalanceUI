import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  position: "relative",
  width: 40,
  height: 20,
  cursor: "pointer",
  outline: "none",
};

export const trackStyle = (checked: boolean): CSSProperties => ({
  position: "absolute",
  inset: 0,
  borderRadius: 10,
  background: checked
    ? "var(--bu-primary)"
    : "var(--bu-border)",
  transition: "background 150ms ease",
});

export const knobStyle = (
  checked: boolean,
  active: boolean
): CSSProperties => ({
  position: "absolute",
  top: 2,
  left: checked ? 22 : 2,
  width: 16,
  height: 16,
  borderRadius: "50%",
  background: checked 
    ? "var(--bu-on-primary, #ffffff)"
    : "var(--bu-surface, #ffffff)",
  border: checked 
    ? "none"
    : "1px solid var(--bu-border, #e5e7eb)",
  transition: "left 150ms ease, box-shadow 120ms ease, background 150ms ease",
  boxShadow: active
    ? checked
      ? "0 0 0 4px rgba(31, 41, 55, 0.2)"
      : "0 0 0 4px rgba(0, 0, 0, 0.1)"
    : checked
    ? "0 2px 4px rgba(0, 0, 0, 0.2)"
    : "0 1px 2px rgba(0, 0, 0, 0.1)",
});
