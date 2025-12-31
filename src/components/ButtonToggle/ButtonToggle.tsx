import { useState, useEffect } from "react";
import { ButtonToggleProps } from "./ButtonToggle.types";
import {
  buttonToggleGroupStyle,
  buttonToggleItemStyle,
} from "./ButtonToggle.styles";
import "./ButtonToggle.css";

export const ButtonToggle = ({
  variant = "outline",
  options,
  value: controlledValue,
  defaultValue,
  onChange,
  multiple = false,
  disabled = false,
  size = "md",
  className,
  style,
  fullWidth = false,
}: ButtonToggleProps) => {
  const [internalValue, setInternalValue] = useState<string | string[]>(
    defaultValue || (multiple ? [] : "")
  );
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleToggle = (optionValue: string) => {
    if (disabled) return;

    if (multiple) {
      const currentValues = Array.isArray(value) ? value : [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((v) => v !== optionValue)
        : [...currentValues, optionValue];

      if (!isControlled) {
        setInternalValue(newValues);
      }
      onChange?.(newValues);
    } else {
      const newValue = value === optionValue ? "" : optionValue;
      if (!isControlled) {
        setInternalValue(newValue);
      }
      onChange?.(newValue);
    }
  };

  const isSelected = (optionValue: string) => {
    if (multiple) {
      return Array.isArray(value) && value.includes(optionValue);
    }
    return value === optionValue;
  };

  return (
    <div
      className={`balanceui-buttontoggle-group ${className || ""}`}
      style={{ ...buttonToggleGroupStyle(fullWidth), ...style }}
      data-variant={variant}
      role="group"
    >
      {options.map((option, index) => {
        const selected = isSelected(option.value);
        const isFirst = index === 0;
        const isLast = index === options.length - 1;

        return (
          <button
            key={option.value}
            type="button"
            onClick={() => handleToggle(option.value)}
            disabled={disabled || option.disabled}
            style={buttonToggleItemStyle(
              variant,
              size,
              selected,
              disabled || option.disabled || false,
              isFirst,
              isLast
            )}
            className={`balanceui-buttontoggle-item ${selected ? "balanceui-buttontoggle-selected" : ""} ${isFirst ? "balanceui-buttontoggle-first" : ""} ${isLast ? "balanceui-buttontoggle-last" : ""}`}
            aria-pressed={selected}
          >
            {option.icon && (
              <span className="balanceui-buttontoggle-icon">{option.icon}</span>
            )}
            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {option.label}
            </span>
          </button>
        );
      })}
    </div>
  );
};

