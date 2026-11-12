import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowUpLeft, BookOpen, Tag } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { articlesData, articleCategories } from '../data/articles';
import { pagesSEO } from '../data/seo';
import { api } from '../services/api';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه مقالات');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dynamicArticles, setDynamicArticles] = useState<any[] | null>(null);
  const seo = pagesSEO.blog;

  useEffect(() => {
    api.articles.getPublic({
      category: selectedCategory !== 'همه مقالات' ? selectedCategory : undefined,
      search: searchQuery || undefined,
    })
      .then((res) => {
        if (res.success && Array.isArray(res.data) && res.data.length > 0) {
          setDynamicArticles(res.data);
        } else {
          setDynamicArticles(null); // fallback to local confirmed data
        }
      })
      .catch(() => {
        setDynamicArticles(null);
      });
  }, [selectedCategory, searchQuery]);

  const fallbackArticles = articlesData.filter((article) => {
    const matchesCategory =
      selectedCategory === 'همه مقالات' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const displayArticles = dynamicArticles || fallbackArticles;

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {articleCategories.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
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

            {/* Search Input Box */}
            <div className="relative min-w-[280px]">
              <input
                type="text"
                placeholder="جستجو در عنوان یا متن مقاله..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white/90 border border-[#E3DAD0] rounded-[10px] text-xs sm:text-sm text-navy-950 placeholder:text-slate-400 focus:outline-none focus:border-[#0F1821] transition-all shadow-xs"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Listing */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {displayArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {displayArticles.map((article) => {
                const categoryLabel = article.category_name || article.category || 'متالورژی و داده';
                const readingTimeLabel = article.reading_time || article.readingTime || '۵ دقیقه';
                const publishedAtLabel = article.published_at || article.publishedAt || '۱۴۰۳/۰۸';
                const tagsList = Array.isArray(article.tags) ? article.tags : [];

                return (
                  <article
                    key={article.id}
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
          ) : (
            <div className="text-center py-20 bg-white/90 rounded-3xl border border-[#E3DAD0] p-8 max-w-xl mx-auto shadow-card">
              <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-navy-900 mb-2 font-vazir">
                مقاله‌ای با این مشخصات یافت نشد
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                عبارت جستجوی دیگری را وارد کنید یا فیلتر دسته‌بندی را به "همه مقالات" تغییر دهید.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('همه مقالات');
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
