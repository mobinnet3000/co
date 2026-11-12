import React, { useState, useEffect } from 'react';
import {
  Layers,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Check,
  AlertCircle,
  X,
  Search,
  Sliders,
  ArrowUp,
  ArrowDown,
  Copy,
  Eye,
  CheckCircle2,
} from 'lucide-react';
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

  // Page Builder State
  const [builderOpen, setBuilderOpen] = useState<boolean>(false);
  const [builderPage, setBuilderPage] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);
  const [loadingSections, setLoadingSections] = useState<boolean>(false);
  const [sectionModalOpen, setSectionModalOpen] = useState<boolean>(false);
  const [editingSectionId, setEditingSectionId] = useState<number | null>(null);
  const [sectionForm, setSectionForm] = useState<{ section_type: string; config_json: string; is_active: number }>({
    section_type: 'text',
    config_json: '{\n  "title": "عنوان بخش",\n  "subtitle": "زیرعنوان",\n  "content": "متن توضیحات"\n}',
    is_active: 1,
  });

  const loadSections = async (pageId: number) => {
    try {
      setLoadingSections(true);
      const res = await api.sections.getByPageId(pageId);
      if (res.success) {
        setSections(res.data);
      }
    } catch (err: any) {
      setMessage({ text: err.message || 'خطا در بارگذاری سکشن‌ها', isError: true });
    } finally {
      setLoadingSections(false);
    }
  };

  const openBuilder = (page: any) => {
    setBuilderPage(page);
    setBuilderOpen(true);
    loadSections(page.id);
  };

  const handleSaveSection = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!builderPage) return;

    try {
      // Validate JSON
      JSON.parse(sectionForm.config_json);

      if (editingSectionId) {
        await api.sections.update(editingSectionId, {
          section_type: sectionForm.section_type,
          config_json: sectionForm.config_json,
          is_active: sectionForm.is_active,
        });
        setMessage({ text: 'سکشن با موفقیت به‌روزرسانی شد.' });
      } else {
        await api.sections.create(builderPage.id, {
          section_type: sectionForm.section_type,
          config_json: sectionForm.config_json,
          is_active: sectionForm.is_active,
        });
        setMessage({ text: 'سکشن جدید ایجاد گردید.' });
      }
      setSectionModalOpen(false);
      loadSections(builderPage.id);
    } catch (err: any) {
      setMessage({ text: 'فرمت JSON نامعتبر است: ' + err.message, isError: true });
    }
  };

  const handleDeleteSection = async (sectionId: number) => {
    if (!window.confirm('آیا از حذف این سکشن اطمینان دارید؟')) return;
    try {
      await api.sections.delete(sectionId);
      setMessage({ text: 'سکشن حذف شد.' });
      if (builderPage) loadSections(builderPage.id);
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleDuplicateSection = async (sectionId: number) => {
    try {
      await api.sections.duplicate(sectionId);
      setMessage({ text: 'سکشن تکثیر شد.' });
      if (builderPage) loadSections(builderPage.id);
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleMoveSection = async (index: number, direction: 'up' | 'down') => {
    if (!builderPage) return;
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= sections.length) return;

    const reordered = [...sections];
    const temp = reordered[index];
    reordered[index] = reordered[targetIndex];
    reordered[targetIndex] = temp;

    const payload = reordered.map((s, idx) => ({
      id: s.id,
      section_order: idx,
    }));

    try {
      await api.sections.reorder(builderPage.id, payload);
      loadSections(builderPage.id);
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

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
                      <div className="flex items-center justify-center gap-1.5">
                        <button
                          onClick={() => openBuilder(page)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-navy-900 hover:bg-navy-800 text-white font-bold text-[11px] shadow-2xs"
                          title="طراحی و مدیریت سکشن‌ها"
                        >
                          <Sliders className="w-3.5 h-3.5 text-[#EFA73F]" />
                          <span>سکشن‌ها</span>
                        </button>
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
                          title="ویرایش متاداده"
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
        {/* Modal: Dynamic Page Builder */}
        {builderOpen && builderPage && (
          <div className="fixed inset-0 bg-navy-950/70 z-50 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-4xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                    <span>PAGE BUILDER</span>
                    <span>/</span>
                    <span className="text-[#EFA73F]">/{builderPage.slug}</span>
                  </div>
                  <h2 className="text-xl font-black text-navy-950 flex items-center gap-2 mt-1">
                    <Sliders className="w-5 h-5 text-[#EFA73F]" />
                    <span>طراحی و چیدمان سکشن‌های صفحه: {builderPage.title}</span>
                  </h2>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setEditingSectionId(null);
                      setSectionForm({
                        section_type: 'features',
                        config_json: JSON.stringify(
                          {
                            title: 'عنوان بخش ویژگی‌ها',
                            subtitle: 'توضیحات تکمیلی پیرامون راهکارها',
                            items: [
                              { title: 'ویژگی اول', description: 'توضیح کوتاه ویژگی اول', icon: 'Database' },
                              { title: 'ویژگی دوم', description: 'توضیح کوتاه ویژگی دوم', icon: 'Cpu' },
                            ],
                          },
                          null,
                          2
                        ),
                        is_active: 1,
                      });
                      setSectionModalOpen(true);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#EFA73F] hover:bg-amber-500 text-navy-950 font-bold text-xs shadow-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>افزودن سکشن جدید</span>
                  </button>

                  <button
                    onClick={() => setBuilderOpen(false)}
                    className="p-2 rounded-xl text-slate-400 hover:text-navy-950 hover:bg-slate-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Sections List */}
              {loadingSections ? (
                <div className="text-center py-12 text-slate-400 text-sm">در حال بارگذاری سکشن‌ها...</div>
              ) : sections.length === 0 ? (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-2xl p-6">
                  <Layers className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-600 font-bold text-sm">هیچ سکشن پویایی برای این صفحه تعریف نشده است.</p>
                  <p className="text-slate-400 text-xs mt-1">با زدن دکمه «افزودن سکشن جدید» می‌توانید انواع بلوک‌های محتوایی را اضافه کنید.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {sections.map((sec, idx) => (
                    <div
                      key={sec.id}
                      className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        sec.is_active ? 'bg-slate-50 border-slate-200 hover:border-slate-300' : 'bg-slate-100/60 border-slate-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-lg bg-navy-900 text-[#EFA73F] flex items-center justify-center font-mono text-xs font-bold">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-navy-950">
                              {sec.config?.title || `سکشن ${sec.section_type}`}
                            </span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-bold">
                              {sec.section_type.toUpperCase()}
                            </span>
                            {!sec.is_active && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-rose-100 text-rose-700 font-bold">
                                غیرفعال
                              </span>
                            )}
                          </div>
                          {sec.config?.subtitle && (
                            <p className="text-xs text-slate-500 truncate max-w-md mt-0.5">{sec.config.subtitle}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          disabled={idx === 0}
                          onClick={() => handleMoveSection(idx, 'up')}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-20"
                          title="جابجایی به بالا"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          disabled={idx === sections.length - 1}
                          onClick={() => handleMoveSection(idx, 'down')}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 disabled:opacity-20"
                          title="جابجایی به پایین"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDuplicateSection(sec.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200"
                          title="تکثیر سکشن"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSectionId(sec.id);
                            setSectionForm({
                              section_type: sec.section_type,
                              config_json: JSON.stringify(sec.config, null, 2),
                              is_active: sec.is_active,
                            });
                            setSectionModalOpen(true);
                          }}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-200 hover:text-navy-950"
                          title="ویرایش تنظیمات"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteSection(sec.id)}
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700"
                          title="حذف"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Modal: Section Configuration & JSON Editor */}
        {sectionModalOpen && (
          <div className="fixed inset-0 bg-navy-950/70 z-60 flex items-center justify-center p-4 backdrop-blur-xs overflow-y-auto">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl my-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <h3 className="font-bold text-base text-navy-950">
                  {editingSectionId ? 'ویرایش تنظیمات و ساختار سکشن' : 'تعریف سکشن جدید'}
                </h3>
                <button onClick={() => setSectionModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveSection} className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">نوع سکشن (Block Type)</label>
                    <select
                      value={sectionForm.section_type}
                      onChange={(e) => {
                        const newType = e.target.value;
                        let sampleConfig: any = {};
                        if (newType === 'hero') {
                          sampleConfig = {
                            badge: 'فناوری داده در خدمت معدن',
                            title: 'عنوان بزرگ هیرو',
                            subtitle: 'توضیحات کوتاه زیر عنوان',
                            primaryCtaText: 'مشاهده سامانه',
                            primaryCtaUrl: '/platform',
                          };
                        } else if (newType === 'features') {
                          sampleConfig = {
                            title: 'ویژگی‌های کلیدی',
                            subtitle: 'مزایای فنی و متالورژیکی',
                            items: [
                              { title: 'عنوان ویژگی اول', description: 'توضیح کوتاه', icon: 'Database' },
                              { title: 'عنوان ویژگی دوم', description: 'توضیح کوتاه', icon: 'Cpu' },
                            ],
                          };
                        } else if (newType === 'stats') {
                          sampleConfig = {
                            title: 'آمار و دستاوردها',
                            items: [
                              { value: '۱۰۰٪', label: 'دسترسی محلی', sub: 'شبکه کارخانه' },
                              { value: '۰٫۵٪+', label: 'افزایش بازیابی', sub: 'سودآوری خط' },
                            ],
                          };
                        } else if (newType === 'faq') {
                          sampleConfig = {
                            title: 'پرسش‌های متداول',
                            subtitle: 'پاسخ به سوالات فنی',
                            items: [{ q: 'پرسش اول؟', a: 'پاسخ به پرسش اول...' }],
                          };
                        } else if (newType === 'cta') {
                          sampleConfig = {
                            title: 'آماده ارتقای کارخانه خود هستید؟',
                            subtitle: 'با کارشناسان ما تماس حاصل فرمایید',
                            buttonText: 'تماس با ما',
                            buttonUrl: '/contact',
                            phone: '09999196630',
                          };
                        } else {
                          sampleConfig = {
                            title: 'عنوان بخش',
                            content: 'متن توضیحات این بخش...',
                          };
                        }
                        setSectionForm({
                          ...sectionForm,
                          section_type: newType,
                          config_json: JSON.stringify(sampleConfig, null, 2),
                        });
                      }}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none"
                    >
                      <option value="hero">هیرو (Hero Block)</option>
                      <option value="features">کارت‌های ویژگی (Features Block)</option>
                      <option value="stats">آمار و ارقام (Stats Block)</option>
                      <option value="text">متن و توضیحات (Text Block)</option>
                      <option value="faq">سوالات متداول (FAQ Block)</option>
                      <option value="cta">فراخوان اقدام (CTA Block)</option>
                      <option value="showcase">نمایش محصول (Showcase Block)</option>
                      <option value="table">جدول اطلاعاتی (Table Block)</option>
                      <option value="html">کد سفارشی (Custom HTML)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">وضعیت نمایش</label>
                    <select
                      value={sectionForm.is_active}
                      onChange={(e) => setSectionForm({ ...sectionForm, is_active: Number(e.target.value) })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none"
                    >
                      <option value={1}>فعال و قابل نمایش</option>
                      <option value={0}>غیرفعال (مخفی)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-700">تنظیمات داده‌ای (JSON Schema Config)</label>
                    <span className="text-[10px] text-slate-400 font-mono">VALID JSON REQUIRED</span>
                  </div>
                  <textarea
                    rows={12}
                    required
                    value={sectionForm.config_json}
                    onChange={(e) => setSectionForm({ ...sectionForm, config_json: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-300 bg-slate-900 text-emerald-400 font-mono text-xs focus:outline-none"
                    dir="ltr"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setSectionModalOpen(false)}
                    className="px-4 py-2 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    انصراف
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#EFA73F] text-navy-950 font-bold hover:bg-amber-500 shadow-xs"
                  >
                    ذخیره تنظیمات سکشن
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
