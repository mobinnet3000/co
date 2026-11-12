import React, { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, ExternalLink, Star, Tag, Folder, Check, AlertCircle, X, Search } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminBlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'editor' | 'taxonomy'>('articles');
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);

  // Editor State
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content_html: '',
    category_id: '',
    reading_time: '۷ دقیقه',
    status: 'published',
    is_featured: false,
    tagsInput: '',
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
  });

  // Category & Tag form states
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const loadData = () => {
    setLoading(true);
    Promise.all([
      api.articles.getAll().catch(() => ({ success: false, data: [] })),
      api.categories.getAll().catch(() => ({ success: false, data: [] })),
    ])
      .then(([artRes, catRes]) => {
        if (artRes.success) setArticles(artRes.data);
        if (catRes.success) setCategories(catRes.data);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const openNewArticle = () => {
    setEditArticleId(null);
    setArticleForm({
      title: '',
      slug: '',
      summary: '',
      content_html: '',
      category_id: categories[0]?.id ? String(categories[0].id) : '',
      reading_time: '۷ دقیقه',
      status: 'published',
      is_featured: false,
      tagsInput: '',
      seo_title: '',
      seo_description: '',
      focus_keyword: '',
    });
    setActiveTab('editor');
  };

  const openEditArticle = async (id: number) => {
    try {
      const res = await api.articles.getById(id);
      if (res.success && res.data) {
        const art = res.data;
        setEditArticleId(art.id);
        setArticleForm({
          title: art.title || '',
          slug: art.slug || '',
          summary: art.summary || '',
          content_html: art.content_html || '',
          category_id: art.category_id ? String(art.category_id) : '',
          reading_time: art.reading_time || '۷ دقیقه',
          status: art.status || 'published',
          is_featured: !!art.is_featured,
          tagsInput: Array.isArray(art.tags) ? art.tags.map((t: any) => t.name).join(', ') : '',
          seo_title: art.seo_title || '',
          seo_description: art.seo_description || '',
          focus_keyword: art.focus_keyword || '',
        });
        setActiveTab('editor');
      }
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleSaveArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const payload = {
        ...articleForm,
        category_id: articleForm.category_id ? parseInt(articleForm.category_id, 10) : null,
        is_featured: articleForm.is_featured ? 1 : 0,
        tags: articleForm.tagsInput
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editArticleId) {
        await api.articles.update(editArticleId, payload);
        setMessage({ text: 'مقاله با موفقیت به‌روزرسانی شد.' });
      } else {
        await api.articles.create(payload);
        setMessage({ text: 'مقاله جدید با موفقیت منتشر گردید.' });
      }
      loadData();
      setActiveTab('articles');
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleDeleteArticle = async (id: number, title: string) => {
    if (!window.confirm(`آیا از حذف مقاله "${title}" اطمینان دارید؟`)) return;
    try {
      await api.articles.delete(id);
      setMessage({ text: 'مقاله با موفقیت حذف شد.' });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleCreateCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.categories.create({
        name: newCatName,
        slug: newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-'),
        description: newCatDesc,
      });
      setMessage({ text: 'دسته‌بندی با موفقیت ایجاد شد.' });
      setNewCatName('');
      setNewCatSlug('');
      setNewCatDesc('');
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const handleDeleteCategory = async (id: number, name: string) => {
    if (!window.confirm(`آیا از حذف دسته‌بندی "${name}" اطمینان دارید؟`)) return;
    try {
      await api.categories.delete(id);
      setMessage({ text: 'دسته‌بندی حذف شد.' });
      loadData();
    } catch (err: any) {
      setMessage({ text: err.message, isError: true });
    }
  };

  const filteredArticles = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar with Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">سیستم انتشارات و دانشنامه معدنی</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت یادداشت‌های تخصصی، دسته‌بندی‌ها، برچسب‌ها و فلوشیت‌های دانشنامه‌ای
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all ${
                activeTab === 'articles'
                  ? 'bg-navy-950 text-white'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              فهرست مقالات
            </button>
            <button
              onClick={openNewArticle}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'editor'
                  ? 'bg-[#EFA73F] text-navy-950 shadow-xs'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>{editArticleId ? 'ویرایش مقاله' : 'نگارش مطلب'}</span>
            </button>
            <button
              onClick={() => setActiveTab('taxonomy')}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all ${
                activeTab === 'taxonomy'
                  ? 'bg-navy-950 text-white'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              دسته‌بندی‌ها
            </button>
          </div>
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

        {/* TAB 1: ARTICLES LIST */}
        {activeTab === 'articles' && (
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-[#E3DAD0] shadow-card flex items-center justify-between gap-4">
              <div className="relative flex-1 max-w-sm">
                <input
                  type="text"
                  placeholder="جستجو در عنوان یا پیوند یکتا..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-navy-950 focus:outline-none focus:border-[#0F1821]"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
              <span className="text-xs text-slate-500 font-mono">{filteredArticles.length} ARTICLES</span>
            </div>

            <div className="bg-white rounded-2xl border border-[#E3DAD0] shadow-card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead className="bg-[#FAF7F3] border-b border-[#E3DAD0] text-slate-500 font-bold">
                    <tr>
                      <th className="p-4">عنوان مقاله</th>
                      <th className="p-4">دسته‌بندی</th>
                      <th className="p-4">نویسنده</th>
                      <th className="p-4">وضعیت</th>
                      <th className="p-4">زمان مطالعه</th>
                      <th className="p-4 text-center">عملیات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredArticles.map((art) => (
                      <tr key={art.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {art.is_featured === 1 && (
                              <Star className="w-3.5 h-3.5 text-[#EFA73F] fill-[#EFA73F]" />
                            )}
                            <strong className="text-navy-950 font-vazir block font-bold">
                              {art.title}
                            </strong>
                          </div>
                          <span className="text-[11px] font-mono text-slate-400 block mt-0.5" dir="ltr">
                            /blog/{art.slug}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-0.5 rounded-[6px] bg-brand-sand border border-[#E3DAD0] text-[11px] font-medium text-navy-950">
                            {art.category_name || 'بدون دسته‌بندی'}
                          </span>
                        </td>
                        <td className="p-4 text-slate-600">{art.author_name}</td>
                        <td className="p-4">
                          <span
                            className={`px-2 py-0.5 rounded-[6px] text-[10px] font-bold ${
                              art.status === 'published'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {art.status === 'published' ? 'منتشرشده' : 'پیش‌نویس'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-slate-500">{art.reading_time}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            <a
                              href={`/blog/${art.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100"
                              title="مشاهده زنده"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </a>
                            <button
                              onClick={() => openEditArticle(art.id)}
                              className="p-1.5 rounded-lg text-slate-600 hover:text-[#0F1821] hover:bg-slate-100"
                              title="ویرایش"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteArticle(art.id, art.title)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50"
                              title="حذف"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: ARTICLE EDITOR */}
        {activeTab === 'editor' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E3DAD0] shadow-card">
            <h2 className="text-base font-bold text-navy-950 font-vazir mb-6 pb-3 border-b border-[#E3DAD0]">
              {editArticleId ? 'ویرایش و بازبینی مقاله' : 'نگارش و انتشار مقاله جدید'}
            </h2>

            <form onSubmit={handleSaveArticle} className="space-y-5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">عنوان مقاله *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.title}
                    onChange={(e) => setArticleForm({ ...articleForm, title: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                    placeholder="مثال: بهینه‌سازی مدارهای فلوتاسیون سنگ‌آهن"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">پیوند یکتا (Slug) *</label>
                  <input
                    type="text"
                    required
                    value={articleForm.slug}
                    onChange={(e) => setArticleForm({ ...articleForm, slug: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                    dir="ltr"
                    placeholder="iron-ore-flotation-optimization"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">چکیده / خلاصه مقاله (Meta Lead) *</label>
                <textarea
                  rows={3}
                  required
                  value={articleForm.summary}
                  onChange={(e) => setArticleForm({ ...articleForm, summary: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  placeholder="خلاصه ۲ الی ۳ خطی جهت نمایش در کارت‌های بلاگ و توضیحات متا"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">متن کامل مقاله (HTML / Rich Format) *</label>
                <textarea
                  rows={12}
                  required
                  value={articleForm.content_html}
                  onChange={(e) => setArticleForm({ ...articleForm, content_html: e.target.value })}
                  className="w-full p-3 rounded-xl border border-[#E3DAD0] font-mono text-xs focus:outline-none focus:border-[#0F1821] bg-slate-50/50"
                  placeholder="<h2>مقدمه</h2><p>متن بخش اول...</p>"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">دسته‌بندی موضوعی</label>
                  <select
                    value={articleForm.category_id}
                    onChange={(e) => setArticleForm({ ...articleForm, category_id: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  >
                    <option value="">بدون دسته‌بندی</option>
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">زمان مطالعه تخمینی</label>
                  <input
                    type="text"
                    value={articleForm.reading_time}
                    onChange={(e) => setArticleForm({ ...articleForm, reading_time: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">وضعیت انتشار</label>
                  <select
                    value={articleForm.status}
                    onChange={(e) => setArticleForm({ ...articleForm, status: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  >
                    <option value="published">منتشرشده (Published)</option>
                    <option value="draft">پیش‌نویس (Draft)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">برچسب‌ها (با کاما جدا کنید)</label>
                <input
                  type="text"
                  value={articleForm.tagsInput}
                  onChange={(e) => setArticleForm({ ...articleForm, tagsInput: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  placeholder="فلوتاسیون, موازنه جرم, خردایش"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="is_featured"
                  checked={articleForm.is_featured}
                  onChange={(e) => setArticleForm({ ...articleForm, is_featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#EFA73F] focus:ring-0"
                />
                <label htmlFor="is_featured" className="font-bold text-navy-950 cursor-pointer">
                  مقاله برگزیده (نمایش در بالای صفحه بلاگ و لندینگ‌ها)
                </label>
              </div>

              {/* SEO Box */}
              <div className="p-4 rounded-2xl bg-brand-sandLight border border-[#E3DAD0] space-y-3">
                <span className="font-bold text-navy-950 block border-b border-[#E3DAD0]/70 pb-1">
                  تنظیمات سئو برای این مقاله
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-slate-700 mb-1">عنوان سئو (Title Tag)</label>
                    <input
                      type="text"
                      value={articleForm.seo_title}
                      onChange={(e) => setArticleForm({ ...articleForm, seo_title: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                      placeholder="عنوان اختصاصی برای نتایج گوگل"
                    />
                  </div>

                  <div>
                    <label className="block font-medium text-slate-700 mb-1">کلمه کلیدی تمرکزی</label>
                    <input
                      type="text"
                      value={articleForm.focus_keyword}
                      onChange={(e) => setArticleForm({ ...articleForm, focus_keyword: e.target.value })}
                      className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                      placeholder="مثال: فلوتاسیون مس"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium text-slate-700 mb-1">توضیحات متا (Meta Description)</label>
                  <textarea
                    rows={2}
                    value={articleForm.seo_description}
                    onChange={(e) => setArticleForm({ ...articleForm, seo_description: e.target.value })}
                    className="w-full p-2 rounded-lg border border-[#E3DAD0] bg-white text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('articles')}
                  className="px-4 py-2.5 rounded-xl text-slate-600 hover:bg-slate-100"
                >
                  انصراف
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors shadow-xs"
                >
                  ذخیره و انتشار مقاله
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'taxonomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create Category (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
              <h2 className="text-sm font-bold text-navy-950 font-vazir mb-4 pb-2 border-b border-[#E3DAD0]">
                افزودن دسته‌بندی جدید
              </h2>

              <form onSubmit={handleCreateCategory} className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-navy-950 mb-1">نام دسته‌بندی *</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                    placeholder="مثال: متالورژی استخراجی"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">پیوند یکتا (Slug)</label>
                  <input
                    type="text"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821] font-mono"
                    dir="ltr"
                    placeholder="extractive-metallurgy"
                  />
                </div>

                <div>
                  <label className="block font-bold text-navy-950 mb-1">توضیحات</label>
                  <textarea
                    rows={2}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors"
                >
                  ثبت دسته‌بندی
                </button>
              </form>
            </div>

            {/* List Categories (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
              <h2 className="text-sm font-bold text-navy-950 font-vazir mb-4 pb-2 border-b border-[#E3DAD0]">
                دسته‌بندی‌های موجود ({categories.length})
              </h2>

              <div className="space-y-3">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    className="p-3.5 rounded-xl bg-brand-sandLight border border-[#E3DAD0]/70 flex items-center justify-between text-xs"
                  >
                    <div>
                      <strong className="text-navy-950 font-bold block">{c.name}</strong>
                      <span className="text-[11px] font-mono text-slate-500">/{c.slug}</span>
                      {c.description && <p className="text-[11px] text-slate-600 mt-0.5">{c.description}</p>}
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="px-2 py-0.5 rounded-[6px] bg-white border border-[#E3DAD0] font-mono text-[10px]">
                        {c.articles_count || 0} مقاله
                      </span>
                      <button
                        onClick={() => handleDeleteCategory(c.id, c.name)}
                        className="p-1 rounded text-rose-500 hover:text-rose-700"
                        title="حذف"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
