import React from 'react';
import { Quote } from 'lucide-react';

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company?: string;
  avatarUrl?: string;
}

export interface TestimonialsBlockConfig {
  tagline?: string;
  title?: string;
  subtitle?: string;
  items: TestimonialItem[];
}

export const TestimonialsBlock: React.FC<{ config: TestimonialsBlockConfig }> = ({ config }) => {
  if (!config?.items || config.items.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {config.tagline && (
            <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-2">
              {config.tagline}
            </span>
          )}
          {config.title && (
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-navy-950 mb-3">
              {config.title}
            </h2>
          )}
          {config.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {config.subtitle}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.items.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex flex-col justify-between relative group hover:border-navy-950 transition-colors"
            >
              <div>
                <Quote className="w-8 h-8 text-[#EFA73F]/40 mb-4" />
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-light mb-6 italic">
                  «{item.quote}»
                </p>
              </div>

              <div className="pt-4 border-t border-[#E3DAD0] flex items-center gap-3">
                {item.avatarUrl ? (
                  <img
                    src={item.avatarUrl}
                    alt={item.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#E3DAD0]"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#FAF7F3] border border-[#E3DAD0] flex items-center justify-center text-xs font-bold text-navy-950 font-vazir">
                    {item.author.charAt(0)}
                  </div>
                )}
                <div>
                  <h4 className="text-xs font-bold text-navy-950 font-vazir">{item.author}</h4>
                  <p className="text-[11px] text-slate-500 font-light">
                    {item.role} {item.company ? `• ${item.company}` : ''}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
