import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Clock, Calendar, ArrowUpLeft, BookOpen, Tag } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { articlesData, articleCategories } from '../data/articles';
import { pagesSEO } from '../data/seo';

export const BlogPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('همه مقالات');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const seo = pagesSEO.blog;

  const filteredArticles = articlesData.filter((article) => {
    const matchesCategory =
      selectedCategory === 'همه مقالات' || article.category === selectedCategory;
    const matchesSearch =
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'دانشنامه و مقالات' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              MINING & DATA KNOWLEDGE CENTER
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              دانشنامه و مقالات تخصصی کانی‌آرایی و داده
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              تحلیل‌ها، یادداشت‌های فنی و بررسی‌های مهندسی در حوزه پردازش داده‌های عملیاتی، مدیریت خطوط فرآوری و فناوری‌های معدنی.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Toolbar */}
      <section className="py-8 bg-white border-b border-brand-border sticky top-20 z-30 shadow-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Category Filter Badges */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
              {articleCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    selectedCategory === cat
                      ? 'bg-navy-900 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input Box */}
            <div className="relative min-w-[280px]">
              <input
                type="text"
                placeholder="جستجو در عنوان یا متن مقاله..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>
        </div>
      </section>

      {/* Articles Listing */}
      <section className="py-16 md:py-24 bg-brand-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredArticles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArticles.map((article) => (
                <article
                  key={article.id}
                  className="bg-white rounded-card overflow-hidden border border-brand-border shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
                >
                  <div className="p-7">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-brand-blue">
                        {article.category}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200">
                        پیش‌نویس تحریریه
                      </span>
                    </div>

                    <Link to={`/blog/${article.slug}`}>
                      <h2 className="text-lg font-bold text-navy-900 group-hover:text-brand-blue transition-colors font-vazir leading-snug mb-3">
                        {article.title}
                      </h2>
                    </Link>

                    <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6 line-clamp-3">
                      {article.summary}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-50">
                      {article.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[11px] text-slate-400 flex items-center gap-1">
                          <Tag className="w-2.5 h-2.5" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="px-7 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                        <span>{article.readingTime}</span>
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>{article.publishedAt}</span>
                      </span>
                    </div>

                    <Link
                      to={`/blog/${article.slug}`}
                      className="font-bold text-brand-blue group-hover:text-navy-900 inline-flex items-center gap-1 transition-colors"
                    >
                      <span>مطالعه مقاله</span>
                      <ArrowUpLeft className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8 max-w-xl mx-auto">
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
                className="px-4 py-2 rounded-lg bg-navy-900 text-white text-xs font-medium"
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
