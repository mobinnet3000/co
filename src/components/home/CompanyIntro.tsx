import React from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Sliders, ShieldCheck, Activity } from 'lucide-react';
import { Button } from '../common/Button';

export const CompanyIntro: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const visualRef = React.useRef<HTMLDivElement>(null);

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgScrollY = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const textScrollY = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const guidelineScale = useTransform(scrollYProgress, [0.1, 0.6], [0.3, 1]);

  // 3D Mouse Dynamic Physics Tracking (Identical to Hero Section)
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Big Visual Frame 3D Transforms
  const frameRotateX = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const frameRotateY = useTransform(smoothX, [-0.5, 0.5], [11, -11]);
  const frameTranslateX = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const frameTranslateY = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  // Small Floating Chip High-Altitude Parallax Transforms
  const chipMouseX = useTransform(smoothX, [-0.5, 0.5], [30, -30]);
  const chipMouseY = useTransform(smoothY, [-0.5, 0.5], [22, -22]);
  const chipRotateX = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const chipRotateY = useTransform(smoothX, [-0.5, 0.5], [16, -16]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rawX.set(x);
    rawY.set(y);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand border-b border-[#E3DAD0] relative overflow-hidden select-none"
    >
      {/* Background Architectural Guidelines - Dynamically Scaled by Scroll */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-[#E3DAD0]/70"></div>
        <motion.div
          style={{ scaleX: guidelineScale }}
          className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#E3DAD0]/50 origin-center"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Right Column: Industrial Visual & Engineering Card with 3D Dynamic Mouse Tracking */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <motion.div
              style={{ y: imgScrollY }}
              className="relative pb-12 sm:pb-16"
            >
              <div
                ref={visualRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative cursor-pointer"
                style={{ perspective: 1000 }}
              >
                {/* Big Luxury Frame Container with 3D Tilt */}
                <motion.div
                  style={{
                    rotateX: frameRotateX,
                    rotateY: frameRotateY,
                    x: frameTranslateX,
                    y: frameTranslateY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="relative rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] p-4 sm:p-5 shadow-elevated group"
                >
                  {/* Frame Header Meta */}
                  <div className="flex items-center justify-end pb-3 mb-3.5 border-b border-[#E3DAD0]/70 text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C92127] animate-pulse"></span>
                      <span className="text-[#C92127] font-semibold">SYS.ONLINE</span>
                    </div>
                  </div>

                  {/* Industrial Photo Surface */}
                  <div className="relative rounded-2xl overflow-hidden border border-[#E3DAD0]/80 aspect-[4/3] sm:aspect-square bg-navy-950">
                    <img
                      src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=80"
                      alt="خطوط فرآوری و تجهیزات کانی‌آرایی صنعتی معدنکو"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-95"
                      loading="lazy"
                    />
                    {/* Subtle Gradient & Engineering Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy-950/85 via-navy-950/20 to-transparent"></div>

                    <div className="absolute bottom-3 left-3 flex items-center text-[10px] font-mono text-slate-300">
                      <span className="text-brand-amber font-semibold">REAL-TIME TELEMETRY</span>
                    </div>
                  </div>

                  {/* Frame Bottom Status - Clear & Unobstructed */}
                  <div className="pt-3.5 mt-3 border-t border-[#E3DAD0]/70 flex items-center justify-between text-[11px] sm:text-xs text-slate-600">
                    <span className="flex items-center gap-1.5 font-medium leading-snug">
                      <Activity className="w-3.5 h-3.5 text-brand-amberDark flex-shrink-0" />
                      <span>کنترل مدار با حداقل هزینه و بصورت پیوسته و بدون تاخیر به علت حذف مراحل واسطه</span>
                    </span>
                  </div>
                </motion.div>

                {/* Small Floating Chip Box - Shifted Lower to Keep Caption 100% Legible */}
                <motion.div
                  style={{
                    rotateX: chipRotateX,
                    rotateY: chipRotateY,
                    x: chipMouseX,
                    y: chipMouseY,
                    transformStyle: 'preserve-3d',
                  }}
                  className="hidden sm:block absolute -bottom-16 -left-4 sm:-bottom-20 md:-bottom-24 sm:-left-8 bg-white/95 backdrop-blur-md border border-[#E3DAD0] rounded-2xl p-4 shadow-[0_20px_45px_-8px_rgba(15,24,33,0.22),0_6px_16px_-2px_rgba(15,24,33,0.1)] ring-1 ring-black/5 max-w-[240px] sm:max-w-[260px] z-20 pointer-events-none"
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="w-6 h-6 rounded-[8px] bg-brand-amber/15 border border-brand-amber/30 flex items-center justify-center text-brand-amberDark flex-shrink-0">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#C92127]" />
                    </div>
                    <span className="text-xs font-bold text-navy-950 font-vazir leading-none">
                      پایش و بهینه‌سازی کانی‌آرایی
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-relaxed font-light mt-2 border-t border-[#E3DAD0]/60 pt-2 text-justify">
                    مبتنی بر استانداردهای مهندسی داده و پیش بینی و تخمین با پشتوانه تجربیات پرتکرار مدارهای فرآوری (Machine Learning)
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </div>

          {/* Left Column: Editorial Copy & Core Pillars (7 cols) with Subtle Scroll Float */}
          <motion.div
            style={{ y: textScrollY }}
            className="lg:col-span-7 order-1 lg:order-2 text-right"
          >
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
              <span className="w-2 h-2 rounded-full bg-[#C92127]"></span>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-navy-950">
                COMPANY IDENTITY // هویت و مأموریت معدنکو
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 font-vazir tracking-tight leading-snug md:leading-tight mb-6">
              نگاهی مهندسی و دقیق‌تر به عملیات و فرآوری مواد معدنی
            </h2>

            {/* Exact Requested Text Paragraphs - Fully Justified */}
            <div className="space-y-4 text-slate-600 text-base md:text-[17px] font-light">
              <p className="text-justify leading-relaxed md:leading-loose">
                در خطوط فرآوری مواد معدنی داده های عملیاتی پایه ای ترین ابزار برای درک رفتار متالورژیکی و ارتقای راندمان واقعی کارخانجات هستند.
              </p>
              <p className="text-justify leading-relaxed md:leading-loose">
                با توجه به اهمیت تحت نظر قرار دادن راندمان و کیفیت کارایی یک خط تولید در جهت هدایت سرمایه گذاری اولیه و هزینه های جاری به سمت سوددهی هرچه بیشتر و همچنین حذف واسطه هایی که در این مسیر (از انتقال داده میدانی به دست مهندسین داده پرداز تا انجام مراحل داده پردازی و انتقال مجدد داده های پردازش شده به مدیران و مسئولان میدانی معدن)، مجموعه <strong className="text-navy-950 font-bold">معدنکو</strong> (محاسبات عملیات داده ارزیابی نوین) با تلفیق مهندسی فرآوری کانی ها و متالورژی با علوم داده سامانه ای برای اعتبارسنجی، تحلیل و موازنه پیوسته مواد توسعه داده است تا تصمیم گیری خطوط تولید به جای حدسیات تجربی بر شواهد دقیق محاسباتی استوار باشد.
              </p>
            </div>

            {/* Core Pillars Cards (Cleaned of PILLAR 01/02 labels) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              {/* Pillar 1 */}
              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E3DAD0] shadow-card hover:border-brand-amber transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#0F1821]/5 border border-[#E3DAD0] flex items-center justify-center text-navy-950 group-hover:bg-brand-amber/15 group-hover:text-brand-amberDark transition-colors">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-navy-950 mb-1.5 font-vazir">
                  سازماندهی و یکپارچگی داده‌ها
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light text-justify">
                  ایجاد اتصال منسجم میان گزارش‌های آزمایشگاه عیارسنجی، لاگ‌بوک‌های اپراتوری و ساعات کارکرد خطوط خردایش.
                </p>
              </div>

              {/* Pillar 2 */}
              <div className="p-5 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E3DAD0] shadow-card hover:border-[#C92127] transition-all duration-300 group">
                <div className="mb-3">
                  <div className="w-9 h-9 rounded-[10px] bg-[#C92127]/10 border border-[#C92127]/20 flex items-center justify-center text-[#C92127]">
                    <Sliders className="w-4 h-4" />
                  </div>
                </div>
                <h4 className="text-sm font-bold text-navy-950 mb-1.5 font-vazir">
                  پایش و موازنه متالورژیکی
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light text-justify">
                  سنجش مستمر بازیابی، نسبت تغلیظ و شناسایی افت راندمان در مدارهای فرآوری با موازنه جرم دقیق.
                </p>
              </div>
            </div>

            {/* Action Button & Meta */}
            <div className="flex flex-wrap items-center gap-4">
              <Button
                to="/about"
                variant="primary"
                size="md"
                className="bg-navy-950 hover:bg-navy-900 text-white rounded-[10px] px-6 py-3 font-medium shadow-card hover:shadow-elevated transition-all gap-2"
                icon={<ArrowLeft className="w-4 h-4 text-brand-amber" />}
              >
                بیشتر درباره معدنکو بدانید
              </Button>
              <div className="text-[11px] font-mono text-slate-500 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
                <span>DATA INTEGRATION & METALLURGY</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
