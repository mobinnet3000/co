import React from 'react';
import { Link } from 'react-router-dom';

interface LogoProps {
  variant?: 'light' | 'dark';
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  showText = true,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  const logoHeights = {
    sm: 'h-7',
    md: 'h-9',
    lg: 'h-12',
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-3.5 group focus:outline-none select-none ${className}`}>
      {/* Official MADAN Conveyor Line Logo */}
      <div className={`relative flex items-center transition-transform duration-300 group-hover:scale-[1.03]`}>
        <img
          src={isLight ? '/logo-light.png' : '/logo-dark.png'}
          alt="لوگوی معدنکو MADAN"
          className={`${logoHeights[size]} w-auto object-contain drop-shadow-sm`}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right justify-center border-r border-slate-300/60 pr-3.5">
          <div className="flex items-center gap-2">
            <span
              className={`font-black text-base sm:text-lg leading-tight font-vazir tracking-tight ${
                isLight ? 'text-white' : 'text-navy-900'
              }`}
            >
              معدنکو
            </span>
            <span
              className={`text-[10px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded ${
                isLight
                  ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30'
                  : 'bg-navy-800 text-white'
              }`}
            >
              MADAN CO
            </span>
          </div>
          <span
            className={`text-[10px] sm:text-[11px] font-medium leading-tight mt-0.5 truncate max-w-[210px] sm:max-w-none ${
              isLight ? 'text-slate-300' : 'text-slate-500'
            }`}
          >
            محاسبات عملیات داده ارزیابی نوین
          </span>
        </div>
      )}
    </Link>
  );
};
