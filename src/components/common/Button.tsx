import React from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'copper' | 'ghost' | 'amber' | 'navy' | 'redOutline';
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
      'bg-navy-950 hover:bg-navy-900 text-white shadow-card hover:shadow-elevated focus:ring-navy-950 border border-transparent',
    navy:
      'bg-[#0F1821] hover:bg-[#14202B] text-white shadow-card hover:shadow-elevated focus:ring-navy-950 border border-transparent',
    amber:
      'bg-[#EFA73F] hover:bg-[#D48E28] text-[#0F1821] font-semibold shadow-card hover:shadow-elevated focus:ring-[#EFA73F] border border-transparent',
    redOutline:
      'border border-[#C92127] text-[#C92127] bg-transparent hover:bg-[#C92127]/10 focus:ring-[#C92127]',
    secondary:
      'bg-navy-900 hover:bg-navy-800 text-white shadow-sm hover:shadow-md focus:ring-navy-900 border border-transparent',
    outline:
      'border border-[#E3DAD0] hover:border-navy-950 text-navy-950 bg-white/80 hover:bg-white focus:ring-navy-950 shadow-xs',
    copper:
      'bg-[#EFA73F] hover:bg-[#D48E28] text-[#0F1821] shadow-card hover:shadow-elevated focus:ring-[#EFA73F] border border-transparent',
    ghost:
      'text-slate-600 hover:text-navy-950 hover:bg-[#0F1821]/5 focus:ring-slate-400',
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
