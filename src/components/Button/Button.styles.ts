import { ButtonRounded, ButtonSize, ButtonVariant } from './Button.types'

/* ================================
   Base
   ================================ */

export const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontWeight: 500,
  border: 'none',
  cursor: 'pointer',
  lineHeight: 1,
  whiteSpace: 'nowrap',
  transition:
    'background-color 150ms cubic-bezier(0.4, 0, 0.2, 1), color 150ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1), transform 150ms cubic-bezier(0.4, 0, 0.2, 1)',
}

/* ================================
   Sizes (text buttons only)
   ================================ */

export const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { height: 32, padding: '0 12px', fontSize: 13 },
  md: { height: 40, padding: '0 16px', fontSize: 14 },
  lg: { height: 48, padding: '0 20px', fontSize: 15 },
}

/* ================================
   Rounded
   ================================ */

export const roundedStyles: Record<ButtonRounded, React.CSSProperties> = {
  md: { borderRadius: 'var(--bu-radius-md)' },
  full: { borderRadius: 'var(--bu-radius-full)' },
}

/* ================================
   Variants (BalanceUI – FINAL)
   ================================ */

export const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  /* bare → text */
  bare: {
    background: 'transparent',
    color: 'var(--bu-primary)',
  },

  /* stroke → outlined */
  stroke: {
    background: 'transparent',
    color: 'var(--bu-primary)',
    border: '1px solid var(--bu-border)',
  },

  /* solid → filled */
  solid: {
    background: 'var(--bu-primary)',
    color: 'var(--bu-on-primary)',
  },

  /* soft → tonal */
  soft: {
    background: 'var(--bu-tonal-bg)',
    color: 'var(--bu-tonal-fg)',
  },

  /* float → elevated */
  float: {
    background: 'var(--bu-surface)',
    color: 'var(--bu-fg)',
    boxShadow: '0 1px 3px rgba(0,0,0,.15)',
  },

  /* glyph → icon */
  glyph: {
    background: 'transparent',
    color: 'var(--bu-primary)',
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: '50%',
  },

  /* pulse → FAB */
  pulse: {
    background: 'var(--bu-primary)',
    color: 'var(--bu-on-primary)',
    width: 56,
    height: 56,
    padding: 0,
    borderRadius: '50%',
    boxShadow: '0 6px 16px rgba(0,0,0,.25)',
  },

  /* pulse-mini */
  'pulse-mini': {
    background: 'var(--bu-primary)',
    color: 'var(--bu-on-primary)',
    width: 40,
    height: 40,
    padding: 0,
    borderRadius: '50%',
    boxShadow: '0 4px 10px rgba(0,0,0,.25)',
  },

  /* pulse-extend */
  'pulse-extend': {
    background: 'var(--bu-primary)',
    color: 'var(--bu-on-primary)',
    height: 48,
    padding: '0 20px',
    borderRadius: 'var(--bu-radius-full)',
    boxShadow: '0 6px 16px rgba(0,0,0,.25)',
  },
}

/* ================================
   Resolver (LOCKED)
   ================================ */

export const getButtonStyles = (
  variant: ButtonVariant,
  size: ButtonSize,
  rounded: ButtonRounded,
  disabled?: boolean
): React.CSSProperties => {
  const isIconLike =
    variant === 'glyph' ||
    variant === 'pulse' ||
    variant === 'pulse-mini'

  return {
    ...baseStyle,
    ...(isIconLike ? {} : sizeStyles[size]),
    ...roundedStyles[rounded],
    ...variantStyles[variant],
    opacity: disabled ? 0.5 : 1,
    cursor: disabled ? 'not-allowed' : 'pointer',
  }
}
