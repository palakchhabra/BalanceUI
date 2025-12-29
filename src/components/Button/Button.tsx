import { ButtonProps } from './Button.types'
import { getButtonStyles } from './Button.styles'
import './Button.css'

export const Button = ({
  variant = 'bare',
  size = 'md',
  rounded = 'md',
  disabled = false,
  children,
  style,
  type = 'button',
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      type={type}
      disabled={disabled}
      className={`balanceui-button ${className || ''}`}
      data-variant={variant}
      data-size={size}
      style={{
        ...getButtonStyles(variant, size, rounded, disabled),
        ...style, // user overrides last (intentional)
      }}
    >
      {children}
    </button>
  )
}
