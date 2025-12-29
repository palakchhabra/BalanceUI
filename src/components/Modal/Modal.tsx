import { useEffect, useRef } from "react";
import { ModalProps } from "./Modal.types";
import { overlayStyle, modalStyle } from "./Modal.styles";
import "./Modal.css";

export const Modal = ({
  open,
  onClose,
  children,
  className,
  style,
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

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
        className={`balanceui-modal ${className || ""}`}
        style={{ ...modalStyle, ...style }}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
