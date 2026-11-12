import React from 'react';
import * as LucideIcons from 'lucide-react';

interface FeatureItem {
  icon?: string;
  title: string;
  description: string;
}

interface FeaturesBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: FeatureItem[];
    columns?: 2 | 3 | 4;
  };
}

export const FeaturesBlock: React.FC<FeaturesBlockProps> = ({ config }) => {
  const items = config.items || [];
  const colClass = config.columns === 4
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
    : config.columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 md:grid-cols-3';

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            {config.title && (
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-navy-950 mb-4">
                {config.title}
              </h2>
            )}
            {config.subtitle && (
              <p className="text-base text-slate-600 leading-relaxed">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        <div className={`grid ${colClass} gap-6 sm:gap-8`}>
          {items.map((item, index) => {
            // Dynamically resolve icon from LucideIcons
            const IconComponent = item.icon && (LucideIcons as any)[item.icon]
              ? (LucideIcons as any)[item.icon]
              : LucideIcons.CheckCircle2;

            return (
              <div
                key={index}
                className="p-6 sm:p-8 rounded-2xl bg-brand-sandLight border border-brand-border hover:border-brand-amber/50 hover:shadow-subtle transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-navy-900 text-brand-amber flex items-center justify-center mb-6 shadow-sm">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-navy-900 mb-3 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
