import { useEffect, useRef, useState } from "react";
import { DrawerProps } from "./Drawer.types";
import {
  overlayStyle,
  drawerBaseStyle,
  drawerStyle,
  drawerContentStyle,
} from "./Drawer.styles";
import { useFocusTrap } from "../../utils/react";
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
  ariaLabel,
  ariaLabelledBy,
}: DrawerProps) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [canDrag, setCanDrag] = useState(true);

  // Focus trap
  useFocusTrap(drawerRef, open);

  // Store previous active element and restore focus on close
  useEffect(() => {
    if (open) {
      previousActiveElementRef.current = document.activeElement as HTMLElement;
    } else if (previousActiveElementRef.current) {
      previousActiveElementRef.current.focus();
      previousActiveElementRef.current = null;
    }
  }, [open]);

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

  // Reset drag state when drawer closes
  useEffect(() => {
    if (!open) {
      setIsDragging(false);
      setDragOffset({ x: 0, y: 0 });
      setDragStart({ x: 0, y: 0 });
    }
  }, [open]);

  // Check if content is scrollable and at the edge
  const checkCanDrag = () => {
    if (contentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = contentRef.current;
      const isAtTop = scrollTop === 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      setCanDrag(isAtTop || isAtBottom);
      return isAtTop || isAtBottom;
    }
    return true;
  };

  // Get drag direction based on placement
  const getDragDirection = () => {
    if (placement === "left" || placement === "right") return "x";
    return "y";
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!checkCanDrag()) return;
    
    setIsDragging(true);
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const direction = getDragDirection();
    const currentPos = direction === "x" ? touch.clientX : touch.clientY;
    const startPos = direction === "x" ? dragStart.x : dragStart.y;
    const offset = currentPos - startPos;

    // Determine drag direction based on placement
    let shouldDrag = false;
    if (placement === "left" && offset < 0) shouldDrag = true;
    if (placement === "right" && offset > 0) shouldDrag = true;
    if (placement === "top" && offset < 0) shouldDrag = true;
    if (placement === "bottom" && offset > 0) shouldDrag = true;

    if (shouldDrag) {
      e.preventDefault();
      if (direction === "x") {
        setDragOffset({ x: offset, y: 0 });
      } else {
        setDragOffset({ x: 0, y: offset });
      }
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const direction = getDragDirection();
    const threshold = 100;
    const offset = direction === "x" ? dragOffset.x : dragOffset.y;

    // Close if dragged beyond threshold
    if (Math.abs(offset) > threshold) {
      onClose();
    } else {
      // Snap back
      setDragOffset({ x: 0, y: 0 });
    }
    setDragStart({ x: 0, y: 0 });
  };

  // Mouse handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!checkCanDrag()) return;
    
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
    setDragOffset({ x: 0, y: 0 });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      const direction = getDragDirection();
      const currentPos = direction === "x" ? e.clientX : e.clientY;
      const startPos = direction === "x" ? dragStart.x : dragStart.y;
      const offset = currentPos - startPos;

      // Determine drag direction based on placement
      let shouldDrag = false;
      if (placement === "left" && offset < 0) shouldDrag = true;
      if (placement === "right" && offset > 0) shouldDrag = true;
      if (placement === "top" && offset < 0) shouldDrag = true;
      if (placement === "bottom" && offset > 0) shouldDrag = true;

      if (shouldDrag) {
        e.preventDefault();
        if (direction === "x") {
          setDragOffset({ x: offset, y: 0 });
        } else {
          setDragOffset({ x: 0, y: offset });
        }
      }
    };

    const handleGlobalMouseUp = () => {
      if (!isDragging) return;
      setIsDragging(false);

      const direction = getDragDirection();
      const threshold = 100;
      const offset = direction === "x" ? dragOffset.x : dragOffset.y;

      // Close if dragged beyond threshold
      if (Math.abs(offset) > threshold) {
        onClose();
      } else {
        // Snap back
        setDragOffset({ x: 0, y: 0 });
      }
      setDragStart({ x: 0, y: 0 });
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, [isDragging, dragStart, dragOffset, placement, onClose]);

  if (!open) return null;

  const transformStyle = isDragging
    ? {
        transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
        transition: "none",
      }
    : {};

  return (
    <>
      {/* Overlay */}
      <div style={overlayStyle} onClick={onClose} />

      {/* Drawer */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy || (title ? undefined : undefined)}
        className={`balanceui-drawer balanceui-drawer-${variant} ${isDragging ? "balanceui-drawer-dragging" : ""} ${className || ""}`}
        style={{
          ...drawerBaseStyle(variant),
          ...drawerStyle(placement, size, open),
          ...transformStyle,
          ...style,
        }}
      >
        {showHandle && (
          <div
            ref={handleRef}
            style={{
              width: "3rem",
              height: "0.25rem",
              backgroundColor: "var(--bu-border, rgba(0, 0, 0, 0.2))",
              borderRadius: "var(--bu-radius-full, 9999px)",
              margin: "0.75rem auto",
            }}
            className="balanceui-drawer-handle"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
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
        <div
          ref={contentRef}
          style={drawerContentStyle(scrollMode)}
          className="balanceui-drawer-content"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
        >
          {children}
        </div>
      </div>
    </>
  );
};
