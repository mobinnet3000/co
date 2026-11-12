import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { industriesData } from '../../data/industries';

interface IndustryHighlight {
  code: string;
  tag: string;
  metric: string;
  tags: string[];
}

const IndustryCard: React.FC<{
  ind: typeof industriesData[0];
  highlight: IndustryHighlight;
  index: number;
  scrollYProgress: any;
}> = ({ ind, highlight, index, scrollYProgress }) => {
  const startRange = 0.1 + index * 0.08;
  const endRange = Math.min(startRange + 0.35, 0.9);

  const cardY = useTransform(scrollYProgress, [startRange, endRange], [40 + index * 10, 0]);
  const cardOpacity = useTransform(scrollYProgress, [startRange, endRange], [0.5, 1]);
  const imgY = useTransform(scrollYProgress, [0, 1], [-12, 12]);

  return (
    <motion.div
      style={{ y: cardY, opacity: cardOpacity }}
      className="h-full"
    >
      <Link
        to={`/industries/${ind.slug}`}
        className="group relative flex flex-col justify-between h-full bg-white/80 backdrop-blur-md border border-[#E3DAD0] rounded-2xl md:rounded-3xl p-5 shadow-card hover:shadow-elevated hover:border-[#0F1821]/40 transition-all duration-300"
      >
        <div>
          {/* Top Technical Metadata Bar */}
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#E3DAD0]/70 text-[10px] font-mono">
            <span className="text-slate-400 font-semibold tracking-wider">
              {highlight.code}
            </span>
            <span className="px-2.5 py-0.5 rounded-[10px] bg-[#FAF7F3] border border-[#E3DAD0] text-[#0F1821] font-sans font-medium text-[10px]">
              {highlight.tag}
            </span>
          </div>

          {/* Industrial Visual Frame with Technical Coordinates & Image Parallax */}
          <div className="relative h-44 overflow-hidden rounded-xl border border-[#E3DAD0]/80 bg-[#FAF7F3] mb-4">
            <motion.img
              style={{ y: imgY, scale: 1.08 }}
              src={ind.image}
              alt={ind.title}
              className="w-full h-full object-cover group-hover:scale-115 transition-transform duration-700 brightness-95 contrast-[1.03]"
            />
            {/* Subtle Technical Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F1821]/75 via-[#0F1821]/20 to-transparent"></div>

            {/* Technical Scale Metric Overlay */}
            <div className="absolute bottom-2.5 right-2.5 left-2.5 flex items-center justify-between">
              <span className="text-[9px] font-mono px-2 py-0.5 rounded-[6px] bg-[#0F1821]/80 text-[#F7F3EE] backdrop-blur-xs tracking-wider">
                {highlight.metric}
              </span>
              <span className="w-6 h-6 rounded-[8px] bg-white/90 backdrop-blur-sm flex items-center justify-center text-[#0F1821] group-hover:bg-[#C92127] group-hover:text-white transition-colors shadow-xs">
                <ArrowUpLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </div>
          </div>

          {/* Commodity Title */}
          <h3 className="text-lg font-bold text-[#0F1821] font-vazir mb-2 group-hover:text-[#C92127] transition-colors">
            {ind.title}
          </h3>

          {/* Short Description */}
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed font-light mb-4">
            {ind.shortDescription}
          </p>

          {/* Flowsheet Tags */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {highlight.tags.map((tag, tIdx) => (
              <span
                key={tIdx}
                className="text-[10px] px-2.5 py-0.5 rounded-[8px] bg-[#FAF7F3] text-slate-600 border border-[#E3DAD0]/80 font-sans"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Status Row */}
        <div className="pt-3.5 mt-3 border-t border-[#E3DAD0]/70 flex items-center justify-between text-[11px] text-slate-500">
          <span className="font-sans font-medium text-[11px] group-hover:text-[#0F1821] transition-colors">
            مشاهده جزییات مدار
          </span>
          <span className="font-mono text-[10px] text-slate-400">
            DOMAIN // 0{index + 1}
          </span>
        </div>
      </Link>
    </motion.div>
  );
};

export const IndustriesOverview: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [30, -25]);

  const industryHighlights: Record<string, IndustryHighlight> = {
    'mineral-processing': {
      code: 'COMMODITY // 01',
      tag: 'کانی‌آرایی عمومی',
      metric: 'SAG & BALL // FLOTATION',
      tags: ['خردایش و طبقه‌بندی', 'فلوتاسیون کف', 'تیکنر و آبگیری'],
    },
    'iron-ore': {
      code: 'COMMODITY // 02',
      tag: 'سنگ‌آهن و گندله',
      metric: 'HPGR // LIMS & WHIMS',
      tags: ['خردایش پرفشار HPGR', 'جدایش مگنتی تر', 'فیلتراسیون دیسکی'],
    },
    'copper': {
      code: 'COMMODITY // 03',
      tag: 'مس و مولیبدن',
      metric: 'SAG // CU-MO RECOVERY',
      tags: ['مدار مس-مولیبدن', 'سلول‌های رافر و کلینر', 'کنترل بازیابی مس'],
    },
    'lead-zinc': {
      code: 'COMMODITY // 04',
      tag: 'سرب و روی',
      metric: 'DIFFERENTIAL FLOTATION',
      tags: ['جدایش انتخابی فازها', 'فرونشانی اسفالریت', 'مدارهای هیدرومتالورژی'],
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand relative overflow-hidden border-b border-brand-border"
    >
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <div className="absolute top-0 bottom-0 right-[10%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-0 bottom-0 left-[10%] w-[1px] bg-brand-border"></div>
        <div className="absolute top-[18%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
        <div className="absolute bottom-[14%] left-0 right-0 h-[1px] bg-brand-border/60"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Parallax */}
        <motion.div
          style={{ y: headerY }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-14 md:mb-16 gap-6"
        >
          <div className="max-w-2xl">
            {/* Engineering Registration Eyebrow */}
            <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
              <span className="w-2 h-2 rounded-full bg-brand-amber"></span>
              <span className="text-[11px] md:text-xs font-mono uppercase tracking-wider text-[#0F1821] font-semibold">
                DOMAINS // صنایع هدف و مدارهای فرآوری
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F1821] font-vazir tracking-tight leading-snug md:leading-tight mb-4">
              تمرکز بر صنایع معدنی و متالورژی استخراجی
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-light leading-relaxed">
              راهکارهای ما بر اساس مشخصات کانی‌شناسی، فلوشیت‌های خردایش و مدارهای جدایش متداول در بخش‌های کلیدی صنایع معدنی کشور مهندسی شده‌اند.
            </p>
          </div>

          <Link
            to="/industries"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-[10px] border border-[#0F1821] text-[#0F1821] hover:bg-[#0F1821] hover:text-[#F7F3EE] transition-all duration-200 text-xs font-bold self-start md:self-auto shadow-subtle group"
          >
            <span>مشاهده همه صنایع و مدارها</span>
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
          </Link>
        </motion.div>

        {/* 4-Column Commodity Cards Grid with Staggered Scroll Motion */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((ind, idx) => {
            const highlight = industryHighlights[ind.slug] || {
              code: `COMMODITY // 0${idx + 1}`,
              tag: 'صنایع معدنی',
              metric: 'METALLURGY // FLOW',
              tags: ['مدار فرآوری', 'کنترل متالورژیکی', 'پایش داده'],
            };

            return (
              <IndustryCard
                key={ind.id}
                ind={ind}
                highlight={highlight}
                index={idx}
                scrollYProgress={scrollYProgress}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
