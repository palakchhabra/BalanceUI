import type { CSSProperties } from "react";
import type { ToastVariant } from "./Toast.types";

export const viewportStyle: CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 20,
  display: "flex",
  flexDirection: "column",
  gap: 12,
  zIndex: 2000,
  maxWidth: "calc(100vw - 40px)",
  pointerEvents: "none",
};

// Material Design color palette for toasts
const variantColors: Record<ToastVariant, { bg: string; text: string; icon?: string }> = {
  success: {
    bg: "#4caf50", // Material Green 500
    text: "#ffffff",
    icon: "✓",
  },
  error: {
    bg: "#f44336", // Material Red 500
    text: "#ffffff",
    icon: "✕",
  },
  warning: {
    bg: "#ff9800", // Material Amber 500
    text: "#ffffff",
    icon: "⚠",
  },
  info: {
    bg: "#2196f3", // Material Blue 500
    text: "#ffffff",
    icon: "ℹ",
  },
};

export const toastStyle = (
  variant: ToastVariant = "info",
  isEntering: boolean = true
): CSSProperties => {
  const colors = variantColors[variant];
  
  return {
    padding: "14px 16px",
    borderRadius: "var(--bu-radius-md, 4px)",
    background: colors.bg,
    color: colors.text,
    minWidth: 280,
    maxWidth: 400,
    fontSize: "14px",
    fontWeight: 500,
    boxShadow: 
      "0px 3px 5px -1px rgba(0, 0, 0, 0.2), " +
      "0px 6px 10px 0px rgba(0, 0, 0, 0.14), " +
      "0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    pointerEvents: "auto",
    cursor: "pointer",
    transition: "all 300ms cubic-bezier(0.4, 0, 0.2, 1)",
    transform: isEntering ? "scale(1) translateY(0)" : "scale(0.9) translateY(-10px)",
    opacity: isEntering ? 1 : 0,
    animation: isEntering 
      ? "balanceui-toast-enter 300ms cubic-bezier(0.4, 0, 0.2, 1)"
      : "balanceui-toast-exit 200ms cubic-bezier(0.4, 0, 0.2, 1)",
  };
};

export const toastIconStyle: CSSProperties = {
  fontSize: "20px",
  lineHeight: 1,
  flexShrink: 0,
};

export const toastMessageStyle: CSSProperties = {
  flex: 1,
  lineHeight: 1.5,
};
