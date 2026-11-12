import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, ArrowUpLeft } from 'lucide-react';
import { articlesData } from '../../data/articles';
import { SectionHeading } from '../common/SectionHeading';
import { AnimatedSection } from '../common/AnimatedSection';

export const LatestArticles: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-brand-sand relative border-b border-[#E3DAD0]/70 overflow-hidden">
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]/60"></div>
        <div className="absolute top-[25%] left-0 right-0 h-[1px] bg-[#E3DAD0]/40"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <AnimatedSection className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <SectionHeading
            variant="light"
            eyebrow="مرکز دانش معدنکو"
            title="دانش و تحلیل در دنیای معدن و داده"
            description="یادداشت‌های تخصصی و مقالات تحلیلی در خصوص مبانی مدیریت داده‌های صنعتی، متالورژی کانی‌آرایی و چشم‌انداز فناوری‌های معدنی."
            className="mb-0 max-w-2xl"
          />
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#0F1821] hover:text-[#C92127] px-4 py-2.5 rounded-[10px] border border-[#0F1821]/15 hover:border-[#C92127] bg-white/60 backdrop-blur-sm transition-all duration-200 self-start md:self-auto shadow-subtle group"
          >
            <span>مشاهده همه مقالات دانشنامه</span>
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {articlesData.slice(0, 3).map((article, idx) => (
            <AnimatedSection key={article.id} delay={idx * 0.1}>
              <article className="bg-white/85 backdrop-blur-md rounded-2xl overflow-hidden border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group">
                <div className="p-7">
                  {/* Category and Draft status */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-[8px] bg-brand-sand text-[#0F1821] border border-[#E3DAD0]">
                      {article.category}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-[6px] bg-[#EFA73F]/15 text-[#0F1821] border border-[#EFA73F]/40">
                      EDITORIAL DRAFT
                    </span>
                  </div>

                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="text-base sm:text-lg font-bold text-[#0F1821] group-hover:text-[#C92127] transition-colors font-vazir leading-snug mb-3">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-xs sm:text-sm text-[#1D2D3D]/80 font-light leading-relaxed mb-6 line-clamp-3">
                    {article.summary}
                  </p>
                </div>

                <div className="px-7 py-4 bg-[#FAF7F3]/80 border-t border-[#E3DAD0]/70 flex items-center justify-between text-xs text-[#6B7B8C] font-light">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#6B7B8C]" />
                      <span>{article.readingTime}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#6B7B8C]" />
                      <span>{article.publishedAt}</span>
                    </span>
                  </div>

                  <Link
                    to={`/blog/${article.slug}`}
                    className="font-bold text-[#0F1821] group-hover:text-[#C92127] inline-flex items-center gap-1 transition-colors"
                  >
                    <span>مطالعه</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
