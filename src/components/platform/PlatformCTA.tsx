import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MonitorCheck } from 'lucide-react';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformCTA: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <div className="p-8 sm:p-12 rounded-3xl bg-navy-900 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan mx-auto flex items-center justify-center mb-5">
                <MonitorCheck className="w-6 h-6" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold font-vazir mb-4">
                برای بررسی قابلیت‌های سامانه در مجموعه خود، با ما در ارتباط باشید
              </h2>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl mx-auto">
                جلسه معرفی فنی و بررسی فلوشیت خط تولید به صورت حضوری یا آنلاین توسط کارشناسان متالورژی و داده شرکت قابل هماهنگی است.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="https://madan.ba3tani.ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] bg-[#EFA73F] text-[#0F1821] hover:bg-[#D48E28] font-bold text-sm transition-colors font-vazir"
                >
                  <span>ورود مستقیم به سامانه پایش (madan.ba3tani.ir)</span>
                  <ArrowLeft className="w-4 h-4" />
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/10 font-bold text-sm transition-colors font-vazir"
                >
                  ارتباط مستقیم با کارشناسان
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
