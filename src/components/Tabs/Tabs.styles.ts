import type { CSSProperties } from "react";

export const tabListStyle: CSSProperties = {
  display: "flex",
  borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
  position: "relative",
  zIndex: 1,
  boxShadow: "var(--bu-elevation-1)",
  transition: "var(--bu-transition-elevation)",
};

export const tabStyle = (active?: boolean): CSSProperties => ({
  padding: "10px 16px",
  cursor: "pointer",
  borderBottom: active
    ? "2px solid var(--bu-primary, #1976d2)"
    : "2px solid transparent",
  color: active
    ? "var(--bu-primary, #1976d2)"
    : "var(--bu-fg, rgba(0, 0, 0, 0.87))",
  borderRadius: active ? "var(--bu-radius-sm, 4px) var(--bu-radius-sm, 4px) 0 0" : "var(--bu-radius-sm, 4px) var(--bu-radius-sm, 4px) 0 0",
  transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
  position: "relative",
  fontWeight: active ? 500 : 400,
  ...(active && {
    boxShadow: "var(--bu-elevation-2)",
  }),
});
