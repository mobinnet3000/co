import React from 'react';
import { Eye, FolderArchive, Award, FileSpreadsheet, Compass, Rocket } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const Advantages: React.FC = () => {
  const advantages = [
    {
      title: 'پایش مستمر و شفافیت عملیاتی',
      desc: 'حذف نقاط کور فرآیند و ایجاد درک همزمان از وضعیت خط برای تمام رده‌های مدیریتی و مهندسی.',
      icon: <Eye className="w-5 h-5 text-brand-amberDark" />,
    },
    {
      title: 'دسترسی ساختارمند به داده‌ها',
      desc: 'بایگانی متمرکز و تاریخچه‌محور متغیرها به جای فایل‌های اکسل پراکنده در سیستم‌های اپراتوری.',
      icon: <FolderArchive className="w-5 h-5 text-navy-800" />,
    },
    {
      title: 'بهینه‌سازی بر پایه موازنه متالورژیکی',
      desc: 'محاسبه شفاف راندمان بازیابی، نسبت تغلیظ و کارایی تجهیزات بر مبنای قوانین علمی کانی‌آرایی.',
      icon: <Award className="w-5 h-5 text-brand-crimson" />,
    },
    {
      title: 'ساده‌سازی گزارش‌گیری صنعتی',
      desc: 'کاهش زمان تلف‌شده مهندسین در آماده‌سازی دستی گزارش‌ها و تولید کارنامه‌های خودکار شیفت.',
      icon: <FileSpreadsheet className="w-5 h-5 text-emerald-600" />,
    },
    {
      title: 'پشتیبانی اطلاعاتی از تصمیم‌گیری',
      desc: 'کاهش وابستگی به تصمیمات حسی و فراهم ساختن شواهد عددی برای تنظیم بهینه پارامترهای مدار خردایش و فلوتاسیون.',
      icon: <Compass className="w-5 h-5 text-indigo-600" />,
    },
    {
      title: 'پایه‌گذاری بلوغ هوشمند صنعتی',
      desc: 'فراهم‌سازی بستر دیتاست‌های استاندارد و پاک‌سازی‌شده برای مدل‌سازی‌های پیشرفته آینده.',
      icon: <Rocket className="w-5 h-5 text-sky-600" />,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-white border-b border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="ارزش‌های بنیادین رویکرد معدنکو"
            title="چرا پایش و بهینه‌سازی داده‌محور اهمیت دارد؟"
            description="اصول و مزایای استقرار انضباط داده‌های صنعتی در ارتقای راندمان متالورژیکی و کاهش خطاهای عملیاتی."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((adv, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.08}>
              <div className="p-7 rounded-2xl bg-brand-sand border border-brand-border hover:border-brand-amber/50 hover:bg-white hover:shadow-card transition-all duration-300">
                <div className="w-12 h-12 rounded-xl bg-white border border-brand-border flex items-center justify-center mb-5 shadow-xs">
                  {adv.icon}
                </div>
                <h3 className="text-base font-bold text-navy-950 mb-2 font-vazir">
                  {adv.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                  {adv.desc}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-12 text-center text-xs text-slate-400 font-light">
          * موارد فوق گزاره‌های ارزش مهندسی استقرار داده در محیط‌های صنعتی هستند و بدون ادعاهای مبالغه‌آمیز تعریف شده‌اند.
        </div>
      </div>
    </section>
  );
};
