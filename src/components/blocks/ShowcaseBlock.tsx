import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';

interface ShowcaseBlockProps {
  config: {
    badge?: string;
    title?: string;
    description?: string;
    bullets?: string[];
    linkText?: string;
    linkUrl?: string;
    imageUrl?: string;
    imagePosition?: 'left' | 'right';
  };
}

export const ShowcaseBlock: React.FC<ShowcaseBlockProps> = ({ config }) => {
  const bullets = config.bullets || [];
  const isImageLeft = config.imagePosition === 'left';

  return (
    <section className="py-16 sm:py-24 bg-brand-sandLight border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${isImageLeft ? 'lg:flex-row-reverse' : ''}`}>
          <div className="lg:col-span-7 space-y-6">
            {config.badge && (
              <span className="inline-block px-3 py-1 text-xs font-bold rounded-md bg-brand-amber/15 text-navy-900 border border-brand-amber/30">
                {config.badge}
              </span>
            )}
            {config.title && (
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 leading-tight">
                {config.title}
              </h2>
            )}
            {config.description && (
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                {config.description}
              </p>
            )}

            {bullets.length > 0 && (
              <ul className="space-y-3 pt-2">
                {bullets.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                    <CheckCircle className="w-5 h-5 text-brand-amber flex-shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}

            {config.linkText && config.linkUrl && (
              <div className="pt-4">
                <Link
                  to={config.linkUrl}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold transition-all shadow-sm text-sm sm:text-base"
                >
                  <span>{config.linkText}</span>
                  <ArrowLeft className="w-4 h-4 text-brand-amber" />
                </Link>
              </div>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden border border-brand-border bg-white p-4 shadow-card">
              {config.imageUrl ? (
                <img
                  src={config.imageUrl}
                  alt={config.title || 'تصویر بخش'}
                  className="w-full h-auto rounded-xl object-cover"
                />
              ) : (
                <div className="aspect-video bg-navy-950 rounded-xl flex items-center justify-center p-8 text-center">
                  <div className="space-y-2">
                    <div className="w-12 h-12 mx-auto rounded-xl bg-brand-amber/20 border border-brand-amber/30 flex items-center justify-center text-brand-amber font-mono font-bold">
                      MADAN
                    </div>
                    <div className="text-white text-sm font-bold">سامانه موازنه و پایش آنلاین</div>
                    <div className="text-slate-400 text-xs">معماری ایزوله پردازش داده در محل کارخانه</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
