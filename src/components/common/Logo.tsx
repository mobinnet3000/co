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
    sm: 'h-6 sm:h-7',
    md: 'h-8 sm:h-9',
    lg: 'h-11 sm:h-12',
  };

  return (
    <Link to="/" className={`inline-flex items-center gap-3 group focus:outline-none select-none ${className}`}>
      {/* Official MADAN Conveyor Line Iconic Vector Mark */}
      <div className="relative flex items-center transition-transform duration-300 group-hover:scale-[1.03]">
        <img
          src={isLight ? '/logo-madan-white-icon.png' : '/logo-madan-black-icon.png'}
          alt="لوگوی معدنکو MADAN"
          className={`${logoHeights[size]} w-auto object-contain drop-shadow-xs`}
        />
      </div>

      {showText && (
        <div className="flex flex-col text-right justify-center border-r border-brand-border/80 pr-3">
          <div className="flex items-center gap-2">
            <span
              className={`font-black text-sm sm:text-base leading-none font-vazir tracking-tight ${
                isLight ? 'text-white' : 'text-navy-950'
              }`}
            >
              معدنکو
            </span>
            <span
              className={`text-[9px] font-mono font-bold tracking-widest px-1.5 py-0.5 rounded ${
                isLight
                  ? 'bg-brand-amber/20 text-brand-amber border border-brand-amber/30'
                  : 'bg-navy-900 text-white'
              }`}
            >
              MADAN CO
            </span>
          </div>
          <span
            className={`text-[10px] font-medium leading-tight mt-1 truncate max-w-[180px] sm:max-w-none ${
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
