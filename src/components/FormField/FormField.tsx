import { useId, cloneElement, isValidElement } from "react";
import { FormFieldProps } from "./FormField.types";
import {
  fieldStyle,
  labelRowStyle,
  labelStyle,
  requiredStyle,
  controlWrapperStyle,
  helperStyle,
  errorStyle,
} from "./FormField.styles";

export const FormField = ({
  label,
  required,
  helperText,
  error,
  disabled,
  children,
  className,
  style,
}: FormFieldProps) => {
  const id = useId();
  const describedById = error
    ? `${id}-error`
    : helperText
    ? `${id}-helper`
    : undefined;

  const control =
    isValidElement(children)
      ? cloneElement(children as any, {
          id,
          disabled,
          "aria-invalid": !!error,
          "aria-describedby": describedById,
        })
      : children;

  return (
    <div
      className={className}
      style={{ ...fieldStyle, ...style }}
    >
      {label && (
        <div style={labelRowStyle}>
          <label
            htmlFor={id}
            style={labelStyle(disabled)}
          >
            {label}
          </label>
          {required && (
            <span style={requiredStyle}>*</span>
          )}
        </div>
      )}

      <div style={controlWrapperStyle(disabled)}>
        {control}
      </div>

      {error ? (
        <div id={`${id}-error`} style={errorStyle}>
          {error}
        </div>
      ) : (
        helperText && (
          <div
            id={`${id}-helper`}
            style={helperStyle}
          >
            {helperText}
          </div>
        )
      )}
    </div>
  );
};
