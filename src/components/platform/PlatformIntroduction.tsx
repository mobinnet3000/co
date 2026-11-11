import React from 'react';
import { AlertTriangle, CheckCircle, Database, Network, Clock, FileWarning, SearchX } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformIntroduction: React.FC = () => {
  const challenges = [
    {
      title: 'پراکندگی اطلاعات عملیاتی',
      desc: 'ذخیره داده‌ها در شیت‌های اکسل شخصی، فرم‌های کاغذی شیفت و فایل‌های پراکنده در سیستم‌های اپراتوری.',
      icon: <SearchX className="w-5 h-5 text-amber-500" />,
    },
    {
      title: 'دشواری دسترسی به داده‌های تاریخی',
      desc: 'ساعت‌ها جستجو در بایگانی برای یافتن سوابق کارکرد یک آسیا یا رکوردهای عیار خوراک در سال گذشته.',
      icon: <Clock className="w-5 h-5 text-rose-500" />,
    },
    {
      title: 'پیچیدگی تحلیل چندمتغیره',
      desc: 'سختی کشف ارتباط میان دانه‌بندی کانسنگ ورودی و افت ناگهانی عیار در سلول‌های فلوتاسیون با ابزارهای ساده.',
      icon: <Network className="w-5 h-5 text-indigo-500" />,
    },
    {
      title: 'زمان‌بر بودن فرآیند گزارش‌گیری',
      desc: 'صرف وقت ارزشمند مهندسین فرآیند برای کپی و بازنویسی دستی آمار تولید شیفت‌ها به جای تمرکز بر حل مسائل فنی.',
      icon: <FileWarning className="w-5 h-5 text-amber-600" />,
    },
    {
      title: 'نبود دید یکپارچه متالورژیکی',
      desc: 'تضاد آمار میان واحدهای تولید، آزمایشگاه و انبار به دلیل فقدان یک سیستم واحد اعتبارسنجی و موازنه.',
      icon: <AlertTriangle className="w-5 h-5 text-rose-600" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* The Problem Section */}
        <AnimatedSection className="mb-20">
          <SectionHeading
            eyebrow="چالش‌های صنعت فرآوری"
            title="داده‌های عملیاتی زمانی ارزشمندند که قابل استفاده باشند"
            description="در کارخانجات فرآوری مواد معدنی، روزانه انبوهی از داده‌های کمی و کیفی تولید می‌شود؛ اما بدون ساختار مناسب، این اطلاعات نه تنها کمکی به بهبود فرآیند نمی‌کنند بلکه به بار کاری مضاعف تبدیل می‌شوند."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((c, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card bg-slate-50 border border-slate-200/80 hover:border-slate-300 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center mb-4 shadow-sm">
                  {c.icon}
                </div>
                <h3 className="text-base font-bold text-navy-900 mb-2 font-vazir">
                  {c.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {c.desc}
                </p>
              </div>
            ))}
          </div>
        </AnimatedSection>

        {/* The Solution Section */}
        <AnimatedSection>
          <div className="rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 p-8 sm:p-12 text-white border border-slate-700 relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>

            <div className="relative z-10 max-w-3xl">
              <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
                THE SOLUTION PLATFORM
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir leading-tight mb-6">
                پاسخ ما: ایجاد یک چارچوب ساختاریافته برای جریان داده‌های متالورژیکی
              </h2>
              <p className="text-slate-300 text-base md:text-lg leading-relaxed font-light mb-8">
                سامانه توسعه‌یافته شرکت محاسبات عملیات داده ارزیابی نوین، بستری یکدست و تخصصی برای جمع‌آوری داده‌های خطوط فرآوری، اعتبارسنجی اولیه، پالایش ناهنجاری‌ها و اجرای محاسبات متالورژیکی فراهم می‌آورد تا دسترسی به اطلاعات با حداقل پیچیدگی میسر شود.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-200">سازگار با شیفت‌بندی کارخانجات معدنی ایران</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-brand-copper flex-shrink-0" />
                  <span className="text-sm font-medium text-slate-200">حفظ محرمانگی مطلق و عدم وابستگی به اینترنت</span>
                </div>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
