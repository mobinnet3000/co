import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: FAQItem[];
  };
}

export const FAQBlock: React.FC<FAQBlockProps> = ({ config }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const items = config.items || [];

  return (
    <section className="py-16 sm:py-20 bg-brand-sandLight border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center mb-12">
            {config.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-3">
                {config.title}
              </h2>
            )}
            {config.subtitle && (
              <p className="text-sm sm:text-base text-slate-600">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="space-y-4">
          {items.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-brand-border bg-white overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full py-4 px-6 text-right flex items-center justify-between gap-4 font-bold text-navy-900 hover:text-brand-amber transition-colors"
                >
                  <span className="text-base sm:text-lg">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-brand-amber' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-100">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
