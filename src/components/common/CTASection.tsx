import React from 'react';
import { ArrowLeft, Phone, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  title = 'برای بررسی ساختار داده‌های عملیاتی کارخانه خود آماده‌اید؟',
  description = 'جهت هماهنگی جلسه فنی، استعلام نیازمندی‌ها و گفتگوی مستقیم با کارشناسان شرکت محاسبات عملیات داده ارزیابی نوین (معدنکو) با ما در ارتباط باشید.',
  primaryBtnText = 'ارتباط مستقیم با شرکت',
  primaryBtnTo = '/contact',
  secondaryBtnText = 'تماس تلفنی: ۰۹۹۹۹۱۹۶۶۳۰',
  secondaryBtnTo = 'tel:09999196630',
  className = '',
}) => {
  return (
    <section className={`relative overflow-hidden bg-[#0F1821] text-white py-14 md:py-18 rounded-3xl border border-slate-800 shadow-card my-12 ${className}`}>
      {/* Background industrial data grid effect */}
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-slate-900 border border-slate-700 text-[#EFA73F] text-xs font-mono mb-5">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>ON-PREMISES DEPLOYMENT &bull; DIRECT CONSULTATION</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir leading-tight tracking-tight mb-4">
          {title}
        </h2>

        <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto mb-8 font-light">
          {description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Link
            to={primaryBtnTo}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] bg-[#EFA73F] text-[#0F1821] font-bold text-xs hover:bg-[#D48E28] transition-colors font-vazir"
          >
            <span>{primaryBtnText}</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {secondaryBtnTo.startsWith('tel:') ? (
            <a
              href={secondaryBtnTo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/10 font-bold text-xs transition-colors font-vazir"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{secondaryBtnText}</span>
            </a>
          ) : (
            <Link
              to={secondaryBtnTo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-[10px] border border-slate-700 text-white hover:bg-slate-800 font-bold text-xs transition-colors font-vazir"
            >
              <span>{secondaryBtnText}</span>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
