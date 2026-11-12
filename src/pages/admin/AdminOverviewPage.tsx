import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Layers,
  BookOpen,
  MessageSquare,
  Image as ImageIcon,
  ArrowUpLeft,
  CheckCircle2,
  Clock,
  Activity,
  Plus,
  Shield,
  Search,
  Eye,
  TrendingUp,
  Users,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminOverviewPage: React.FC = () => {
  const [stats, setStats] = useState({
    pagesCount: 0,
    articlesCount: 0,
    unreadMessages: 0,
    mediaCount: 0,
    totalViews: 0,
    todayViews: 0,
    uniqueVisitors: 0,
  });
  const [topPaths, setTopPaths] = useState<Array<{ path: string; views: number }>>([]);
  const [recentMessages, setRecentMessages] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    Promise.all([
      api.analytics.getDashboard().catch(() => null),
      api.messages.getAll({ limit: 5 }).catch(() => ({ success: false, data: [], unreadCount: 0 })),
      api.media.getAll().catch(() => ({ success: false, data: [] })),
      api.pages.getAll().catch(() => ({ success: false, data: [] })),
      api.articles.getAll().catch(() => ({ success: false, data: [] })),
    ]).then(([analyticsRes, messagesRes, mediaRes, pagesRes, articlesRes]) => {
      if (analyticsRes && analyticsRes.success) {
        setStats({
          pagesCount: analyticsRes.stats.totalPages,
          articlesCount: analyticsRes.stats.totalArticles,
          unreadMessages: analyticsRes.stats.unreadMessages,
          mediaCount: analyticsRes.stats.totalMedia,
          totalViews: analyticsRes.stats.totalViews,
          todayViews: analyticsRes.stats.todayViews,
          uniqueVisitors: analyticsRes.stats.uniqueVisitors,
        });
        setTopPaths(analyticsRes.topPaths || []);
        if (analyticsRes.recentLogs) setAuditLogs(analyticsRes.recentLogs);
      } else {
        setStats((prev) => ({
          ...prev,
          pagesCount: pagesRes?.success ? pagesRes.data.length : 0,
          articlesCount: articlesRes?.success ? articlesRes.data.length : 0,
          unreadMessages: messagesRes?.success ? messagesRes.unreadCount : 0,
          mediaCount: mediaRes?.success ? mediaRes.data.length : 0,
        }));
      }

      if (messagesRes?.success) setRecentMessages(messagesRes.data.slice(0, 5));
      setLoading(false);
    });
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">نمای کلی سامانه مدیریت</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              پایش بلادرنگ صفحات، انتشارات، پیام‌های دریافتی و فعالیت‌های سیستمی
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/admin/blog"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs shadow-xs transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>مطلب جدید</span>
            </Link>
            <Link
              to="/admin/pages"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-white border border-[#E3DAD0] hover:border-[#0F1821] text-navy-950 font-bold text-xs shadow-xs transition-colors"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>مدیریت صفحات</span>
            </Link>
          </div>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Pages */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">صفحات فعال سایت</span>
              <strong className="text-2xl font-mono font-bold text-navy-950">
                {loading ? '...' : stats.pagesCount}
              </strong>
            </div>
            <div className="w-11 h-11 rounded-xl bg-brand-sand text-[#0F1821] flex items-center justify-center border border-[#E3DAD0]">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          {/* Articles */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">مقالات و دانشنامه</span>
              <strong className="text-2xl font-mono font-bold text-navy-950">
                {loading ? '...' : stats.articlesCount}
              </strong>
            </div>
            <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center border border-amber-200">
              <BookOpen className="w-5 h-5 text-[#EFA73F]" />
            </div>
          </div>

          {/* Messages */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">استعلام‌های خوانده‌نشده</span>
              <strong className="text-2xl font-mono font-bold text-[#C92127]">
                {loading ? '...' : stats.unreadMessages}
              </strong>
            </div>
            <div className="w-11 h-11 rounded-xl bg-rose-50 text-rose-700 flex items-center justify-center border border-rose-200">
              <MessageSquare className="w-5 h-5 text-[#C92127]" />
            </div>
          </div>

          {/* Media */}
          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-500 font-medium block mb-1">فایل‌ها و تصاویر رسانه</span>
              <strong className="text-2xl font-mono font-bold text-navy-950">
                {loading ? '...' : stats.mediaCount}
              </strong>
            </div>
            <div className="w-11 h-11 rounded-xl bg-slate-50 text-slate-700 flex items-center justify-center border border-slate-200">
              <ImageIcon className="w-5 h-5 text-slate-600" />
            </div>
          </div>
        </div>

        {/* Traffic & First-Party Analytics Strip */}
        <div className="p-6 rounded-2xl bg-navy-950 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#EFA73F]/20 text-[#EFA73F] flex items-center justify-center border border-[#EFA73F]/30">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-white flex items-center gap-2">
                <span>آمار بازدید و تحلیل ترافیک سایت</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-bold">
                  LIVE ANALYTICS
                </span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">ثبت آنی رویدادهای بازدید کاربران بدون نیاز به کوکی‌های ردگیری شخص ثالث</p>
            </div>
          </div>

          <div className="flex items-center gap-6 divide-x divide-slate-800 divide-x-reverse font-mono">
            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block font-vazir mb-1">کل بازدیدها</span>
              <strong className="text-xl font-bold text-[#EFA73F]">{stats.totalViews}</strong>
            </div>
            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block font-vazir mb-1">بازدید امروز</span>
              <strong className="text-xl font-bold text-white">{stats.todayViews}</strong>
            </div>
            <div className="text-center px-4">
              <span className="text-xs text-slate-400 block font-vazir mb-1">بازدیدکنندگان یکتا</span>
              <strong className="text-xl font-bold text-slate-200">{stats.uniqueVisitors}</strong>
            </div>
          </div>
        </div>

        {/* Two-Column Grid: Recent Inquiries & Activity Logs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Inquiries (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E3DAD0]">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#C92127]" />
                <h2 className="text-sm font-bold text-navy-950 font-vazir">آخرین پیام‌ها و استعلام‌های دریافتی</h2>
              </div>
              <Link to="/admin/messages" className="text-xs font-bold text-[#0F1821] hover:text-[#C92127] flex items-center gap-1">
                <span>مشاهده همه</span>
                <ArrowUpLeft className="w-3.5 h-3.5" />
              </Link>
            </div>

            {recentMessages.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 font-light">
                هنوز پیامی ثبت نشده است.
              </div>
            ) : (
              <div className="space-y-3">
                {recentMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3.5 rounded-xl bg-brand-sandLight border border-[#E3DAD0]/70 flex items-start justify-between gap-3 text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <strong className="text-navy-950 font-bold">{m.name}</strong>
                        {m.company && (
                          <span className="text-[11px] text-slate-500">({m.company})</span>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                            m.status === 'unread'
                              ? 'bg-rose-100 text-[#C92127]'
                              : m.status === 'resolved'
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-200 text-slate-700'
                          }`}
                        >
                          {m.status === 'unread' ? 'جدید' : m.status === 'resolved' ? 'پاسخ داده شد' : 'در دست بررسی'}
                        </span>
                      </div>
                      <p className="text-slate-600 line-clamp-1">{m.message}</p>
                    </div>

                    <div className="text-left font-mono text-[11px] text-slate-400 whitespace-nowrap">
                      {m.phone || m.email}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* System Audit Logs (5 cols) */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
            <div className="flex items-center justify-between mb-5 pb-3 border-b border-[#E3DAD0]">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#EFA73F]" />
                <h2 className="text-sm font-bold text-navy-950 font-vazir">رویدادها و لاگ‌های امنیتی</h2>
              </div>
              <span className="text-[11px] font-mono text-slate-400">AUDIT LOGS</span>
            </div>

            {auditLogs.length === 0 ? (
              <div className="text-center py-8 text-xs text-slate-500 font-light">
                لاگ فعالی ثبت نشده است.
              </div>
            ) : (
              <div className="space-y-3">
                {auditLogs.map((log) => (
                  <div key={log.id} className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-navy-950 font-mono text-[11px]">{log.action}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {log.created_at ? log.created_at.slice(11, 19) : ''}
                      </span>
                    </div>
                    <p className="text-slate-600 text-[11px]">{log.details}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
