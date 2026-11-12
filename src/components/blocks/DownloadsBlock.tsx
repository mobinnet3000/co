import React from 'react';
import { Download, FileText, ArrowDownToLine } from 'lucide-react';

interface DownloadItem {
  title: string;
  description?: string;
  fileUrl: string;
  fileSize?: string;
  fileType?: string;
}

interface DownloadsBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    items?: DownloadItem[];
  };
}

export const DownloadsBlock: React.FC<DownloadsBlockProps> = ({ config }) => {
  const items = config.items || [];

  return (
    <section className="py-14 sm:py-20 bg-brand-sand border-b border-brand-border">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="text-center mb-12">
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

        <div className="space-y-4">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white border border-brand-border shadow-subtle hover:border-brand-amber/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-navy-950 text-brand-amber flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-navy-950 mb-1">{item.title}</h3>
                  {item.description && (
                    <p className="text-xs text-slate-500 mb-2">{item.description}</p>
                  )}
                  <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                    {item.fileType && (
                      <span className="uppercase px-1.5 py-0.5 rounded bg-slate-100 font-bold text-slate-600">
                        {item.fileType}
                      </span>
                    )}
                    {item.fileSize && <span>{item.fileSize}</span>}
                  </div>
                </div>
              </div>

              <a
                href={item.fileUrl}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-xs transition-all"
              >
                <span>دریافت فایل</span>
                <ArrowDownToLine className="w-4 h-4 text-brand-amber" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
