import React from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'right' | 'center';
  variant?: 'light' | 'dark';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  description,
  align = 'right',
  variant = 'light',
  className = '',
}) => {
  const isDark = variant === 'dark';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        align === 'center' ? 'text-center mx-auto max-w-3xl' : 'text-right max-w-3xl'
      } ${className}`}
    >
      {eyebrow && (
        <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
          <span className="w-2 h-2 rounded-full bg-[#EFA73F]"></span>
          <span
            className={`text-xs md:text-sm font-semibold tracking-wider font-vazir ${
              isDark ? 'text-[#EFA73F]' : 'text-[#0F1821]'
            }`}
          >
            {eyebrow}
          </span>
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir tracking-tight leading-snug md:leading-tight ${
          isDark ? 'text-white' : 'text-[#0F1821]'
        }`}
      >
        {title}
      </h2>

      {description && (
        <p
          className={`mt-4 text-base md:text-lg leading-relaxed ${
            isDark ? 'text-slate-300' : 'text-slate-600'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
};
