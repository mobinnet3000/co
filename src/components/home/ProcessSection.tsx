import React from 'react';
import { Compass, Layers, ShieldCheck, Activity, Check } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';

export const ProcessSection: React.FC = () => {
  const steps = [
    {
      numFa: '۰۱',
      code: 'PHASE // 01',
      title: 'دریافت و تجمیع داده‌ها',
      enTitle: 'Data Ingestion',
      desc: 'ثبت و گردآوری داده‌های عملیاتی خطوط فرآوری از لاگ‌بوک‌های شیفت، برخط‌سنج‌ها (Online Analyzers)، آزمون‌های آزمایشگاهی و تناژ خوراک.',
      metric: 'TPH / P80 / DENSITY',
      verification: 'تأییدیه ساختار و پروتکل ورود',
      icon: <Compass className="w-5 h-5 text-[#0F1821] group-hover:text-[#C92127] transition-colors" />,
    },
    {
      numFa: '۰۲',
      code: 'PHASE // 02',
      title: 'آماده‌سازی و پالایش متغیرها',
      enTitle: 'Data Conditioning',
      desc: 'ساختاردهی، فیلتراسیون داده‌های ناهنجار و پرت، انطباق زمان‌بندی شیفت‌های کاری و پالایش نویزهای سنسوری جهت محاسبات دقیق متالورژیکی.',
      metric: 'OUTLIER REJECTION // 99%',
      verification: 'اعتبارسنجی آماری متغیرها',
      icon: <Layers className="w-5 h-5 text-[#0F1821] group-hover:text-[#EFA73F] transition-colors" />,
    },
    {
      numFa: '۰۳',
      code: 'PHASE // 03',
      title: 'موازنه جرم و تحلیل عمیق',
      enTitle: 'Metallurgical Balance',
      desc: 'محاسبه دقیق موازنه جرم و فلز، ارزیابی راندمان بازیابی، نسبت تغلیظ و تحلیل همبستگی متغیرهای کلیدی بر پایه قوانین رسمی کانی‌آرایی.',
      metric: 'MASS & RECOVERY BALANCE',
      verification: 'انطباق موازنه بقای جرم',
      icon: <ShieldCheck className="w-5 h-5 text-[#0F1821] group-hover:text-[#C92127] transition-colors" />,
    },
    {
      numFa: '۰۴',
      code: 'PHASE // 04',
      title: 'ارائه داشبورد و ماتریس تصمیم',
      enTitle: 'Decision Matrix',
      desc: 'نمایش نتایج در قالب داشبوردهای مانیتورینگ متالورژیکی، صدور کارنامه‌های شیفت و ارائه هشدارهای زودهنگام انحراف عیار برای تصمیم‌یاری سریع.',
      metric: 'REAL-TIME KPI MATRIX',
      verification: 'صدور کارنامه عملیاتی خط',
      icon: <Activity className="w-5 h-5 text-[#0F1821] group-hover:text-[#EFA73F] transition-colors" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-b border-brand-border">
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
        <div className="absolute bottom-[16%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <AnimatedSection className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
            <span className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-slate-500 font-semibold">
              METHODOLOGY // 04 PIPELINE PHASES
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1821] font-vazir tracking-tight leading-snug md:leading-tight mb-4">
            از داده‌های خام تا اطلاعات قابل تصمیم‌گیری
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            چرخه مهندسی استاندارد معدنکو برای تبدیل اطلاعات پراکنده اتاق کنترل، آزمایشگاه و شیفت‌های کاری به شاخص‌های شفاف، پایدار و قابل اتکا.
          </p>
        </AnimatedSection>

        {/* Timeline Desktop Flow Line & Step Cards */}
        <div className="relative">
          {/* Engineering Flow Line connecting cards on desktop */}
          <div className="hidden lg:block absolute top-[42%] left-6 right-6 h-[1px] bg-gradient-to-l from-brand-border via-brand-amber/50 to-brand-border -translate-y-6 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-7 relative z-10">
            {steps.map((step, idx) => (
              <AnimatedSection key={idx} delay={idx * 0.12}>
                <div className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:border-[#0F1821]/40 transition-all duration-300 relative flex flex-col justify-between h-full group">
                  <div>
                    {/* Top Technical Metadata Bar */}
                    <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-[#E3DAD0]/70">
                      <div className="w-11 h-11 rounded-[10px] bg-[#FAF7F3] border border-[#E3DAD0] flex items-center justify-center group-hover:border-[#0F1821]/30 transition-colors shadow-xs">
                        {step.icon}
                      </div>

                      <div className="text-left">
                        <span className="block text-2xl font-mono font-black text-[#0F1821] leading-none">
                          {step.numFa}
                        </span>
                        <span className="block text-[9px] font-mono text-slate-400 tracking-wider mt-1">
                          {step.code}
                        </span>
                      </div>
                    </div>

                    {/* Step Title & Subtitle */}
                    <div className="mb-3">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-brand-amberDark font-semibold block mb-1">
                        {step.enTitle}
                      </span>
                      <h3 className="text-lg font-bold text-[#0F1821] font-vazir group-hover:text-[#C92127] transition-colors">
                        {step.title}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                      {step.desc}
                    </p>

                    {/* Metric Chip */}
                    <div className="mb-4">
                      <span className="inline-block text-[10px] font-mono px-2.5 py-1 rounded-[6px] bg-[#FAF7F3] text-[#0F1821] border border-[#E3DAD0]/80 font-medium tracking-wide">
                        {step.metric}
                      </span>
                    </div>
                  </div>

                  {/* Verification Quality Gate */}
                  <div className="pt-3.5 border-t border-[#E3DAD0]/70 flex items-center justify-between text-xs text-slate-600">
                    <div className="flex items-center gap-1.5 font-medium">
                      <span className="w-4 h-4 rounded-full bg-[#FAF7F3] border border-brand-amber flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-brand-amberDark" />
                      </span>
                      <span className="text-[11px] font-sans">{step.verification}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">PASSED</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Footnote */}
        <div className="mt-12 text-center text-xs text-slate-400 font-light font-mono">
          * تمامی گام‌های چرخه منطبق بر استانداردهای تحلیل داده‌های پیوسته متالورژی استخراجی طراحی شده‌اند.
        </div>
      </div>
    </section>
  );
};
