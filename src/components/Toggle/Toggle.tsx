import { useState, useRef, useEffect } from "react";
import { ToggleProps } from "./Toggle.types";
import "./Toggle.css";

export const Toggle = ({
  checked,
  onChange,
  disabled = false,
  style,
  className,
}: ToggleProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const toggleRef = useRef<HTMLDivElement>(null);

  // Handle ripple effect on click
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    e.preventDefault();
    e.stopPropagation();
    
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 200);
    
    // Call onChange with the new value (opposite of current)
    const newValue = !checked;
    onChange(newValue);
  };

  // Handle keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;

    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      e.stopPropagation();
      setIsPressed(true);
      setTimeout(() => setIsPressed(false), 200);
      
      // Call onChange with the new value (opposite of current)
      const newValue = !checked;
      onChange(newValue);
    }
  };

  // Material Design ripple effect
  useEffect(() => {
    if (!isPressed || !toggleRef.current) return;

    const ripple = document.createElement("div");
    ripple.className = "balanceui-toggle-ripple";
    toggleRef.current.appendChild(ripple);

    const rect = toggleRef.current.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${rect.width / 2 - size / 2}px`;
    ripple.style.top = `${rect.height / 2 - size / 2}px`;

    setTimeout(() => {
      ripple.classList.add("balanceui-toggle-ripple-active");
    }, 10);

    setTimeout(() => {
      ripple.remove();
    }, 300);

    return () => {
      if (ripple.parentNode) {
        ripple.remove();
      }
    };
  }, [isPressed]);

  const trackColor = checked
    ? "var(--bu-primary, #1976d2)"
    : "var(--bu-surface-variant, rgba(0, 0, 0, 0.38))";

  const knobColor = checked
    ? "var(--bu-on-primary, #ffffff)"
    : "var(--bu-surface, #ffffff)";

  return (
    <div
      ref={toggleRef}
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      className={`balanceui-toggle ${checked ? "balanceui-toggle-checked" : ""} ${
        disabled ? "balanceui-toggle-disabled" : ""
      } ${isFocused ? "balanceui-toggle-focused" : ""} ${className || ""}`}
      style={{
        position: "relative",
        width: 48,
        height: 28,
        cursor: disabled ? "not-allowed" : "pointer",
        outline: "none",
        opacity: disabled ? 0.38 : 1,
        ...style,
      }}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => !disabled && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => !disabled && setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* Track */}
      <div
        className="balanceui-toggle-track"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 14,
          backgroundColor: trackColor,
          transition: "background-color 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          opacity: disabled && !checked ? 0.12 : 1,
        }}
      />

      {/* Knob */}
      <div
        className="balanceui-toggle-knob"
        style={{
          position: "absolute",
          top: 2,
          left: checked ? 22 : 2,
          width: 24,
          height: 24,
          borderRadius: "50%",
          backgroundColor: knobColor,
          boxShadow: isHovered && !disabled
            ? checked
              ? "0 2px 8px rgba(25, 118, 210, 0.4), 0 0 0 8px rgba(25, 118, 210, 0.1)"
              : "0 2px 8px rgba(0, 0, 0, 0.15), 0 0 0 8px rgba(0, 0, 0, 0.05)"
            : checked
            ? "0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)"
            : "0 2px 4px rgba(0, 0, 0, 0.15), 0 1px 2px rgba(0, 0, 0, 0.1)",
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isPressed && !disabled ? "scale(0.9)" : isHovered && !disabled ? "scale(1.05)" : "scale(1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Icon indicator (optional, can be customized) */}
        {checked && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              color: "var(--bu-primary, #1976d2)",
              opacity: 0.9,
              transition: "opacity 200ms ease",
            }}
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );
};
