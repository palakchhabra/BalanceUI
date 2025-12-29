export interface FormFieldProps {
  label?: string;
  required?: boolean;

  helperText?: string;
  error?: string;

  disabled?: boolean;
  children: React.ReactNode;

  className?: string;
  style?: React.CSSProperties;
}
