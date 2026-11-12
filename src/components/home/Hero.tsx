import React from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll } from 'framer-motion';
import { Activity } from 'lucide-react';

export const Hero: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroScrollY = useTransform(scrollYProgress, [0, 1], [0, -45]);
  const cardScrollY = useTransform(scrollYProgress, [0, 1], [0, 45]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.35]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);

  // High-precision spring physics for silky-smooth 3D mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // 3/5 Brand Graphic Transforms (Enhanced dynamic 3D response to mouse)
  const brandRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const brandRotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const brandTranslateX = useTransform(smoothX, [-0.5, 0.5], [-22, 22]);
  const brandTranslateY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  // Flowsheet Card Transforms (Deeper 3D perspective & tilt)
  const cardRotateX = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const cardRotateY = useTransform(smoothX, [-0.5, 0.5], [18, -18]);
  const cardTranslateX = useTransform(smoothX, [-0.5, 0.5], [24, -24]);
  const cardTranslateY = useTransform(smoothY, [-0.5, 0.5], [18, -18]);

  // Foreground floating data chips with extra parallax depth
  const chipTranslateX = useTransform(smoothX, [-0.5, 0.5], [45, -45]);
  const chipTranslateY = useTransform(smoothY, [-0.5, 0.5], [30, -30]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const { clientX, clientY } = e;
    const x = clientX / clientWidth - 0.5;
    const y = clientY / clientHeight - 0.5;
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[88vh] flex items-center justify-center pt-28 pb-14 sm:py-24 bg-brand-sand text-navy-900 overflow-hidden select-none border-b border-brand-border"
    >
      {/* Background Architectural Guidelines - Ultra Minimal & Subtle */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-[22%] left-0 right-0 h-[1px] bg-brand-border/70"></div>
        <div className="absolute bottom-[18%] left-0 right-0 h-[1px] bg-brand-border/70"></div>
        {/* Subtle warm luxury vignette */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[500px] bg-gradient-to-r from-brand-amber/5 via-brand-sandLight to-brand-crimson/5 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-12 max-w-7xl mx-auto w-full">
          
          {/* RIGHT SIDE (Brand Graphic): Official MadanCo Brand Graphic Image with 3D Mouse Dynamic Reaction & Scroll Float */}
          <motion.div
            style={{ y: heroScrollY, opacity: heroOpacity, scale: heroScale }}
            className="w-full lg:w-[50%] xl:w-[52%] flex items-center justify-center lg:justify-start"
          >
            <motion.div
              style={{
                rotateX: brandRotateX,
                rotateY: brandRotateY,
                x: brandTranslateX,
                y: brandTranslateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="w-full flex items-center justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[620px] flex items-center justify-center">
                <img
                  src="/hero-madanco-brand-cropped.png"
                  alt="معدنکو - فناوری در خدمت معدن"
                  className="w-full h-auto object-contain select-none filter drop-shadow-sm transition-transform duration-200"
                />
              </div>
            </motion.div>
          </motion.div>

          {/* LEFT SIDE (Enlarged Flowsheet Card Frame): Machinery Illustration & 2 Floating Chips with Parallax Shift */}
          <motion.div
            style={{ y: cardScrollY }}
            className="w-full lg:w-[50%] xl:w-[48%] relative"
          >
            <motion.div
              style={{
                rotateX: cardRotateX,
                rotateY: cardRotateY,
                x: cardTranslateX,
                y: cardTranslateY,
                transformStyle: 'preserve-3d',
              }}
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="w-full relative"
            >
            {/* Perspective Linear Canvas Frame - Enlarged & Spacious */}
            <div className="relative p-6 sm:p-8 lg:p-9 rounded-3xl bg-white/85 backdrop-blur-md border border-brand-border shadow-elevated overflow-hidden group">
              {/* Technical Registration Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-brand-border/70 text-[11px] font-mono text-slate-400">
                <div className="flex items-center gap-2 font-semibold text-navy-900">
                  <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
                  <span>FLOWSHEET PERSPECTIVE // 3D MATRIX</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span>SCALE: 1:1</span>
                  <span>&bull;</span>
                  <span className="text-brand-crimson font-medium">LIVE LINK</span>
                </div>
              </div>

              {/* Machinery Continuous Line-Art Graphic Illustration - Enlarged */}
              <div className="relative py-4 px-2 flex items-center justify-center">
                <img
                  src="/hero-flowsheet-machinery-cropped.png"
                  alt="مدار پیوسته فرآوری مواد معدنی معدنکو"
                  className="w-full h-auto max-h-[310px] sm:max-h-[330px] object-contain select-none drop-shadow-xs"
                />
              </div>

              {/* Bottom Flowsheet Micro-Labels */}
              <div className="pt-3.5 border-t border-brand-border/80 flex items-center justify-start text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-amberDark" />
                  محاسبات عملیات داده ارزیابی نوین
                </span>
              </div>
            </div>

            {/* Floating Parallax Data Chip 1: Throughput (Top Left) */}
            <motion.div
              style={{
                x: chipTranslateX,
                y: chipTranslateY,
              }}
              className="hidden sm:flex absolute -top-4 -left-3 bg-white/95 backdrop-blur-md border border-brand-border/80 rounded-xl px-4 py-2.5 shadow-[0_14px_32px_-4px_rgba(15,24,33,0.2),0_6px_12px_-2px_rgba(15,24,33,0.12)] ring-1 ring-black/5 items-center gap-2.5 z-20 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-amber"></span>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 leading-none">THROUGHPUT</div>
                <div dir="ltr" className="text-xs font-bold text-navy-950 font-mono mt-0.5 text-right">
                  650.0 T/H
                </div>
              </div>
            </motion.div>

            {/* Floating Parallax Data Chip 2: Recovery Index (Bottom Right) */}
            <motion.div
              style={{
                x: chipTranslateX,
                y: chipTranslateY,
              }}
              className="hidden sm:flex absolute -bottom-3 -right-3 bg-white/95 backdrop-blur-md border border-brand-border/80 rounded-xl px-4 py-2.5 shadow-[0_14px_32px_-4px_rgba(15,24,33,0.2),0_6px_12px_-2px_rgba(15,24,33,0.12)] ring-1 ring-black/5 items-center gap-2.5 z-20 pointer-events-none"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-crimson"></span>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 leading-none">RECOVERY INDEX</div>
                <div dir="ltr" className="text-xs font-bold text-navy-950 font-mono mt-0.5 text-right">
                  OPTIMAL 88.4%
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        </div>
      </div>
    </section>
  );
};
