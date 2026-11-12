import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../common/Button';

export interface ImageTextBlockConfig {
  tagline?: string;
  title: string;
  description: string;
  bulletPoints?: string[];
  imageUrl: string;
  imagePosition?: 'left' | 'right';
  ctaText?: string;
  ctaLink?: string;
}

export const ImageTextBlock: React.FC<{ config: ImageTextBlockConfig }> = ({ config }) => {
  if (!config) return null;

  const isImageRight = config.imagePosition === 'right';

  return (
    <section className="py-16 md:py-20 bg-brand-sand border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isImageRight ? 'lg:flex-row-reverse' : ''}`}>
          {/* Content Column */}
          <div className={`lg:col-span-7 ${isImageRight ? 'lg:order-2' : 'lg:order-1'}`}>
            {config.tagline && (
              <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-3">
                {config.tagline}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-navy-950 mb-6 leading-tight">
              {config.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-light mb-6">
              {config.description}
            </p>

            {config.bulletPoints && config.bulletPoints.length > 0 && (
              <ul className="space-y-3 mb-8">
                {config.bulletPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-navy-900 font-medium">
                    <span className="w-2 h-2 rounded-full bg-[#EFA73F] mt-1.5 flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            )}

            {config.ctaText && config.ctaLink && (
              <div>
                <Button to={config.ctaLink} variant="primary" size="md">
                  <span>{config.ctaText}</span>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                </Button>
              </div>
            )}
          </div>

          {/* Image Column */}
          <div className={`lg:col-span-5 ${isImageRight ? 'lg:order-1' : 'lg:order-2'}`}>
            <div className="overflow-hidden rounded-2xl border border-[#E3DAD0] bg-white shadow-card relative group">
              <img
                src={config.imageUrl}
                alt={config.title}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/20 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
