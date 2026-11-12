import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, Headphones } from 'lucide-react';

export const FinalCTA: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });

  const cardScale = useTransform(scrollYProgress, [0.1, 0.85], [0.94, 1]);
  const cardY = useTransform(scrollYProgress, [0.1, 0.85], [35, 0]);
  const orbScale = useTransform(scrollYProgress, [0.1, 0.85], [0.75, 1.25]);

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-b border-[#E3DAD0]/70 select-none"
    >
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ scale: cardScale, y: cardY }}
          className="relative rounded-3xl bg-[#0F1821] p-8 sm:p-12 md:p-16 text-white text-center shadow-card overflow-hidden border border-slate-800"
        >
          {/* Background Ambient Lighting and Dynamic Scroll Orbs */}
          <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>
          <motion.div
            style={{ scale: orbScale }}
            className="absolute top-0 right-10 w-72 h-72 bg-[#EFA73F]/15 rounded-full blur-3xl pointer-events-none"
          />
          <motion.div
            style={{ scale: orbScale }}
            className="absolute bottom-0 left-10 w-72 h-72 bg-[#C92127]/15 rounded-full blur-3xl pointer-events-none"
          />

          <div className="relative z-10 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#EFA73F] text-xs font-medium mb-6 backdrop-blur-sm">
              <Headphones className="w-4 h-4 text-[#EFA73F]" />
              <span>شروع گفتگوی مهندسی با کارشناسان معدنکو</span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-vazir leading-tight tracking-tight mb-5 text-white">
              برای پایش و بهینه‌سازی داده‌های خط فرآوری خود آماده‌اید؟
            </h2>

            <p className="text-[#E3DAD0]/90 text-sm sm:text-base md:text-lg leading-relaxed font-light mb-8 max-w-2xl mx-auto">
              جهت ارزیابی ساختار داده‌های کارخانه، امکان‌سنجی موازنه متالورژیکی و پیاده‌سازی سامانه پایش، با تیم مهندسی معدنکو در ارتباط باشید.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Yellow Primary Action Button */}
              <Link
                to="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#EFA73F] hover:bg-[#D48E28] text-[#0F1821] font-bold rounded-[10px] shadow-glow-amber transition-all duration-200 select-none text-sm sm:text-base group"
              >
                <span>ارتباط مستقیم با کارشناسان</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </Link>

              {/* Red Outline Action Button - Direct Call */}
              <a
                href="tel:09999196630"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/10 rounded-[10px] bg-transparent transition-all duration-200 font-bold select-none text-sm sm:text-base"
              >
                <span>تماس تلفنی: ۰۹۹۹ ۹۱۹ ۶۶۳۰</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
