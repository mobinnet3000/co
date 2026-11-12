import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  ExternalLink,
  Star,
  Tag,
  Folder,
  Check,
  AlertCircle,
  X,
  Search,
  Eye,
  Heading,
  Bold,
  Italic,
  List,
  Quote,
  Code,
  Table as TableIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  Clock,
  Calendar,
} from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminBlogPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'articles' | 'editor' | 'taxonomy'>('articles');
  const [articles, setArticles] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [message, setMessage] = useState<{ text: string; isError?: boolean } | null>(null);
  const [previewOpen, setPreviewOpen] = useState<boolean>(false);

  // Editor State
  const [editArticleId, setEditArticleId] = useState<number | null>(null);
  const [articleForm, setArticleForm] = useState({
    title: '',
    slug: '',
    summary: '',
    content_html: '',
    category_id: '',
    author_name: 'واحد تحقیق و توسعه معدنکو',
    reading_time: '۷ دقیقه',
    status: 'published',
    is_featured: false,
    tagsInput: '',
    seo_title: '',
    seo_description: '',
    focus_keyword: '',
  });

  // Category State
  const [editingCatId, setEditingCatId] = useState<number | null>(null);
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
      author_name: 'واحد تحقیق و توسعه معدنکو',
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
          author_name: art.author_name || 'واحد تحقیق و توسعه معدنکو',
          reading_time: art.reading_time || '۷ دقیقه',
          status: art.status || 'published',
          is_featured: !!art.is_featured,
          tagsInput: Array.isArray(art.tags) ? art.tags.map((t: any) => (typeof t === 'string' ? t : t.name)).join(', ') : '',
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

  const insertSnippet = (snippet: string) => {
    setArticleForm((prev) => ({
      ...prev,
      content_html: prev.content_html + (prev.content_html.endsWith('\n') ? '' : '\n') + snippet + '\n',
    }));
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
        setMessage({ text: 'مقاله جدید با موفقیت ذخیره گردید.' });
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

  const handleSaveCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const slugVal = newCatSlug || newCatName.toLowerCase().replace(/\s+/g, '-');
      if (editingCatId) {
        await api.categories.update(editingCatId, {
          name: newCatName,
          slug: slugVal,
          description: newCatDesc,
        });
        setMessage({ text: 'دسته‌بندی به‌روزرسانی شد.' });
      } else {
        await api.categories.create({
          name: newCatName,
          slug: slugVal,
          description: newCatDesc,
        });
        setMessage({ text: 'دسته‌بندی با موفقیت ایجاد شد.' });
      }
      setEditingCatId(null);
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

  const filteredArticles = articles.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.slug.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || a.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar with Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">سیستم انتشارات و دانشنامه معدنی</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت مقالات تخصصی، متادیتای سئو، دسته‌بندی‌ها و پیش‌نویس‌های متالورژیکی
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
              فهرست مقالات ({articles.length})
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
              <span>{editArticleId ? 'ویرایش مقاله' : 'نگارش مطلب جدید'}</span>
            </button>
            <button
              onClick={() => setActiveTab('taxonomy')}
              className={`px-3.5 py-2 rounded-[10px] text-xs font-bold transition-all ${
                activeTab === 'taxonomy'
                  ? 'bg-navy-950 text-white'
                  : 'bg-white border border-[#E3DAD0] text-slate-700 hover:border-[#0F1821]'
              }`}
            >
              دسته‌بندی‌ها ({categories.length})
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
            <div className="bg-white p-4 rounded-2xl border border-[#E3DAD0] shadow-card flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
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

              {/* Status Filter */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">وضعیت:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="p-2 rounded-xl border border-[#E3DAD0] bg-white text-xs text-navy-950 focus:outline-none focus:border-[#0F1821]"
                >
                  <option value="all">همه وضعیت‌ها</option>
                  <option value="published">منتشرشده</option>
                  <option value="draft">پیش‌نویس</option>
                  <option value="scheduled">زمان‌بندی‌شده</option>
                </select>
                <span className="text-xs text-slate-500 font-mono mr-2">{filteredArticles.length} مورد</span>
              </div>
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
                                : art.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {art.status === 'published'
                              ? 'منتشرشده'
                              : art.status === 'scheduled'
                              ? 'زمان‌بندی‌شده'
                              : 'پیش‌نویس'}
                          </span>
                        </td>
                        <td className="p-4 font-mono text-slate-500">{art.reading_time}</td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {art.status === 'published' && (
                              <a
                                href={`/blog/${art.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 rounded-lg text-slate-400 hover:text-navy-950 hover:bg-slate-100"
                                title="مشاهده زنده"
                              >
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
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
            <div className="flex items-center justify-between pb-3 mb-6 border-b border-[#E3DAD0]">
              <h2 className="text-base font-bold text-navy-950 font-vazir">
                {editArticleId ? 'ویرایش و بازبینی مقاله' : 'نگارش و انتشار مقاله جدید'}
              </h2>
              <button
                type="button"
                onClick={() => setPreviewOpen(!previewOpen)}
                className="px-3.5 py-1.5 rounded-[10px] bg-brand-sand border border-[#E3DAD0] text-xs font-bold text-navy-950 hover:border-navy-950 flex items-center gap-1.5 transition-colors"
              >
                <Eye className="w-4 h-4 text-[#EFA73F]" />
                <span>{previewOpen ? 'بستن پیش‌نمایش' : 'پیش‌نمایش خروجی'}</span>
              </button>
            </div>

            {/* Live Preview Box */}
            {previewOpen && (
              <div className="mb-8 p-6 rounded-2xl bg-[#FAF7F3] border-2 border-dashed border-[#E3DAD0] space-y-4">
                <span className="text-xs font-mono font-bold text-[#EFA73F] block">PREVIEW MODE // پیش‌نمایش زنده</span>
                <h1 className="text-2xl font-black font-vazir text-navy-950">{articleForm.title || 'عنوان پیش‌نمایش'}</h1>
                <p className="text-xs sm:text-sm text-slate-600 italic bg-white p-4 rounded-xl border border-[#E3DAD0]">
                  {articleForm.summary || 'چکیده مقاله در اینجا نمایش داده می‌شود...'}
                </p>
                <div
                  className="prose prose-slate max-w-none bg-white p-6 rounded-xl border border-[#E3DAD0] text-xs sm:text-sm"
                  dangerouslySetInnerHTML={{ __html: articleForm.content_html || '<p class="text-slate-400">متن مقاله هنوز وارد نشده است.</p>' }}
                />
              </div>
            )}

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

              {/* Rich Content Editor Toolbar */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-navy-950">متن کامل مقاله (HTML / Rich Format) *</label>
                  <span className="text-[11px] text-slate-400">نوار ابزار قالب‌بندی سریع:</span>
                </div>

                <div className="p-2 bg-slate-50 border border-[#E3DAD0] rounded-t-xl flex flex-wrap items-center gap-1.5 text-xs">
                  <button
                    type="button"
                    onClick={() => insertSnippet('<h2>تیتر بخش اصلی</h2>\n<p>توضیحات این بخش...</p>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1 font-bold"
                    title="افزودن تیتر H2"
                  >
                    <Heading className="w-3.5 h-3.5 text-navy-950" />
                    <span>H2</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<h3>زیرعنوان فرعی</h3>\n<p>جزئیات تکمیلی...</p>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1 font-medium"
                    title="افزودن تیتر H3"
                  >
                    <span>H3</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<strong>متن برجسته</strong>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1 font-bold"
                    title="متن ضخیم"
                  >
                    <Bold className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<em>متن مورب</em>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1 italic"
                    title="متن ایتالیک"
                  >
                    <Italic className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<ul>\n  <li>آیتم اول</li>\n  <li>آیتم دوم</li>\n</ul>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1"
                    title="لیست بالت‌دار"
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<blockquote>نقل قول فنی مهندسی یا نکته کلیدی عملیات...</blockquote>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1"
                    title="باکس نقل قول"
                  >
                    <Quote className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<table class="w-full text-right border my-4 text-xs">\n  <thead><tr class="bg-slate-100"><th>شاخص</th><th>مقدار</th></tr></thead>\n  <tbody><tr><td>عیار خوراک</td><td>۶۲٪</td></tr></tbody>\n</table>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1"
                    title="جدول داده"
                  >
                    <TableIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<a href="/platform" class="text-[#EFA73F] font-bold underline">مشاهده سامانه فرآوری</a>')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1"
                    title="پیوند درون‌متنی"
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => insertSnippet('<img src="/images/hero/hero-flowsheet.svg" alt="نمودار فلوشیت" class="w-full rounded-xl border my-4" />')}
                    className="px-2.5 py-1 rounded bg-white border border-[#E3DAD0] hover:bg-slate-100 flex items-center gap-1"
                    title="تصویر"
                  >
                    <ImageIcon className="w-3.5 h-3.5" />
                  </button>
                </div>

                <textarea
                  rows={14}
                  required
                  value={articleForm.content_html}
                  onChange={(e) => setArticleForm({ ...articleForm, content_html: e.target.value })}
                  className="w-full p-3 rounded-b-xl border border-[#E3DAD0] border-t-0 font-mono text-xs focus:outline-none focus:border-[#0F1821] bg-slate-50/40"
                  placeholder="<h2>مقدمه</h2><p>متن بخش اول...</p>"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
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
                  <label className="block font-bold text-navy-950 mb-1">نویسنده مقاله</label>
                  <input
                    type="text"
                    value={articleForm.author_name}
                    onChange={(e) => setArticleForm({ ...articleForm, author_name: e.target.value })}
                    className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                  />
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
                    <option value="scheduled">زمان‌بندی‌شده (Scheduled)</option>
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
                  تنظیمات متادیتای سئو (Technical SEO Metadata)
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
                  ذخیره و ثبت مقاله
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TAB 3: CATEGORIES MANAGEMENT */}
        {activeTab === 'taxonomy' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Create / Edit Category (5 cols) */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card">
              <h2 className="text-sm font-bold text-navy-950 font-vazir mb-4 pb-2 border-b border-[#E3DAD0]">
                {editingCatId ? 'ویرایش دسته‌بندی' : 'افزودن دسته‌بندی جدید'}
              </h2>

              <form onSubmit={handleSaveCategory} className="space-y-4 text-xs">
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

                <div className="flex items-center gap-2 pt-2">
                  {editingCatId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingCatId(null);
                        setNewCatName('');
                        setNewCatSlug('');
                        setNewCatDesc('');
                      }}
                      className="w-1/3 py-2.5 px-3 rounded-[10px] bg-slate-100 text-slate-700 font-bold hover:bg-slate-200"
                    >
                      انصراف
                    </button>
                  )}
                  <button
                    type="submit"
                    className="flex-1 py-2.5 px-4 rounded-[10px] bg-[#EFA73F] text-navy-950 font-bold hover:bg-[#D48E28] transition-colors"
                  >
                    {editingCatId ? 'ذخیره تغییرات' : 'ثبت دسته‌بندی'}
                  </button>
                </div>
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

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-[6px] bg-white border border-[#E3DAD0] font-mono text-[10px]">
                        {c.articles_count || 0} مقاله
                      </span>
                      <button
                        onClick={() => {
                          setEditingCatId(c.id);
                          setNewCatName(c.name);
                          setNewCatSlug(c.slug);
                          setNewCatDesc(c.description || '');
                        }}
                        className="p-1 rounded text-slate-600 hover:text-navy-950"
                        title="ویرایش"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
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
