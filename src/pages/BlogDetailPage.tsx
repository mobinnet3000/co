import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Clock,
  Calendar,
  User,
  Share2,
  Tag,
  Check,
  Copy,
  ArrowLeft,
  ArrowUpLeft,
  Bookmark,
  HelpCircle,
  Printer,
  ChevronLeft,
  Award,
  BookOpen,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { articlesData } from '../data/articles';
import { api } from '../services/api';

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const cleanSlug = slug ? decodeURIComponent(slug).trim() : '';
  const [copied, setCopied] = useState(false);
  const fallbackArticle = useMemo(() => {
    return articlesData.find((a) => a.slug === cleanSlug);
  }, [cleanSlug]);

  const [dynamicArticle, setDynamicArticle] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(!fallbackArticle);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (!cleanSlug) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    setLoading(!fallbackArticle);
    setNotFound(false);

    api.articles.getPublicBySlug(cleanSlug)
      .then((res) => {
        if (res.success && res.data) {
          setDynamicArticle(res.data);
          setNotFound(false);
        } else if (!fallbackArticle) {
          setNotFound(true);
        }
      })
      .catch(() => {
        if (!fallbackArticle) {
          setNotFound(true);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [cleanSlug, fallbackArticle]);

  // Track reading scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        const progress = Math.min(100, Math.max(0, (totalScroll / windowHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const rawArticle = dynamicArticle || fallbackArticle;

  if (loading && !rawArticle) {
    return (
      <PageContainer forceDarkNavbarText={true}>
        <section className="pt-32 pb-24 bg-brand-sand min-h-screen">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/4" />
            <div className="h-10 bg-slate-300 rounded w-3/4" />
            <div className="h-4 bg-slate-200 rounded w-1/2" />
            <div className="h-64 bg-white rounded-2xl border border-[#E3DAD0] p-8 space-y-4">
              <div className="h-4 bg-slate-200 rounded w-full" />
              <div className="h-4 bg-slate-200 rounded w-5/6" />
              <div className="h-4 bg-slate-200 rounded w-4/6" />
            </div>
          </div>
        </section>
      </PageContainer>
    );
  }

  if (notFound && !rawArticle) {
    return (
      <PageContainer forceDarkNavbarText={true}>
        <section className="pt-36 pb-24 bg-brand-sand min-h-screen flex items-center justify-center">
          <div className="text-center p-8 bg-white rounded-3xl border border-[#E3DAD0] max-w-md mx-auto shadow-card">
            <BookOpen className="w-12 h-12 text-[#C92127] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy-950 font-vazir mb-2">مقاله مورد نظر یافت نشد</h2>
            <p className="text-xs text-slate-500 mb-6">نشانی وارد شده یافت نشد یا ممکن است مقاله در دست بازبینی باشد.</p>
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-navy-950 text-white font-bold text-xs hover:bg-[#0F1821]/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>بازگشت به آرشیو مقالات</span>
            </Link>
          </div>
        </section>
      </PageContainer>
    );
  }

  if (!rawArticle) {
    return null;
  }

  const article = {
    ...rawArticle,
    category: rawArticle.category_name || rawArticle.category || 'متالورژی و داده',
    contentHtml: rawArticle.content_html || rawArticle.contentHtml || '',
    readingTime: rawArticle.reading_time || rawArticle.readingTime || '۵ دقیقه',
    publishedAt: rawArticle.published_at || rawArticle.publishedAt || '۱۴۰۳/۰۸',
    author: rawArticle.author_name || rawArticle.author || 'واحد تحقیق و توسعه معدنکو',
    tags: Array.isArray(rawArticle.tags)
      ? rawArticle.tags.map((t: any) => (typeof t === 'string' ? t : t.name))
      : [],
  };

  // Dynamically extract H2 and H3 tags from contentHtml and inject anchor IDs
  const { processedHtml, tocItems } = useMemo(() => {
    const items: TOCItem[] = [];
    if (!article.contentHtml) {
      return { processedHtml: '', tocItems: items };
    }

    let index = 0;
    const modified = article.contentHtml.replace(
      /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
      (match: string, tag: string, attrs: string, text: string) => {
        const cleanText = text.replace(/<[^>]+>/g, '').trim();
        const id = `heading-${index++}`;
        const level = tag.toLowerCase() === 'h2' ? 2 : 3;
        items.push({ id, title: cleanText, level });
        return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
      }
    );

    return { processedHtml: modified, tocItems: items };
  }, [article.contentHtml]);

  const relatedArticles = useMemo(() => {
    if (rawArticle.related && rawArticle.related.length > 0) {
      return rawArticle.related;
    }
    // Filter other articles by category or tags
    const sameCat = articlesData.filter(
      (a) => a.slug !== slug && (a.category === article.category || a.tags.some((t) => article.tags.includes(t)))
    );
    if (sameCat.length >= 2) return sameCat.slice(0, 3);
    return articlesData.filter((a) => a.slug !== slug).slice(0, 3);
  }, [rawArticle, slug, article.category, article.tags]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://madan.co.ir/blog/${article.slug}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const shareTelegram = () => {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(article.title)}`, '_blank');
  };

  const shareWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + '\n' + currentUrl)}`, '_blank');
  };

  const shareLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`, '_blank');
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.summary,
    author: {
      '@type': 'Organization',
      name: 'محاسبات عملیات داده ارزیابی نوین',
      url: 'https://madan.co.ir',
    },
    datePublished: '2024-11-05',
    publisher: {
      '@type': 'Organization',
      name: 'شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود',
      logo: {
        '@type': 'ImageObject',
        url: 'https://madan.co.ir/favicon.svg',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://madan.co.ir/blog/${article.slug}`,
    },
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={article.title}
        description={article.summary}
        keywords={article.tags}
        canonical={`https://madan.co.ir/blog/${article.slug}`}
        ogType="article"
        publishedTime="2024-11-05"
        author={article.author}
        jsonLd={jsonLd}
      />

      {/* Reading Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-transparent print:hidden">
        <div
          className="h-full bg-gradient-to-r from-[#EFA73F] to-[#C92127] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-950 text-white relative overflow-hidden border-b border-[#E3DAD0] print:bg-white print:text-black print:pt-6 print:pb-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="print:hidden">
            <Breadcrumb
              items={[
                { label: 'دانشنامه و مقالات', path: '/blog' },
                { label: article.category, path: '/blog' },
                { label: article.title },
              ]}
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-xs font-semibold px-3 py-1 rounded-[8px] bg-brand-sand border border-[#E3DAD0] text-navy-950">
              {article.category}
            </span>
            <span className="text-xs font-medium px-2.5 py-1 rounded-[8px] bg-[#FAF7F3] text-slate-700 border border-[#E3DAD0]">
              یادداشت فنی مهندسی
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-vazir leading-tight mb-6 text-white print:text-black">
            {article.title}
          </h1>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-300 print:text-slate-600 pt-4 border-t border-slate-800 print:border-slate-300">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-[#EFA73F] print:text-black" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400 print:text-black" />
              <span>تاریخ انتشار: {article.publishedAt}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C92127] print:text-black" />
              <span>زمان تقریبی مطالعه: {article.readingTime}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content Layout */}
      <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0] print:bg-white print:py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Editorial Content (8 cols) */}
            <div className="lg:col-span-8">
              {/* Summary Lead Paragraph */}
              <div className="p-6 rounded-2xl bg-white/90 border-r-4 border-[#C92127] border border-[#E3DAD0] mb-10 text-slate-700 text-base md:text-lg leading-relaxed font-normal shadow-card print:border-slate-400">
                {article.summary}
              </div>

              {/* Render Article HTML Content with IDs for TOC Anchor Navigation */}
              <div
                className="prose prose-slate max-w-none bg-white/80 p-8 sm:p-12 rounded-2xl border border-[#E3DAD0] shadow-card prose-headings:font-vazir prose-headings:font-bold prose-headings:text-navy-950 prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:scroll-mt-28 prose-h3:text-lg prose-h3:mt-6 prose-h3:mb-3 prose-h3:scroll-mt-28 prose-p:text-slate-600 prose-p:leading-relaxed prose-p:text-base md:prose-p:text-lg prose-li:text-slate-600 prose-li:text-base prose-strong:text-navy-950 print:p-0 print:border-0 print:shadow-none"
                dangerouslySetInnerHTML={{ __html: processedHtml || article.contentHtml }}
              />

              {/* Article FAQ Section */}
              {article.faq && article.faq.length > 0 && (
                <div className="mt-14 pt-8 border-t border-[#E3DAD0]">
                  <div className="flex items-center gap-2 mb-6 text-navy-950">
                    <HelpCircle className="w-5 h-5 text-[#EFA73F]" />
                    <h3 className="text-xl font-bold font-vazir">پرسش و پاسخ پیرامون این موضوع</h3>
                  </div>
                  <div className="space-y-4">
                    {article.faq.map((f: any, i: number) => (
                      <div key={i} className="p-5 rounded-xl bg-white/90 border border-[#E3DAD0] shadow-card">
                        <h4 className="font-bold text-sm text-navy-950 mb-2 font-vazir">{f.question}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {f.answer}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Article Tags */}
              {article.tags.length > 0 && (
                <div className="mt-12 pt-6 border-t border-[#E3DAD0] flex flex-wrap items-center gap-2 print:hidden">
                  <span className="text-xs font-semibold text-slate-500 ml-2">برچسب‌ها:</span>
                  {article.tags.map((tag: string, tIdx: number) => (
                    <span
                      key={tIdx}
                      className="text-xs px-3 py-1 rounded-[8px] bg-white border border-[#E3DAD0] text-slate-700 font-medium hover:border-[#0F1821] transition-colors shadow-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Author Bio Box */}
              <div className="mt-10 p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="w-14 h-14 rounded-2xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 font-bold font-vazir flex-shrink-0">
                  <Award className="w-7 h-7 text-[#EFA73F]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy-950 font-vazir mb-1">{article.author}</h4>
                  <p className="text-xs text-slate-600 font-light leading-relaxed mb-3">
                    تدوین‌شده توسط دپارتمان مهندسی متالورژی و داده شرکت محاسبات عملیات داده ارزیابی نوین (معدنکو). تمرکز این واحد بر ارتقای ریکاوری و موازنه جرم در کارخانجات فرآوری است.
                  </p>
                  <div className="text-[11px] text-slate-500 font-mono">
                    تلفن مهندسی: ۰۹۹۹۹۱۹۶۶۳۰ • ایمیل: info@madan.co.ir
                  </div>
                </div>
              </div>

              {/* Share & Actions Toolbar */}
              <div className="mt-8 p-5 rounded-2xl bg-white/90 border border-[#E3DAD0] flex flex-col sm:flex-row items-center justify-between gap-4 shadow-card print:hidden">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-navy-950 ml-1">اشتراک‌گذاری:</span>
                  <button
                    onClick={shareTelegram}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E3DAD0] text-xs text-slate-700 font-medium transition-colors"
                  >
                    تلگرام
                  </button>
                  <button
                    onClick={shareWhatsApp}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E3DAD0] text-xs text-slate-700 font-medium transition-colors"
                  >
                    واتس‌اپ
                  </button>
                  <button
                    onClick={shareLinkedIn}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E3DAD0] text-xs text-slate-700 font-medium transition-colors"
                  >
                    لینکدین
                  </button>
                  <button
                    onClick={handlePrint}
                    className="p-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-[#E3DAD0] text-slate-600 hover:text-navy-950 transition-colors"
                    title="چاپ مقاله"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={handleCopyLink}
                  className="px-4 py-2 rounded-[10px] bg-brand-sand border border-[#E3DAD0] text-xs font-bold text-navy-950 hover:border-[#0F1821] transition-colors flex items-center gap-2 shadow-xs"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>لینک مقاله کپی شد!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-500" />
                      <span>کپی لینک مقاله</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Sidebar (4 cols): Table of Contents & Related Articles */}
            <div className="lg:col-span-4 space-y-8 print:hidden">
              {/* Table of Contents Sticky Box */}
              <div className="p-6 rounded-2xl bg-white/90 border border-[#E3DAD0] shadow-card sticky top-24">
                <div className="flex items-center gap-2 mb-4 text-navy-950">
                  <Bookmark className="w-4 h-4 text-[#C92127]" />
                  <h3 className="text-sm font-bold font-vazir">فهرست سرفصل‌های این مقاله</h3>
                </div>

                {tocItems.length > 0 ? (
                  <nav>
                    <ul className="space-y-2 text-xs text-slate-600">
                      {tocItems.map((toc) => (
                        <li key={toc.id} className={toc.level === 3 ? 'pr-4 text-[11px]' : ''}>
                          <a
                            href={`#${toc.id}`}
                            className="hover:text-[#C92127] transition-colors block py-1 border-r-2 border-transparent hover:border-[#C92127] pr-2"
                          >
                            {toc.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                ) : (
                  <p className="text-xs text-slate-500 font-light">
                    این مقاله به صورت یکپارچه تدوین شده است.
                  </p>
                )}

                <div className="mt-8 pt-6 border-t border-[#E3DAD0]">
                  <span className="text-xs font-mono text-[#EFA73F] font-bold block mb-1">DATA PLATFORM</span>
                  <p className="text-xs text-slate-600 leading-relaxed font-light mb-4">
                    آیا مایلید جریان داده‌های خط کانی‌آرایی مجموعه خود را ساختارمند کنید؟
                  </p>
                  <div className="space-y-2">
                    <Button to="/platform" variant="outline" size="sm" className="w-full text-xs border-[#0F1821] text-[#0F1821] hover:bg-[#0F1821]/5">
                      بررسی امکانات سامانه فرآوری
                    </Button>
                    <a
                      href="https://madan.ba3tani.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center py-2 px-3 rounded-[10px] bg-[#EFA73F] text-[#0F1821] hover:bg-[#D48E28] font-bold text-xs"
                    >
                      ورود به سامانه آنلاین
                    </a>
                  </div>
                </div>
              </div>

              {/* Related Articles Box */}
              {relatedArticles.length > 0 && (
                <div className="p-6 rounded-2xl bg-white/90 border border-[#E3DAD0] shadow-card">
                  <div className="flex items-center gap-2 mb-4 text-navy-950">
                    <BookOpen className="w-4 h-4 text-[#EFA73F]" />
                    <h3 className="text-sm font-bold font-vazir">مقالات مرتبط در این حوزه</h3>
                  </div>
                  <div className="space-y-4">
                    {relatedArticles.map((rel: any, idx: number) => (
                      <Link
                        key={idx}
                        to={`/blog/${rel.slug}`}
                        className="block p-3 rounded-xl bg-slate-50 hover:bg-brand-sand border border-[#E3DAD0] transition-all group"
                      >
                        <h4 className="text-xs font-bold text-navy-950 font-vazir mb-1 group-hover:text-[#C92127] transition-colors line-clamp-2">
                          {rel.title}
                        </h4>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 font-mono">
                          <span>{rel.reading_time || rel.readingTime || '۵ دقیقه'}</span>
                          <span className="text-[#EFA73F] font-bold flex items-center gap-0.5">
                            مطالعه <ChevronLeft className="w-3 h-3" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation Back to Blog */}
      <section className="py-8 bg-brand-sand text-center border-t border-[#E3DAD0] print:hidden">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[10px] bg-white border border-[#E3DAD0] text-xs font-bold text-navy-950 hover:border-[#0F1821] transition-colors shadow-xs"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>بازگشت به آرشیو مقالات و دانشنامه</span>
        </Link>
      </section>
    </PageContainer>
  );
};
