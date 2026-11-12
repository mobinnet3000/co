import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Eye, Database, Scale, FileSpreadsheet, Compass, Cpu } from 'lucide-react';
import { AnimatedSection } from '../common/AnimatedSection';

export const Advantages: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [30, -25]);
  const yOdd = useTransform(scrollYProgress, [0, 1], [30, -25]);
  const yEven = useTransform(scrollYProgress, [0, 1], [60, -45]);

  const advantages = [
    {
      code: 'ADV // 01',
      tag: 'TRANSPARENCY',
      metric: 'REAL-TIME TELEMETRY',
      title: 'پایش مستمر و شفافیت متالورژیکی',
      desc: 'حذف نقاط کور فرآیند خردایش و فلوتاسیون، ثبت بدون وقفه متغیرها و ایجاد زبان مشترک همزمان میان اتاق کنترل و مدیریت کارخانه.',
      pillar: 'رصد لحظه‌ای نوسانات عیار خوراک و باطله',
      icon: <Eye className="w-5 h-5 text-[#0F1821] group-hover:text-[#C92127] transition-colors" />,
    },
    {
      code: 'ADV // 02',
      tag: 'DATA INTEGRITY',
      metric: 'STRUCTURED ARCHIVE',
      title: 'دسترسی ساختارمند به داده‌های صنعتی',
      desc: 'بایگانی متمرکز و تاریخچه‌محور پارامترهای کانی‌آرایی به جای فایل‌های اکسل آسیب‌پذیر و پراکنده در سیستم‌های اپراتوری.',
      pillar: 'بایگانی ایمن و قابل جستجوی سوابق تولید',
      icon: <Database className="w-5 h-5 text-[#0F1821] group-hover:text-[#EFA73F] transition-colors" />,
    },
    {
      code: 'ADV // 03',
      tag: 'MASS BALANCE',
      metric: 'MASS CONSERVATION',
      title: 'بهینه‌سازی بر پایه موازنه متالورژیکی',
      desc: 'محاسبه دقیق راندمان بازیابی، نسبت تغلیظ و کارایی مدارهای خردایش بر مبنای قوانین بقای جرم و معادلات رسمی کانی‌آرایی.',
      pillar: 'فرمول‌های دو و سه‌محصولی بدون خطای انباشت',
      icon: <Scale className="w-5 h-5 text-[#0F1821] group-hover:text-[#C92127] transition-colors" />,
    },
    {
      code: 'ADV // 04',
      tag: 'AUTOMATION',
      metric: 'ZERO HUMAN DRIFT',
      title: 'خودکارسازی گزارش‌گیری و صدور کارنامه',
      desc: 'کاهش زمان تلف‌شده مهندسین در محاسبات دستی شیفت‌ها، تولید کارنامه‌های خودکار آماری و افزایش دقت مقایسه‌های ادواری.',
      pillar: 'تولید سیستماتیک کارنامه شیفت و ماهیانه',
      icon: <FileSpreadsheet className="w-5 h-5 text-[#0F1821] group-hover:text-[#EFA73F] transition-colors" />,
    },
    {
      code: 'ADV // 05',
      tag: 'DECISION LOGIC',
      metric: 'STATISTICAL EVIDENCE',
      title: 'پشتیبانی کمّی از تصمیم‌گیری مهندسی',
      desc: 'کاهش وابستگی به قضاوت‌های تجربی انفرادی و فراهم ساختن شواهد عددی برای تنظیم بهینه دوز واکنش‌یارها، توان آسیا و بار در گردش.',
      pillar: 'تنظیم پارامترهای مدار بر اساس شواهد آماری',
      icon: <Compass className="w-5 h-5 text-[#0F1821] group-hover:text-[#C92127] transition-colors" />,
    },
    {
      code: 'ADV // 06',
      tag: 'AI FOUNDATION',
      metric: 'DIGITAL TWIN READY',
      title: 'پایه‌گذاری بلوغ هوشمند صنعتی',
      desc: 'ایجاد دیتاست‌های استاندارد، پالایش‌شده و بدون گسست جهت هموارسازی مسیر استقرار سیستم‌های کنترل هوشمند فرآیند (APC) و دوقلوی دیجیتال.',
      pillar: 'زیرساخت آماده برای مدل‌سازی‌های پیشرفته',
      icon: <Cpu className="w-5 h-5 text-[#0F1821] group-hover:text-[#EFA73F] transition-colors" />,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-b border-brand-border"
    >
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-[22%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
        <div className="absolute bottom-[18%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading with Parallax */}
        <motion.div style={{ y: headerY }} className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
            <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
            <span className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-[#0F1821] font-semibold">
              ADVANTAGES // مزایای رویکرد محاسباتی معدنکو
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1821] font-vazir tracking-tight leading-snug md:leading-tight mb-4">
            چرا پایش و بهینه‌سازی داده‌محور اهمیت دارد؟
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
            اصول و مزایای استقرار انضباط داده‌های صنعتی در ارتقای راندمان متالورژیکی، شفافیت کارخانه و کاهش خطاهای عملیاتی.
          </p>
        </motion.div>

        {/* 6-Card Grid with Staggered Scroll Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {advantages.map((adv, idx) => {
            const isEven = idx % 2 === 0;
            const yTransform = isEven ? yEven : yOdd;

            return (
              <motion.div
                key={idx}
                style={{ y: yTransform }}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl p-6 sm:p-7 border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:border-[#0F1821]/40 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
                  <div>
                    {/* Top Technical Metadata Bar */}
                    <div className="flex items-center justify-between pb-3.5 mb-3 border-b border-[#E3DAD0]/70 text-[10px] font-mono">
                      <span className="text-slate-400 font-semibold tracking-wider">
                        {adv.code}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-[10px] bg-[#FAF7F3] border border-[#E3DAD0] text-[#0F1821] font-mono font-semibold text-[10px]">
                        {adv.metric}
                      </span>
                    </div>

                    {/* Icon Box */}
                    <div className="w-11 h-11 rounded-[10px] bg-[#FAF7F3] border border-[#E3DAD0] flex items-center justify-center my-4 group-hover:border-[#0F1821]/30 transition-colors shadow-xs">
                      {adv.icon}
                    </div>

                    {/* Title */}
                    <h3 className="text-base sm:text-lg font-bold text-[#0F1821] mb-2 font-vazir group-hover:text-[#C92127] transition-colors">
                      {adv.title}
                    </h3>

                    {/* Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-4">
                      {adv.desc}
                    </p>
                  </div>

                  {/* Bottom Operational Pillar Tag */}
                  <div className="pt-3.5 border-t border-[#E3DAD0]/70 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
                      <span className="text-[11px] font-sans font-medium">{adv.pillar}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-400">
                      0{idx + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Technical Footnote */}
        <div className="mt-12 text-center text-xs text-slate-500 font-light font-mono">
          * کلیه شاخص‌ها و محاسبات فوق منطبق بر استانداردهای موازنه متالورژیکی و اصول کانی‌آرایی صنعتی طراحی شده‌اند.
        </div>
      </div>
    </section>
  );
};
