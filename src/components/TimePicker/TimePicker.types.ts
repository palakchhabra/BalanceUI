export type TimePickerVariant = "solid" | "soft" | "outline";

export interface TimePickerProps {
  variant?: TimePickerVariant;
  value?: Date | null;
  defaultValue?: Date | null;
  onChange?: (time: Date | null) => void;
  placeholder?: string;
  disabled?: boolean;
  format?: "12h" | "24h";
  className?: string;
  style?: React.CSSProperties;
  label?: string;
  error?: string;
  helperText?: string;
  step?: number; // Minutes step
}

