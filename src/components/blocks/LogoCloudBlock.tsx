import React from 'react';

export interface LogoCloudItem {
  name: string;
  logoUrl?: string;
  subtitle?: string;
}

export interface LogoCloudBlockConfig {
  tagline?: string;
  title?: string;
  items: LogoCloudItem[];
}

export const LogoCloudBlock: React.FC<{ config: LogoCloudBlockConfig }> = ({ config }) => {
  if (!config?.items || config.items.length === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-[#FAF7F3] border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.tagline) && (
          <div className="text-center max-w-xl mx-auto mb-8">
            {config.tagline && (
              <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-1">
                {config.tagline}
              </span>
            )}
            {config.title && (
              <h3 className="text-lg sm:text-xl font-bold font-vazir text-navy-950">
                {config.title}
              </h3>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center">
          {config.items.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-white border border-[#E3DAD0] shadow-card flex flex-col items-center justify-center text-center h-24 hover:border-navy-950 transition-colors group"
            >
              {item.logoUrl ? (
                <img
                  src={item.logoUrl}
                  alt={item.name}
                  className="max-h-10 w-auto object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-70 group-hover:opacity-100"
                />
              ) : (
                <span className="text-xs font-bold text-navy-950 font-vazir group-hover:text-[#EFA73F] transition-colors">
                  {item.name}
                </span>
              )}
              {item.subtitle && (
                <span className="text-[10px] text-slate-400 mt-1 block">
                  {item.subtitle}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
