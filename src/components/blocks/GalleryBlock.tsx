import React, { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';

interface GalleryItem {
  url: string;
  title?: string;
  caption?: string;
}

interface GalleryBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    columns?: 2 | 3 | 4;
    items?: GalleryItem[];
  };
}

export const GalleryBlock: React.FC<GalleryBlockProps> = ({ config }) => {
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);
  const items = config.items || [];
  const colClass = config.columns === 4
    ? 'grid-cols-2 md:grid-cols-4'
    : config.columns === 2
    ? 'grid-cols-1 md:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';

  return (
    <section className="py-14 sm:py-20 bg-white border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center max-w-3xl mx-auto mb-12">
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

        <div className={`grid ${colClass} gap-6`}>
          {items.map((item, index) => (
            <div
              key={index}
              onClick={() => setActiveImage(item)}
              className="group relative rounded-2xl overflow-hidden border border-brand-border bg-slate-50 cursor-pointer shadow-subtle hover:shadow-card transition-all"
            >
              <div className="aspect-4/3 overflow-hidden bg-slate-100 flex items-center justify-center">
                <img
                  src={item.url}
                  alt={item.title || 'تصویر گالری'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <div className="absolute inset-0 bg-navy-950/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <ZoomIn className="w-6 h-6 mx-auto mb-2 text-brand-amber" />
                  {item.title && <span className="font-bold text-sm block">{item.title}</span>}
                  {item.caption && <span className="text-xs text-slate-200 mt-1 block">{item.caption}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {activeImage && (
          <div
            onClick={() => setActiveImage(null)}
            className="fixed inset-0 z-50 bg-navy-950/90 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-navy-950 rounded-2xl overflow-hidden border border-slate-700 p-2 shadow-2xl"
            >
              <button
                onClick={() => setActiveImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-navy-900/80 text-white hover:bg-navy-800"
              >
                <X className="w-5 h-5" />
              </button>
              <img
                src={activeImage.url}
                alt={activeImage.title || ''}
                className="w-full max-h-[80vh] object-contain rounded-xl"
              />
              {(activeImage.title || activeImage.caption) && (
                <div className="p-4 text-center text-white">
                  {activeImage.title && <h4 className="font-bold text-base">{activeImage.title}</h4>}
                  {activeImage.caption && <p className="text-xs text-slate-400 mt-1">{activeImage.caption}</p>}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
