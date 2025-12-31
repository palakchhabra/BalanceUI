import { useState, useEffect, useId } from "react";
import { CheckboxProps } from "./Checkbox.types";
import { checkboxStyle, checkboxIconStyle } from "./Checkbox.styles";
import "./Checkbox.css";

const CheckIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const iconSize = size === "sm" ? "0.625rem" : size === "md" ? "0.75rem" : "0.875rem";
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="balanceui-checkbox-check-icon"
    >
      <path
        d="M13.3333 4L6 11.3333L2.66667 8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const IndeterminateIcon = ({ size }: { size: "sm" | "md" | "lg" }) => {
  const iconSize = size === "sm" ? "0.625rem" : size === "md" ? "0.75rem" : "0.875rem";
  return (
    <svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="balanceui-checkbox-indeterminate-icon"
    >
      <path
        d="M2 8H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export const Checkbox = ({
  variant = "outline",
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  indeterminate = false,
  size = "md",
  className,
  style,
  error,
  helperText,
}: CheckboxProps) => {
  const [internalChecked, setInternalChecked] = useState(defaultChecked);
  const isControlled = controlledChecked !== undefined;
  const checked = isControlled ? controlledChecked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const newChecked = !checked;
    if (!isControlled) {
      setInternalChecked(newChecked);
    }
    onChange?.(newChecked);
  };

  // Generate unique IDs for accessibility
  const generatedId = useId();
  const id = `checkbox-${generatedId}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  return (
    <div
      className={`balanceui-checkbox-container ${className || ""}`}
      style={{ display: label ? "inline-flex" : "inline-block", flexDirection: "column", gap: "0.25rem", width: label ? "100%" : "auto" }}
    >
      <div style={{ display: "inline-flex", alignItems: label ? "flex-start" : "center", gap: "0.5rem", width: label ? "100%" : "auto" }}>
        <div
          role="checkbox"
          id={id}
          aria-checked={indeterminate ? "mixed" : checked}
          aria-disabled={disabled}
          aria-describedby={describedBy}
          aria-invalid={!!error}
          aria-label={label ? undefined : props["aria-label"]}
          onClick={handleChange}
          style={checkboxStyle(variant, size, checked, disabled, indeterminate)}
          className={`balanceui-checkbox ${checked ? "balanceui-checkbox-checked" : ""} ${indeterminate ? "balanceui-checkbox-indeterminate" : ""} ${disabled ? "balanceui-checkbox-disabled" : ""} ${error ? "balanceui-checkbox-error" : ""}`}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={(e) => {
            if (disabled) return;
            // Space or Enter to toggle
            if (e.key === " " || e.key === "Enter") {
              e.preventDefault();
              e.stopPropagation();
              handleChange();
            }
            // Escape to blur (optional, for better UX)
            if (e.key === "Escape") {
              e.currentTarget.blur();
            }
          }}
        >
        {checked && !indeterminate && (
          <div style={checkboxIconStyle(size)}>
            <CheckIcon size={size} />
          </div>
        )}
        {indeterminate && (
          <div style={checkboxIconStyle(size)}>
            <IndeterminateIcon size={size} />
          </div>
        )}
      </div>
        {label && (
          <label
            htmlFor={id}
            onClick={handleChange}
            style={{
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: "0.875rem",
              color: error
                ? "var(--bu-error, #d32f2f)"
                : "var(--bu-fg, #000)",
              userSelect: "none",
              flex: 1,
            }}
            className="balanceui-checkbox-label"
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <div
          id={errorId}
          role="alert"
          style={{
            fontSize: "0.75rem",
            color: "var(--bu-error, #d32f2f)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            marginLeft: "1.75rem", // Align with checkbox + label
          }}
        >
          <span>⚠</span>
          <span>{error}</span>
        </div>
      )}
      {helperText && !error && (
        <div
          id={helperId}
          style={{
            fontSize: "0.75rem",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            marginLeft: "1.75rem", // Align with checkbox + label
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
};

