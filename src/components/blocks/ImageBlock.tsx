import React from 'react';

export interface ImageBlockConfig {
  imageUrl: string;
  caption?: string;
  altText?: string;
  aspectRatio?: 'auto' | '16/9' | '21/9' | '4/3';
  fullWidth?: boolean;
}

export const ImageBlock: React.FC<{ config: ImageBlockConfig }> = ({ config }) => {
  if (!config?.imageUrl) return null;

  return (
    <section className="py-8 bg-brand-sand">
      <div className={config.fullWidth ? 'w-full px-4' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}>
        <figure className="overflow-hidden rounded-2xl border border-[#E3DAD0] bg-white shadow-card">
          <img
            src={config.imageUrl}
            alt={config.altText || config.caption || 'تصویر صنعتی معدنکو'}
            className="w-full object-cover transition-transform duration-500 hover:scale-[1.01]"
            loading="lazy"
          />
          {config.caption && (
            <figcaption className="p-3 text-center text-xs text-slate-500 border-t border-[#E3DAD0] bg-[#FAF7F3]">
              {config.caption}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  );
};
