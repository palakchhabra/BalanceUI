export type ButtonToggleVariant = "solid" | "soft" | "outline";

export interface ButtonToggleOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface ButtonToggleProps {
  variant?: ButtonToggleVariant;
  options: ButtonToggleOption[];
  value?: string | string[];
  defaultValue?: string | string[];
  onChange?: (value: string | string[]) => void;
  multiple?: boolean;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: React.CSSProperties;
  fullWidth?: boolean;
}

