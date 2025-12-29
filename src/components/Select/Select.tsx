import { forwardRef, useState } from "react";
import { SelectProps } from "./Select.types";
import { selectStyle } from "./Select.styles";
import "./Select.css";

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options,
  value,
  onChange,
  disabled = false,
  placeholder,
  className,
  style,
  error,
  helperText,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  
  // Use provided id or generate unique ID for accessibility
  const id = providedId || `select-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  return (
    <div style={{ width: "100%" }}>
      <select
        {...props}
        ref={ref}
        id={id}
        value={value}
        onChange={(e) => {
          if (!disabled) {
            onChange?.(e.target.value);
          }
        }}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={!!error}
        onFocus={(e) => {
          setFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          props.onBlur?.(e);
        }}
        className={`balanceui-select ${focused ? "balanceui-select-focused" : ""} ${error ? "balanceui-select-error" : ""} ${className || ""}`}
        style={{
          ...selectStyle,
          ...style,
        }}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value} disabled={o.disabled}>
            {o.label}
          </option>
        ))}
      </select>
      {error && (
        <div
          id={errorId}
          role="alert"
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--bu-error, #d32f2f)",
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
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
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
          }}
        >
          {helperText}
        </div>
      )}
    </div>
  );
});

Select.displayName = "Select";
