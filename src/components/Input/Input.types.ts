import type { BalanceVariant } from "../../types/variant";
import { forwardRef } from "react";

export type InputVariant = "outlined" | "filled" | "standard";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  variant?: InputVariant;
  style?: React.CSSProperties;
  
  // Floating label support
  label?: string;
  floatingLabel?: boolean;
  
  // Validation
  error?: string | boolean;
  helperText?: string;
  
  // Material Design specific
  fullWidth?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}
