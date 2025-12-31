import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { SearchSelectProps } from "./SearchSelect.types";
import { Icon } from "../Icon/Icon";
import "./SearchSelect.css";

const sizeStyles = {
  sm: { fontSize: "0.875rem", padding: "0.375rem 0.75rem", minHeight: "32px" },
  md: { fontSize: "1rem", padding: "0.5rem 1rem", minHeight: "40px" },
  lg: { fontSize: "1.125rem", padding: "0.625rem 1.25rem", minHeight: "48px" },
};

export const SearchSelect = ({
  options,
  value = [],
  onChange,
  placeholder = "Search and select...",
  disabled = false,
  error,
  helperText,
  maxSelected,
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
  onSearch,
  loading = false,
  emptyMessage = "No options found",
}: SearchSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const id = providedId || `searchselect-${Math.random().toString(36).substr(2, 9)}`;
  const errorId = error ? `${id}-error` : undefined;
  const helperId = helperText ? `${id}-helper` : undefined;
  const describedBy = [errorId, helperId, ariaDescribedBy].filter(Boolean).join(" ") || undefined;

  // Filter options based on search
  const filteredOptions = useMemo(() => {
    if (!searchQuery.trim()) return options;
    const query = searchQuery.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) ||
        opt.value.toLowerCase().includes(query) ||
        opt.description?.toLowerCase().includes(query) ||
        opt.group?.toLowerCase().includes(query)
    );
  }, [options, searchQuery]);

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

  const handleToggle = useCallback((optionValue: string) => {
    if (disabled) return;

    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : maxSelected && value.length >= maxSelected
      ? value
      : [...value, optionValue];

    onChange?.(newValue);
    setSearchQuery("");
    setFocusedIndex(-1);
  }, [value, disabled, maxSelected, onChange]);

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
  }, [isOpen, focusedIndex, filteredOptions, handleToggle]);

  // Scroll focused option into view
  useEffect(() => {
    if (focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.children[focusedIndex] as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({ block: "nearest", behavior: "smooth" });
      }
    }
  }, [focusedIndex]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [isOpen]);

  const handleClearAll = () => {
    if (disabled) return;
    onChange?.([]);
    setSearchQuery("");
  };

  const handleRemove = (optionValue: string) => {
    if (disabled) return;
    onChange?.(value.filter((v) => v !== optionValue));
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setFocusedIndex(-1);
    onSearch?.(query);
  };

  const variantStyles = {
    outlined: {
      border: `1px solid ${error ? "var(--bu-error, #f44336)" : "var(--bu-border, rgba(0, 0, 0, 0.12))"}`,
      backgroundColor: "var(--bu-surface, #ffffff)",
    },
    filled: {
      border: "none",
      backgroundColor: error
        ? "rgba(244, 67, 54, 0.08)"
        : "var(--bu-surface-variant, rgba(0, 0, 0, 0.04))",
    },
  };

  return (
    <div
      ref={containerRef}
      className={`balanceui-searchselect ${className || ""}`}
      style={{ position: "relative", width: "100%", ...style }}
    >
      <div
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={ariaLabel || placeholder}
        aria-describedby={describedBy}
        onClick={() => !disabled && setIsOpen(true)}
        style={{
          ...variantStyles[variant],
          ...sizeStyles[size],
          borderRadius: "var(--bu-radius-md, 10px)",
          cursor: disabled ? "not-allowed" : "text",
          opacity: disabled ? 0.6 : 1,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
          minHeight: sizeStyles[size].minHeight,
          transition: "all 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "var(--bu-elevation-2)" : "none",
        }}
        onMouseEnter={(e) => {
          if (!disabled && !isOpen) {
            e.currentTarget.style.boxShadow = "var(--bu-elevation-2)";
          }
        }}
        onMouseLeave={(e) => {
          if (!isOpen) {
            e.currentTarget.style.boxShadow = "none";
          }
        }}
      >
        {/* Search Icon */}
        <Icon
          name="search"
          size={size === "sm" ? "sm" : "md"}
          style={{
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            flexShrink: 0,
          }}
        />

        {/* Selected Chips */}
        {selectedOptions.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem", flex: 1 }}>
            {selectedOptions.map((option) =>
              renderChip ? (
                renderChip(option, () => handleRemove(option.value))
              ) : (
                <div
                  key={option.value}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.25rem",
                    padding: "0.25rem 0.5rem",
                    borderRadius: "var(--bu-radius-sm, 8px)",
                    backgroundColor: "var(--bu-primary, #1976d2)",
                    color: "var(--bu-on-primary, #ffffff)",
                    fontSize: size === "sm" ? "0.75rem" : "0.875rem",
                  }}
                >
                  <span>{option.label}</span>
                  {clearable && (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemove(option.value);
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        padding: 0,
                        display: "flex",
                        alignItems: "center",
                        color: "inherit",
                        marginLeft: "0.25rem",
                      }}
                      aria-label={`Remove ${option.label}`}
                    >
                      <Icon name="close" size="sm" style={{ width: "0.75rem", height: "0.75rem" }} />
                    </button>
                  )}
                </div>
              )
            )}
          </div>
        )}

        {/* Search Input */}
        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={selectedOptions.length === 0 ? placeholder : ""}
          disabled={disabled}
          style={{
            border: "none",
            outline: "none",
            background: "transparent",
            flex: selectedOptions.length === 0 ? 1 : "0 1 auto",
            minWidth: selectedOptions.length === 0 ? "120px" : "60px",
            fontSize: sizeStyles[size].fontSize,
            color: "var(--bu-fg, rgba(0, 0, 0, 0.87))",
            padding: 0,
          }}
          autoComplete="off"
        />

        {/* Clear All Button */}
        {clearable && selectedOptions.length > 0 && !disabled && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleClearAll();
            }}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              alignItems: "center",
              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            }}
            aria-label="Clear all"
          >
            <Icon name="close" size="sm" />
          </button>
        )}

        {/* Dropdown Arrow */}
        <Icon
          name="arrow_forward"
          size="sm"
          style={{
            color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
            flexShrink: 0,
            transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Dropdown List */}
      {isOpen && (
        <div
          role="listbox"
          ref={listRef}
          style={{
            position: "absolute",
            top: "calc(100% + 4px)",
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "var(--bu-surface, #ffffff)",
            borderRadius: "var(--bu-radius-md, 10px)",
            boxShadow: "var(--bu-elevation-8)",
            border: "1px solid var(--bu-border, rgba(0, 0, 0, 0.12))",
            maxHeight: "300px",
            overflowY: "auto",
            overflowX: "hidden",
          }}
        >
          {loading ? (
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              }}
            >
              Loading...
            </div>
          ) : filteredOptions.length === 0 ? (
            <div
              style={{
                padding: "1rem",
                textAlign: "center",
                color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
              }}
            >
              {emptyMessage}
            </div>
          ) : (
            filteredOptions.map((option, index) => {
              const isSelected = value.includes(option.value);
              const isFocused = index === focusedIndex;
              const isDisabled = option.disabled || disabled;

              return (
                <div
                  key={option.value}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => !isDisabled && handleToggle(option.value)}
                  style={{
                    padding: "0.75rem 1rem",
                    cursor: isDisabled ? "not-allowed" : "pointer",
                    backgroundColor: isFocused
                      ? "var(--bu-surface-variant, rgba(0, 0, 0, 0.04))"
                      : isSelected
                      ? "rgba(25, 118, 210, 0.08)"
                      : "transparent",
                    color: isDisabled
                      ? "var(--bu-fg-secondary, rgba(0, 0, 0, 0.38))"
                      : "var(--bu-fg, rgba(0, 0, 0, 0.87))",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",
                    borderBottom:
                      index < filteredOptions.length - 1
                        ? "1px solid var(--bu-border, rgba(0, 0, 0, 0.08))"
                        : "none",
                  }}
                  onMouseEnter={() => !isDisabled && setFocusedIndex(index)}
                  onMouseLeave={() => setFocusedIndex(-1)}
                >
                  {renderOption ? (
                    renderOption(option, isSelected)
                  ) : (
                    <>
                      {option.icon && (
                        <div style={{ flexShrink: 0 }}>{option.icon}</div>
                      )}
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontWeight: isSelected ? 600 : 400,
                            fontSize: sizeStyles[size].fontSize,
                          }}
                        >
                          {option.label}
                        </div>
                        {option.description && (
                          <div
                            style={{
                              fontSize: "0.875rem",
                              color: "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
                              marginTop: "0.25rem",
                            }}
                          >
                            {option.description}
                          </div>
                        )}
                      </div>
                      {isSelected && (
                        <Icon
                          name="check"
                          size="sm"
                          style={{
                            color: "var(--bu-primary, #1976d2)",
                            flexShrink: 0,
                          }}
                        />
                      )}
                    </>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Error/Helper Text */}
      {(error || helperText) && (
        <div
          style={{
            marginTop: "0.5rem",
            fontSize: "0.875rem",
            color: error
              ? "var(--bu-error, #f44336)"
              : "var(--bu-fg-secondary, rgba(0, 0, 0, 0.6))",
          }}
          id={error ? errorId : helperId}
        >
          {error || helperText}
        </div>
      )}
    </div>
  );
};

