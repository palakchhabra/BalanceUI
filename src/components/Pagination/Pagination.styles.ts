import type { CSSProperties } from "react";

export const containerStyle: CSSProperties = {
  display: "flex",
  gap: 4,
  alignItems: "center",
};

export const buttonStyle = (
  active?: boolean
): CSSProperties => ({
  minWidth: 32,
  width: 32,
  height: 32,
  borderRadius: "50%",
  border: "1px solid var(--bu-border)",
  background: active
    ? "var(--bu-primary)"
    : "var(--bu-surface)",
  color: active
    ? "var(--bu-on-primary)"
    : "var(--bu-fg)",
  cursor: "pointer",
  fontSize: 13,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 0,
});

export const dotsStyle: CSSProperties = {
  padding: "0 6px",
  color: "var(--bu-muted)",
};
