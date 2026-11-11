import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft } from 'lucide-react';
import { industriesData } from '../../data/industries';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const IndustriesOverview: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-y border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="حوزه‌های هدف معدنکو"
            title="تمرکز بر صنایع معدنی و فرآوری مواد معدنی"
            description="راهکارهای ما بر اساس مشخصات کانی‌شناسی، فلوشیت‌های خردایش و مدارهای جدایش متداول در بخش‌های کلیدی صنایع معدنی کشور تدوین شده‌اند."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/industries"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-amberDark transition-colors self-start md:self-auto"
          >
            <span>مشاهده همه صنایع</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {industriesData.map((ind, idx) => (
            <AnimatedSection key={ind.id} delay={idx * 0.1}>
              <Link
                to={`/industries/${ind.slug}`}
                className="group relative block rounded-2xl overflow-hidden shadow-subtle hover:shadow-elevated transition-all duration-300 h-96 border border-brand-border"
              >
                {/* Background Image */}
                <img
                  src={ind.image}
                  alt={ind.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/60 to-transparent"></div>

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex justify-end">
                    <span className="p-2 rounded-full bg-white/20 backdrop-blur-md group-hover:bg-brand-amber group-hover:text-navy-950 transition-colors">
                      <ArrowUpLeft className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-mono tracking-widest text-brand-amber mb-1 block uppercase">
                      TARGET COMMODITY
                    </span>
                    <h3 className="text-xl font-bold font-vazir mb-2 group-hover:text-brand-amber transition-colors">
                      {ind.title}
                    </h3>
                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed font-light">
                      {ind.shortDescription}
                    </p>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-slate-400 font-light">
          * دسته‌بندی‌های فوق بازارهای هدف توسعه سامانه و تحلیل داده‌ها می‌باشند.
        </div>
      </div>
    </section>
  );
};
