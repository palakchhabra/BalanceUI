import type { CSSProperties } from "react";

export const fieldStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: 6,
};

export const labelRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 4,
};

export const labelStyle = (disabled?: boolean): CSSProperties => ({
  fontSize: 13,
  fontWeight: 500,
  color: disabled
    ? "var(--bu-muted)"
    : "var(--bu-fg)",
});

export const requiredStyle: CSSProperties = {
  color: "var(--bu-danger)",
  fontSize: 12,
};

export const controlWrapperStyle = (
  disabled?: boolean
): CSSProperties => ({
  opacity: disabled
    ? "var(--bu-disabled-opacity)"
    : 1,
});

export const helperStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--bu-muted)",
};

export const errorStyle: CSSProperties = {
  fontSize: 12,
  color: "var(--bu-danger)",
};
