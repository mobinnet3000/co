import React from 'react';
import { ArrowLeft, Headphones } from 'lucide-react';
import { Button } from './Button';

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryBtnText?: string;
  primaryBtnTo?: string;
  secondaryBtnText?: string;
  secondaryBtnTo?: string;
  className?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title = 'برای شناخت بهتر داده‌های عملیاتی مجموعه خود آماده‌اید؟',
  description = 'برای بررسی نیازهای داده‌ای، امکان‌سنجی فنی و آشنایی با راهکارهای شرکت محاسبات عملیات داده ارزیابی نوین با ما در ارتباط باشید.',
  primaryBtnText = 'درخواست مشاوره تخصصی',
  primaryBtnTo = '/contact',
  secondaryBtnText = 'آشنایی با سامانه فرآوری',
  secondaryBtnTo = '/platform',
  className = '',
}) => {
  return (
    <section className={`relative overflow-hidden bg-navy-900 text-white py-16 md:py-20 rounded-card my-12 ${className}`}>
      {/* Background industrial data grid effect */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-navy-800 border border-slate-700 text-brand-cyan text-xs font-medium mb-6">
          <Headphones className="w-3.5 h-3.5" />
          <span>همراهی مهندسی و گفتگوی فنی</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir leading-tight tracking-tight mb-5">
          {title}
        </h2>

        <p className="text-slate-300 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-8 font-light">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            to={primaryBtnTo}
            variant="copper"
            size="lg"
            icon={<ArrowLeft className="w-4 h-4" />}
            className="w-full sm:w-auto"
          >
            {primaryBtnText}
          </Button>
          {secondaryBtnText && (
            <Button
              to={secondaryBtnTo}
              variant="outline"
              size="lg"
              className="w-full sm:w-auto bg-transparent border-slate-700 text-white hover:bg-navy-800 hover:text-white"
            >
              {secondaryBtnText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};
