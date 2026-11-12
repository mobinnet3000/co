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
  Compass,
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

  // Global Admin Search State
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any | null>(null);
  const [searching, setSearching] = useState<boolean>(false);
  const [searchDropdownOpen, setSearchDropdownOpen] = useState<boolean>(false);

  useEffect(() => {
    // Fetch unread count for badge
    api.messages.getAll({ limit: 1 })
      .then((res) => {
        if (res.success) setUnreadMessages(res.unreadCount);
      })
      .catch(() => {});
  }, [location.pathname]);

  // Handle live global search with debounce
  useEffect(() => {
    if (!searchQuery.trim() || searchQuery.trim().length < 2) {
      setSearchResults(null);
      setSearchDropdownOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setSearching(true);
      api.search.admin(searchQuery.trim())
        .then((res) => {
          if (res.success) {
            setSearchResults(res.data);
            setSearchDropdownOpen(true);
          }
        })
        .catch(() => {})
        .finally(() => setSearching(false));
    }, 250);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const navItems = [
    { label: 'داشبورد کلی', path: '/admin', icon: LayoutDashboard },
    { label: 'مدیریت صفحات (CMS)', path: '/admin/pages', icon: Layers },
    { label: 'منوها و ناوبری', path: '/admin/menus', icon: Compass },
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
            <span className="hidden xl:inline-block font-bold text-sm text-navy-950">
              سامانه مدیریت معدنکو
            </span>
          </div>

          {/* Central Admin Global Search Bar */}
          <div className="relative flex-1 max-w-md mx-4">
            <div className="relative">
              <input
                type="text"
                placeholder="جستجوی همه‌منظوره (صفحات، مقالات، پیام‌ها، رسانه‌ها...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => {
                  if (searchResults) setSearchDropdownOpen(true);
                }}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100/80 border border-slate-200 text-xs text-navy-950 focus:bg-white focus:outline-none focus:border-navy-900 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            {/* Dropdown Results */}
            {searchDropdownOpen && searchResults && (
              <div className="absolute top-full mt-2 right-0 left-0 bg-white rounded-2xl border border-slate-200 shadow-2xl z-50 p-3 max-h-96 overflow-y-auto space-y-3 text-xs">
                {/* Pages */}
                {searchResults.pages?.length > 0 && (
                  <div>
                    <span className="font-bold text-slate-400 text-[10px] block mb-1">صفحات CMS</span>
                    <div className="space-y-1">
                      {searchResults.pages.map((p: any) => (
                        <Link
                          key={p.id}
                          to="/admin/pages"
                          onClick={() => setSearchDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-bold text-navy-950">{p.title}</span>
                          <span className="font-mono text-slate-400 text-[10px]">/{p.slug}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Articles */}
                {searchResults.articles?.length > 0 && (
                  <div className="border-t border-slate-100 pt-2">
                    <span className="font-bold text-slate-400 text-[10px] block mb-1">مقالات دانشنامه</span>
                    <div className="space-y-1">
                      {searchResults.articles.map((a: any) => (
                        <Link
                          key={a.id}
                          to="/admin/blog"
                          onClick={() => setSearchDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-bold text-navy-950 truncate max-w-[280px]">{a.title}</span>
                          <span className={`text-[10px] px-1.5 py-0.5 rounded ${a.status === 'published' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                            {a.status === 'published' ? 'منتشر' : 'پیش‌نویس'}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                {searchResults.messages?.length > 0 && (
                  <div className="border-t border-slate-100 pt-2">
                    <span className="font-bold text-slate-400 text-[10px] block mb-1">پیام‌ها و استعلام‌ها</span>
                    <div className="space-y-1">
                      {searchResults.messages.map((m: any) => (
                        <Link
                          key={m.id}
                          to="/admin/messages"
                          onClick={() => setSearchDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <div>
                            <span className="font-bold text-navy-950 block">{m.name}</span>
                            <span className="text-[10px] text-slate-500">{m.company || m.email}</span>
                          </div>
                          <span className="text-[10px] font-mono text-slate-400">{m.phone}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Media */}
                {searchResults.media?.length > 0 && (
                  <div className="border-t border-slate-100 pt-2">
                    <span className="font-bold text-slate-400 text-[10px] block mb-1">رسانه‌ها و فایل‌ها</span>
                    <div className="space-y-1">
                      {searchResults.media.map((med: any) => (
                        <Link
                          key={med.id}
                          to="/admin/media"
                          onClick={() => setSearchDropdownOpen(false)}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span className="font-medium text-navy-950 truncate max-w-[280px]">{med.original_name}</span>
                          <span className="text-[10px] text-slate-400">{med.alt_text || 'بدون متن جایگزین'}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {searchResults.pages.length === 0 && searchResults.articles.length === 0 && searchResults.messages.length === 0 && searchResults.media.length === 0 && (
                  <div className="py-4 text-center text-slate-400">موردی یافت نشد.</div>
                )}
              </div>
            )}
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
