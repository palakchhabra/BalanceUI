import type { CSSProperties } from "react";
import type { ToastVariant } from "./Toast.types";

export const viewportStyle: CSSProperties = {
  position: "fixed",
  bottom: 20,
  right: 20,
  display: "flex",
  flexDirection: "column",
  gap: 8,
  zIndex: 2000,
};

export const toastStyle = (
  variant: ToastVariant
): CSSProperties => ({
  padding: "10px 14px",
  borderRadius: "var(--bu-radius-md)",
  background:
    variant === "success"
      ? "var(--bu-success)"
      : variant === "error"
      ? "var(--bu-danger)"
      : variant === "warning"
      ? "var(--bu-warning)"
      : "var(--bu-primary)",
  color: "white",
  minWidth: 220,
  fontSize: 14,
  boxShadow: "0 4px 12px rgba(0,0,0,.15)",
});
