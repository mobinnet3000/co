import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';

interface TimelineStep {
  date?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
}

interface TimelineBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    steps?: TimelineStep[];
  };
}

export const TimelineBlock: React.FC<TimelineBlockProps> = ({ config }) => {
  const steps = config.steps || [];

  return (
    <section className="py-16 sm:py-20 bg-brand-sandLight border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center mb-14">
            {config.title && (
              <h2 className="text-2xl sm:text-3xl font-extrabold text-navy-950 mb-3">
                {config.title}
              </h2>
            )}
            {config.subtitle && (
              <p className="text-sm sm:text-base text-slate-600">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="relative border-r-2 border-brand-border pr-8 space-y-10 mr-4 sm:mr-8">
          {steps.map((step, idx) => (
            <div key={idx} className="relative">
              {/* Bullet circle */}
              <div className="absolute -right-[41px] top-1 w-5 h-5 rounded-full bg-navy-950 border-4 border-brand-amber flex items-center justify-center shadow-xs" />

              <div className="bg-white p-6 rounded-2xl border border-brand-border shadow-subtle hover:border-brand-amber/40 transition-colors">
                {step.date && (
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-brand-sand text-navy-800 font-mono text-xs font-bold mb-2">
                    <Calendar className="w-3.5 h-3.5 text-brand-amber" />
                    <span>{step.date}</span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-navy-950 mb-2">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
