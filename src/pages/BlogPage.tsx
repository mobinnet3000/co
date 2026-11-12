import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowUpLeft, BookOpen, Tag, ArrowUpDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { articlesData, articleCategories } from '../data/articles';
import { pagesSEO } from '../data/seo';
import { api } from '../services/api';

const ITEMS_PER_PAGE = 6;

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه مقالات');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dynamicArticles, setDynamicArticles] = useState<any[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const seo = pagesSEO.blog;

  useEffect(() => {
    setLoading(true);
    api.articles.getPublic({
      category: selectedCategory !== 'همه مقالات' ? selectedCategory : undefined,
      search: searchQuery || undefined,
    })
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDynamicArticles(res.data);
        } else {
          setDynamicArticles(null);
        }
      })
      .catch(() => {
        setDynamicArticles(null);
      })
      .finally(() => setLoading(false));
  }, [selectedCategory, searchQuery]);

  // Reset to page 1 on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedTag, searchQuery, sortOrder]);

  const allAvailableTags = useMemo(() => {
    const set = new Set<string>();
    articlesData.forEach((a) => {
      a.tags.forEach((t) => set.add(t));
    });
    return Array.from(set).slice(0, 10);
  }, []);

  const filteredArticles = useMemo(() => {
    const source = dynamicArticles || articlesData;
    let result = source.filter((article) => {
      const cat = article.category_name || article.category;
      const matchesCategory =
        selectedCategory === 'همه مقالات' || cat === selectedCategory;

      const title = article.title || '';
      const summary = article.summary || '';
      const tagsList = Array.isArray(article.tags)
        ? article.tags.map((t: any) => (typeof t === 'string' ? t : t.name))
        : [];

      const matchesSearch =
        !searchQuery ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tagsList.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTag = !selectedTag || tagsList.includes(selectedTag);

      return matchesCategory && matchesSearch && matchesTag;
    });

    if (sortOrder === 'oldest') {
      result = [...result].reverse();
    }

    return result;
  }, [dynamicArticles, selectedCategory, selectedTag, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE) || 1;
  const paginatedArticles = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredArticles.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-950 text-white relative overflow-hidden border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'دانشنامه و مقالات' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-3 font-semibold">
              MINING & DATA KNOWLEDGE CENTER // معدنکو
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6 text-white">
              دانشنامه و مقالات تخصصی کانی‌آرایی و داده
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              تحلیل‌ها، یادداشت‌های فنی و بررسی‌های مهندسی در حوزه پردازش داده‌های عملیاتی، مدیریت خطوط فرآوری و فناوری‌های معدنی.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="py-6 bg-brand-sand/90 backdrop-blur-md border-b border-[#E3DAD0] sticky top-20 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Category Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
              {articleCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setSelectedTag(null);
                    }}
                    style={
                      isActive
                        ? { backgroundColor: 'transparent', borderColor: '#0f1821', color: '#0f1821' }
                        : { backgroundColor: 'rgba(15, 24, 33, 0.08)', borderColor: 'transparent', color: '#0f1821' }
                    }
                    className={`px-3.5 py-1.5 rounded-[10px] text-xs font-semibold whitespace-nowrap transition-all border flex-shrink-0 ${
                      isActive ? 'shadow-xs font-bold' : 'hover:bg-[#0f1821]/[0.13]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  placeholder="جستجو در مقالات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E3DAD0] rounded-[10px] text-xs text-navy-950 placeholder:text-slate-400 focus:outline-none focus:border-[#0F1821] shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as 'newest' | 'oldest')}
                className="py-1.5 px-3 rounded-[10px] bg-white border border-[#E3DAD0] text-xs text-navy-950 font-medium focus:outline-none focus:border-[#0F1821] shadow-xs"
              >
                <option value="newest">جدیدترین</option>
                <option value="oldest">قدیمی‌ترین</option>
              </select>
            </div>
          </div>

          {/* Quick Tag Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none text-xs">
            <span className="text-[11px] font-semibold text-slate-500 whitespace-nowrap ml-1">موضوعات پرتکرار:</span>
            {allAvailableTags.map((tag) => {
              const isTagActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagActive ? null : tag)}
                  className={`px-2.5 py-0.5 rounded-[6px] text-[11px] transition-colors whitespace-nowrap flex items-center gap-1 ${
                    isTagActive
                      ? 'bg-[#EFA73F] text-navy-950 font-bold border border-[#D48E28]'
                      : 'bg-white border border-[#E3DAD0] text-slate-600 hover:border-slate-400'
                  }`}
                >
                  <Tag className="w-2.5 h-2.5" />
                  <span>{tag}</span>
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="text-[10px] text-[#C92127] font-bold underline mr-2 whitespace-nowrap"
              >
                حذف فیلتر برچسب
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Articles Listing */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-white rounded-2xl p-7 border border-[#E3DAD0] animate-pulse space-y-4">
                  <div className="h-4 bg-slate-200 rounded w-1/3" />
                  <div className="h-6 bg-slate-200 rounded w-4/5" />
                  <div className="h-16 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              ))}
            </div>
          ) : paginatedArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedArticles.map((article) => {
                  const categoryLabel = article.category_name || article.category || 'متالورژی و داده';
                  const readingTimeLabel = article.reading_time || article.readingTime || '۵ دقیقه';
                  const publishedAtLabel = article.published_at || article.publishedAt || '۱۴۰۳/۰۸';
                  const tagsList = Array.isArray(article.tags) ? article.tags : [];

                  return (
                    <article
                      key={article.id || article.slug}
                      className="bg-white/90 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:border-[#0F1821]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                    >
                      <div className="p-7">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-bold px-2.5 py-1 rounded-[8px] bg-brand-sand border border-[#E3DAD0] text-navy-950">
                            {categoryLabel}
                          </span>
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-[6px] bg-[#FAF7F3] text-slate-600 border border-[#E3DAD0]">
                            یادداشت فنی
                          </span>
                        </div>

                        <Link to={`/blog/${article.slug}`}>
                          <h2 className="text-lg font-bold text-navy-950 group-hover:text-[#C92127] transition-colors font-vazir leading-snug mb-3">
                            {article.title}
                          </h2>
                        </Link>

                        <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6 line-clamp-3">
                          {article.summary}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-[#E3DAD0]/60">
                          {tagsList.slice(0, 3).map((tag: any, tIdx: number) => {
                            const tagName = typeof tag === 'string' ? tag : tag.name;
                            return (
                              <span key={tIdx} className="text-[11px] text-slate-500 flex items-center gap-1 font-mono">
                                <Tag className="w-2.5 h-2.5 text-[#EFA73F]" />
                                <span>{tagName}</span>
                              </span>
                            );
                          })}
                        </div>
                      </div>

                      <div className="px-7 py-4 bg-brand-sandLight border-t border-[#E3DAD0]/70 flex items-center justify-between text-xs text-slate-500">
                        <div className="flex items-center gap-3">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{readingTimeLabel}</span>
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5 text-slate-400" />
                            <span>{publishedAtLabel}</span>
                          </span>
                        </div>

                        <Link
                          to={`/blog/${article.slug}`}
                          className="font-bold text-[#0F1821] group-hover:text-[#C92127] inline-flex items-center gap-1 transition-colors"
                        >
                          <span>مطالعه مقاله</span>
                          <ArrowUpLeft className="w-4 h-4 text-[#C92127]" />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>

              {/* Real Pagination Controls */}
              {totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    className="p-2 rounded-xl bg-white border border-[#E3DAD0] text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-navy-950 transition-colors"
                    title="صفحه قبلی"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, idx) => {
                    const p = idx + 1;
                    const isActive = p === currentPage;
                    return (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-9 h-9 rounded-xl text-xs font-bold font-mono transition-colors border ${
                          isActive
                            ? 'bg-navy-950 text-white border-navy-950'
                            : 'bg-white text-slate-700 border-[#E3DAD0] hover:border-navy-950'
                        }`}
                      >
                        {p}
                      </button>
                    );
                  })}

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    className="p-2 rounded-xl bg-white border border-[#E3DAD0] text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:border-navy-950 transition-colors"
                    title="صفحه بعدی"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-20 bg-white/90 rounded-3xl border border-[#E3DAD0] p-8 max-w-xl mx-auto shadow-card">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy-900 mb-2 font-vazir">
                مقاله‌ای با این مشخصات یافت نشد
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                عبارت جستجوی دیگری را وارد کنید یا فیلتر دسته‌بندی و برچسب را پاک نمایید.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('همه مقالات');
                  setSelectedTag(null);
                  setSearchQuery('');
                }}
                className="px-4 py-2 rounded-[10px] bg-navy-950 text-white text-xs font-bold hover:bg-[#0F1821]/90"
              >
                نمایش همه مقالات
              </button>
            </div>
          )}
        </div>
      </section>
    </PageContainer>
  );
};
