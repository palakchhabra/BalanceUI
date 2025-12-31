export interface MultiSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
}

export interface MultiSelectProps {
  options: MultiSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  maxSelected?: number;
  searchable?: boolean;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  renderOption?: (option: MultiSelectOption, isSelected: boolean) => React.ReactNode;
  renderChip?: (option: MultiSelectOption, onRemove: () => void) => React.ReactNode;
  allowDisabledSelection?: boolean;
}

