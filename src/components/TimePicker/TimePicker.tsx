import { useState, useRef, useEffect } from "react";
import { TimePickerProps } from "./TimePicker.types";
import {
  timePickerStyle,
  timePickerDropdownStyle,
  timeListStyle,
  timeItemStyle,
} from "./TimePicker.styles";
import "./TimePicker.css";

const formatTime = (date: Date | null, format: "12h" | "24h"): string => {
  if (!date) return "";
  const hours = date.getHours();
  const minutes = date.getMinutes();

  if (format === "24h") {
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${String(displayHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")} ${period}`;
};

const generateTimeOptions = (
  step: number,
  format: "12h" | "24h"
): Array<{ hours: number; minutes: number; display: string }> => {
  const options: Array<{ hours: number; minutes: number; display: string }> = [];
  const totalMinutes = 24 * 60;

  for (let minutes = 0; minutes < totalMinutes; minutes += step) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const date = new Date();
    date.setHours(hours, mins, 0, 0);
    options.push({
      hours,
      minutes: mins,
      display: formatTime(date, format),
    });
  }

  return options;
};

export const TimePicker = ({
  variant = "outline",
  value,
  defaultValue,
  onChange,
  placeholder = "Select time",
  disabled = false,
  format = "12h",
  className,
  style,
  label,
  error,
  helperText,
  step = 15,
}: TimePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<Date | null>(
    value || defaultValue || null
  );
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedTime(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleTimeSelect = (hours: number, minutes: number) => {
    if (disabled) return;

    const newTime = new Date();
    newTime.setHours(hours, minutes, 0, 0);
    setSelectedTime(newTime);
    onChange?.(newTime);
    setIsOpen(false);
  };

  const timeOptions = generateTimeOptions(step, format);

  const displayValue = selectedTime ? formatTime(selectedTime, format) : "";

  return (
    <div
      ref={containerRef}
      className={`balanceui-timepicker-container ${className || ""}`}
      style={{ position: "relative" as const, width: "100%" }}
    >
      {label && (
        <label
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "var(--bu-fg, #000)",
          }}
        >
          {label}
        </label>
      )}
      <div
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          ...timePickerStyle(variant),
          ...style,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className={`balanceui-timepicker-input ${error ? "balanceui-timepicker-error" : ""}`}
        aria-disabled={disabled}
      >
        {displayValue || placeholder}
      </div>
      {error && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--bu-error, #d32f2f)",
          }}
        >
          {error}
        </div>
      )}
      {helperText && !error && (
        <div
          style={{
            marginTop: "0.25rem",
            fontSize: "0.75rem",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
          }}
        >
          {helperText}
        </div>
      )}
      {isOpen && (
        <div style={timePickerDropdownStyle} className="balanceui-timepicker-dropdown">
          <div style={timeListStyle}>
            {timeOptions.map((option, index) => {
              const isSelected = Boolean(
                selectedTime &&
                selectedTime.getHours() === option.hours &&
                selectedTime.getMinutes() === option.minutes
              );

              return (
                <div
                  key={index}
                  onClick={() => handleTimeSelect(option.hours, option.minutes)}
                  style={timeItemStyle(isSelected)}
                  className="balanceui-timepicker-item"
                >
                  {option.display}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

