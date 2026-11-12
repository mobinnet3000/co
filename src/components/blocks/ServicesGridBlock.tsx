import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import * as LucideIcons from 'lucide-react';

interface ServiceGridItem {
  title: string;
  description: string;
  slug?: string;
  icon?: string;
  tag?: string;
}

interface ServicesGridBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: ServiceGridItem[];
  };
}

export const ServicesGridBlock: React.FC<ServicesGridBlockProps> = ({ config }) => {
  const items = config.items || [];

  return (
    <section className="py-16 sm:py-24 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-14">
            {config.title && (
              <h2 className="text-2xl sm:text-4xl font-extrabold text-navy-950 mb-4">
                {config.title}
              </h2>
            )}
            {config.subtitle && (
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {items.map((srv, idx) => {
            const IconComp = srv.icon && (LucideIcons as any)[srv.icon]
              ? (LucideIcons as any)[srv.icon]
              : LucideIcons.Cpu;

            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-brand-sandLight border border-brand-border hover:border-brand-amber hover:shadow-card transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-navy-900 text-brand-amber flex items-center justify-center shadow-xs">
                      <IconComp className="w-6 h-6" />
                    </div>
                    {srv.tag && (
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-md bg-white border border-brand-border text-navy-900">
                        {srv.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="text-lg font-bold text-navy-950 mb-3">{srv.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{srv.description}</p>
                </div>

                {srv.slug && (
                  <Link
                    to={`/services/${srv.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-navy-950 hover:text-brand-crimson transition-colors pt-4 border-t border-brand-border/60"
                  >
                    <span>مشاهده جزییات خدمت</span>
                    <ArrowLeft className="w-3.5 h-3.5 text-brand-amber" />
                  </Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
