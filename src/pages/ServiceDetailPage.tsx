import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import {
  Database,
  Cpu,
  LineChart,
  Gauge,
  LayoutDashboard,
  Code2,
  ArrowLeft,
  ArrowUpLeft,
  CheckCircle2,
  AlertTriangle,
  ChevronDown,
  Layers,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/common/CTASection';
import { servicesData } from '../data/services';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  const relatedServices = servicesData.filter((s) => s.slug !== slug).slice(0, 3);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-6 h-6 text-[#0F1821]" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-[#EFA73F]" />;
      case 'LineChart':
        return <LineChart className="w-6 h-6 text-[#C92127]" />;
      case 'Gauge':
        return <Gauge className="w-6 h-6 text-[#0F1821]" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-6 h-6 text-[#EFA73F]" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-[#C92127]" />;
      default:
        return <Database className="w-6 h-6 text-[#0F1821]" />;
    }
  };

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.shortDescription,
    provider: {
      '@type': 'Organization',
      name: 'شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود',
      url: 'https://madan.co.ir',
    },
    serviceType: 'Industrial Data Analytics and Mineral Processing Software',
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={`${service.title} | خدمات تخصصی معدنکو`}
        description={service.shortDescription}
        canonical={`https://madan.co.ir/services/${service.slug}`}
        jsonLd={jsonLd}
      />

      {/* Header Banner - MadanCo Style */}
      <section className="relative pt-32 pb-16 bg-brand-sand text-navy-950 border-b border-[#E3DAD0] overflow-hidden select-none">
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-[35%] left-0 right-0 h-[1px] bg-[#E3DAD0]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'خدمات و راهکارها', path: '/services' },
                { label: service.title },
              ]}
            />
          </div>

          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 p-2.5 px-3.5 bg-white/70 rounded-[10px] border border-[#E3DAD0] mb-5">
              {getIcon(service.iconName)}
              <span className="text-[11px] font-mono text-navy-950 uppercase tracking-wider font-bold">
                ENGINEERING SPECIFICATION // {service.slug.toUpperCase()}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-vazir leading-tight mb-5 text-navy-950">
              {service.title}
            </h1>
            <p className="text-slate-600 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 md:py-24 bg-brand-sand/40 border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction & Explanation */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E3DAD0]/70 text-xs font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F]"></span>
                  <span>TECHNICAL OVERVIEW & SCOPE</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-4 font-vazir">
                  شرح و اهمیت مهندسی خدمت
                </h2>
                <div className="text-slate-600 text-base leading-relaxed font-light space-y-4 text-justify">
                  <p>{service.fullDescription}</p>
                </div>
              </div>

              {/* Problem Statement: Challenges */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E3DAD0]/70 text-xs font-mono text-[#C92127]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C92127]"></span>
                  <span>IDENTIFIED OPERATIONAL CHALLENGES</span>
                </div>
                <h3 className="text-lg font-bold font-vazir text-navy-950 mb-4">
                  چالش‌های متداول صنعتی که با این خدمت برطرف می‌گردند:
                </h3>
                <ul className="space-y-3">
                  {service.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C92127] mt-2 flex-shrink-0"></span>
                      <span className="leading-relaxed">{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process: 4 Steps */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E3DAD0]/70 text-xs font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F]"></span>
                  <span>IMPLEMENTATION WORKFLOW</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-6 font-vazir">
                  مراحل اجرایی پیاده‌سازی خدمت
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-brand-sand border border-[#E3DAD0] flex flex-col justify-between"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-mono text-xs font-bold text-[#EFA73F] bg-white px-2 py-0.5 rounded-[6px] border border-[#E3DAD0]">
                          STEP {step.step}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400">STAGE 0{idx + 1}</span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">{step.title}</h4>
                        <p className="text-xs text-slate-600 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#E3DAD0]/70 text-xs font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                  <span>OPERATIONAL GAINS</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-6 font-vazir">
                  مزایای عملیاتی حاصل از استقرار
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="p-4 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-start gap-3">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-navy-950 font-medium leading-relaxed">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {service.faq && service.faq.length > 0 && (
                <div className="p-8 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                  <h2 className="text-xl sm:text-2xl font-bold text-navy-950 mb-6 font-vazir">
                    پرسش‌های متداول این حوزه
                  </h2>
                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <div key={i} className="p-5 rounded-2xl border border-[#E3DAD0] bg-brand-sand">
                        <div className="font-bold text-sm text-navy-950 mb-2 font-vazir">{f.question}</div>
                        <div className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {f.answer}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar (4 cols) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Target Industries Box */}
              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <h3 className="text-sm font-bold text-navy-950 mb-4 font-vazir flex items-center gap-2 pb-3 border-b border-[#E3DAD0]">
                  <Layers className="w-4 h-4 text-[#C92127]" />
                  <span>خطوط و صنایع هدف مرتبط</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {service.relevantIndustries.map((ind, i) => (
                    <li key={i} className="p-2.5 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F]"></span>
                      <span className="text-navy-950 font-medium">{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation CTA Card - MadanCo Slate Style */}
              <div className="p-6 rounded-3xl bg-[#0F1821] text-white border border-slate-800 shadow-card">
                <span className="text-[10px] font-mono text-[#EFA73F] font-bold block mb-2">
                  TECHNICAL INQUIRY // استعلام فنی
                </span>
                <h3 className="text-base font-bold font-vazir mb-2 text-white">
                  بررسی امکان‌سنجی این خدمت در خط شما
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-5">
                  برای ارزیابی سازگاری داده‌های کارخانه خود با این راهکار و استقرار نمونه آزمایشی، با کارشناسان مهندسی داده ما تماس حاصل فرمایید.
                </p>
                <Link
                  to="/contact"
                  className="block text-center w-full py-2.5 px-4 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/10 font-bold text-xs transition-colors font-vazir"
                >
                  درخواست بررسی و مشاوره
                </Link>
              </div>

              {/* Related Services */}
              <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <h3 className="text-sm font-bold text-navy-950 mb-4 font-vazir pb-3 border-b border-[#E3DAD0]">
                  سایر راهکارهای تخصصی
                </h3>
                <ul className="space-y-3 text-xs">
                  {relatedServices.map((rs) => (
                    <li key={rs.id} className="border-b border-[#E3DAD0]/60 pb-2.5 last:border-none last:pb-0">
                      <Link
                        to={`/services/${rs.slug}`}
                        className="font-medium text-navy-950 hover:text-[#C92127] flex items-center justify-between group transition-colors"
                      >
                        <span className="font-vazir">{rs.title}</span>
                        <ArrowUpLeft className="w-3.5 h-3.5 text-slate-400 group-hover:text-[#C92127] transition-colors" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
