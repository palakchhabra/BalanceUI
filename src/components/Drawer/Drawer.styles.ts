import type { CSSProperties } from "react";
import type { DrawerPlacement, DrawerScrollMode, DrawerVariant } from "./Drawer.types";

export const overlayStyle: CSSProperties = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,0.4)",
  zIndex: 1000,
  animation: "balanceui-fade-in 0.2s ease-out",
};

export const drawerBaseStyle = (variant: DrawerVariant): CSSProperties => ({
  position: "fixed",
  background:
    variant === "filled"
      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
      : "var(--bu-surface)",
  color: "var(--bu-fg)",
  zIndex: 1001,
  display: "flex",
  flexDirection: "column",
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  boxShadow:
    variant === "elevated"
      ? "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14)"
      : variant === "outlined"
      ? "none"
      : "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14)",
  border:
    variant === "outlined"
      ? "1px solid var(--bu-border, rgba(0, 0, 0, 0.23))"
      : "none",
});

export const drawerStyle = (
  placement: DrawerPlacement,
  size: number | string,
  open: boolean
): CSSProperties => {
  const s = typeof size === "number" ? `${size}px` : size;

  switch (placement) {
    case "left":
      return {
        top: 0,
        left: 0,
        width: s,
        height: "100%",
        transform: open ? "translateX(0)" : "translateX(-100%)",
      };

    case "right":
      return {
        top: 0,
        right: 0,
        width: s,
        height: "100%",
        transform: open ? "translateX(0)" : "translateX(100%)",
      };

    case "top":
      return {
        top: 0,
        left: 0,
        width: "100%",
        height: s,
        transform: open ? "translateY(0)" : "translateY(-100%)",
      };

    case "bottom":
      return {
        bottom: 0,
        left: 0,
        width: "100%",
        height: s,
        transform: open ? "translateY(0)" : "translateY(100%)",
      };
  }
};

export const drawerContentStyle = (
  scrollMode: DrawerScrollMode
): CSSProperties => ({
  flex: 1,
  overflowY: scrollMode === "content" ? "auto" : "visible",
});
