import { useEffect, useRef } from "react";
import { ModalProps } from "./Modal.types";
import { overlayStyle, modalStyle } from "./Modal.styles";
import { useFocusTrap } from "../../utils/react";
import "./Modal.css";

export const Modal = ({
  open,
  onClose,
  children,
  className,
  style,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  size = "md",
  ariaLabel,
  ariaLabelledBy,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  // Focus trap
  useFocusTrap(modalRef, open);

  useEffect(() => {
    if (!open || !closeOnEscape) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, closeOnEscape, onClose]);

  // Store previous active element and restore focus on close
  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    } else if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, [open]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose?.();
    }
  };

  return (
    <div
      className="balanceui-modal-overlay"
      style={overlayStyle}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`balanceui-modal balanceui-modal-size-${size} ${className || ""}`}
        style={{ ...modalStyle(size), ...style }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
      >
        {children}
      </div>
    </div>
  );
};
