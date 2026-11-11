import React from 'react';
import { toPersianDigits } from '../../utils/formatters';

interface StatCardProps {
  label: string;
  value: string | number;
  unit?: string;
  description?: string;
  icon?: React.ReactNode;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  label,
  value,
  unit,
  description,
  icon,
  trend,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-card p-6 border border-brand-border shadow-subtle hover:shadow-card transition-shadow duration-200 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-slate-500">{label}</span>
        {icon && <div className="text-brand-blue p-2 bg-slate-50 rounded-lg">{icon}</div>}
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-navy-900 font-vazir tracking-tight">
          {toPersianDigits(value)}
        </span>
        {unit && <span className="text-xs text-slate-500 font-medium">{unit}</span>}
      </div>

      {(trend || description) && (
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          {description && <span className="text-slate-500">{description}</span>}
          {trend && (
            <span
              className={`font-semibold inline-flex items-center gap-1 ${
                trend.isPositive ? 'text-brand-success' : 'text-amber-600'
              }`}
            >
              {trend.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
