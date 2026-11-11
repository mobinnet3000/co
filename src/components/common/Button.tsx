import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'copper' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon,
  iconPosition = 'left',
  type = 'button',
  disabled = false,
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none rounded-[10px]';

  const sizeStyles = {
    sm: 'text-xs px-3.5 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-brand-blue hover:bg-navy-800 text-white shadow-sm hover:shadow-md focus:ring-brand-blue border border-transparent',
    secondary:
      'bg-navy-900 hover:bg-navy-800 text-white shadow-sm hover:shadow-md focus:ring-navy-900 border border-transparent',
    outline:
      'border border-slate-300 hover:border-brand-blue text-slate-700 hover:text-brand-blue bg-white hover:bg-slate-50 focus:ring-brand-blue',
    copper:
      'bg-brand-copper hover:bg-brand-copperDark text-white shadow-sm hover:shadow-glow-copper focus:ring-brand-copper border border-transparent',
    ghost:
      'text-slate-600 hover:text-navy-900 hover:bg-slate-100/70 focus:ring-slate-400',
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedStyles}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={combinedStyles}>
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={combinedStyles}>
      {content}
    </button>
  );
};
