import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="مسیر راهنما" className={`flex items-center text-xs md:text-sm text-slate-500 mb-6 ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2">
        <li className="flex items-center">
          <Link
            to="/"
            className="flex items-center gap-1 hover:text-brand-blue transition-colors duration-150"
            title="صفحه اصلی"
          >
            <Home className="w-3.5 h-3.5" />
            <span className="sr-only">صفحه اصلی</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              <ChevronLeft className="w-3.5 h-3.5 text-slate-400" />
              {isLast || !item.path ? (
                <span className="font-semibold text-navy-900" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-blue transition-colors duration-150"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
