import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute: React.FC<{ children: React.ReactNode; allowedRoles?: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-[#0F1821] border-t-[#EFA73F] rounded-full animate-spin"></div>
          <span className="text-xs font-vazir text-slate-600">در حال بررسی نشست کاربری...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-brand-sand flex items-center justify-center p-4">
        <div className="max-w-md bg-white p-6 rounded-2xl border border-red-200 text-center">
          <h2 className="text-lg font-bold text-red-600 mb-2">عدم دسترسی کافی</h2>
          <p className="text-xs text-slate-600 mb-4">شما مجوز لازم برای مشاهده این بخش را ندارید.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
