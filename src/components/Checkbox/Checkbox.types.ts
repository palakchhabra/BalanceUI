export type CheckboxVariant = "solid" | "soft" | "outline";

export interface CheckboxProps {
  variant?: CheckboxVariant;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  indeterminate?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  error?: string;
  helperText?: string;
  "aria-label"?: string;
}

