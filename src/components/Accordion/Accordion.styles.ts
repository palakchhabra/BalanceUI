import type { CSSProperties } from "react";

export const headerStyle: CSSProperties = {
  padding: "12px 16px",
  cursor: "pointer",
  borderBottom: "1px solid var(--bu-border)",
  borderRadius: "var(--bu-radius-md, 10px) var(--bu-radius-md, 10px) 0 0",
  background: "var(--bu-surface, #ffffff)",
  boxShadow: "var(--bu-elevation-1)",
  transition: "var(--bu-transition-elevation)",
  position: "relative",
  zIndex: 1,
};

export const contentStyle: CSSProperties = {
  padding: 16,
  background: "var(--bu-surface, #ffffff)",
  borderRadius: "0 0 var(--bu-radius-md, 10px) var(--bu-radius-md, 10px)",
  boxShadow: "var(--bu-elevation-2)",
  marginTop: "-1px",
  position: "relative",
  zIndex: 0,
  transition: "var(--bu-transition-elevation)",
};

// Expanded accordion header should have higher elevation
export const headerStyleExpanded: CSSProperties = {
  ...headerStyle,
  boxShadow: "var(--bu-elevation-3)",
  borderRadius: "var(--bu-radius-md, 10px) var(--bu-radius-md, 10px) 0 0",
};
