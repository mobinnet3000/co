import React, { useState, useEffect } from 'react';
import { Layers, Plus, Edit2, Trash2, ExternalLink, Check, AlertCircle, X, Search } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminPagesPage: React.FC = () => {
  const [pages, setPages] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editItem, setEditItem] = useState<any | null>(null);
  const [search, setSearch] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'published',
    template: 'default',
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
    canonical_url: '',
  });

  const loadPages = () => {
    setLoading(true);
    api.pages.getAll()
      .then((res) => {
        if (res.success) setPages(res.data);
      })
      .catch((err) => setMessage({ text: err.message, isError: true }))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadPages();
  }, []);

  const openCreateModal = () => {
    setEditItem(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      status: 'published',
      template: 'default',
      seo_title: '',
      seo_description: '',
      focus_keyword: '',
      canonical_url: '',
    });
    setModalOpen(true);
  };

  const openEditModal = (page: any) => {
    setEditItem(page);
    setFormData({
      title: page.title || '',
      slug: page.slug || '',
      excerpt: page.excerpt || '',
      content: page.content || '',
      status: page.status || 'published',
      template: page.template || 'default',
      seo_title: page.seo_title || '',
      seo_description: page.seo_description || '',
      focus_keyword: page.focus_keyword || '',
      canonical_url: page.canonical_url || '',
    });
    setModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editItem) {
        await api.pages.update(editItem.id, formData);
        setMessage({ text: 'صفحه با موفقیت به‌روزرسانی شد.' });
      } else {
        await api.pages.create(formData);
        setMessage({ text: 'صفحه جدید با موفقیت ایجاد گردید.' });
      }
      setModalOpen(false);
      loadPages();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleDelete = async (id: number, slug: string) => {
    if (!window.confirm(`آیا از حذف صفحه ${slug} اطمینان دارید؟`)) return;
    try {
      await api.pages.delete(id);
      setMessage({ text: 'صفحه حذف گردید.' });
      loadPages();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const filteredPages = pages.filter(
    (p) =>
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">مدیریت صفحات وبسایت (CMS Pages)</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              ایجاد، ویرایش، مدیریت وضعیت انتشار و متاتگ‌های سئو به ازای هر صفحه
            </p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>ایجاد صفحه جدید</span>
          </button>
        </div>

        {/* Feedback message */}
        {message && (
          <div
            className={`p-3.5 rounded-xl text-xs flex items-center justify-between ${
              message.isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Filter bar */}
        <div className="bg-white p-4 rounded-2xl border border-[#E3DAD0] shadow-card flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-sm">
            <input
              type="text"
              placeholder="جستجو در نام یا پیوند یکتا..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 focus:outline-none focus:border-[#0F1821]"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <span className="text-xs text-slate-500 font-mono">
            {filteredPages.length} PAGES
          </span>
        </div>

        {/* Pages Table */}
        <div className="bg-white rounded-2xl border border-[#E3DAD0] shadow-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs">
              <thead className="bg-[#FAF7F3] border-b border-[#E3DAD0] text-slate-500 font-bold">
                <tr>
                  <th className="p-4">عنوان صفحه</th>
                  <th className="p-4">پیوند یکتا (Slug)</th>
                  <th className="p-4">قالب</th>
                  <th className="p-4">وضعیت</th>
                  <th className="p-4">سئو</th>
                  <th className="p-4 text-center">عملیات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredPages.map((page) => (
                  <tr key={page.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-4 font-bold text-navy-950 font-vazir">
                      {page.title}
                    </td>
                    <td className="p-4 font-mono text-slate-600" dir="ltr">
                      /{page.slug}
                    </td>
                    <td className="p-4 font-mono text-[11px] text-slate-500">
                      {page.template || 'default'}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-1 rounded-[6px] text-[10px] font-bold ${
                          page.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {page.status === 'published' ? 'منتشرشده' : 'پیش‌نویس'}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="text-[11px] text-slate-500 font-mono">
                        {page.seo_title ? '✓ کامل' : '— ناقص'}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <a
                          href={`/${page.slug === 'home' ? '' : page.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100"
                          title="مشاهده زنده"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                        <button
                          onClick={() => openEditModal(page)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-[#0F1821] hover:bg-slate-100"
                          title="ویرایش"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        {!['home', 'platform', 'about', 'services', 'contact', 'company'].includes(page.slug) && (
                          <button
                            onClick={() => handleDelete(page.id, page.slug)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                            title="حذف"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for Create/Edit */}
        {modalOpen && (
          <div className="fixed inset-0 bg-navy-950/60 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-[#E3DAD0] shadow-2xl my-8">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E3DAD0]">
                <h2 className="text-base font-bold text-navy-950 font-vazir">
                  {editItem ? `ویرایش صفحه: ${editItem.title}` : 'ایجاد صفحه جدید در وبسایت'}
                </h2>
                <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSave} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">عنوان صفحه *</label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-navy-950 mb-1">پیوند یکتا (Slug) *</label>
                    <input
                      type="text"
                      required
                      value={formData.slug}
                      onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                      dir="ltr"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">خلاصه / چکیده صفحه</label>
                  <textarea
                    rows={2}
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-navy-950 mb-1">وضعیت انتشار</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                    >
                      <option value="published">منتشرشده (Published)</option>
                      <option value="draft">پیش‌نویس (Draft)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-navy-950 mb-1">قالب صفحه</label>
                    <select
                      value={formData.template}
                      onChange={(e) => setFormData({ ...formData, template: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                    >
                      <option value="default">پیش‌فرض شرکتی</option>
                      <option value="landing">لندینگ اختصاصی</option>
                      <option value="fullwidth">تمام‌عرض</option>
                    </select>
                  </div>
                </div>

                {/* SEO Fields Box */}
                <div className="p-4 rounded-2xl bg-brand-sandLight border border-[#E3DAD0] space-y-3">
                  <span className="font-bold text-navy-950 block border-b border-[#E3DAD0]/70 pb-1">
                    تنظیمات سئو تکنیکال و متاتگ‌ها
                  </span>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">عنوان سئو (Title Tag)</label>
                    <input
                      type="text"
                      value={formData.seo_title}
                      onChange={(e) => setFormData({ ...formData, seo_title: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                      placeholder="عنوان اختصاصی برای موتورهای جستجو"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">توضیحات متا (Meta Description)</label>
                    <textarea
                      rows={2}
                      value={formData.seo_description}
                      onChange={(e) => setFormData({ ...formData, seo_description: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                      placeholder="توضیح خلاصه تا ۱۵۰ کاراکتر"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">کلمه کلیدی تمرکزی (Focus Keyword)</label>
                    <input
                      type="text"
                      value={formData.focus_keyword}
                      onChange={(e) => setFormData({ ...formData, focus_keyword: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                      placeholder="مثال: موازنه جرم کانی‌آرایی"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors"
                  >
                    ذخیره صفحه
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
