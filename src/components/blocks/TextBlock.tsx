import React from 'react';

interface TextBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    content?: string;
    align?: 'right' | 'center';
    hasCard?: boolean;
  };
}

export const TextBlock: React.FC<TextBlockProps> = ({ config }) => {
  const isCentered = config.align === 'center';

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={config.hasCard ? 'bg-white p-8 sm:p-10 rounded-2xl border border-brand-border shadow-sm' : ''}>
          {config.title && (
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-navy-950 mb-4 ${isCentered ? 'text-center' : 'text-right'}`}>
              {config.title}
            </h2>
          )}
          {config.subtitle && (
            <p className={`text-sm sm:text-base text-brand-amber font-semibold mb-6 ${isCentered ? 'text-center' : 'text-right'}`}>
              {config.subtitle}
            </p>
          )}
          {config.content && (
            <div className="text-slate-700 leading-relaxed space-y-4 text-justify whitespace-pre-line text-sm sm:text-base">
              {config.content}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
