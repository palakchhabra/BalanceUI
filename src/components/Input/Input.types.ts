import type { BalanceVariant } from "../../types/variant";
import { forwardRef } from "react";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "style"> {
  variant?: Extract<BalanceVariant, "solid" | "soft" | "outline">;
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
