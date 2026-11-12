import React, { useState, useEffect } from 'react';
import { Search, CheckCircle2, AlertTriangle, ExternalLink, Globe, FileCode, Check, RefreshCw } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminSeoPage: React.FC = () => {
  const [seoData, setSeoData] = useState<{ stats: any; items: any[] } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadSeo = () => {
    setLoading(true);
    api.seo.getOverview()
      .then((res) => {
        if (res.success) setSeoData({ stats: res.stats, items: res.items });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadSeo();
  }, []);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">مرکز ممیزی و تحلیل سئو (SEO Infrastructure)</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              پایش بلادرنگ وضعیت متاتگ‌ها، طول عنوان‌ها، کلمات کلیدی، فایل‌های Sitemap و Robots
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={loadSeo}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-white border border-[#E3DAD0] hover:border-[#0F1821] text-navy-950 font-bold text-xs shadow-xs transition-colors"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>بازبینی مجدد</span>
            </button>
            <a
              href="/sitemap.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-brand-sand border border-[#E3DAD0] hover:border-[#0F1821] text-navy-950 font-bold text-xs shadow-xs transition-colors"
            >
              <FileCode className="w-3.5 h-3.5 text-[#EFA73F]" />
              <span>مشاهده sitemap.xml</span>
            </a>
            <a
              href="/robots.txt"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-[10px] bg-brand-sand border border-[#E3DAD0] hover:border-[#0F1821] text-navy-950 font-bold text-xs shadow-xs transition-colors"
            >
              <Globe className="w-3.5 h-3.5 text-slate-600" />
              <span>مشاهده robots.txt</span>
            </a>
          </div>
        </div>

        {/* 4 Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <span className="text-xs text-slate-500 block mb-1">موجودیت‌های ایندکس‌پذیر</span>
            <strong className="text-2xl font-mono font-bold text-navy-950">
              {seoData?.stats?.totalIndexedEntities || 0}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-1">
              ({seoData?.stats?.totalPages || 0} صفحه + {seoData?.stats?.totalArticles || 0} مقاله)
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <span className="text-xs text-slate-500 block mb-1">فاقد تگ Title اختصاصی</span>
            <strong className="text-2xl font-mono font-bold text-[#C92127]">
              {seoData?.stats?.missingSeoTitle || 0}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-1">نیازمند تکمیل برای سرچ کنسول</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <span className="text-xs text-slate-500 block mb-1">فاقد توضیحات متا (Description)</span>
            <strong className="text-2xl font-mono font-bold text-amber-600">
              {seoData?.stats?.missingSeoDesc || 0}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-1">توضیح کمتر از ۵۰ کاراکتر</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <span className="text-xs text-slate-500 block mb-1">فاقد کلمه کلیدی تمرکزی</span>
            <strong className="text-2xl font-mono font-bold text-slate-700">
              {seoData?.stats?.missingFocusKeyword || 0}
            </strong>
            <span className="text-[11px] text-slate-400 block mt-1">پیشنهاد جهت ارتقای هدفمندی</span>
          </div>
        </div>

        {/* SEO Audit Table */}
        <div className="bg-white rounded-2xl border border-[#E3DAD0] shadow-card overflow-hidden">
          <div className="p-4 border-b border-[#E3DAD0] flex items-center justify-between">
            <h2 className="text-sm font-bold text-navy-950 font-vazir">وضعیت متاتگ‌های صفحات و مقالات</h2>
            <span className="text-[11px] text-slate-400 font-mono">LIVE SEO STATUS</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#FAF7F3] border-b border-[#E3DAD0] text-slate-500 font-bold">
                <tr>
                  <th className="p-4">نوع</th>
                  <th className="p-4">عنوان موجودیت</th>
                  <th className="p-4">پیوند یکتا (Slug)</th>
                  <th className="p-4">طول Title (۳۰-۶۵)</th>
                  <th className="p-4">طول Description (۵۰-۱۶۰)</th>
                  <th className="p-4">کلمه کلیدی</th>
                  <th className="p-4">وضعیت سلامت</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {seoData?.items?.map((item: any) => {
                  const titleLen = item.seo_title?.length || 0;
                  const descLen = item.seo_description?.length || 0;
                  const isTitleOk = titleLen >= 20 && titleLen <= 70;
                  const isDescOk = descLen >= 40 && descLen <= 170;
                  const hasKeyword = !!item.focus_keyword;
                  const overallHealthy = isTitleOk && isDescOk;

                  return (
                    <tr key={`${item.type}-${item.id}`} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4">
                        <span className="px-2 py-0.5 rounded-[6px] bg-brand-sand border border-[#E3DAD0] text-[10px] font-bold">
                          {item.type === 'page' ? 'صفحه' : 'مقاله'}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-navy-950">{item.title}</td>
                      <td className="p-4 font-mono text-slate-500" dir="ltr">
                        /{item.slug}
                      </td>
                      <td className="p-4 font-mono">
                        <span className={isTitleOk ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                          {titleLen} کاراکتر
                        </span>
                      </td>
                      <td className="p-4 font-mono">
                        <span className={isDescOk ? 'text-emerald-700 font-bold' : 'text-amber-700'}>
                          {descLen} کاراکتر
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">
                        {item.focus_keyword || <span className="text-slate-400">تعریف نشده</span>}
                      </td>
                      <td className="p-4">
                        {overallHealthy ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>مطلوب</span>
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-amber-700 font-medium text-[11px]">
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>قابل بهبود</span>
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};
