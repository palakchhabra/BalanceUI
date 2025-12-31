import { useState, useRef, useEffect, useId } from "react";
import { DatePickerProps } from "./DatePicker.types";
import { Input } from "../Input/Input";
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
  minDate: externalMinDate,
  maxDate: externalMaxDate,
  mode = "single",
  showTime = false,
  format,
  className,
  style,
  label,
  error,
  helperText,
  width = "100%",
  showMinMaxInputs = false,
  minDateLabel = "Min Date",
  maxDateLabel = "Max Date",
  onMinDateChange,
  onMaxDateChange,
  required,
  ...props
}: DatePickerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [internalMinDate, setInternalMinDate] = useState<Date | null>(null);
  const [internalMaxDate, setInternalMaxDate] = useState<Date | null>(null);
  const minDate = externalMinDate || internalMinDate;
  const maxDate = externalMaxDate || internalMaxDate;
  
  const [currentMonth, setCurrentMonth] = useState(
    value || defaultValue || new Date()
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    value || defaultValue || (mode === "single" ? new Date() : null)
  );
  const [rangeStart, setRangeStart] = useState<Date | null>(null);
  const [rangeEnd, setRangeEnd] = useState<Date | null>(null);
  const [focusedDateIndex, setFocusedDateIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  // Generate unique IDs for accessibility
  const generatedId = useId();
  const id = `datepicker-${generatedId}`;
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
      // If no start date or both dates are selected, start fresh
      if (!rangeStart || (rangeStart && rangeEnd)) {
        setRangeStart(date);
        setRangeEnd(null);
        onRangeChange?.(date, null);
      } else {
        // Check if selecting a date in the past or future relative to rangeStart
        const isPast = date < rangeStart;
        const isFuture = date > rangeStart;
        
        // If selecting a date that's not adjacent (more than 1 day difference), reset
        const daysDiff = Math.abs((date.getTime() - rangeStart.getTime()) / (1000 * 60 * 60 * 24));
        
        // If selecting a date in the past when we have a start date, reset
        // If selecting a date in the future that's not immediately after, reset
        if (isPast || (isFuture && daysDiff > 1)) {
          setRangeStart(date);
          setRangeEnd(null);
          onRangeChange?.(date, null);
        } else {
          // Normal range selection - complete the range
          const start = date < rangeStart ? date : rangeStart;
          const end = date > rangeStart ? date : rangeStart;
          setRangeStart(start);
          setRangeEnd(end);
          onRangeChange?.(start, end);
        }
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
        id={`${id}-calendar`}
        role="dialog"
        aria-label={label ? `Calendar for ${label}` : "Calendar"}
        aria-modal="true"
        aria-labelledby={label ? id : undefined}
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
              rangeStart &&
              rangeEnd &&
              isDateInRange(date, rangeStart, rangeEnd) &&
              !isSelected;
            const isRangeStart = mode === "range" && rangeStart && isSameDay(date, rangeStart);
            const isRangeEnd = mode === "range" && rangeEnd && isSameDay(date, rangeEnd);

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
                  ...dayCellStyle(isSelected || isRangeStart || isRangeEnd, isToday, isDisabled),
                }}
                className={`balanceui-datepicker-day-cell ${
                  isFocused ? "balanceui-datepicker-day-focused" : ""
                } ${
                  inRange ? "balanceui-datepicker-in-range" : ""
                } ${
                  isRangeStart ? "balanceui-datepicker-range-start" : ""
                } ${
                  isRangeEnd ? "balanceui-datepicker-range-end" : ""
                }`}
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

  const handleMinDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (dateStr) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        setInternalMinDate(date);
        onMinDateChange?.(date);
      }
    } else {
      setInternalMinDate(null);
      onMinDateChange?.(null);
    }
  };

  const handleMaxDateInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dateStr = e.target.value;
    if (dateStr) {
      const date = new Date(dateStr);
      if (!isNaN(date.getTime())) {
        setInternalMaxDate(date);
        onMaxDateChange?.(date);
      }
    } else {
      setInternalMaxDate(null);
      onMaxDateChange?.(null);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`balanceui-datepicker-container ${className || ""}`}
      style={{ position: "relative" as const, width: typeof width === "number" ? `${width}px` : width }}
    >
      {showMinMaxInputs && (
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
          <Input
            type="date"
            label={minDateLabel}
            value={minDate ? minDate.toISOString().split("T")[0] : ""}
            onChange={handleMinDateInputChange}
            variant={variant === "solid" ? "filled" : variant === "soft" ? "outlined" : "outlined"}
            fullWidth
            style={{ flex: 1 }}
          />
          <Input
            type="date"
            label={maxDateLabel}
            value={maxDate ? maxDate.toISOString().split("T")[0] : ""}
            onChange={handleMaxDateInputChange}
            variant={variant === "solid" ? "filled" : variant === "soft" ? "outlined" : "outlined"}
            fullWidth
            style={{ flex: 1 }}
          />
        </div>
      )}
      <Input
        ref={inputRef}
        id={id}
        variant={variant === "solid" ? "filled" : variant === "soft" ? "outlined" : variant === "outline" ? "outlined" : "outlined"}
        value={displayValue}
        placeholder={placeholder}
        disabled={disabled}
        label={label}
        error={error}
        helperText={helperText}
        readOnly
        onClick={() => !disabled && setIsOpen(!isOpen)}
        onKeyDown={(e) => {
          if (disabled) return;
          if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
            e.preventDefault();
            setIsOpen(true);
          }
        }}
        style={{
          ...style,
          cursor: disabled ? "not-allowed" : "pointer",
        }}
        fullWidth
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        aria-describedby={describedBy}
        aria-invalid={!!error}
        aria-required={required}
        aria-controls={isOpen ? `${id}-calendar` : undefined}
      />
      {isOpen && renderCalendar()}
    </div>
  );
};

