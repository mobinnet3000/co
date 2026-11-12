import React from 'react';
import { Play } from 'lucide-react';

export interface VideoBlockConfig {
  tagline?: string;
  title?: string;
  description?: string;
  videoUrl: string; // iframe embed url or direct mp4 url
  coverImageUrl?: string;
}

export const VideoBlock: React.FC<{ config: VideoBlockConfig }> = ({ config }) => {
  if (!config?.videoUrl) return null;

  const isEmbed = config.videoUrl.includes('aparat.com') || config.videoUrl.includes('youtube.com') || config.videoUrl.includes('player.');

  return (
    <section className="py-16 md:py-20 bg-navy-950 text-white border-b border-[#E3DAD0]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.tagline) && (
          <div className="text-center max-w-2xl mx-auto mb-10">
            {config.tagline && (
              <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-2">
                {config.tagline}
              </span>
            )}
            {config.title && (
              <h2 className="text-2xl sm:text-3xl font-black font-vazir text-white mb-3">
                {config.title}
              </h2>
            )}
            {config.description && (
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                {config.description}
              </p>
            )}
          </div>
        )}

        <div className="relative rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl aspect-video">
          {isEmbed ? (
            <iframe
              src={config.videoUrl}
              title={config.title || 'ویدیو معدنکو'}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full border-0"
            />
          ) : (
            <video
              src={config.videoUrl}
              poster={config.coverImageUrl}
              controls
              className="w-full h-full object-cover"
            >
              مرورگر شما از پخش این ویدیو پشتیبانی نمی‌کند.
            </video>
          )}
        </div>
      </div>
    </section>
  );
};
