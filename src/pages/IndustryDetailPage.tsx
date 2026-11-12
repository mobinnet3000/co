import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, ArrowUpLeft, CheckCircle2, Database, Layers, LineChart, Cpu } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/common/CTASection';
import { industriesData } from '../data/industries';

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find((i) => i.slug === slug);

  if (!industry) {
    return <Navigate to="/industries" replace />;
  }

  const otherIndustries = industriesData.filter((i) => i.slug !== slug);

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={`${industry.title} | تحلیل داده و هوشمندسازی`}
        description={industry.shortDescription}
        canonical={`https://madan.co.ir/industries/${industry.slug}`}
      />

      {/* Hero Banner with Industrial Backdrop */}
      <section className="relative pt-32 pb-20 bg-navy-950 text-white overflow-hidden border-b border-[#E3DAD0]">
        <div className="absolute inset-0 z-0">
          <img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover opacity-20 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/80 to-navy-950/90"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'صنایع هدف', path: '/industries' },
              { label: industry.title },
            ]}
          />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-3 font-semibold">
              MINERAL PROCESSING DOMAIN // معدنکو
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6 text-white">
              {industry.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {industry.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl border border-[#E3DAD0] shadow-card">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-4 font-vazir">
                  نگاه کلی به متالورژی و عملیات خط فرآوری
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light text-justify">
                  {industry.fullDescription}
                </p>
              </div>

              {/* Operations & Circuits */}
              <div className="p-7 rounded-2xl bg-white/80 border border-[#E3DAD0] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-navy-950">
                  <Layers className="w-5 h-5 text-[#C92127]" />
                  <h3 className="text-lg font-bold font-vazir">مدارها و عملیات فرآوری متداول</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  {industry.typicalOperations.map((op, i) => (
                    <li key={i} className="flex items-start gap-2 p-3 rounded-xl bg-brand-sandLight border border-[#E3DAD0]/70">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C92127] mt-2 flex-shrink-0"></span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Types */}
              <div className="p-7 rounded-2xl bg-white/80 border border-[#E3DAD0] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-navy-950">
                  <Database className="w-5 h-5 text-[#EFA73F]" />
                  <h3 className="text-xl font-bold font-vazir">انواع داده‌های عملیاتی در این صنعت</h3>
                </div>
                <div className="space-y-3">
                  {industry.dataTypes.map((dt, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-sandLight border border-[#E3DAD0]/80 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-navy-950 font-medium">{dt}</span>
                      <span className="text-[11px] font-mono text-slate-500 font-semibold">DATA STREAM 0{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Opportunities */}
              <div className="p-7 rounded-2xl bg-white/80 border border-[#E3DAD0] shadow-card">
                <div className="flex items-center gap-2 mb-4 text-navy-950">
                  <LineChart className="w-5 h-5 text-[#C92127]" />
                  <h3 className="text-xl font-bold font-vazir">فرصت‌های تحلیل داده و بهینه‌سازی</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industry.analyticsOpportunities.map((opp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-sandLight border border-[#E3DAD0]/80 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{opp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Applications */}
              <div className="p-8 rounded-3xl bg-navy-950 text-white relative overflow-hidden shadow-card border border-[#E3DAD0]">
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-[#EFA73F]">
                    <Cpu className="w-5 h-5" />
                    <h3 className="text-lg font-bold font-vazir">کاربردهای سامانه در این صنعت</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {industry.platformApplications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F]"></span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-700/80 flex flex-wrap gap-3">
                    <Button to="/platform" variant="primary" size="sm" className="bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold border-none">
                      آشنایی کامل با ماژول‌های سامانه
                    </Button>
                    <a
                      href="https://madan.co.ir"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-[10px] border border-[#E3DAD0] text-white hover:bg-white/10 text-xs font-semibold"
                    >
                      ورود به سامانه زنده
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Consultation Card */}
              <div className="p-6 rounded-2xl bg-white/80 border border-[#E3DAD0] shadow-card">
                <h3 className="text-base font-bold text-navy-950 mb-3 font-vazir">
                  ارتباط مستقیم با کارشناسان متالورژی
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  برای بررسی چالش‌های متالورژیکی و داده‌های خط تولید کارخانه خود مستقیماً با مهندسین ما تماس حاصل فرمایید.
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:09999196630"
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-[10px] bg-[#C92127] text-white hover:bg-[#A8181D] font-bold text-xs transition-colors"
                  >
                    تماس تلفنی مستقیم: ۰۹۹۹ ۹۱۹ ۶۶۳۰
                  </a>
                  <Button to="/contact" variant="outline" size="sm" className="w-full border-[#0F1821] text-[#0F1821] hover:bg-[#0F1821]/5">
                    اطلاعات و راه‌های ارتباطی
                  </Button>
                </div>
              </div>

              {/* Other Industries Navigation */}
              <div className="p-6 rounded-2xl bg-white/80 border border-[#E3DAD0] shadow-card">
                <h3 className="text-sm font-bold text-navy-950 mb-4 font-vazir">
                  سایر صنایع تحت پوشش
                </h3>
                <ul className="space-y-3 text-xs">
                  {otherIndustries.map((oi) => (
                    <li key={oi.id} className="border-b border-[#E3DAD0]/70 pb-2 last:border-none last:pb-0">
                      <Link
                        to={`/industries/${oi.slug}`}
                        className="font-medium text-navy-950 hover:text-[#C92127] flex items-center justify-between group"
                      >
                        <span>{oi.title}</span>
                        <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C92127]" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <CTASection />
        </div>
      </section>
    </PageContainer>
  );
};
