import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { platformFAQ } from '../../data/platform';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformFAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 md:py-28 bg-brand-bgLight border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="پاسخ به پرسش‌های متداول"
            title="پرسش‌های رایج درباره استقرار سامانه"
            description="پاسخ‌های شفاف و مهندسی به متداول‌ترین سوالات مدیران و کارشناسان فنی کارخانجات فرآوری."
          />
        </AnimatedSection>

        <div className="space-y-4">
          {platformFAQ.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <AnimatedSection key={idx} delay={idx * 0.06}>
                <div className="bg-white rounded-xl border border-brand-border shadow-subtle overflow-hidden transition-all duration-200">
                  <button
                    type="button"
                    onClick={() => toggleAccordion(idx)}
                    className="w-full p-5 text-right flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm sm:text-base font-bold text-navy-900 font-vazir">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-brand-blue' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 font-light">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
