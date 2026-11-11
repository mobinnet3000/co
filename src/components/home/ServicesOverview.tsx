import React from 'react';
import { Link } from 'react-router-dom';
import {
  Database,
  Cpu,
  LineChart,
  Gauge,
  LayoutDashboard,
  Code2,
  ArrowUpLeft,
} from 'lucide-react';
import { servicesData } from '../../data/services';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const ServicesOverview: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-navy-800" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-brand-amberDark" />;
      case 'LineChart':
        return <LineChart className="w-5 h-5 text-brand-crimson" />;
      case 'Gauge':
        return <Gauge className="w-5 h-5 text-emerald-600" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-5 h-5 text-navy-800" />;
      case 'Code2':
        return <Code2 className="w-5 h-5 text-brand-amberDark" />;
      default:
        return <Database className="w-5 h-5 text-navy-800" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-brand-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="خدمات تخصصی معدنکو"
            title="راهکارهای پایش و بهینه‌سازی داده"
            description="حوزه‌های تخصصی فعالیت شرکت در استقرار ساختار داده، پالایش اطلاعات و توسعه بسترهای نرم‌افزاری ویژه صنایع معدنی و فرآوری."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {servicesData.map((service, idx) => (
            <AnimatedSection key={service.id} delay={idx * 0.08}>
              <div className="bg-white rounded-2xl p-7 border border-brand-border shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                <div>
                  {/* Icon and status badge */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3.5 rounded-xl bg-brand-sand border border-brand-border/60 group-hover:bg-brand-sandDark/40 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-slate-100 text-slate-600 font-mono">
                      CORE 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 mb-3 group-hover:text-brand-amberDark transition-colors font-vazir">
                    {service.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-900 group-hover:text-brand-amberDark transition-colors"
                  >
                    <span>جزئیات و شرح مهندسی خدمت</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                  <span className="text-[11px] text-slate-400 font-mono">0{idx + 1}</span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
