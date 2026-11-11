import React, { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Clock, Calendar, User, Share2, Tag, Check, Copy, ArrowLeft, ArrowUpLeft, Bookmark, HelpCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { articlesData } from '../data/articles';
import { CTASection } from '../components/common/CTASection';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [copied, setCopied] = useState(false);
  const article = articlesData.find((a) => a.slug === slug);

  if (!article) {
    return <Navigate to="/blog" replace />;
  }

  const relatedArticles = articlesData.filter((a) => a.slug !== slug).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Organization',
      name: 'محاسبات عملیات داده ارزیابی نوین',
      url: 'https://novin-amaliat.ir',
    },
    datePublished: '2024-11-05',
    publisher: {
      '@type': 'Organization',
      name: 'شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود',
      logo: {
        '@type': 'ImageObject',
        url: 'https://novin-amaliat.ir/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://novin-amaliat.ir/blog/${article.slug}`,
    },
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={article.title}
        description={article.summary}
        keywords={article.tags}
        canonical={`https://novin-amaliat.ir/blog/${article.slug}`}
        ogType="article"
        publishedTime="2024-11-05"
        author={article.author}
        jsonLd={jsonLd}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'دانشنامه و مقالات', path: '/blog' },
              { label: article.category, path: '/blog' },
              { label: article.title },
            ]}
          />

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-cyan/20 text-brand-cyan border border-brand-cyan/30">
              {article.category}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              پیش‌نویس تحریریه (نیازمند تایید نهایی کارشناس)
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-vazir leading-tight mb-6">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 pt-4 border-t border-slate-800">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-brand-cyan" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>انتشار: {article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-brand-copper" />
              <span>زمان مطالعه: {article.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Layout */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Editorial Content (8 cols) */}
            <div className="lg:col-span-8">
              {/* Summary Lead Paragraph */}
              <div className="p-6 rounded-2xl bg-slate-50 border-r-4 border-brand-blue mb-10 text-slate-700 text-base md:text-lg leading-relaxed font-normal">
                {article.summary}
              </div>

              {/* Render Article HTML Content with Elegant Typography */}
              <div
                className="prose prose-slate max-w-none prose-headings:font-vazir prose-headings:font-bold prose-headings:text-navy-900 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-lg prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-li:text-slate-600 prose-li:text-base prose-strong:text-navy-900"
                dangerouslySetInnerHTML={{ __html: article.contentHtml }}
              />

              {/* Article FAQ Section */}
              {article.faq && article.faq.length > 0 && (
                <div className="mt-14 pt-8 border-t border-slate-200">
                  <div className="flex items-center gap-2 mb-6 text-navy-900">
                    <HelpCircle className="w-5 h-5 text-brand-blue" />
                    <h3 className="text-xl font-bold font-vazir">پرسش و پاسخ پیرامون این موضوع</h3>
                  </div>
                  <div className="space-y-4">
                    {article.faq.map((f, i) => (
                      <div key={i} className="p-5 rounded-xl bg-slate-50 border border-slate-200">
                        <h4 className="font-bold text-sm text-navy-900 mb-2 font-vazir">{f.question}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {f.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Tags */}
              <div className="mt-12 pt-6 border-t border-slate-200 flex flex-wrap items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 ml-2">برچسب‌ها:</span>
                {article.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs px-3 py-1 rounded-lg bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors cursor-pointer"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Share & Editorial Notice Box */}
              <div className="mt-10 p-5 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-slate-500">
                  این مطلب به عنوان پیش‌نویس تحریریه تدوین شده است و هرگونه بازنشر با ذکر منبع بلامانع است.
                </div>
                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-navy-900 hover:border-brand-blue transition-colors flex items-center gap-2 shadow-sm"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>لینک مقاله کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>اشتراک‌گذاری و کپی لینک</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar (4 cols): Table of Contents & Related Articles */}
            <div className="lg:col-span-4 space-y-8">
              {/* Table of Contents Sticky Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 sticky top-28">
                <div className="flex items-center gap-2 mb-4 text-navy-900">
                  <Bookmark className="w-4 h-4 text-brand-copper" />
                  <h3 className="text-sm font-bold font-vazir">فهرست سرفصل‌های این مقاله</h3>
                </div>
                <nav>
                  <ul className="space-y-2.5 text-xs text-slate-600">
                    {article.tableOfContents.map((toc) => (
                      <li key={toc.id}>
                        <a
                          href={`#${toc.id}`}
                          className="hover:text-brand-blue transition-colors block py-1 border-r-2 border-transparent hover:border-brand-blue pr-2"
                        >
                          {toc.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-8 pt-6 border-t border-slate-200">
                  <span className="text-xs font-mono text-brand-blue block mb-1">DATA PLATFORM</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                    آیا مایلید جریان داده‌های خط کانی‌آرایی مجموعه خود را ساختارمند کنید؟
                  </p>
                  <Button to="/platform" variant="outline" size="sm" className="w-full text-xs">
                    بررسی امکانات سامانه فرآوری
                  </Button>
                </div>
              </div>

              {/* Related Articles Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-sm font-bold text-navy-900 mb-4 font-vazir">
                  مقالات مرتبط
                </h3>
                <div className="space-y-4">
                  {relatedArticles.map((ra) => (
                    <article key={ra.id} className="border-b border-slate-100 pb-3 last:border-none last:pb-0">
                      <span className="text-[10px] text-brand-cyan font-mono block mb-1">
                        {ra.category}
                      </span>
                      <Link
                        to={`/blog/${ra.slug}`}
                        className="text-xs font-bold text-navy-900 hover:text-brand-blue transition-colors leading-snug block mb-1"
                      >
                        {ra.title}
                      </Link>
                      <span className="text-[10px] text-slate-400 block">{ra.readingTime}</span>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </section>
    </PageContainer>
  );
};
