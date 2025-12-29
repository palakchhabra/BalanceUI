export type ButtonVariant =
  | 'bare'
  | 'stroke'
  | 'solid'
  | 'soft'
  | 'float'
  | 'glyph'
  | 'pulse'
  | 'pulse-mini'
  | 'pulse-extend'


export type ButtonRounded = 'md' | 'full'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  rounded?: ButtonRounded
  size?: ButtonSize
  disabled?: boolean
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>
