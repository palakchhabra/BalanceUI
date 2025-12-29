import { useState, useRef, useEffect } from "react";
import { DatePickerProps } from "./DatePicker.types";
import {
  datePickerStyle,
  calendarStyle,
  calendarHeaderStyle,
  calendarGridStyle,
  dayCellStyle,
  rangeCellStyle,
} from "./DatePicker.styles";
import "./DatePicker.css";

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const formatDate = (date: Date | null, format?: string): string => {
  if (!date) return "";
  if (format) {
    // Simple format support
    return format
      .replace("YYYY", date.getFullYear().toString())
      .replace("MM", String(date.getMonth() + 1).padStart(2, "0"))
      .replace("DD", String(date.getDate()).padStart(2, "0"));
  }
  return date.toLocaleDateString();
};

const getDaysInMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
};

const getFirstDayOfMonth = (date: Date) => {
  return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
};

const isSameDay = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) return false;
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isDateInRange = (date: Date, start: Date | null, end: Date | null) => {
  if (!start || !end) return false;
  const time = date.getTime();
  return time >= start.getTime() && time <= end.getTime();
};

export const DatePicker = ({
  variant = "outline",
  value,
  defaultValue,
  onChange,
  onRangeChange,
  placeholder = "Select date",
  disabled = false,
  minDate,
  maxDate,
  mode = "single",
  showTime = false,
  format,
  className,
  style,
  label,
  error,
  helperText,
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(
    value || defaultValue || new Date()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value || defaultValue || null
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Generate unique IDs for accessibility
  const id = `datepicker-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId].filter(Boolean).join(" ") || undefined;

  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      if (value) setCurrentMonth(value);
    }
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setFocusedDateIndex(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        setFocusedDateIndex(null);
        inputRef.current?.focus();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      // Focus first available date when calendar opens
      setTimeout(() => {
        const daysInMonth = getDaysInMonth(currentMonth);
        const firstDay = getFirstDayOfMonth(currentMonth);
        let firstAvailableIndex = firstDay;
        for (let i = firstDay; i < firstDay + daysInMonth; i++) {
          const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i - firstDay + 1);
          if (!(minDate && date < minDate) && !(maxDate && date > maxDate)) {
            firstAvailableIndex = i;
            break;
          }
        }
        setFocusedDateIndex(firstAvailableIndex);
      }, 0);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, currentMonth, minDate, maxDate]);

  const handleDateSelect = (date: Date) => {
    if (disabled) return;

    if (minDate && date < minDate) return;
    if (maxDate && date > maxDate) return;

    if (mode === "range") {
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
        onRangeChange?.(date, null);
      } else {
        const start = date < rangeStart ? date : rangeStart;
        const end = date > rangeStart ? date : rangeStart;
        setRangeStart(start);
        setRangeEnd(end);
        onRangeChange?.(start, end);
      }
    } else {
      setSelectedDate(date);
      onChange?.(date);
      setIsOpen(false);
    }
  };

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  const handleCalendarKeyDown = (e: React.KeyboardEvent, date: Date | null, index: number) => {
    if (!date) return;
    
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const totalCells = firstDay + daysInMonth;
    
    let newIndex = index;
    
    switch (e.key) {
      case "ArrowRight":
        e.preventDefault();
        newIndex = Math.min(index + 1, totalCells - 1);
        while (newIndex < totalCells && !getDateAtIndex(newIndex)) {
          newIndex++;
        }
        if (newIndex < totalCells) setFocusedDateIndex(newIndex);
        break;
      case "ArrowLeft":
        e.preventDefault();
        newIndex = Math.max(index - 1, 0);
        while (newIndex >= 0 && !getDateAtIndex(newIndex)) {
          newIndex--;
        }
        if (newIndex >= 0) setFocusedDateIndex(newIndex);
        break;
      case "ArrowDown":
        e.preventDefault();
        newIndex = Math.min(index + 7, totalCells - 1);
        while (newIndex < totalCells && !getDateAtIndex(newIndex)) {
          newIndex++;
        }
        if (newIndex < totalCells) setFocusedDateIndex(newIndex);
        break;
      case "ArrowUp":
        e.preventDefault();
        newIndex = Math.max(index - 7, 0);
        while (newIndex >= 0 && !getDateAtIndex(newIndex)) {
          newIndex--;
        }
        if (newIndex >= 0) setFocusedDateIndex(newIndex);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        handleDateSelect(date);
        break;
      case "Home":
        e.preventDefault();
        setFocusedDateIndex(firstDay);
        break;
      case "End":
        e.preventDefault();
        setFocusedDateIndex(totalCells - 1);
        break;
    }
  };
  
  const getDateAtIndex = (index: number): Date | null => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    if (index < firstDay || index >= firstDay + daysInMonth) return null;
    const day = index - firstDay + 1;
    return new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
  };

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const days: (Date | null)[] = [];

    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(
        new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return (
      <div 
        ref={calendarRef}
        style={calendarStyle} 
        className="balanceui-datepicker-calendar"
        role="dialog"
        aria-label="Calendar"
        aria-modal="true"
      >
        <div style={calendarHeaderStyle}>
          <button
            type="button"
            onClick={handlePrevMonth}
            className="balanceui-datepicker-nav-btn"
            aria-label="Previous month"
            tabIndex={0}
          >
            ←
          </button>
          <div className="balanceui-datepicker-month-year" role="heading" aria-level={2}>
            {MONTHS[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </div>
          <button
            type="button"
            onClick={handleNextMonth}
            className="balanceui-datepicker-nav-btn"
            aria-label="Next month"
            tabIndex={0}
          >
            →
          </button>
        </div>

        <div style={calendarGridStyle}>
          {DAYS.map((day) => (
            <div
              key={day}
              className="balanceui-datepicker-day-header"
              style={{
                padding: "0.5rem",
                textAlign: "center" as const,
                fontWeight: 600,
                fontSize: "0.75rem",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              }}
            >
              {day}
            </div>
          ))}

          {days.map((date, index) => {
            if (!date) {
              return <div key={`empty-${index}`} />;
            }

            const dateTime = new Date(date);
            dateTime.setHours(0, 0, 0, 0);
            const isSelected =
              mode === "single"
                ? isSameDay(date, selectedDate)
                : isSameDay(date, rangeStart) || isSameDay(date, rangeEnd);
            const isToday = isSameDay(date, today);
            const isDisabled = Boolean(
              (minDate && date < minDate) || (maxDate && date > maxDate)
            );
            const inRange =
              mode === "range" &&
              isDateInRange(date, rangeStart, rangeEnd) &&
              !isSelected;

            const isFocused = focusedDateIndex === index;
            
            return (
              <div
                key={date.toISOString()}
                role="button"
                tabIndex={isFocused ? 0 : -1}
                aria-label={`${date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}`}
                aria-selected={isSelected}
                aria-disabled={isDisabled}
                onClick={() => handleDateSelect(date)}
                onKeyDown={(e) => handleCalendarKeyDown(e, date, index)}
                style={{
                  ...dayCellStyle(isSelected, isToday, isDisabled),
                  ...(inRange ? rangeCellStyle(true, false, false) : {}),
                }}
                className={`balanceui-datepicker-day-cell ${isFocused ? "balanceui-datepicker-day-focused" : ""}`}
              >
                {date.getDate()}
              </div>
            );
          })}
        </div>

        {mode === "range" && rangeStart && rangeEnd && (
          <div
            style={{
              marginTop: "1rem",
              paddingTop: "1rem",
              borderTop: "1px solid var(--bu-border, rgba(0, 0, 0, 0.1))",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "0.875rem",
            }}
          >
            <button
              type="button"
              onClick={() => {
                setRangeStart(null);
                setRangeEnd(null);
                onRangeChange?.(null, null);
              }}
              className="balanceui-datepicker-clear-btn"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="balanceui-datepicker-apply-btn"
            >
              Apply
            </button>
          </div>
        )}
      </div>
    );
  };

  const displayValue =
    mode === "range"
      ? rangeStart && rangeEnd
        ? `${formatDate(rangeStart, format)} - ${formatDate(rangeEnd, format)}`
        : rangeStart
        ? `${formatDate(rangeStart, format)} - ...`
        : ""
      : formatDate(selectedDate, format);

  return (
    <div
      ref={containerRef}
      className={`balanceui-datepicker-container ${className || ""}`}
      style={{ position: "relative" as const, width: "100%" }}
    >
      {label && (
        <label
          htmlFor={id}
          style={{
            display: "block",
            marginBottom: "0.5rem",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: error ? "var(--bu-error, #d32f2f)" : "var(--bu-fg, #000)",
          }}
        >
          {label}
        </label>
      )}
      <div
        ref={inputRef}
        id={id}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-label={label || "Date picker"}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        style={{
          ...datePickerStyle(variant),
          ...style,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        className={`balanceui-datepicker-input ${error ? "balanceui-datepicker-error" : ""}`}
        aria-disabled={disabled}
      >
        {displayValue || placeholder}
      </div>
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
      {isOpen && renderCalendar()}
    </div>
  );
};

