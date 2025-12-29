import { useState, useRef, useEffect, forwardRef } from "react";
import { InputProps } from "./Input.types";
import { inputStyle, inputWrapperStyle, labelStyle, adornmentStyle } from "./Input.styles";
import "./Input.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "outline",
  style,
  className,
  onFocus,
  onBlur,
  onChange,
  label,
  floatingLabel = false,
  error,
  helperText,
  fullWidth = true,
  startAdornment,
  endAdornment,
  value,
  defaultValue,
  type = "text",
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(value || defaultValue || "");
  const internalRef = useRef<HTMLInputElement>(null);
  const inputRef = (ref || internalRef) as React.RefObject<HTMLInputElement>;
  
  // Determine if label should float
  const hasValue = value !== undefined ? value !== "" : internalValue !== "";
  const shouldFloatLabel = floatingLabel && (focused || hasValue);
  const hasError = !!error;
  const errorMessage = typeof error === "string" ? error : undefined;

  // Email validation - auto-disappears on valid
  const [emailError, setEmailError] = useState<string | null>(null);
  
  useEffect(() => {
    if (type === "email") {
      const currentValue = value !== undefined ? value : internalValue;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      if (typeof currentValue === "string" && currentValue.length > 0) {
        // Validate on blur or when typing (real-time validation)
        if (emailRegex.test(currentValue)) {
          // Valid email - clear error immediately
          setEmailError(null);
        } else {
          // Invalid email - show error only after user has interacted (not while typing)
          if (!focused || currentValue.length > 5) {
            setEmailError("Please enter a valid email address");
          } else {
            // While typing, don't show error yet
            setEmailError(null);
          }
        }
      } else {
        // Empty - no error
        setEmailError(null);
      }
    } else {
      setEmailError(null);
    }
  }, [internalValue, value, type, focused]);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const inputId = props.id || `balanceui-input-${Math.random().toString(36).substr(2, 9)}`;
  const helperId = `${inputId}-helper`;
  const errorId = `${inputId}-error`;
  const describedBy = errorId || helperId || undefined;

  const displayError = errorMessage || emailError;

  return (
    <div
      className={`balanceui-input-wrapper ${fullWidth ? "balanceui-input-fullwidth" : ""}`}
      style={inputWrapperStyle(fullWidth)}
    >
      {floatingLabel && label && (
        <label
          htmlFor={inputId}
          className={`balanceui-input-label ${shouldFloatLabel ? "balanceui-input-label-floating" : ""} ${hasError || emailError ? "balanceui-input-label-error" : ""}`}
          style={labelStyle(shouldFloatLabel, hasError || !!emailError)}
        >
          {label}
        </label>
      )}
      
      <div
        className={`balanceui-input-container ${focused ? "balanceui-input-container-focused" : ""} ${hasError || emailError ? "balanceui-input-container-error" : ""}`}
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
        }}
      >
        {startAdornment && (
          <div className="balanceui-input-adornment balanceui-input-adornment-start" style={adornmentStyle}>
            {startAdornment}
          </div>
        )}
        
        <input
          {...props}
          ref={inputRef}
          id={inputId}
          type={type}
          value={value !== undefined ? value : internalValue}
          data-variant={variant}
          data-floating-label={floatingLabel}
          className={`balanceui-input ${focused ? "balanceui-input-focused" : ""} ${hasError || emailError ? "balanceui-input-error" : ""} ${floatingLabel ? "balanceui-input-with-label" : ""} ${className || ""}`}
          style={{
            ...inputStyle(variant, floatingLabel, !!startAdornment, !!endAdornment),
            ...style,
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          aria-invalid={props["aria-invalid"] !== undefined ? props["aria-invalid"] : (hasError || !!emailError)}
          aria-describedby={props["aria-describedby"] || describedBy}
        />
        
        {endAdornment && (
          <div className="balanceui-input-adornment balanceui-input-adornment-end" style={adornmentStyle}>
            {endAdornment}
          </div>
        )}
      </div>

      {(displayError || helperText) && (
        <div
          id={displayError ? errorId : helperId}
          className={`balanceui-input-helper ${displayError ? "balanceui-input-helper-error" : ""}`}
          role={displayError ? "alert" : undefined}
        >
          {displayError || helperText}
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";
