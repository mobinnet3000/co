import React from 'react';
import { Database, Filter, Calculator, BarChart3, FileSpreadsheet, Radio, CheckCircle, Clock } from 'lucide-react';
import { platformFeatures } from '../../data/platform';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const PlatformCapabilities: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-5 h-5 text-brand-blue" />;
      case 'Filter':
        return <Filter className="w-5 h-5 text-brand-cyan" />;
      case 'Calculator':
        return <Calculator className="w-5 h-5 text-brand-copper" />;
      case 'BarChart3':
        return <BarChart3 className="w-5 h-5 text-emerald-600" />;
      case 'FileSpreadsheet':
        return <FileSpreadsheet className="w-5 h-5 text-indigo-600" />;
      case 'Radio':
        return <Radio className="w-5 h-5 text-amber-600" />;
      default:
        return <Database className="w-5 h-5 text-brand-blue" />;
    }
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="قابلیت‌های پلتفرم"
            title="امکانات و ماژول‌های سامانه"
            description="تفکیک شفاف میان ماژول‌های فعال و هسته اصلی سامانه در مقایسه با قابلیت‌های توسعه‌پذیر و نیازمند ارزیابی فنی."
          />
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {platformFeatures.map((feat, idx) => {
            const isConfirmed = feat.status.includes('تاییدشده');

            return (
              <AnimatedSection key={feat.id} delay={idx * 0.08}>
                <div
                  className={`p-6 rounded-card border transition-all duration-200 h-full flex flex-col justify-between ${
                    isConfirmed
                      ? 'bg-white border-brand-border shadow-subtle hover:shadow-card'
                      : 'bg-slate-50/70 border-dashed border-slate-300'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                        {getIcon(feat.icon)}
                      </div>
                      <span
                        className={`text-[11px] font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                          isConfirmed
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        {isConfirmed ? (
                          <CheckCircle className="w-3 h-3" />
                        ) : (
                          <Clock className="w-3 h-3" />
                        )}
                        <span>{feat.status}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-navy-900 mb-2 font-vazir">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                      {feat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 text-[11px] text-slate-400">
                    {isConfirmed
                      ? 'آماده بهره‌برداری در فرآیند استقرار'
                      : 'پیکربندی بر اساس نیازمندی و ارزیابی فنی'}
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
};
