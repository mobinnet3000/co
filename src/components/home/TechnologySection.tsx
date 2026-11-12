import React from 'react';
import { Layers, Database, Cpu, Binary, BarChart3, Presentation } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const TechnologySection: React.FC = () => {
  const layers = [
    {
      title: 'عملیات صنعتی خطوط',
      en: 'Industrial Operations',
      desc: 'سنگ‌شکنی، آسیاکنی، فلوتاسیون، جدایش مغناطیسی و فیلتراسیون',
      icon: <Layers className="w-5 h-5 text-[#EFA73F]" />,
      accentColor: '#EFA73F',
    },
    {
      title: 'گردآوری داده‌ها',
      en: 'Data Collection',
      desc: 'لاگ‌های اپراتوری، شیت‌های تحلیلی کانی‌آرایی و مقادیر توزین',
      icon: <Database className="w-5 h-5 text-[#0F1821]" />,
      accentColor: '#0F1821',
    },
    {
      title: 'مهندسی داده',
      en: 'Data Engineering',
      desc: 'مدل‌سازی پایگاه داده، یکپارچه‌سازی جداول و انطباق برچسب‌های زمانی',
      icon: <Cpu className="w-5 h-5 text-[#D48E28]" />,
      accentColor: '#D48E28',
    },
    {
      title: 'پردازش و هموارسازی',
      en: 'Data Processing',
      desc: 'فیلتر داده‌های ناهنجار، نرمال‌سازی و محاسبه موازنه‌های متالورژیکی',
      icon: <Binary className="w-5 h-5 text-[#C92127]" />,
      accentColor: '#C92127',
    },
    {
      title: 'تحلیل داده‌های صنعتی',
      en: 'Industrial Analytics',
      desc: 'بررسی همبستگی متغیرها، کشف الگوهای نوسان راندمان و نقاط بحرانی',
      icon: <BarChart3 className="w-5 h-5 text-[#EFA73F]" />,
      accentColor: '#EFA73F',
    },
    {
      title: 'بصری‌سازی و گزارش‌گیری',
      en: 'Information Visualization',
      desc: 'داشبوردهای تعاملی وب، گزارش‌های تحلیلی شیفت و کارنامه‌های مدون',
      icon: <Presentation className="w-5 h-5 text-[#2B8367]" />,
      accentColor: '#2B8367',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-brand-sand text-[#0F1821] relative overflow-hidden border-b border-[#E3DAD0]/70">
      {/* Background Architectural Guidelines - MadanCo Precision */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
        <div className="absolute top-[20%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            variant="light"
            align="center"
            eyebrow="معماری پیوند صنعت و فناوری"
            title="ترکیب دانش فرآوری و فناوری داده"
            description="نگاشت زنجیره ارزش داده از تجهیزات کارخانه تا بالاترین لایه تصمیم‌گیری مدیریتی با رعایت انضباط مهندسی معدنکو."
          />
        </AnimatedSection>

        {/* Visual Layer Architecture Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {layers.map((layer, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.08}>
              <div className="bg-white/85 backdrop-blur-md border border-[#E3DAD0] rounded-2xl p-6 sm:p-7 shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-brand-sand border border-[#E3DAD0] group-hover:scale-105 group-hover:border-[#EFA73F] transition-all">
                      {layer.icon}
                    </div>
                    <span className="font-mono text-xs font-semibold text-[#0F1821] bg-brand-sand px-3 py-1 rounded-[8px] border border-[#E3DAD0]">
                      LEVEL 0{idx + 1}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] uppercase tracking-wider text-[#6B7B8C] block mb-1">
                    {layer.en}
                  </span>
                  <h3 className="text-lg font-bold text-[#0F1821] mb-2 font-vazir group-hover:text-[#C92127] transition-colors">
                    {layer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#1D2D3D]/80 leading-relaxed font-light">
                    {layer.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3.5 border-t border-[#E3DAD0]/60 flex items-center justify-between text-[11px] text-[#6B7B8C] font-light">
                  <span>همگرایی فناوری و متالورژی</span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-[#0F1821]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F] animate-pulse"></span>
                    CONNECTED
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-[#6B7B8C] max-w-2xl mx-auto font-light">
          * این زنجیره بر مبنای منطق تحلیل و مهندسی داده صنعتی معدنکو (شرکت محاسبات عملیات داده ارزیابی نوین) طراحی شده است.
        </div>
      </div>
    </section>
  );
};
