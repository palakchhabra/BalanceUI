import type { CSSProperties } from "react";

export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

export const modalStyle: CSSProperties = {
  background: "var(--bu-surface)",
  borderRadius: "var(--bu-radius-md)",
  padding: 20,
  minWidth: 320,
};
