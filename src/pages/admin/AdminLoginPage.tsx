import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Lock, User, ArrowLeft, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { SEO } from '../../components/common/SEO';

export const AdminLoginPage: React.FC = () => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('MadanCo@2026!Admin');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || '/admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login(username, password);
      navigate(from, { replace: true });
    } catch (err: any) {
      setError(err.message || 'نام کاربری یا کلمه عبور نادرست است.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand flex items-center justify-center p-4 relative font-vazir select-none">
      <SEO title="ورود به پنل مدیریت | معدنکو" description="ورود امن به سامانه مدیریت محتوای شرکت معدنکو" />

      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 right-[20%] w-[1px] bg-[#E3DAD0]"></div>
        <div className="absolute top-0 bottom-0 left-[20%] w-[1px] bg-[#E3DAD0]"></div>
      </div>

      <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#E3DAD0] shadow-card relative z-10">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-navy-950 text-[#EFA73F] mx-auto flex items-center justify-center font-mono font-black text-2xl shadow-card mb-4 border border-[#E3DAD0]">
            M
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-navy-950 font-vazir mb-1">
            ورود به سامانه مدیریت معدنکو
          </h1>
          <p className="text-xs text-slate-500 font-light">
            محاسبات عملیات داده ارزیابی نوین (MadanCo CMS)
          </p>
        </div>

        {error && (
          <div className="mb-6 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-navy-950 mb-1.5">نام کاربری یا پست الکترونیکی</label>
            <div className="relative">
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#E3DAD0] text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-[#0F1821] bg-white transition-all font-mono"
                placeholder="admin"
                dir="ltr"
              />
              <User className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-navy-950 mb-1.5">کلمه عبور امن</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 rounded-xl border border-[#E3DAD0] text-xs sm:text-sm text-navy-950 focus:outline-none focus:border-[#0F1821] bg-white transition-all font-mono"
                placeholder="••••••••••••"
                dir="ltr"
              />
              <Lock className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
            >
              {loading ? (
                <span>در حال اعتبارسنجی...</span>
              ) : (
                <>
                  <span>ورود به پنل مدیریت</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="mt-8 pt-6 border-t border-[#E3DAD0] flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>اتصال امن رمزنگاری‌شده</span>
          </span>
          <span className="font-mono text-slate-400">v1.0.0</span>
        </div>
      </div>
    </div>
  );
};
