import React from 'react';

interface StatItem {
  value: string;
  label: string;
  sub?: string;
}

interface StatsBlockProps {
  config: {
    title?: string;
    items?: StatItem[];
    darkBg?: boolean;
  };
}

export const StatsBlock: React.FC<StatsBlockProps> = ({ config }) => {
  const items = config.items || [];
  const isDark = config.darkBg ?? true;

  return (
    <section className={`py-14 sm:py-18 ${isDark ? 'bg-navy-950 text-white' : 'bg-brand-sand border-b border-brand-border'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {config.title && (
          <h2 className={`text-xl sm:text-2xl font-bold text-center mb-10 ${isDark ? 'text-white' : 'text-navy-950'}`}>
            {config.title}
          </h2>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {items.map((stat, idx) => (
            <div
              key={idx}
              className={`p-6 rounded-2xl text-center ${
                isDark ? 'bg-navy-900/60 border border-slate-800' : 'bg-white border border-brand-border shadow-sm'
              }`}
            >
              <div className="text-2xl sm:text-4xl font-black text-brand-amber mb-2 font-mono" dir="ltr">
                {stat.value}
              </div>
              <div className={`text-sm sm:text-base font-bold mb-1 ${isDark ? 'text-slate-200' : 'text-navy-900'}`}>
                {stat.label}
              </div>
              {stat.sub && (
                <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stat.sub}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
