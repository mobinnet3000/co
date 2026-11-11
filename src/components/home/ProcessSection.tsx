import React from 'react';
import { Check, Compass, Layers, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      num: '۰۱',
      title: 'دریافت داده',
      desc: 'دریافت اطلاعات مرتبط با عملیات خطوط فرآوری از منابع تعریف‌شده مانند لاگ‌بوک‌ها و شیت‌های آزمایشگاه.',
      icon: <Compass className="w-5 h-5 text-navy-800" />,
    },
    {
      num: '۰۲',
      title: 'آماده‌سازی داده',
      desc: 'ساختاردهی، بررسی و آماده‌سازی اطلاعات برای تحلیل، فیلتر داده‌های ناهنجار و تطبیق ساعات کاری.',
      icon: <Layers className="w-5 h-5 text-brand-amberDark" />,
    },
    {
      num: '۰۳',
      title: 'تحلیل و ارزیابی',
      desc: 'پردازش و بررسی داده‌ها با رویکرد تحلیلی، محاسبه موازنه متالورژیکی و کشف الگوهای کارایی.',
      icon: <ShieldCheck className="w-5 h-5 text-brand-crimson" />,
    },
    {
      num: '۰۴',
      title: 'ارائه اطلاعات',
      desc: 'نمایش نتایج در قالب گزارش‌ها، داشبوردهای بصری و شاخص‌های کلیدی تصمیم‌گیری.',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="فرآیند تحلیلی معدنکو"
            title="از داده خام تا اطلاعات قابل تصمیم‌گیری"
            description="چرخه استاندارد تبدیل اطلاعات پراکنده روزمره به شاخص‌های شفاف، دقیق و قابل اتکا برای مدیریت کارخانجات فرآوری."
          />
        </AnimatedSection>

        {/* Timeline Desktop (Horizontal) & Mobile (Vertical) */}
        <div className="relative">
          {/* Connecting line on desktop */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-l from-brand-border via-brand-amber to-brand-border -translate-y-6 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.12}>
                <div className="bg-white rounded-2xl p-6 border border-brand-border shadow-subtle hover:shadow-card transition-shadow duration-300 relative flex flex-col justify-between h-full">
                  {/* Top Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-brand-sand border border-brand-border/60">
                      {step.icon}
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-300 font-vazir">
                      {step.num}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-navy-950 mb-2 font-vazir">
                      {step.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center gap-1.5 text-xs text-navy-800 font-medium">
                    <Check className="w-3.5 h-3.5 text-brand-amberDark" />
                    <span>مرحله مهندسی تاییدشده</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
