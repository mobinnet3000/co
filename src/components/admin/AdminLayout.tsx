import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  MessageSquare,
  Settings,
  Search,
  Users,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Layers,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import { Logo } from '../common/Logo';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  useEffect(() => {
    // Fetch unread count for badge
    api.messages.getAll({ limit: 1 })
      .then((res) => {
        if (res.success) setUnreadMessages(res.unreadCount);
      })
      .catch(() => {});
  }, [location.pathname]);

  const navItems = [
    { label: 'داشبورد کلی', path: '/admin', icon: LayoutDashboard },
    { label: 'مدیریت صفحات (CMS)', path: '/admin/pages', icon: Layers },
    { label: 'مقالات و دانشنامه', path: '/admin/blog', icon: BookOpen },
    { label: 'کتابخانه رسانه‌ها', path: '/admin/media', icon: ImageIcon },
    {
      label: 'پیام‌ها و استعلام‌ها',
      path: '/admin/messages',
      icon: MessageSquare,
      badge: unreadMessages > 0 ? unreadMessages : undefined,
    },
    { label: 'تنظیمات سراسری سایت', path: '/admin/settings', icon: Settings },
    { label: 'تحلیل و سئو (SEO)', path: '/admin/seo', icon: Search },
    { label: 'کاربران و دسترسی‌ها', path: '/admin/users', icon: Users, roleReq: ['super_admin', 'admin'] },
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-[#F4F1EA] text-navy-950 flex font-vazir antialiased" dir="rtl">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-navy-950/60 z-40 lg:hidden backdrop-blur-xs"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 right-0 h-screen w-64 bg-navy-950 text-white z-50 flex flex-col justify-between transition-transform duration-300 border-l border-slate-800 shadow-xl ${
          sidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
        }`}
      >
        <div>
          {/* Brand & Logo */}
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#EFA73F] text-navy-950 font-black flex items-center justify-center font-mono text-base">
                M
              </div>
              <div>
                <span className="font-bold text-sm block leading-tight text-white">پنل مدیریت معدنکو</span>
                <span className="text-[10px] text-slate-400 font-mono">MADANCO CMS v1.0</span>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* User Brief */}
          <div className="p-4 mx-3 my-3 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-300 font-bold text-xs border border-slate-700">
              <Shield className="w-4 h-4 text-[#EFA73F]" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="font-semibold text-xs text-white block truncate">{user?.full_name}</span>
              <span className="text-[10px] text-[#EFA73F] font-mono capitalize">
                {user?.role === 'super_admin' ? 'مدیر ارشد' : user?.role === 'admin' ? 'مدیر سیستم' : 'نویسنده / تحریریه'}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-250px)]">
            {navItems.map((item) => {
              if (item.roleReq && user && !item.roleReq.includes(user.role)) return null;
              const isActive = location.pathname === item.path;
              const Icon = item.icon;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-[10px] text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#EFA73F] text-navy-950 font-bold shadow-xs'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-navy-950' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className="px-1.5 py-0.5 rounded-full bg-[#C92127] text-white font-mono text-[10px] font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-[8px] bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <span>مشاهده وبسایت عمومی</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#EFA73F]" />
          </Link>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-[8px] text-rose-400 hover:bg-rose-500/10 text-xs font-semibold transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>خروج از حساب</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-[#E3DAD0] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-navy-950 hover:bg-slate-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <span className="font-bold text-sm text-navy-950">
              سامانه یکپارچه مدیریت محتوا و ارتباطات (MadanCo CMS)
            </span>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-500 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              API: ONLINE
            </span>
            <a
              href="https://madan.ba3tani.ir"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs px-3 py-1.5 rounded-[8px] bg-brand-sand border border-[#E3DAD0] hover:border-[#0F1821] text-navy-950 font-bold transition-all"
            >
              سامانه زنده پایش
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
