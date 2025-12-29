import type { CSSProperties } from "react";

export const tableWrapperStyle = (height?: number): CSSProperties => ({
  border: "1px solid var(--bu-border)",
  borderRadius: "var(--bu-radius-md)",
  overflow: "hidden",
  height,
});

export const scrollContainerStyle: CSSProperties = {
  overflow: "auto",
  maxWidth: "100%",
};

export const tableStyle: CSSProperties = {
  borderCollapse: "separate",
  borderSpacing: 0,
  width: "100%",
  minWidth: "100%",
};

export const thStyle: CSSProperties = {
  position: "sticky",
  top: 0,
  background: "var(--bu-surface)",
  textAlign: "left",
  padding: "10px 12px",
  borderBottom: "1px solid var(--bu-border)",
  fontWeight: 600,
  zIndex: 2,
  whiteSpace: "nowrap",
};

export const tdStyle: CSSProperties = {
  padding: "10px 12px",
  borderBottom: "1px solid var(--bu-border)",
  whiteSpace: "nowrap",
};

export const stickyCellStyle = (
  left: number
): CSSProperties => ({
  position: "sticky",
  left,
  background: "var(--bu-surface)",
  zIndex: 3,
});

export const emptyStyle: CSSProperties = {
  padding: 20,
  textAlign: "center",
  color: "var(--bu-muted)",
};
