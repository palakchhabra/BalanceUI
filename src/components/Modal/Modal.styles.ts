import type { CSSProperties } from "react";
import type { ModalSize } from "./Modal.types";

export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1000,
};

const sizeMap: Record<ModalSize, { width: string; maxWidth: string }> = {
  sm: {
    width: "90%",
    maxWidth: "400px",
  },
  md: {
    width: "90%",
    maxWidth: "600px",
  },
  lg: {
    width: "90%",
    maxWidth: "900px",
  },
  xl: {
    width: "90%",
    maxWidth: "1200px",
  },
  full: {
    width: "95%",
    maxWidth: "95vw",
  },
};

export const modalStyle = (size: ModalSize = "md"): CSSProperties => {
  const sizeStyles = sizeMap[size];
  
  return {
    background: "var(--bu-surface, #ffffff)",
    borderRadius: "var(--bu-radius-lg, 12px)",
    boxShadow: "var(--bu-elevation-24)",
    width: sizeStyles.width,
    maxWidth: sizeStyles.maxWidth,
    maxHeight: "90vh",
    overflow: "auto",
    animation: "bu-scale-in var(--bu-transition-base)",
    position: "relative",
    transition: "var(--bu-transition-elevation)",
    zIndex: "calc(var(--bu-z-modal, 1050) + 1)",
  };
};
