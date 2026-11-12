import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Database, Sliders, LineChart, FileText, Activity } from 'lucide-react';
import { Button } from '../common/Button';
import { AnimatedSection } from '../common/AnimatedSection';

interface StepItem {
  num: string;
  title: string;
  en: string;
  desc: string;
  icon: React.ReactNode;
  tag: string;
  metric: string;
  accentColor: string;
  pillBg: string;
}

const StepCard: React.FC<{
  step: StepItem;
  index: number;
  scrollYProgress: any;
}> = ({ step, index, scrollYProgress }) => {
  // Staggered scroll response for each pipeline node
  const startRange = 0.12 + index * 0.1;
  const endRange = Math.min(startRange + 0.28, 0.85);

  const cardY = useTransform(scrollYProgress, [startRange, endRange], [35, 0]);
  const cardOpacity = useTransform(scrollYProgress, [startRange, endRange], [0.45, 1]);
  const cardScale = useTransform(scrollYProgress, [startRange, endRange], [0.96, 1]);

  return (
    <motion.div
      style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
      className={`relative h-full bg-white/85 backdrop-blur-md rounded-2xl p-6 border ${step.accentColor} shadow-card hover:shadow-elevated hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group z-10`}
    >
      <div>
        {/* Top Row: Icon Badge & Monospace Step Number */}
        <div className="flex items-center justify-between mb-5">
          <div className="w-11 h-11 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#EFA73F]/15 group-hover:border-[#EFA73F]/40 transition-all shadow-xs">
            {step.icon}
          </div>
          <span className="font-mono text-2xl font-black text-slate-300 group-hover:text-navy-950 transition-colors">
            {step.num}
          </span>
        </div>

        {/* Technical Sub-Tag */}
        <div className="text-[10px] font-mono font-bold tracking-wider uppercase text-slate-500 mb-1">
          {step.en}
        </div>

        {/* Main Title */}
        <h3 className="text-lg font-bold text-navy-950 mb-2.5 font-vazir group-hover:text-[#C92127] transition-colors leading-snug">
          {step.title}
        </h3>

        {/* Description */}
        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
          {step.desc}
        </p>
      </div>

      {/* Card Footer: Metadata and Status Pill */}
      <div className="pt-3.5 border-t border-[#E3DAD0]/70 flex items-center justify-between text-[11px]">
        <span className={`px-2.5 py-1 rounded-[8px] text-[10px] font-mono font-medium tracking-wide border ${step.pillBg}`}>
          {step.tag}
        </span>
        <span className="text-slate-400 font-mono text-[10px] font-semibold">
          {step.metric}
        </span>
      </div>
    </motion.div>
  );
};

export const PlatformOverview: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Dynamic connecting pipeline progress beam
  const beamScaleX = useTransform(scrollYProgress, [0.15, 0.65], [0.05, 1]);
  const headerY = useTransform(scrollYProgress, [0, 1], [25, -25]);

  const steps: StepItem[] = [
    {
      num: '۰۱',
      title: 'دریافت داده‌های عملیاتی',
      en: 'DATA ACQUISITION',
      desc: 'ثبت پارامترهای پایشی خطوط خردایش، فلوتاسیون، گزارش‌های ساعتی شیفت و آنالیزهای عیارسنجی آزمایشگاه کانی‌آرایی.',
      icon: <Database className="w-5 h-5 text-brand-amberDark" />,
      tag: 'INPUT STREAM',
      metric: '40+ TAGS / SHIFT',
      accentColor: 'border-[#EFA73F]/40 hover:border-brand-amber',
      pillBg: 'bg-brand-amber/10 text-brand-amberDark border-brand-amber/30',
    },
    {
      num: '۰۲',
      title: 'اعتبارسنجی و پالایش',
      en: 'DATA CONDITIONING',
      desc: 'اعتبارسنجی فیزیکی، غربال ناهنجاری‌ها، فیلتر داده‌های نامعتبر ناشی از توقف تجهیزات و استانداردسازی ساختار رکوردها.',
      icon: <Sliders className="w-5 h-5 text-navy-800" />,
      tag: 'FILTER & CLEAN',
      metric: 'ZERO-DRIFT ALGO',
      accentColor: 'border-[#E3DAD0] hover:border-navy-800',
      pillBg: 'bg-navy-950/5 text-navy-950 border-[#E3DAD0]',
    },
    {
      num: '۰۳',
      title: 'تحلیل داده و موازنه جرم',
      en: 'METALLURGICAL ANALYSIS',
      desc: 'محاسبه موازنه جرم پیوسته، مدل‌سازی همبستگی متغیرها، پایش روند بازیابی و شناسایی سریع گلوگاه‌های متالورژیکی.',
      icon: <LineChart className="w-5 h-5 text-[#C92127]" />,
      tag: 'MASS BALANCE',
      metric: 'RECOVERY OPTIMAL',
      accentColor: 'border-[#C92127]/30 hover:border-[#C92127]',
      pillBg: 'bg-[#C92127]/10 text-[#C92127] border-[#C92127]/25',
    },
    {
      num: '۰۴',
      title: 'گزارش و کارنامه عملکرد',
      en: 'EXECUTIVE INSIGHTS',
      desc: 'ارائه داشبوردهای بصری تعاملی، کارنامه‌های تحلیلی شیفت و خروجی‌های مستند جهت تصمیم‌گیری آگاهانه مدیران کارخانه.',
      icon: <FileText className="w-5 h-5 text-navy-900" />,
      tag: 'DECISION SUPPORT',
      metric: 'KPI & PDF MATRIX',
      accentColor: 'border-[#E3DAD0] hover:border-brand-amberDark',
      pillBg: 'bg-[#0F1821]/5 text-navy-950 border-[#E3DAD0]',
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand border-b border-[#E3DAD0] relative overflow-hidden select-none"
    >
      {/* Background Architectural Grid Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[8%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-0 bottom-0 left-[8%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
        <div className="absolute bottom-[25%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row with Parallax */}
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6"
        >
          <div className="text-right max-w-2xl">
            {/* Architectural Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
              <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
              <span className="text-xs font-mono font-semibold tracking-wider uppercase text-navy-950">
                MADANCO PLATFORM // سامانه تحلیل داده‌های خطوط فرآوری
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 font-vazir tracking-tight leading-snug md:leading-tight">
              سامانه‌ای برای پایش، موازنه و تحلیل داده‌های خطوط فرآوری
            </h2>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-light">
              بستری یکپارچه برای دریافت، پالایش، تحلیل و ارزیابی اطلاعات خطوط کانی‌آرایی؛ گامی اساسی در گذار از گزارش‌های کاغذی به تصمیم‌گیری مستند بر داده‌های متالورژیکی.
            </p>
          </div>

          <Button
            to="/platform"
            variant="amber"
            size="md"
            icon={<ArrowLeft className="w-4 h-4 text-navy-950" />}
            className="self-start md:self-auto flex-shrink-0"
          >
            مشاهده جزئیات سامانه
          </Button>
        </motion.div>

        {/* 4 Connected Nodes / Workflow with Scroll-Driven Beam */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connecting Guideline Bar with Animated Scroll Beam */}
          <div className="hidden lg:block absolute top-[72px] left-12 right-12 h-[2px] bg-[#E3DAD0]/60 pointer-events-none z-0 overflow-hidden">
            <motion.div
              style={{ scaleX: beamScaleX }}
              className="h-full bg-gradient-to-r from-brand-amber via-[#EFA73F] to-[#C92127] origin-right"
            />
          </div>

          {steps.map((step, index) => (
            <StepCard
              key={index}
              step={step}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Note on Process Discipline */}
        <AnimatedSection delay={0.2} className="mt-12">
          <div className="bg-white/80 backdrop-blur-md border border-[#E3DAD0] rounded-2xl p-4 sm:p-5 shadow-card max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3.5 text-right">
            <div className="w-8 h-8 rounded-[8px] bg-brand-amber/15 border border-brand-amber/30 flex items-center justify-center text-brand-amberDark flex-shrink-0">
              <Activity className="w-4 h-4 text-[#C92127]" />
            </div>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              <strong className="text-navy-950 font-bold">انضباط فرآیندی معدنکو:</strong> مراحل چهارگانه فوق منطق مهندسی پلتفرم را تشکیل می‌دهند. ابزارها و ماژول‌های محاسباتی متناسب با فلوشیت، مشخصات کانی‌شناسی و ساختار داده‌های هر کارخانه پیکربندی و کالیبره می‌گردند.
            </p>
          </div>
        </AnimatedSection>

      </div>
    </section>
  );
};
