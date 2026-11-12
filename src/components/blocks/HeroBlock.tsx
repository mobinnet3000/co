import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronLeft } from 'lucide-react';

interface HeroBlockProps {
  config: {
    badge?: string;
    title?: string;
    subtitle?: string;
    primaryCtaText?: string;
    primaryCtaUrl?: string;
    secondaryCtaText?: string;
    secondaryCtaUrl?: string;
    bgPattern?: boolean;
  };
}

export const HeroBlock: React.FC<HeroBlockProps> = ({ config }) => {
  return (
    <section className="relative overflow-hidden bg-brand-sand py-16 sm:py-24 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center lg:text-right">
        {config.badge && (
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-navy-900/5 border border-navy-900/10 text-xs font-bold text-navy-800 mb-6">
            <span className="w-2 h-2 rounded-full bg-brand-amber animate-pulse" />
            <span>{config.badge}</span>
          </div>
        )}

        {config.title && (
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-navy-950 leading-tight mb-6 tracking-tight">
            {config.title}
          </h1>
        )}

        {config.subtitle && (
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl leading-relaxed mb-8">
            {config.subtitle}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
          {config.primaryCtaText && config.primaryCtaUrl && (
            <Link
              to={config.primaryCtaUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-brand-amber hover:bg-brand-amberDark text-navy-950 font-bold transition-all shadow-sm"
            >
              <span>{config.primaryCtaText}</span>
              <ArrowLeft className="w-4 h-4" />
            </Link>
          )}

          {config.secondaryCtaText && config.secondaryCtaUrl && (
            <Link
              to={config.secondaryCtaUrl}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-navy-800 text-navy-900 hover:bg-navy-900 hover:text-white font-medium transition-all"
            >
              <span>{config.secondaryCtaText}</span>
              <ChevronLeft className="w-4 h-4" />
            </Link>
          )}
        </div>
      </div>
    </section>
  );
};
