import { useState, useEffect } from "react";
import { viewportStyle, toastStyle, toastIconStyle, toastMessageStyle } from "./Toast.styles";
import { Toast } from "./Toast.types";
import "./Toast.css";

const variantColors: Record<string, { icon: string }> = {
  success: { icon: "✓" },
  error: { icon: "✕" },
  warning: { icon: "⚠" },
  info: { icon: "ℹ" },
};

export const ToastViewport = ({
  toasts,
}: {
  toasts: Toast[];
}) => {
  const [exitingToasts, setExitingToasts] = useState<Set<string>>(new Set());
  const [enteringToasts, setEnteringToasts] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Mark new toasts as entering
    const newToastIds = new Set(toasts.map(t => t.id));
    setEnteringToasts(newToastIds);
    
    // Remove entering animation after it completes
    const timer = setTimeout(() => {
      setEnteringToasts(new Set());
    }, 300);

    return () => clearTimeout(timer);
  }, [toasts]);

  const handleRemove = (id: string) => {
    setExitingToasts(prev => new Set(prev).add(id));
    setTimeout(() => {
      setExitingToasts(prev => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
    }, 200);
  };

  const visibleToasts = toasts.filter(t => !exitingToasts.has(t.id));

  return (
    <div style={viewportStyle} className="balanceui-toast-viewport">
      {visibleToasts.map((t) => {
        const variant = t.variant ?? "info";
        const colors = variantColors[variant] || variantColors.info;
        const isEntering = enteringToasts.has(t.id);
        const isExiting = exitingToasts.has(t.id);
        
        return (
          <div
            key={t.id}
            className={`balanceui-toast balanceui-toast-${variant} ${isEntering ? "balanceui-toast-entering" : ""} ${isExiting ? "balanceui-toast-exiting" : ""}`}
            style={toastStyle(variant, !isExiting && isEntering)}
            onClick={() => handleRemove(t.id)}
            onKeyDown={(e) => {
              if (e.key === "Escape" || e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleRemove(t.id);
              }
            }}
            role="alert"
            aria-live={variant === "error" ? "assertive" : "polite"}
            aria-atomic="true"
            tabIndex={0}
            aria-label={`${variant} notification: ${t.message}`}
          >
            <span style={toastIconStyle} className="balanceui-toast-icon">
              {colors.icon}
            </span>
            <span style={toastMessageStyle} className="balanceui-toast-message">
              {t.message}
            </span>
          </div>
        );
      })}
    </div>
  );
};
