import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, PhoneCall } from 'lucide-react';

interface CTABlockProps {
  config: {
    title?: string;
    subtitle?: string;
    buttonText?: string;
    buttonUrl?: string;
    phone?: string;
  };
}

export const CTABlock: React.FC<CTABlockProps> = ({ config }) => {
  return (
    <section className="py-16 sm:py-20 bg-navy-950 text-white relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        {config.title && (
          <h2 className="text-2xl sm:text-4xl font-black mb-4 leading-tight">
            {config.title}
          </h2>
        )}
        {config.subtitle && (
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            {config.subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {config.buttonText && config.buttonUrl && (
            <Link
              to={config.buttonUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-brand-amber hover:bg-brand-amberDark text-navy-950 font-bold transition-all shadow-md"
            >
              <span>{config.buttonText}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}

          {config.phone && (
            <a
              href={`tel:${config.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl border border-slate-700 text-slate-200 hover:bg-slate-900 transition-all font-mono font-bold"
              dir="ltr"
            >
              <PhoneCall className="w-4 h-4 text-brand-amber" />
              <span>{config.phone}</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
};
