import { useEffect } from "react";
import { DrawerProps } from "./Drawer.types";
import {
  overlayStyle,
  drawerBaseStyle,
  drawerStyle,
  drawerContentStyle,
} from "./Drawer.styles";
import "./Drawer.css";

export const Drawer = ({
  open,
  onClose,
  placement = "right",
  size = 360,
  variant = "default",
  scrollMode = "content",
  lockScroll = true,
  children,
  className,
  style,
  showHandle = false,
  title,
}: DrawerProps) => {
  /* ESC key close */
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  /* Body scroll lock */
  useEffect(() => {
    if (!open || !lockScroll) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [open, lockScroll]);

  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose} />

      {/* Drawer */}
      <div
        role="dialog"
        aria-modal="true"
        className={`balanceui-drawer balanceui-drawer-${variant} ${className || ""}`}
        style={{
          ...drawerBaseStyle(variant),
          ...drawerStyle(placement, size, open),
          ...style,
        }}
      >
        {showHandle && (
          <div
            style={{
              width: "3rem",
              height: "0.25rem",
              backgroundColor: "var(--bu-border, rgba(0, 0, 0, 0.2))",
              borderRadius: "var(--bu-radius-full, 9999px)",
              margin: "0.75rem auto",
            }}
            className="balanceui-drawer-handle"
          />
        )}
        {title && (
          <div
            style={{
              padding: "1rem 1.5rem",
              borderBottom: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
              fontSize: "1.125rem",
              fontWeight: 600,
            }}
            className="balanceui-drawer-header"
          >
            {title}
          </div>
        )}
        <div style={drawerContentStyle(scrollMode)} className="balanceui-drawer-content">
          {children}
        </div>
      </div>
    </>
  );
};
