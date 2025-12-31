export interface SearchSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
  group?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SearchSelectProps {
  options: SearchSelectOption[];
  value?: string[];
  onChange?: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  maxSelected?: number;
  clearable?: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "outlined" | "filled";
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  "aria-label"?: string;
  "aria-describedby"?: string;
  renderOption?: (option: SearchSelectOption, isSelected: boolean) => React.ReactNode;
  renderChip?: (option: SearchSelectOption, onRemove: () => void) => React.ReactNode;
  onSearch?: (query: string) => void;
  loading?: boolean;
  emptyMessage?: string;
}

