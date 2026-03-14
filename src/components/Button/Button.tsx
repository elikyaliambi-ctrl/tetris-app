import type { ReactNode } from 'react';

interface ButtonProps {
  onClick: () => void;
  children: ReactNode;
  variant?: 'primary' | 'danger' | 'success' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
  ariaLabel?: string;
  ariaPressed?: boolean;
}

const VARIANTS = {
  primary: { bg: '#00f0f0', color: '#1a1a2e' },
  danger:  { bg: '#f00000', color: '#ffffff' },
  success: { bg: '#00f000', color: '#1a1a2e' },
  warning: { bg: '#f0a000', color: '#1a1a2e' },
};

const Button = ({
  onClick,
  children,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  ariaLabel,
  ariaPressed,
}: ButtonProps) => {
  const { bg, color } = VARIANTS[variant];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        padding: '12px 24px',
        backgroundColor: disabled ? '#333' : bg,
        color: disabled ? '#666' : color,
        border: 'none',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: 'bold',
        cursor: disabled ? 'not-allowed' : 'pointer',
        fontFamily: 'monospace',
        width: fullWidth ? '100%' : 'auto',
        letterSpacing: '2px',
        opacity: disabled ? 0.6 : 1,
      }}
      aria-label={ariaLabel}
      aria-pressed={ariaPressed}
    >
      {children}
    </button>
  );
};

export default Button;