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
      icon: <Layers className="w-5 h-5 text-brand-amber" />,
    },
    {
      title: 'گردآوری داده‌ها',
      en: 'Data Collection',
      desc: 'لاگ‌های اپراتوری، شیت‌های تحلیلی کانی‌آرایی و مقادیر توزین',
      icon: <Database className="w-5 h-5 text-slate-300" />,
    },
    {
      title: 'مهندسی داده',
      en: 'Data Engineering',
      desc: 'مدل‌سازی پایگاه داده، یکپارچه‌سازی جداول و انطباق برچسب‌های زمانی',
      icon: <Cpu className="w-5 h-5 text-brand-amberLight" />,
    },
    {
      title: 'پردازش و هموارسازی',
      en: 'Data Processing',
      desc: 'فیلتر داده‌های ناهنجار، نرمال‌سازی و محاسبه موازنه‌های متالورژیکی',
      icon: <Binary className="w-5 h-5 text-brand-crimson" />,
    },
    {
      title: 'تحلیل داده‌های صنعتی',
      en: 'Industrial Analytics',
      desc: 'بررسی همبستگی متغیرها، کشف الگوهای نوسان راندمان و نقاط بحرانی',
      icon: <BarChart3 className="w-5 h-5 text-amber-400" />,
    },
    {
      title: 'بصری‌سازی و گزارش‌گیری',
      en: 'Information Visualization',
      desc: 'داشبوردهای تعاملی وب، گزارش‌های تحلیلی شیفت و کارنامه‌های مدون',
      icon: <Presentation className="w-5 h-5 text-emerald-400" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            variant="dark"
            align="center"
            eyebrow="معماری پیوند صنعت و فناوری"
            title="ترکیب دانش فرآوری و فناوری داده"
            description="نگاشت زنجیره ارزش داده از تجهیزات کارخانه تا بالاترین لایه تصمیم‌گیری مدیریتی با رعایت انضباط مهندسی معدنکو."
          />
        </AnimatedSection>

        {/* Visual Layer Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {layers.map((layer, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.08}>
              <div className="p-6 rounded-2xl bg-navy-900 border border-slate-800 hover:border-brand-amber/50 transition-all duration-300 group h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 group-hover:scale-105 transition-transform">
                      {layer.icon}
                    </div>
                    <span className="font-mono text-xs text-brand-amber bg-navy-950 px-2.5 py-1 rounded-full border border-slate-800">
                      LEVEL 0{idx + 1}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] text-slate-500 block mb-1">
                    {layer.en}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 font-vazir group-hover:text-brand-amber transition-colors">
                    {layer.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light">
                    {layer.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500 font-light">
                  <span>همگرایی فناوری و متالورژی</span>
                  <span className="text-brand-amber font-mono text-xs">CONNECTED</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-500 max-w-2xl mx-auto font-light">
          * این زنجیره بر مبنای منطق تحلیل و مهندسی داده صنعتی معدنکو طراحی شده است.
        </div>
      </div>
    </section>
  );
};
