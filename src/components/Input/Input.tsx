import { useState, forwardRef } from "react";
import { InputProps } from "./Input.types";
import { inputStyle } from "./Input.styles";
import "./Input.css";

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  variant = "outline",
  style,
  className,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setFocused(false);
    onBlur?.(e);
  };

  return (
    <input
      {...props}
      ref={ref}
      data-variant={variant}
      className={`balanceui-input ${focused ? "balanceui-input-focused" : ""} ${className || ""}`}
      style={{
        ...inputStyle(variant),
        ...style,
      }}
      onFocus={handleFocus}
      onBlur={handleBlur}
    />
  );
});

Input.displayName = "Input";
