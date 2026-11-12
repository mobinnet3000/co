import React from 'react';

interface TableBlockProps {
  config: {
    title?: string;
    subtitle?: string;
    headers?: string[];
    rows?: string[][];
  };
}

export const TableBlock: React.FC<TableBlockProps> = ({ config }) => {
  const headers = config.headers || [];
  const rows = config.rows || [];

  return (
    <section className="py-14 sm:py-18 bg-white border-b border-brand-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {(config.title || config.subtitle) && (
          <div className="mb-8 text-center sm:text-right">
            {config.title && (
              <h2 className="text-xl sm:text-2xl font-extrabold text-navy-950 mb-2">
                {config.title}
              </h2>
            )}
            {config.subtitle && (
              <p className="text-sm text-slate-600">
                {config.subtitle}
              </p>
            )}
          </div>
        )}

        <div className="overflow-x-auto rounded-xl border border-brand-border">
          <table className="min-w-full divide-y divide-brand-border text-right text-sm">
            {headers.length > 0 && (
              <thead className="bg-brand-sandLight">
                <tr>
                  {headers.map((h, i) => (
                    <th key={i} className="px-6 py-4 font-bold text-navy-950">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-brand-border bg-white">
              {rows.map((row, rIdx) => (
                <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                  {row.map((cell, cIdx) => (
                    <td key={cIdx} className="px-6 py-4 text-slate-700">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
