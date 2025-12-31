import { useEffect, useRef, useState } from "react";
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
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartY, setDragStartY] = useState(0);
  const [dragCurrentY, setDragCurrentY] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [canDrag, setCanDrag] = useState(true);

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

  // Reset drag state when sheet closes
  useEffect(() => {
    if (!open) {
      setIsDragging(false);
      setDragOffset(0);
      setDragCurrentY(0);
      setDragStartY(0);
    }
  }, [open]);

  if (!open) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (closeOnOverlayClick && e.target === e.currentTarget && !isDragging) {
      onClose();
    }
  };

  // Check if content is scrolled to top
  const checkCanDrag = () => {
    if (contentRef.current) {
      const isAtTop = contentRef.current.scrollTop === 0;
      setCanDrag(isAtTop);
      return isAtTop;
    }
    return true;
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow dragging from anywhere, but check if content is scrollable
    const target = e.currentTarget;
    const isContentArea = target.classList.contains('balanceui-bottomsheet-content');
    
    if (isContentArea && contentRef.current && contentRef.current.scrollTop > 0) {
      // If content is scrollable and not at top, don't start drag
      return;
    }
    
    setIsDragging(true);
    setDragStartY(e.touches[0].clientY);
    setDragCurrentY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    e.preventDefault(); // Prevent scrolling while dragging
    const currentY = e.touches[0].clientY;
    setDragCurrentY(currentY);
    const offset = currentY - dragStartY;
    // Only allow dragging down
    if (offset > 0) {
      setDragOffset(offset);
    }
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    
    // If dragged more than 100px down, close the sheet
    if (dragOffset > 100) {
      onClose();
    } else {
      // Snap back
      setDragOffset(0);
    }
    setDragStartY(0);
    setDragCurrentY(0);
  };

  // Mouse handlers for desktop
  const handleMouseDown = (e: React.MouseEvent) => {
    // Allow dragging from anywhere on the sheet
    const target = e.currentTarget;
    const isContentArea = target.classList.contains('balanceui-bottomsheet-content');
    
    // If clicking in content area and it's scrollable, check if at top
    if (isContentArea && contentRef.current && contentRef.current.scrollTop > 0) {
      // Don't start drag if content is scrollable and not at top
      return;
    }
    
    setIsDragging(true);
    setDragStartY(e.clientY);
    setDragCurrentY(e.clientY);
  };

  // Global mouse move and up handlers
  useEffect(() => {
    if (!isDragging) return;

    const handleGlobalMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      const currentY = e.clientY;
      setDragCurrentY(currentY);
      const offset = currentY - dragStartY;
      if (offset > 0) {
        setDragOffset(offset);
      }
    };

    const handleGlobalMouseUp = () => {
      setIsDragging(false);
      if (dragOffset > 100) {
        onClose();
      } else {
        setDragOffset(0);
      }
      setDragStartY(0);
      setDragCurrentY(0);
    };

    const handleGlobalTouchMove = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    document.addEventListener("mouseup", handleGlobalMouseUp);
    document.addEventListener("touchmove", handleGlobalTouchMove, { passive: false });

    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      document.removeEventListener("mouseup", handleGlobalMouseUp);
      document.removeEventListener("touchmove", handleGlobalTouchMove);
    };
  }, [isDragging, dragStartY, dragOffset, onClose]);

  const baseStyle = bottomSheetStyle(size, open);
  const sheetStyle = {
    ...baseStyle,
    ...style,
    transform: dragOffset > 0 
      ? `translateY(calc(${dragOffset}px))` 
      : baseStyle.transform,
    transition: isDragging ? 'none' : baseStyle.transition,
    height: baseStyle.height, // Ensure height is preserved
    maxHeight: baseStyle.maxHeight, // Ensure maxHeight is preserved
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
        className={`balanceui-bottomsheet balanceui-bottomsheet-size-${size} ${isDragging ? 'balanceui-bottomsheet-dragging' : ''} ${className || ""}`}
        style={sheetStyle}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={(e) => {
          // Allow dragging from anywhere on the sheet
          handleMouseDown(e);
        }}
      >
        {showHandle && (
          <div 
            style={handleStyle} 
            className="balanceui-bottomsheet-handle"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e);
            }}
          />
        )}
        {title && (
          <div 
            style={headerStyle} 
            className="balanceui-bottomsheet-header"
            onMouseDown={(e) => {
              e.stopPropagation();
              handleMouseDown(e);
            }}
          >
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
        <div 
          ref={contentRef}
          style={contentStyle} 
          className="balanceui-bottomsheet-content"
          onScroll={checkCanDrag}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {children}
        </div>
      </div>
    </>
  );
};

