import React, { useState } from 'react';
import { Layers } from 'lucide-react';

interface ImageCardProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: 'video' | 'square' | 'wide';
}

export const ImageCard: React.FC<ImageCardProps> = ({
  src,
  alt,
  className = '',
  aspectRatio = 'video',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const aspectClasses = {
    video: 'aspect-[16/10]',
    square: 'aspect-square',
    wide: 'aspect-[21/9]',
  };

  return (
    <div className={`relative overflow-hidden rounded-card bg-navy-800 ${aspectClasses[aspectRatio]} ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-navy-800 animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-cyan/20 border-t-brand-cyan animate-spin"></div>
        </div>
      )}

      {!hasError ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setHasError(true);
            setIsLoading(false);
          }}
          className={`w-full h-full object-cover transition-transform duration-500 hover:scale-105 ${
            isLoading ? 'opacity-0' : 'opacity-100'
          }`}
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-navy-900 text-slate-400 p-6 text-center">
          <div className="p-4 rounded-xl bg-navy-800/80 border border-slate-700/60 mb-3 text-brand-cyan">
            <Layers className="w-8 h-8" />
          </div>
          <span className="text-xs font-medium text-slate-300">{alt}</span>
          <span className="text-[10px] text-slate-500 mt-1">تصویر صنعتی فرآوری مواد معدنی</span>
        </div>
      )}
    </div>
  );
};
