import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Sliders, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

export const PlatformHero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pb-28 bg-navy-900 text-white overflow-hidden">
      {/* Background with Grid & Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-cyan/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-brand-copper/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-navy-800/90 border border-slate-700 text-brand-cyan text-xs sm:text-sm font-medium mb-6">
            <Sliders className="w-3.5 h-3.5" />
            <span>پلتفرم تخصصی پردازش داده‌های متالورژیکی</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black font-vazir leading-tight md:leading-[1.15] mb-6 tracking-tight">
            سامانه تحلیل و پردازش داده‌های{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-l from-brand-cyan via-sky-300 to-white">
              خطوط فرآوری
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-300 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-10 max-w-3xl mx-auto">
            بستری نرم‌افزاری برای دریافت، پردازش و تحلیل اطلاعات عملیاتی مرتبط با فرآیندهای فرآوری مواد معدنی؛ طراحی‌شده جهت انطباق با واقعیت‌های میدانی کارخانجات کانی‌آرایی.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              to="/contact"
              variant="copper"
              size="lg"
              icon={<ArrowLeft className="w-4 h-4" />}
              className="w-full sm:w-auto font-semibold shadow-glow-copper"
            >
              درخواست معرفی سامانه
            </Button>
            <a
              href="#dashboard-demo"
              className="inline-flex items-center justify-center text-sm sm:text-base px-6 py-3.5 rounded-[10px] bg-navy-800 border border-slate-700 text-slate-200 hover:text-white hover:bg-navy-700 transition-colors w-full sm:w-auto font-medium"
            >
              مشاهده دموی تعاملی داشبورد
            </a>
          </div>

          {/* Feature Highlights */}
          <div className="pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-y-3 gap-x-8 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-cyan" />
              <span>پیکربندی بر اساس فلوشیت اختصاصی کارخانه</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-brand-copper" />
              <span>قابلیت استقرار در شبکه داخلی ایزوله (On-Premises)</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>محاسبه استاندارد موازنه جرم و راندمان متالورژیکی</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
