import { useEffect, useRef } from "react";
import { BottomSheetProps } from "./BottomSheet.types";
import {
  overlayStyle,
  bottomSheetStyle,
  handleStyle,
  headerStyle,
  contentStyle,
} from "./BottomSheet.styles";
import "./BottomSheet.css";

export const BottomSheet = ({
  open,
  onClose,
  children,
  title,
  size = "md",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  lockScroll = true,
  className,
  style,
  showHandle = true,
}: BottomSheetProps) => {
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (open && lockScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, lockScroll]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <>
      <div
        className="balanceui-bottomsheet-overlay"
        style={overlayStyle}
        onClick={handleOverlayClick}
      />
      <div
        ref={sheetRef}
        className={`balanceui-bottomsheet ${className || ""}`}
        style={{ ...bottomSheetStyle(size, open), ...style }}
        onClick={(e) => e.stopPropagation()}
      >
        {showHandle && <div style={handleStyle} className="balanceui-bottomsheet-handle" />}
        {title && (
          <div style={headerStyle} className="balanceui-bottomsheet-header">
            <h3
              style={{
                margin: 0,
                fontSize: "1.125rem",
                fontWeight: 600,
                color: "var(--bu-fg, #000)",
              }}
            >
              {title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="balanceui-bottomsheet-close"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        )}
        <div style={contentStyle} className="balanceui-bottomsheet-content">
          {children}
        </div>
      </div>
    </>
  );
};

