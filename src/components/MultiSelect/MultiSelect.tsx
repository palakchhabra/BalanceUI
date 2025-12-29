import { useState, useRef, useEffect, useMemo } from "react";
import { MultiSelectProps } from "./MultiSelect.types";
import "./MultiSelect.css";

export const MultiSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Select options...",
  disabled = false,
  error,
  helperText,
  maxSelected,
  searchable = false,
  clearable = true,
  size = "md",
  variant = "outlined",
  className,
  style,
  id: providedId,
  "aria-label": ariaLabel,
  "aria-describedby": ariaDescribedBy,
  renderOption,
  renderChip,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const id = providedId || `multiselect-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchable || !searchQuery) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query)
    );
  }, [options, searchQuery, searchable]);

  // Get selected options
  const selectedOptions = useMemo(() => {
    return options.filter((opt) => value.includes(opt.value));
  }, [options, value]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        setSearchQuery("");
        setFocusedIndex(-1);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setFocusedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setFocusedIndex((prev) => (prev > 0 ? prev - 1 : -1));
      } else if (e.key === "Enter" && focusedIndex >= 0) {
        e.preventDefault();
        handleToggle(filteredOptions[focusedIndex].value);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, focusedIndex, filteredOptions]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [focusedIndex]);

  const handleToggle = (optionValue: string) => {
    if (disabled) return;

    const isSelected = value.includes(optionValue);
    let newValue: string[];

    if (isSelected) {
      newValue = value.filter((v) => v !== optionValue);
    } else {
      if (maxSelected && value.length >= maxSelected) {
        return; // Don't add if max reached
      }
      newValue = [...value, optionValue];
    }

    onChange?.(newValue);
    setSearchQuery("");
    setFocusedIndex(-1);
  };

  const handleRemove = (optionValue: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    const newValue = value.filter((v) => v !== optionValue);
    onChange?.(newValue);
  };

  const handleClearAll = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (disabled) return;
    onChange?.([]);
  };

  const isSelected = (optionValue: string) => value.includes(optionValue);

  const sizeStyles = {
    sm: { minHeight: "32px", padding: "4px 8px", fontSize: "0.75rem" },
    md: { minHeight: "40px", padding: "8px 12px", fontSize: "0.875rem" },
    lg: { minHeight: "48px", padding: "12px 16px", fontSize: "1rem" },
  };

  return (
    <div
      ref={containerRef}
      className={`balanceui-multiselect ${disabled ? "balanceui-multiselect-disabled" : ""} ${
        error ? "balanceui-multiselect-error" : ""
      } ${isOpen ? "balanceui-multiselect-open" : ""} ${className || ""}`}
      style={{ position: "relative", width: "100%", ...style }}
    >
      {/* Input Container */}
      <div
        className={`balanceui-multiselect-input-container balanceui-multiselect-${variant} balanceui-multiselect-${size}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        style={{
          ...sizeStyles[size],
          cursor: disabled ? "not-allowed" : "pointer",
          border: error
            ? "2px solid var(--bu-error, #d32f2f)"
            : isOpen
            ? "2px solid var(--bu-primary, #1976d2)"
            : "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
          borderRadius: "var(--bu-radius-md, 4px)",
          backgroundColor:
            variant === "filled"
              ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.05))"
              : "var(--bu-surface, #ffffff)",
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "4px",
          transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen
            ? "0 0 0 2px rgba(25, 118, 210, 0.2)"
            : "none",
        }}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        aria-describedby={describedBy}
        aria-invalid={!!error}
      >
        {/* Selected Chips */}
        {selectedOptions.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", flex: 1 }}>
            {selectedOptions.map((option) =>
              renderChip ? (
                <div key={option.value} onClick={(e) => e.stopPropagation()}>
                  {renderChip(option, () => {
                    const syntheticEvent = { stopPropagation: () => {} } as React.MouseEvent;
                    handleRemove(option.value, syntheticEvent);
                  })}
                </div>
              ) : (
                <span
                  key={option.value}
                  className="balanceui-multiselect-chip"
                  onClick={(e) => handleRemove(option.value, e)}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "4px",
                    padding: "4px 8px",
                    borderRadius: "16px",
                    backgroundColor: "var(--bu-primary, #1976d2)",
                    color: "var(--bu-on-primary, #ffffff)",
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    cursor: disabled ? "not-allowed" : "pointer",
                    transition: "all 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  <span>{option.label}</span>
                  {!disabled && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "16px",
                        height: "16px",
                        borderRadius: "50%",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                        fontSize: "12px",
                        lineHeight: 1,
                        cursor: "pointer",
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option.value, e);
                      }}
                    >
                      ×
                    </span>
                  )}
                </span>
              )
            )}
          </div>
        )}

        {/* Search Input or Placeholder */}
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setFocusedIndex(-1);
            }}
            onClick={(e) => e.stopPropagation()}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedOptions.length === 0 ? placeholder : ""}
            style={{
              border: "none",
              outline: "none",
              background: "transparent",
              flex: 1,
              minWidth: "120px",
              fontSize: sizeStyles[size].fontSize,
              color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
            }}
            autoFocus
          />
        ) : selectedOptions.length === 0 ? (
          <span
            style={{
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              fontSize: sizeStyles[size].fontSize,
              flex: 1,
            }}
          >
            {placeholder}
          </span>
        ) : null}

        {/* Clear All Button */}
        {clearable && selectedOptions.length > 0 && !disabled && (
          <button
            type="button"
            onClick={handleClearAll}
            style={{
              border: "none",
              background: "transparent",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              transition: "color 150ms ease",
            }}
            aria-label="Clear all selections"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
            </svg>
          </button>
        )}

        {/* Dropdown Arrow */}
        <span
          style={{
            display: "flex",
            alignItems: "center",
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            transition: "transform 200ms ease",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7 10l5 5 5-5z" />
          </svg>
        </span>
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <ul
          ref={listRef}
          className="balanceui-multiselect-dropdown"
          role="listbox"
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            marginTop: "4px",
            maxHeight: "300px",
            overflowY: "auto",
            backgroundColor: "var(--bu-surface, #ffffff)",
            border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
            borderRadius: "var(--bu-radius-md, 4px)",
            boxShadow:
              "0px 3px 5px -1px rgba(0, 0, 0, 0.2), " +
              "0px 6px 10px 0px rgba(0, 0, 0, 0.14), " +
              "0px 1px 18px 0px rgba(0, 0, 0, 0.12)",
            zIndex: 1000,
            padding: "4px",
            listStyle: "none",
            margin: 0,
          }}
        >
          {filteredOptions.length === 0 ? (
            <li
              style={{
                padding: "12px",
                textAlign: "center",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                fontSize: "0.875rem",
              }}
            >
              No options found
            </li>
          ) : (
            filteredOptions.map((option, index) => {
              const selected = isSelected(option.value);
              const focused = index === focusedIndex;

              return (
                <li
                  key={option.value}
                  role="option"
                  aria-selected={selected}
                  onClick={() => handleToggle(option.value)}
                  className={`balanceui-multiselect-option ${selected ? "balanceui-multiselect-option-selected" : ""} ${
                    focused ? "balanceui-multiselect-option-focused" : ""
                  } ${option.disabled ? "balanceui-multiselect-option-disabled" : ""}`}
                  style={{
                    padding: "8px 12px",
                    cursor: option.disabled ? "not-allowed" : "pointer",
                    borderRadius: "var(--bu-radius-sm, 4px)",
                    backgroundColor: focused
                      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.04))"
                      : selected
                      ? "var(--bu-primary-light, rgba(25, 118, 210, 0.08))"
                      : "transparent",
                    color: option.disabled
                      ? "var(--bu-disabled, rgba(0, 0, 0, 0.38))"
                      : "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                    fontSize: "0.875rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    transition: "background-color 150ms ease",
                    opacity: option.disabled ? 0.5 : 1,
                  }}
                >
                  {renderOption ? (
                    renderOption(option, selected)
                  ) : (
                    <>
                      <input
                        type="checkbox"
                        checked={selected}
                        readOnly
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: option.disabled ? "not-allowed" : "pointer",
                        }}
                      />
                      <span style={{ flex: 1 }}>{option.label}</span>
                    </>
                  )}
                </li>
              );
            })
          )}
        </ul>
      )}

      {/* Error Message */}
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

      {/* Helper Text */}
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
};

