import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, Layers, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { CTASection } from '../components/common/CTASection';
import { industriesData } from '../data/industries';
import { pagesSEO } from '../data/seo';

export const IndustriesPage: React.FC = () => {
  const seo = pagesSEO.industries;

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
          <Breadcrumb items={[{ label: 'صنایع هدف' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-3 font-semibold">
              TARGET MINERAL COMMODITIES // معدنکو
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6 text-white">
              تمرکز بر صنایع معدنی و کارخانجات کانی‌آرایی
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              تحلیل و مدیریت داده‌های عملیاتی در خطوط خردایش، فلوتاسیون و کنسانتره‌سازی متناسب با ویژگی‌های کانی‌شناسی سنگ‌آهن، مس، سرب و روی.
            </p>
          </div>
        </div>
      </section>

      {/* Industries Directory */}
      <section className="py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industriesData.map((ind, idx) => (
              <div
                key={ind.id}
                className="bg-white/90 backdrop-blur-sm rounded-3xl overflow-hidden border border-[#E3DAD0] shadow-card hover:shadow-elevated hover:border-[#0F1821]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={ind.image}
                    alt={ind.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/90 via-navy-950/40 to-transparent"></div>
                  <div className="absolute bottom-6 right-6 left-6 text-white">
                    <span className="text-xs font-mono text-[#EFA73F] mb-1 block font-semibold">
                      SECTOR 0{idx + 1}
                    </span>
                    <h2 className="text-2xl font-bold font-vazir group-hover:text-[#EFA73F] transition-colors">
                      {ind.title}
                    </h2>
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-6">
                      {ind.shortDescription}
                    </p>

                    <div className="space-y-3 mb-6">
                      <span className="text-xs font-bold text-navy-950 block font-vazir">
                        عملیات و مدارهای کلیدی:
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 pr-2">
                        {ind.typicalOperations.slice(0, 3).map((op, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C92127] flex-shrink-0"></span>
                            <span>{op}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-[#E3DAD0]/70 flex items-center justify-between">
                    <Link
                      to={`/industries/${ind.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0F1821] group-hover:text-[#C92127] transition-colors"
                    >
                      <span>مشاهده جزئیات داده‌ای و کاربردها</span>
                      <ArrowUpLeft className="w-4 h-4 text-[#C92127]" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-xs text-slate-400">
            * دسته‌بندی‌های فوق بازارهای هدف توسعه سامانه و تحلیل داده‌ها می‌باشند و به عنوان سوابق تاییدشده قراردادهای تجاری در هر کالا تفسیر نمی‌شوند.
          </div>

          <div className="mt-16">
            <CTASection />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
