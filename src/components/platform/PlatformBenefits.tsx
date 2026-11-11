import React from 'react';
import { Eye, FileCheck, Award, Layers, Sparkles } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformBenefits: React.FC = () => {
  const benefits = [
    {
      title: 'دید یکپارچه و شفافیت فرآیندی',
      desc: 'حذف جزیره‌های اطلاعاتی میان اپراتورها، سرپرستان و آزمایشگاه و مشاهده همزمان رفتار خطوط تولید.',
      icon: <Eye className="w-6 h-6 text-brand-blue" />,
    },
    {
      title: 'بهبود چرخه گزارش‌گیری صنعتی',
      desc: 'تولید سریع کارنامه‌های عملکرد شیفت و ماهانه بدون اتلاف وقت در تدوین دستی شیت‌های محاسباتی.',
      icon: <FileCheck className="w-6 h-6 text-brand-cyan" />,
    },
    {
      title: 'تسهیل ارزیابی دقیق متالورژیکی',
      desc: 'محاسبه شفاف راندمان بازیابی، نسبت تغلیظ و موازنه جرم بر پایه فرمول‌های دقیق کانی‌آرایی.',
      icon: <Award className="w-6 h-6 text-brand-copper" />,
    },
    {
      title: 'ساختارمندسازی دارایی‌های دانشی',
      desc: 'ثبت و حفظ تجارب عملیاتی خط تولید در قالب پایگاه داده متمرکز و تاریخچه‌محور برای سالیان متمادی.',
      icon: <Layers className="w-6 h-6 text-emerald-600" />,
    },
    {
      title: 'زیربنای آماده برای مدل‌سازی‌های آتی',
      desc: 'ایجاد مجموعه داده‌های پالایش‌شده و بدون خطا به عنوان پیش‌نیاز قطعی پیاده‌سازی مدل‌های هوشمند در آینده.',
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="مزایای راهبردی سامانه"
            title="ارزش افزوده استقرار سامانه داده در خطوط فرآوری"
            description="پایه‌ریزی مدیریت کارخانه بر شواهد عینی، کاهش عدم قطعیت‌ها و ایجاد انضباط پایدار در پایش عملیات."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((b, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.09}>
              <div className="p-7 rounded-card bg-slate-50 border border-slate-100 hover:border-brand-blue/30 hover:bg-white hover:shadow-card transition-all duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 flex items-center justify-center mb-5 shadow-sm">
                    {b.icon}
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-navy-900 mb-2 font-vazir">
                    {b.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {b.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                  ارزش عملیاتی اثبات‌پذیر
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
