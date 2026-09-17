import type { ButtonProps } from '../types/ui';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-900 disabled:opacity-40 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm',
    secondary: 'bg-zinc-100 hover:bg-zinc-200 text-zinc-900',
    ghost: 'bg-transparent hover:bg-zinc-100 text-zinc-600 hover:text-zinc-900',
    danger: 'bg-red-50 hover:bg-red-100 text-red-600',
  };

  const sizes = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
  };

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyle} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}