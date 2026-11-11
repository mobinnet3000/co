import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft, Sparkles, Activity } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // High-precision spring physics for silky-smooth 3D mouse tracking
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 100, mass: 0.6 };
  const smoothX = useSpring(rawX, springConfig);
  const smoothY = useSpring(rawY, springConfig);

  // Left 3D Interactive Logo Motion Card Transforms
  const logoRotateX = useTransform(smoothY, [-0.5, 0.5], [10, -10]);
  const logoRotateY = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const logoTranslateX = useTransform(smoothX, [-0.5, 0.5], [-18, 18]);
  const logoTranslateY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Dynamic light glare position across logo card
  const glareX = useTransform(smoothX, [-0.5, 0.5], ['10%', '90%']);
  const glareY = useTransform(smoothY, [-0.5, 0.5], ['10%', '90%']);

  // Right Iconic Linear Perspective Elements Transforms (Multi-Layer Parallax)
  const rightRotateX = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const rightRotateY = useTransform(smoothX, [-0.5, 0.5], [14, -14]);
  const rightTranslateX = useTransform(smoothX, [-0.5, 0.5], [20, -20]);
  const rightTranslateY = useTransform(smoothY, [-0.5, 0.5], [15, -15]);

  // Foreground floating data chips with extra parallax depth
  const chipTranslateX = useTransform(smoothX, [-0.5, 0.5], [35, -35]);
  const chipTranslateY = useTransform(smoothY, [-0.5, 0.5], [25, -25]);

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
      className="relative min-h-[94vh] flex flex-col justify-between pt-28 pb-10 bg-brand-sand text-navy-900 overflow-hidden select-none border-b border-brand-border"
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 flex-1 flex flex-col justify-center my-auto">
        {/* Top Minimal Status Header Bar */}
        <div className="flex items-center justify-between mb-8 max-w-6xl mx-auto w-full">
          {/* Small Slogan & Tagline */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-brand-crimson animate-pulse"></span>
            <span className="text-xs sm:text-sm font-semibold text-navy-900 font-vazir tracking-tight">
              فناوری داده در خدمت معدن
            </span>
            <span className="hidden sm:inline-block text-[11px] font-mono text-slate-400 mr-2">
              // DATA &bull; PROCESS &bull; SIMPLICITY
            </span>
          </motion.div>

          {/* Official Brand Badges (Monitoring & Optimization) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-2"
          >
            <span className="text-[11px] sm:text-xs font-bold px-3 py-1 bg-brand-amber text-navy-950 rounded border border-brand-amberDark/20 shadow-xs">
              پایش
            </span>
            <span className="text-[11px] sm:text-xs font-bold px-3 py-1 bg-transparent text-brand-crimson rounded border border-brand-crimson/80">
              بهینه‌سازی
            </span>
          </motion.div>
        </div>

        {/* Central Dual-Axis Layout:
            - RIGHT (visual right in RTL): Iconic Linear Vectors in 3D Perspective
            - LEFT (visual left in RTL): 3D Animated Logo Motion Element & Brand Identity
        */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center max-w-6xl mx-auto w-full">
          
          {/* RIGHT SIDE:
              Iconic Minimal Linear Vector Flowsheet in Perspective Reactive to Mouse */}
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
            {/* Perspective Linear Canvas */}
            <div className="relative p-6 sm:p-9 rounded-2xl bg-white/75 backdrop-blur-md border border-brand-border shadow-card overflow-hidden group">
              {/* Technical Registration Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/70 text-[10px] font-mono text-slate-400">
                <div className="flex items-center gap-1.5 font-semibold text-navy-900">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-amber"></span>
                  <span>FLOWSHEET PERSPECTIVE // 3D MATRIX</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>SCALE: 1:1</span>
                  <span>&bull;</span>
                  <span className="text-brand-crimson">LIVE LINK</span>
                </div>
              </div>

              {/* Minimal Line Art Vector Illustration: Industrial Machinery & Technology Simplicity */}
              <div className="relative py-2">
                <svg
                  viewBox="0 0 520 250"
                  className="w-full h-auto drop-shadow-sm select-none"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Perspective Floor Grid Lines */}
                  <g opacity="0.35" stroke="#E3DAD0" strokeWidth="0.8">
                    <line x1="20" y1="210" x2="500" y2="210" />
                    <line x1="60" y1="225" x2="480" y2="225" />
                    <line x1="120" y1="240" x2="440" y2="240" />
                    {/* Perspective rays */}
                    <line x1="80" y1="210" x2="40" y2="245" />
                    <line x1="180" y1="210" x2="160" y2="245" />
                    <line x1="320" y1="210" x2="340" y2="245" />
                    <line x1="420" y1="210" x2="460" y2="245" />
                  </g>

                  {/* Horizontal Data & Stream Guidelines */}
                  <line x1="15" y1="45" x2="505" y2="45" stroke="#E3DAD0" strokeWidth="0.8" strokeDasharray="3 3" />
                  <line x1="15" y1="125" x2="505" y2="125" stroke="#E3DAD0" strokeWidth="0.8" strokeDasharray="3 3" />

                  {/* 1. Hopper & Primary Crusher Minimal Vector */}
                  <g className="transition-transform duration-300">
                    <polygon points="45,55 95,55 85,108 55,108" stroke="#1D2D3D" strokeWidth="1.8" fill="#F7F3EE" />
                    <line x1="45" y1="46" x2="95" y2="46" stroke="#C92127" strokeWidth="2.5" />
                    <circle cx="70" cy="120" r="8" stroke="#1D2D3D" strokeWidth="1.6" />
                    <circle cx="70" cy="120" r="3" fill="#EFA73F" />
                    <text x="70" y="148" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">FEED / CRUSH</text>
                  </g>

                  {/* Straight Connector Line 1 with Smooth Pulse Dot */}
                  <line x1="95" y1="108" x2="155" y2="108" stroke="#1D2D3D" strokeWidth="1.5" />
                  <circle cx="125" cy="108" r="2.5" fill="#EFA73F" />

                  {/* 2. Ball / SAG Mill Cylinder Vector */}
                  <g>
                    <rect x="160" y="72" width="72" height="72" rx="36" stroke="#1D2D3D" strokeWidth="1.8" fill="#FFFFFF" />
                    <circle cx="196" cy="108" r="24" stroke="#1D2D3D" strokeWidth="1" strokeDasharray="4 2" />
                    <circle cx="196" cy="108" r="4.5" fill="#C92127" />
                    {/* Rotating axis line */}
                    <line x1="150" y1="108" x2="242" y2="108" stroke="#EFA73F" strokeWidth="1.5" strokeDasharray="2 2" />
                    <text x="196" y="162" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">GRINDING MILL</text>
                  </g>

                  {/* Straight Connector Line 2 */}
                  <line x1="242" y1="108" x2="295" y2="85" stroke="#1D2D3D" strokeWidth="1.5" />

                  {/* 3. Hydrocyclone Cluster Vector (Classification) */}
                  <g>
                    <polygon points="290,60 335,60 312,120" stroke="#1D2D3D" strokeWidth="1.8" fill="#F7F3EE" />
                    <line x1="312" y1="120" x2="312" y2="142" stroke="#1D2D3D" strokeWidth="1.5" />
                    <circle cx="312" cy="48" r="5" stroke="#EFA73F" strokeWidth="1.5" />
                    <text x="312" y="160" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">CYCLONE</text>
                  </g>

                  {/* Straight Connector Line 3 to Flotation */}
                  <line x1="335" y1="80" x2="380" y2="80" stroke="#1D2D3D" strokeWidth="1.5" />

                  {/* 4. Flotation Column & Aeration Cell Vector */}
                  <g>
                    <rect x="385" y="65" width="58" height="65" rx="4" stroke="#1D2D3D" strokeWidth="1.8" fill="#FFFFFF" />
                    <line x1="385" y1="82" x2="443" y2="82" stroke="#EFA73F" strokeWidth="1.5" />
                    {/* Micro Aeration Bubbles */}
                    <circle cx="405" cy="102" r="3" stroke="#C92127" strokeWidth="1" />
                    <circle cx="422" cy="94" r="4.5" stroke="#1D2D3D" strokeWidth="1" />
                    <circle cx="414" cy="116" r="2.5" stroke="#EFA73F" strokeWidth="1" />
                    <text x="414" y="148" textAnchor="middle" fill="#6B7B8C" fontSize="8" fontFamily="JetBrains Mono">FLOTATION</text>
                  </g>

                  {/* 5. Minimal Data Stream Vector Leading to Insights */}
                  <path d="M445 98 L495 98" stroke="#C92127" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points="495,94 504,98 495,102" fill="#C92127" />
                  <text x="480" y="85" textAnchor="middle" fill="#C92127" fontSize="7" fontFamily="JetBrains Mono">OUTPUT</text>

                  {/* Clean Baseline Conveyor Guideline (Re-echoing the official MADAN logo contour) */}
                  <path
                    d="M30 195 L210 195 L275 220 L490 220"
                    stroke="#1D2D3D"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                  {/* Minimal Roller blocks along conveyor */}
                  <rect x="95" y="188" width="16" height="7" rx="1.5" fill="#EFA73F" />
                  <rect x="235" y="201" width="16" height="7" rx="1.5" fill="#1D2D3D" />
                  <rect x="405" y="213" width="16" height="7" rx="1.5" fill="#C92127" />
                </svg>
              </div>

              {/* Bottom Flowsheet Micro-Labels */}
              <div className="pt-3 border-t border-brand-border/80 flex items-center justify-between text-[11px] text-slate-500 font-light">
                <span className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-brand-amberDark" />
                  جریان خطی داده و ساده‌سازی فرآیندهای متالورژیکی
                </span>
                <span className="font-mono text-navy-900 font-semibold text-[10px]">
                  MADAN PERSPECTIVE
                </span>
              </div>
            </div>

            {/* Floating Parallax Data Chip 1: Flow Rate */}
            <motion.div
              style={{
                x: chipTranslateX,
                y: chipTranslateY,
              }}
              className="hidden sm:flex absolute -top-4 -left-3 bg-white/90 backdrop-blur-md border border-brand-border rounded-xl px-3.5 py-2 shadow-elevated items-center gap-2.5 z-20 pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 leading-none">THROUGHPUT</div>
                <div className="text-xs font-bold text-navy-950 font-mono mt-0.5">650.0 T/H</div>
              </div>
            </motion.div>

            {/* Floating Parallax Data Chip 2: Metallurgical Balance */}
            <motion.div
              style={{
                x: chipTranslateX,
                y: chipTranslateY,
              }}
              className="hidden sm:flex absolute -bottom-3 -right-3 bg-white/90 backdrop-blur-md border border-brand-border rounded-xl px-3.5 py-2 shadow-elevated items-center gap-2.5 z-20 pointer-events-none"
            >
              <span className="w-2 h-2 rounded-full bg-brand-crimson"></span>
              <div className="text-right">
                <div className="text-[10px] font-mono text-slate-400 leading-none">RECOVERY INDEX</div>
                <div className="text-xs font-bold text-navy-950 font-mono mt-0.5">88.4% OPTIMAL</div>
              </div>
            </motion.div>
          </motion.div>

          {/* LEFT SIDE:
              Official Logo as a Sleek 3D Interactive Motion Element Sensitive to User Mouse Moves */}
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
            {/* Interactive 3D Luxury Logo Plate with Dynamic Glare */}
            <div className="relative p-7 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-brand-border shadow-elevated w-full max-w-lg mb-7 transition-shadow duration-300 hover:shadow-2xl overflow-hidden group">
              {/* Dynamic mouse-driven light sheen */}
              <motion.div
                style={{
                  top: glareY,
                  left: glareX,
                }}
                className="absolute -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-gradient-to-r from-brand-amber/15 via-white/40 to-transparent blur-2xl rounded-full pointer-events-none"
              />

              {/* Minimalist Architectural Corner Registration Brackets */}
              <div className="absolute top-3.5 right-3.5 w-4 h-4 border-t-2 border-r-2 border-brand-amber"></div>
              <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t-2 border-l-2 border-slate-300"></div>
              <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b-2 border-r-2 border-slate-300"></div>
              <div className="absolute bottom-3.5 left-3.5 w-4 h-4 border-b-2 border-l-2 border-brand-crimson"></div>

              {/* Small Top Slogan Badge Inside Card */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-brand-border/70 text-[11px] font-medium text-slate-500">
                <span className="text-brand-crimson font-semibold font-vazir flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-crimson"></span>
                  فناوری داده در خدمت معدن
                </span>
                <span className="font-mono text-[10px] text-slate-400">EST. INDUSTRIAL DATA</span>
              </div>

              {/* Official Uploaded Logo High-Res Transparent Image */}
              <div className="relative py-3 flex items-center justify-center">
                <img
                  src="/logo-dark.png"
                  alt="معدنکو MADAN CO - شرکت محاسبات عملیات داده ارزیابی نوین"
                  className="w-full max-w-[340px] h-auto object-contain mx-auto filter contrast-125 transition-transform duration-300 group-hover:scale-[1.02]"
                />
              </div>

              {/* Brand Identity & Legal Name (As requested: site = معدنکو madan co, company = محاسبات عملیات داده ارزیابی نوین) */}
              <div className="mt-5 pt-4 border-t border-brand-border/80 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-base sm:text-lg font-black text-navy-950 font-vazir tracking-tight">
                    معدنکو
                  </span>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-navy-900 text-white">
                    MADAN CO
                  </span>
                </div>
                <h1 className="text-xs sm:text-sm font-semibold text-navy-800 font-vazir leading-relaxed">
                  شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود
                </h1>
                <p className="text-[11px] text-slate-500 font-light font-vazir mt-1">
                  پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی
                </p>
              </div>
            </div>

            {/* Minimal Luxury CTA Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full justify-center lg:justify-start">
              <Button
                to="/platform"
                variant="copper"
                size="md"
                className="w-full sm:w-auto bg-navy-900 hover:bg-navy-800 text-white font-medium border-none shadow-sm px-6 py-3"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                آشنایی با سامانه پایش
              </Button>
              <Button
                to="/contact"
                variant="outline"
                size="md"
                className="w-full sm:w-auto border-brand-border bg-white/70 hover:bg-white text-navy-900 hover:border-navy-900 font-medium px-6 py-3"
              >
                درخواست مشاوره تخصصی
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Minimal Bottom Bar */}
        <div className="mt-10 pt-5 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div className="flex items-center gap-3">
            <span className="font-mono text-navy-900 font-bold">MADAN CO.</span>
            <span className="text-slate-300">|</span>
            <span className="font-vazir font-light">
              بستر موازنه، تحلیل و ارزیابی هوشمند خطوط کانی‌آرایی و صنایع معدنی
            </span>
          </div>
          <div className="flex items-center gap-2 text-navy-900 font-medium font-vazir text-[11px]">
            <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse"></span>
            <span>معماری مهندسی داده صنعتی &bull; مینیمال و کلاسیک</span>
          </div>
        </div>
      </div>
    </section>
  );
};
