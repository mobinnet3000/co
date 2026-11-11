import React from 'react';
import { ArrowLeft, Database, Sliders, LineChart, FileText } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformOverview: React.FC = () => {
  const steps = [
    {
      num: '۰۱',
      title: 'دریافت داده',
      en: 'Data Input',
      desc: 'ثبت پارامترهای عملیاتی، گزارش‌های ساعتی اپراتوری و آنالیز عیارسنجی آزمایشگاه کانی‌آرایی.',
      icon: <Database className="w-5 h-5 text-brand-amber" />,
      tag: 'جریان اولیه',
    },
    {
      num: '۰۲',
      title: 'پردازش داده',
      en: 'Data Processing',
      desc: 'اعتبارسنجی فیزیکی، غربال ناهنجاری‌ها و هموارسازی داده‌های ناشی از توقف تجهیزات.',
      icon: <Sliders className="w-5 h-5 text-slate-300" />,
      tag: 'پاک‌سازی و فیلتر',
    },
    {
      num: '۰۳',
      title: 'تحلیل داده',
      en: 'Data Analysis',
      desc: 'بررسی همبستگی متغیرها، پایش روند بازیابی و شناسایی دلایل نوسان کارایی در طول زمان.',
      icon: <LineChart className="w-5 h-5 text-brand-crimson" />,
      tag: 'محاسبات متالورژیکی',
    },
    {
      num: '۰۴',
      title: 'گزارش و بینش',
      en: 'Reports & Insights',
      desc: 'ارائه داشبوردهای بصری تعاملی و کارنامه‌های مدون شیفت جهت تصمیم‌گیری آگاهانه مدیران.',
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      tag: 'تصمیم‌گیری مستند',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-navy-950 text-white relative overflow-hidden">
      {/* Background Decorative patterns */}
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            variant="dark"
            eyebrow="پلتفرم نرم‌افزاری معدنکو"
            title="سامانه‌ای برای پایش و تحلیل داده‌های خطوط فرآوری"
            description="بستری یکپارچه برای دریافت، پردازش، تحلیل و ارزیابی اطلاعات خطوط کانی‌آرایی؛ گامی اساسی در گذار از گزارش‌های کاغذی به تصمیم‌گیری مبتنی بر داده."
            className="mb-0 max-w-2xl"
          />
          <Button
            to="/platform"
            variant="copper"
            size="md"
            icon={<ArrowLeft className="w-4 h-4" />}
            className="self-start md:self-auto flex-shrink-0 bg-brand-amber text-navy-950 font-bold border-none"
          >
            مشاهده جزئیات سامانه
          </Button>
        </AnimatedSection>

        {/* 4 Connected Nodes / Workflow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <AnimatedSection key={index} delay={index * 0.12}>
              <div className="relative h-full bg-navy-900 rounded-2xl p-6 border border-slate-800 hover:border-brand-amber/50 transition-all duration-300 group flex flex-col justify-between">
                <div>
                  {/* Top Row: Icon & Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-xl bg-navy-950 border border-slate-800 group-hover:scale-105 transition-transform duration-200">
                      {step.icon}
                    </div>
                    <span className="font-mono text-2xl font-black text-slate-600 group-hover:text-brand-amber transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <div className="text-[11px] font-mono text-brand-amber mb-1">{step.en}</div>
                  <h3 className="text-lg font-bold text-white mb-3 font-vazir group-hover:text-brand-amber transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light mb-4">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                  <span className="bg-navy-950 px-2 py-0.5 rounded text-[10px] text-slate-400 border border-slate-800">
                    {step.tag}
                  </span>
                  <span className="text-brand-amber font-mono text-[10px]">MADAN FLOW</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Note on Transparency */}
        <AnimatedSection delay={0.4} className="mt-12 text-center">
          <p className="text-xs text-slate-400 max-w-2xl mx-auto bg-navy-900 border border-slate-800 py-3 px-4 rounded-xl font-light">
            <strong className="text-brand-amber font-semibold">شفافیت فرآیندی معدنکو:</strong> مراحل فوق منطق عملکردی سامانه را توصیف می‌کنند. امکانات تکمیلی از جمله ارتباط با ابزار دقیق پس از ارزیابی‌های فنی هر کارخانه پیکربندی می‌گردند.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
};
