export type DatePickerVariant = "solid" | "soft" | "outline";

export interface DatePickerProps {
  variant?: DatePickerVariant;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (date: Date | null) => void;
  onRangeChange?: (start: Date | null, end: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  mode?: "single" | "range";
  showTime?: boolean;
  format?: string;
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  error?: string;
  helperText?: string;
}

