import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft, ChevronDown } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Spring physics for buttery-smooth mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Left logo tilt transforms
  const logoRotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const logoRotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const logoTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const logoTranslateY = useTransform(smoothY, [-0.5, 0.5], [-15, 15]);

  // Right iconic linear elements transforms (inverted perspective depth)
  const rightRotateX = useTransform(smoothY, [-0.5, 0.5], [-10, 10]);
  const rightRotateY = useTransform(smoothX, [-0.5, 0.5], [15, -15]);
  const rightTranslateX = useTransform(smoothX, [-0.5, 0.5], [25, -25]);
  const rightTranslateY = useTransform(smoothY, [-0.5, 0.5], [20, -20]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientWidth, clientHeight } = e.currentTarget;
    const { clientX, clientY } = e;
    const x = clientX / clientWidth - 0.5;
    const y = clientY / clientHeight - 0.5;
    rawX.set(x);
    rawY.set(y);
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-[96vh] flex flex-col justify-between pt-28 pb-12 bg-brand-sand text-navy-900 overflow-hidden select-none border-b border-brand-border"
    >
      {/* Subtle Minimal Geometric Guidelines Background */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[15%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-0 bottom-0 left-[15%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-[28%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
        <div className="absolute bottom-[20%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
        {/* Subtle warm glow at center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-r from-brand-amber/5 via-brand-sandLight to-brand-crimson/5 blur-3xl rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
        {/* Minimalist Top Badges (from official brand card) */}
        <div className="flex items-center justify-between mb-8 max-w-5xl mx-auto w-full">
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
            <span className="text-xs sm:text-sm font-semibold text-navy-800 tracking-wide font-vazir">
              فناوری داده در خدمت معدن
            </span>
          </motion.div>

          {/* Monitoring & Optimization Badges from user uploaded card */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2.5"
          >
            <span className="text-[11px] sm:text-xs font-bold px-3 py-1 bg-brand-amber text-navy-950 rounded border border-brand-amberDark/20 shadow-sm">
              پایش
            </span>
            <span className="text-[11px] sm:text-xs font-bold px-3 py-1 bg-transparent text-brand-crimson rounded border border-brand-crimson">
              بهینه‌سازی
            </span>
          </motion.div>
        </div>

        {/* Central Dual-Axis Visual Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center max-w-6xl mx-auto w-full">
          {/* RIGHT SIDE (Right in RTL / DOM order right in user mind):
              Iconic Linear Minimal Vectors of Industrial Processing Lines (Perspective Mouse Reactive) */}
          <motion.div
            style={{
              rotateX: rightRotateX,
              rotateY: rightRotateY,
              x: rightTranslateX,
              y: rightTranslateY,
              transformStyle: 'preserve-3d',
            }}
            className="lg:col-span-6 order-2 lg:order-1 relative"
          >
            <div className="p-8 sm:p-10 rounded-2xl bg-white/70 backdrop-blur-md border border-brand-border shadow-subtle relative overflow-hidden group">
              {/* Fine horizontal & vertical technical ruler markings */}
              <div className="flex items-center justify-between pb-3 mb-6 border-b border-brand-border/80 text-[10px] font-mono text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-navy-800">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
                  LINEAR FLOWSHEET ARCHITECTURE
                </span>
                <span>FIG 01.1 // PROCESS FLOW</span>
              </div>

              {/* Minimal Line Art Vector Illustration: Industrial Machinery & Technology Simplicity */}
              <div className="relative py-4">
                <svg
                  viewBox="0 0 500 240"
                  className="w-full h-auto drop-shadow-sm stroke-navy-800"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Subtle Grid Lines in background */}
                  <line x1="20" y1="40" x2="480" y2="40" stroke="#E3DAD0" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="20" y1="120" x2="480" y2="120" stroke="#E3DAD0" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="20" y1="200" x2="480" y2="200" stroke="#E3DAD0" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* 1. Primary Crusher / Feeder Vector (Minimal Lines) */}
                  <g className="transition-all duration-300">
                    <polygon points="50,60 90,60 80,105 60,105" stroke="#1D2D3D" strokeWidth="1.8" fill="#F7F3EE" />
                    <line x1="50" y1="50" x2="90" y2="50" stroke="#C92127" strokeWidth="2.5" />
                    <circle cx="70" cy="118" r="7" stroke="#1D2D3D" strokeWidth="1.5" />
                    <text x="70" y="145" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">CRUSHER</text>
                  </g>

                  {/* Connecting Straight Line Flow with Pulse Point */}
                  <path d="M95 105 L150 105" stroke="#1D2D3D" strokeWidth="1.5" />
                  <circle cx="122" cy="105" r="2.5" fill="#EFA73F" />

                  {/* 2. Ball / SAG Mill Minimalist Cylinder Vector */}
                  <g>
                    <rect x="155" y="70" width="70" height="70" rx="35" stroke="#1D2D3D" strokeWidth="1.8" fill="#FFFFFF" />
                    <circle cx="190" cy="105" r="22" stroke="#1D2D3D" strokeWidth="1" strokeDasharray="4 2" />
                    <circle cx="190" cy="105" r="4" fill="#C92127" />
                    {/* Rotating axis line */}
                    <line x1="145" y1="105" x2="235" y2="105" stroke="#EFA73F" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="190" y="158" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">SAG MILL</text>
                  </g>

                  {/* Connecting Conveyor Flow Line */}
                  <path d="M235 105 L290 85" stroke="#1D2D3D" strokeWidth="1.5" />

                  {/* 3. Hydrocyclone Cluster & Separation Line Vector */}
                  <g>
                    <polygon points="285,60 325,60 305,115" stroke="#1D2D3D" strokeWidth="1.8" fill="#F7F3EE" />
                    <line x1="305" y1="115" x2="305" y2="135" stroke="#1D2D3D" strokeWidth="1.5" />
                    <circle cx="305" cy="50" r="5" stroke="#EFA73F" strokeWidth="1.5" />
                    <text x="305" y="152" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">CYCLONE</text>
                  </g>

                  {/* Connecting Line to Flotation */}
                  <path d="M325 80 L370 80" stroke="#1D2D3D" strokeWidth="1.5" />

                  {/* 4. Flotation Cell & Aeration Vector */}
                  <g>
                    <rect x="375" y="65" width="55" height="60" rx="4" stroke="#1D2D3D" strokeWidth="1.8" fill="#FFFFFF" />
                    <line x1="375" y1="80" x2="430" y2="80" stroke="#EFA73F" strokeWidth="1.5" />
                    {/* Bubble nodes */}
                    <circle cx="395" cy="100" r="3" stroke="#C92127" strokeWidth="1" />
                    <circle cx="410" cy="92" r="4.5" stroke="#1D2D3D" strokeWidth="1" />
                    <circle cx="402" cy="112" r="2.5" stroke="#EFA73F" strokeWidth="1" />
                    <text x="402" y="145" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">FLOTATION</text>
                  </g>

                  {/* 5. Minimal Data Stream Vector leading to Output */}
                  <path d="M430 95 L475 95" stroke="#C92127" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="475,91 483,95 475,99" fill="#C92127" />

                  {/* Clean Baseline Conveyor Guideline (Re-echoing logo motif) */}
                  <path
                    d="M30 190 L200 190 L260 215 L470 215"
                    stroke="#1D2D3D"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <rect x="90" y="184" width="14" height="6" rx="1.5" fill="#EFA73F" />
                  <rect x="220" y="196" width="14" height="6" rx="1.5" fill="#1D2D3D" />
                  <rect x="390" y="209" width="14" height="6" rx="1.5" fill="#C92127" />
                </svg>
              </div>

              {/* Minimal caption below line vectors */}
              <div className="pt-3 border-t border-brand-border flex items-center justify-between text-[11px] text-slate-500 font-light">
                <span>جریان خطی داده و ساده‌سازی فرآیندهای متالورژیکی</span>
                <span className="font-mono text-navy-800 font-semibold">MADAN PERSPECTIVE</span>
              </div>
            </div>
          </motion.div>

          {/* LEFT SIDE:
              Official Logo as a Sleek 3D Motion Element Sensitive to User Mouse Moves */}
          <motion.div
            style={{
              rotateX: logoRotateX,
              rotateY: logoRotateY,
              x: logoTranslateX,
              y: logoTranslateY,
              transformStyle: 'preserve-3d',
            }}
            className="lg:col-span-6 order-1 lg:order-2 flex flex-col justify-center items-center lg:items-start text-center lg:text-right"
          >
            {/* Interactive 3D Luxury Logo Plate */}
            <div className="relative p-8 sm:p-12 rounded-3xl bg-white/80 backdrop-blur-md border border-brand-border shadow-elevated w-full max-w-lg mb-8 transition-shadow duration-300 hover:shadow-2xl">
              {/* Corner minimalist brackets */}
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-amber"></div>
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-slate-300"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-slate-300"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-crimson"></div>

              {/* Official Uploaded Logo High-Res Image */}
              <div className="relative py-2 flex items-center justify-center">
                <img
                  src="/logo-dark.png"
                  alt="معدنکو - MADAN CO"
                  className="w-full max-w-[360px] h-auto object-contain mx-auto filter contrast-125"
                />
              </div>

              {/* Identity Under Logo (Exact from uploaded card) */}
              <div className="mt-6 pt-5 border-t border-brand-border/80 text-center">
                <h2 className="text-sm sm:text-base font-bold text-navy-900 font-vazir tracking-tight mb-1">
                  محاسبات عملیات داده ارزیابی نوین <span className="text-brand-amberDark font-black">(معدنکو)</span>
                </h2>
                <p className="text-xs text-slate-500 font-light font-vazir">
                  پایش و بهینه‌سازی خطوط فرآوری مواد معدنی
                </p>
              </div>
            </div>

            {/* Actions & Slogan */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <Button
                to="/platform"
                variant="copper"
                size="md"
                className="w-full sm:w-auto bg-brand-amber hover:bg-brand-amberDark text-navy-950 font-bold border-none shadow-sm"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                آشنایی با سامانه پایش
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-navy-800 text-navy-900 hover:bg-navy-900 hover:text-white font-medium"
              >
                درخواست مشاوره بهینه‌سازی
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div className="flex items-center gap-4">
            <span className="font-mono text-navy-800 font-bold">MADAN CO.</span>
            <span className="text-slate-300">|</span>
            <span>بستر تحلیل، موازنه متالورژیکی و ارزیابی هوشمند خطوط کانی‌آرایی</span>
          </div>
          <div className="flex items-center gap-2 text-navy-800 font-medium">
            <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></span>
            <span>معماری مهندسی داده صنعتی</span>
          </div>
        </div>
      </div>
    </section>
  );
};
