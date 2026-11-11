import React from 'react';
import { platformWorkflow } from '../../data/platform';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';
import { ArrowLeft, Check, Layers, ArrowDown } from 'lucide-react';

export const PlatformWorkflow: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-bgLight border-b border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <SectionHeading
            align="center"
            eyebrow="جریان کار عملیاتی سامانه"
            title="گردش داده‌ها در سامانه: ۵ گام اساسی"
            description="از لحظه ورود داده‌های ثبت‌شده در خط تا استخراج شاخص‌های ارزیابی متالورژیکی و گزارش‌های نهایی."
          />
        </AnimatedSection>

        <div className="space-y-6 max-w-4xl mx-auto">
          {platformWorkflow.map((step, idx) => (
            <AnimatedSection key={idx} delay={idx * 0.1}>
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-brand-border shadow-subtle hover:shadow-card transition-shadow duration-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <span className="w-12 h-12 rounded-xl bg-navy-900 text-brand-cyan font-mono text-xl font-black flex items-center justify-center flex-shrink-0 shadow-sm">
                      {step.number}
                    </span>
                    <div>
                      <span className="font-mono text-xs text-brand-blue tracking-wider block">
                        {step.subtitle}
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-navy-900 font-vazir">
                        {step.title}
                      </h3>
                    </div>
                  </div>
                  <span className="self-start sm:self-auto text-xs px-3 py-1 rounded-full bg-slate-100 text-slate-600 font-medium">
                    گام عملیاتی 0{idx + 1}
                  </span>
                </div>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                  {step.description}
                </p>

                {/* Inputs & Outputs Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100 text-xs">
                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                      ورودی‌های این مرحله:
                    </span>
                    <ul className="space-y-1 text-slate-500 pr-3 list-disc">
                      {step.inputs.map((inp, i) => (
                        <li key={i}>{inp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                    <span className="font-bold text-slate-700 block mb-2 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      خروجی‌های تحویلی:
                    </span>
                    <ul className="space-y-1 text-slate-500 pr-3 list-disc">
                      {step.outputs.map((out, i) => (
                        <li key={i}>{out}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {idx < platformWorkflow.length - 1 && (
                <div className="flex justify-center my-3 text-slate-400">
                  <ArrowDown className="w-5 h-5 animate-bounce" />
                </div>
              )}
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
