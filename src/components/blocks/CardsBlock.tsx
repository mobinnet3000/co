import React from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface CardItem {
  title: string;
  description: string;
  badge?: string;
  iconName?: string;
  link?: string;
  linkText?: string;
}

export interface CardsBlockConfig {
  tagline?: string;
  title: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  cards: CardItem[];
}

export const CardsBlock: React.FC<{ config: CardsBlockConfig }> = ({ config }) => {
  if (!config?.cards || config.cards.length === 0) return null;

  const colsClass =
    config.columns === 2
      ? 'md:grid-cols-2'
      : config.columns === 4
      ? 'sm:grid-cols-2 lg:grid-cols-4'
      : 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          {config.tagline && (
            <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-2">
              {config.tagline}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-navy-950 mb-3">
            {config.title}
          </h2>
          {config.subtitle && (
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {config.subtitle}
            </p>
          )}
        </div>

        <div className={`grid grid-cols-1 ${colsClass} gap-6`}>
          {config.cards.map((card, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex flex-col justify-between hover:border-navy-950 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-9 h-9 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 font-mono font-bold text-xs">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  {card.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#FAF7F3] border border-[#E3DAD0] text-slate-600">
                      {card.badge}
                    </span>
                  )}
                </div>

                <h3 className="text-base font-bold font-vazir text-navy-950 mb-2 group-hover:text-[#C92127] transition-colors">
                  {card.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6">
                  {card.description}
                </p>
              </div>

              {card.link && (
                <div className="pt-4 border-t border-[#E3DAD0]">
                  <Link
                    to={card.link}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 hover:text-[#C92127] transition-colors"
                  >
                    <span>{card.linkText || 'اطلاعات بیشتر'}</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </Link>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
