import React from 'react';
import { Helmet } from 'react-helmet-async';
import { defaultSEO } from '../../data/seo';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  author?: string;
  jsonLd?: Record<string, any>;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  canonical,
  ogImage = defaultSEO.defaultOgImage,
  ogType = 'website',
  publishedTime,
  author,
  jsonLd,
}) => {
  const fullTitle = title
    ? `${title} | ${defaultSEO.siteName}`
    : `${defaultSEO.siteName} | سامانه تحلیل و پردازش داده‌های فرآوری مواد معدنی`;
  const metaDescription =
    description ||
    'شرکت محاسبات عملیات داده ارزیابی نوین - توسعه راهکارهای نرم‌افزاری و بسترهای تحلیلی داده‌محور برای خطوط فرآوری مواد معدنی';
  const metaKeywords = keywords?.join(', ') || defaultSEO.keywordsClusters.persian.join(', ');
  const canonicalUrl = canonical || defaultSEO.siteUrl;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={defaultSEO.siteName} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="fa_IR" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {author && <meta property="article:author" content={author} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
