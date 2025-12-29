import type { CSSProperties } from "react";

export const sidebarStyle = (
  width: number,
  collapsed?: boolean
): CSSProperties => ({
  width: collapsed ? 64 : width,
  transition: "width var(--bu-medium) var(--bu-ease)",
  background: "var(--bu-surface)",
  borderRight: "1px solid var(--bu-border)",
  height: "100vh",
  overflow: "hidden",
});

export const itemStyle: CSSProperties = {
  padding: "10px 16px",
  cursor: "pointer",
  color: "var(--bu-fg)",
};
