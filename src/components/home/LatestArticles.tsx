import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowUpLeft } from 'lucide-react';
import { articlesData } from '../../data/articles';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const LatestArticles: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-sand relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            eyebrow="مرکز دانش معدنکو"
            title="دانش و تحلیل در دنیای معدن و داده"
            description="یادداشت‌های تخصصی و مقالات تحلیلی در خصوص مبانی مدیریت داده‌های صنعتی، متالورژی کانی‌آرایی و چشم‌انداز فناوری‌های معدنی."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-brand-amberDark transition-colors self-start md:self-auto"
          >
            <span>مشاهده همه مقالات دانشنامه</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.slice(0, 3).map((article, idx) => (
            <AnimatedSection key={article.id} delay={idx * 0.1}>
              <article className="bg-white rounded-2xl overflow-hidden border border-brand-border shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="p-7">
                  {/* Category and Draft status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-brand-sand text-navy-900 border border-brand-border/60">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded bg-brand-amber/10 text-brand-amberDark border border-brand-amber/20 font-mono">
                      EDITORIAL DRAFT
                    </span>
                  </div>

                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-navy-950 group-hover:text-brand-amberDark transition-colors font-vazir leading-snug mb-3">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="px-7 py-4 bg-brand-sand/40 border-t border-brand-border/60 flex items-center justify-between text-xs text-slate-500 font-light">
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
                    className="font-bold text-navy-900 group-hover:text-brand-amberDark inline-flex items-center gap-1 transition-colors"
                  >
                    <span>مطالعه</span>
                    <ArrowUpLeft className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
};
