import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { BlockRenderer, PageSectionData } from '../components/blocks/BlockRenderer';
import { api } from '../services/api';
import { ArrowLeft, FileQuestion } from 'lucide-react';

export const DynamicPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<any | null>(null);
  const [sections, setSections] = useState<PageSectionData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);

    api.sections.getByPageSlug(slug)
      .then((res) => {
        if (res.success && res.page) {
          setPage(res.page);
          setSections(res.data);
          setNotFound(false);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));

    // Record pageview event
    api.analytics.track({
      event_type: 'pageview',
      path: window.location.pathname,
      referrer: document.referrer,
    });
  }, [slug]);

  if (loading) {
    return (
      <PageContainer>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-brand-amber border-t-transparent rounded-full animate-spin" />
        </div>
      </PageContainer>
    );
  }

  if (notFound || !page) {
    return (
      <PageContainer>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
          <FileQuestion className="w-16 h-16 text-slate-300 mb-4" />
          <h1 className="text-2xl font-black text-navy-950 mb-2">صفحه مورد نظر یافت نشد</h1>
          <p className="text-slate-500 text-sm mb-6">صفحه‌ای که به دنبال آن بودید وجود ندارد یا هنوز منتشر نشده است.</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-950 text-white font-bold text-sm"
          >
            <span>بازگشت به صفحه اصلی</span>
            <ArrowLeft className="w-4 h-4 text-brand-amber" />
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <SEO
        title={`${page.title} | معدنکو`}
        description={page.excerpt || 'صفحه تخصصی در سامانه معدنکو'}
        canonical={`https://madan.co.ir/p/${slug}`}
      />

      {sections.length > 0 ? (
        <div className="space-y-0">
          {sections.map((section) => (
            <BlockRenderer key={section.id} section={section} />
          ))}
        </div>
      ) : (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-black text-navy-950 mb-6">{page.title}</h1>
          {page.excerpt && <p className="text-lg text-slate-600 mb-8">{page.excerpt}</p>}
          <div
            className="prose prose-slate max-w-none text-navy-900"
            dangerouslySetInnerHTML={{ __html: page.content || '' }}
          />
        </div>
      )}
    </PageContainer>
  );
};
