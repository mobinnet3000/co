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
        canonical={`https://novin-amaliat.ir/industries/${industry.slug}`}
      />

      {/* Hero Banner with Industrial Backdrop */}
      <section className="relative pt-32 pb-20 bg-navy-900 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={industry.image}
            alt={industry.title}
            className="w-full h-full object-cover opacity-20 filter brightness-75 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-navy-900/80 to-navy-900/90"></div>
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'صنایع هدف', path: '/industries' },
              { label: industry.title },
            ]}
          />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              MINERAL PROCESSING DOMAIN
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              {industry.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              {industry.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Body */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Overview */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4 font-vazir">
                  نگاه کلی به متالورژی و عملیات خط فرآوری
                </h2>
                <p className="text-slate-600 text-base md:text-lg leading-relaxed font-light text-justify">
                  {industry.fullDescription}
                </p>
              </div>

              {/* Operations & Circuits */}
              <div className="p-7 rounded-2xl bg-slate-50 border border-slate-200">
                <div className="flex items-center gap-2 mb-4 text-navy-900">
                  <Layers className="w-5 h-5 text-brand-blue" />
                  <h3 className="text-lg font-bold font-vazir">مدارها و عملیات فرآوری متداول</h3>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-700">
                  {industry.typicalOperations.map((op, i) => (
                    <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-white border border-slate-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan mt-2 flex-shrink-0"></span>
                      <span>{op}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Data Types */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-navy-900">
                  <Database className="w-5 h-5 text-brand-copper" />
                  <h3 className="text-xl font-bold font-vazir">انواع داده‌های عملیاتی در این صنعت</h3>
                </div>
                <div className="space-y-3">
                  {industry.dataTypes.map((dt, i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-200 flex items-center justify-between text-xs sm:text-sm">
                      <span className="text-navy-900 font-medium">{dt}</span>
                      <span className="text-[11px] font-mono text-slate-400">DATA STREAM 0{i + 1}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Analytics Opportunities */}
              <div>
                <div className="flex items-center gap-2 mb-4 text-navy-900">
                  <LineChart className="w-5 h-5 text-brand-cyan" />
                  <h3 className="text-xl font-bold font-vazir">فرصت‌های تحلیل داده و بهینه‌سازی</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {industry.analyticsOpportunities.map((opp, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{opp}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Applications */}
              <div className="p-8 rounded-3xl bg-navy-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-4 text-brand-cyan">
                    <Cpu className="w-5 h-5" />
                    <h3 className="text-lg font-bold font-vazir">کاربردهای سامانه در این صنعت</h3>
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                    {industry.platformApplications.map((app, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-4 border-t border-slate-700">
                    <Button to="/platform" variant="copper" size="sm">
                      آشنایی کامل با ماژول‌های سامانه
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Consultation Card */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-base font-bold text-navy-900 mb-3 font-vazir">
                  مشاوره تخصصی این حوزه
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed font-light mb-6">
                  برای بررسی چالش‌های متالورژیکی و داده‌های خط تولید کارخانه خود با مهندسین ما در ارتباط باشید.
                </p>
                <Button to="/contact" variant="primary" size="sm" className="w-full">
                  درخواست بررسی داده‌های خط
                </Button>
              </div>

              {/* Other Industries Navigation */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-sm font-bold text-navy-900 mb-4 font-vazir">
                  سایر صنایع تحت پوشش
                </h3>
                <ul className="space-y-3 text-xs">
                  {otherIndustries.map((oi) => (
                    <li key={oi.id} className="border-b border-slate-100 pb-2 last:border-none last:pb-0">
                      <Link
                        to={`/industries/${oi.slug}`}
                        className="font-medium text-navy-900 hover:text-brand-blue flex items-center justify-between group"
                      >
                        <span>{oi.title}</span>
                        <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-blue" />
                      </Link>
                    </li>
                  ))}
                </ul>
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
