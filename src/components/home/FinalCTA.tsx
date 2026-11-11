import React from 'react';
import { ArrowLeft, Headphones } from 'lucide-react';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const FinalCTA: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-t border-brand-border">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <div className="relative rounded-3xl bg-navy-950 p-8 sm:p-12 md:p-16 text-white text-center shadow-2xl overflow-hidden border border-slate-800">
            {/* Background elements */}
            <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-10 w-72 h-72 bg-brand-amber/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 left-10 w-72 h-72 bg-brand-crimson/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900 border border-slate-700 text-brand-amber text-xs font-medium mb-6">
                <Headphones className="w-4 h-4" />
                <span>شروع گفتگوی مهندسی با کارشناسان معدنکو</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir leading-tight tracking-tight mb-5">
                برای پایش و بهینه‌سازی داده‌های خط فرآوری خود آماده‌اید؟
              </h2>

              <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-2xl mx-auto">
                جهت بررسی نیازهای داده‌ای، امکان‌سنجی فلوشیت و آشنایی با راهکارهای معدنکو (شرکت محاسبات عملیات داده ارزیابی نوین) با ما در ارتباط باشید.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  to="/contact"
                  variant="copper"
                  size="lg"
                  icon={<ArrowLeft className="w-4 h-4" />}
                  className="w-full sm:w-auto font-bold bg-brand-amber text-navy-950 hover:bg-brand-amberDark border-none shadow-glow-amber"
                >
                  درخواست مشاوره تخصصی
                </Button>
                <Button
                  to="/platform"
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto bg-white/5 border-slate-700 text-white hover:bg-white/10 hover:text-white font-medium"
                >
                  بررسی قابلیت‌های سامانه
                </Button>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
