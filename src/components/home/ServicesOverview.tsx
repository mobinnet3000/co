import React from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  Database,
  Cpu,
  LineChart,
  Gauge,
  LayoutDashboard,
  Code2,
  ArrowUpLeft,
  ArrowLeft,
} from 'lucide-react';
import { servicesData } from '../../data/services';
import { AnimatedSection } from '../common/AnimatedSection';

export const ServicesOverview: React.FC = () => {
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headerY = useTransform(scrollYProgress, [0, 1], [30, -25]);
  const yCol0 = useTransform(scrollYProgress, [0, 1], [30, -25]);
  const yCol1 = useTransform(scrollYProgress, [0, 1], [65, -50]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [25, -20]);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-navy-950" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-brand-amberDark" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-[#C92127]" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-navy-800" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5 text-brand-amberDark" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-[#C92127]" />;
      default:
        return <Database className="w-5 h-5 text-navy-950" />;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="py-20 md:py-28 bg-brand-sand border-b border-[#E3DAD0] relative overflow-hidden select-none"
    >
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-[30%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Row with Scroll Parallax */}
        <motion.div style={{ y: headerY }} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3.5 px-3 py-1 rounded-[10px] bg-white/60 border border-[#E3DAD0]">
            <span className="w-2 h-2 rounded-full bg-[#C92127]"></span>
            <span className="text-xs font-mono font-semibold tracking-wider uppercase text-navy-950">
              SERVICES // راهکارهای تخصصی و مهندسی معدنکو
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-navy-950 font-vazir tracking-tight leading-snug md:leading-tight">
            راهکارهای جامع مهندسی، پایش و تحلیل داده‌های فرآوری
          </h2>

          <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed font-light max-w-2xl mx-auto">
            حوزه‌های تخصصی فعالیت شرکت در استقرار ساختار داده، پالایش اطلاعات و توسعه بسترهای نرم‌افزاری ویژه صنایع معدنی و کانی‌آرایی.
          </p>
        </motion.div>

        {/* 6 Services Grid with Multi-Column Staggered Scroll Parallax */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, idx) => {
            const col = idx % 3;
            const yTransform = col === 0 ? yCol0 : col === 1 ? yCol1 : yCol2;

            return (
              <motion.div
                key={service.id}
                style={{ y: yTransform }}
                className="h-full"
              >
                <div className="bg-white/80 backdrop-blur-md rounded-2xl p-7 border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:border-brand-amber hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden">
                  
                  {/* Engineering Corner Mark */}
                  <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E3DAD0]/50 group-hover:border-brand-amber transition-colors"></div>
                  </div>

                  <div>
                    {/* Icon & Status Badge */}
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-brand-amber/15 group-hover:border-brand-amber/40 transition-all">
                        {getIcon(service.iconName)}
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2.5 py-1 rounded-[8px] bg-[#0F1821]/5 text-navy-950 border border-[#E3DAD0]">
                        CORE 0{idx + 1}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-navy-950 mb-3 group-hover:text-[#C92127] transition-colors font-vazir leading-snug">
                      {service.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                      {service.shortDescription}
                    </p>
                  </div>

                  {/* Footer Link & Index */}
                  <div className="pt-4 border-t border-[#E3DAD0]/70 flex items-center justify-between">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 group-hover:text-brand-amberDark transition-colors"
                    >
                      <span>جزئیات و شرح مهندسی خدمت</span>
                      <ArrowUpLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-0.5 text-brand-amberDark" />
                    </Link>
                    <span className="text-[10px] text-slate-400 font-mono font-semibold">
                      MADAN // 0{idx + 1}
                    </span>
                  </div>

                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Secondary Action & Advice Note */}
        <AnimatedSection delay={0.2} className="mt-14 text-center flex flex-col sm:flex-row items-center justify-center gap-4">
          <span className="text-xs font-mono text-slate-500">
            NEED A CUSTOM FLOTATION OR MASS-BALANCE SOLUTION?
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/5 font-bold text-xs transition-colors font-vazir"
          >
            <span>درخواست مشاوره تخصصی کانی‌آرایی</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
        </AnimatedSection>

      </div>
    </section>
  );
};
