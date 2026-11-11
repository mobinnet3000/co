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
        return <Database className="w-8 h-8 text-brand-blue" />;
      case 'Cpu':
        return <Cpu className="w-8 h-8 text-brand-cyan" />;
      case 'LineChart':
        return <LineChart className="w-8 h-8 text-brand-copper" />;
      case 'Gauge':
        return <Gauge className="w-8 h-8 text-emerald-600" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-8 h-8 text-indigo-600" />;
      case 'Code2':
        return <Code2 className="w-8 h-8 text-sky-600" />;
      default:
        return <Database className="w-8 h-8 text-brand-blue" />;
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
      url: 'https://novin-amaliat.ir',
    },
    serviceType: 'Industrial Data Analytics and Mineral Processing Software',
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={`${service.title} | خدمات تخصصی`}
        description={service.shortDescription}
        canonical={`https://novin-amaliat.ir/services/${service.slug}`}
        jsonLd={jsonLd}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb
            items={[
              { label: 'خدمات و راهکارها', path: '/services' },
              { label: service.title },
            ]}
          />
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-3 p-3 bg-navy-800/90 rounded-2xl border border-slate-700 mb-6">
              {getIcon(service.iconName)}
              <span className="text-xs font-mono text-brand-cyan uppercase tracking-wider font-semibold">
                SERVICE SPECIFICATION
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-5xl font-black font-vazir leading-tight mb-6">
              {service.title}
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed max-w-3xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {/* Introduction & Explanation */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-4 font-vazir">
                  شرح و اهمیت مهندسی خدمت
                </h2>
                <div className="text-slate-600 text-base md:text-lg leading-relaxed font-light space-y-4 text-justify">
                  <p>{service.fullDescription}</p>
                </div>
              </div>

              {/* Problem Statement: Challenges */}
              <div className="p-8 rounded-3xl bg-amber-500/5 border border-amber-500/20">
                <div className="flex items-center gap-2 mb-4 text-amber-700">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0" />
                  <h3 className="text-lg font-bold font-vazir">چالش‌های صنعتی مرتبط که این خدمت حل می‌کند:</h3>
                </div>
                <ul className="space-y-3">
                  {service.challenges.map((ch, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0"></span>
                      <span>{ch}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process: 4 Steps */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6 font-vazir">
                  مراحل اجرایی پیاده‌سازی خدمت
                </h2>
                <div className="space-y-4">
                  {service.process.map((step, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4"
                    >
                      <span className="font-mono text-lg font-black text-brand-blue bg-white w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm border border-slate-200">
                        {step.step}
                      </span>
                      <div>
                        <h4 className="text-base font-bold text-navy-900 mb-1 font-vazir">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6 font-vazir">
                  مزایای عملیاتی حاصل از استقرار
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((b, i) => (
                    <div key={i} className="p-4 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-brand-success flex-shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm text-slate-700 font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ */}
              {service.faq && service.faq.length > 0 && (
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-6 font-vazir">
                    پرسش‌های متداول این حوزه
                  </h2>
                  <div className="space-y-3">
                    {service.faq.map((f, i) => (
                      <div key={i} className="p-5 rounded-xl border border-slate-200 bg-white">
                        <div className="font-bold text-sm text-navy-900 mb-2 font-vazir">{f.question}</div>
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
            <div className="lg:col-span-4 space-y-8">
              {/* Target Industries Box */}
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200">
                <h3 className="text-sm font-bold text-navy-900 mb-4 font-vazir flex items-center gap-2">
                  <Layers className="w-4 h-4 text-brand-copper" />
                  <span>صنایع هدف مرتبط</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-600">
                  {service.relevantIndustries.map((ind, i) => (
                    <li key={i} className="p-2.5 rounded-lg bg-white border border-slate-100 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></span>
                      <span>{ind}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Consultation CTA Card */}
              <div className="p-6 rounded-2xl bg-navy-900 text-white border border-slate-700 shadow-card">
                <span className="text-xs font-mono text-brand-cyan block mb-2">TECHNICAL INQUIRY</span>
                <h3 className="text-base font-bold font-vazir mb-3">
                  بررسی امکان‌سنجی این خدمت در خط شما
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-light mb-6">
                  برای ارزیابی سازگاری داده‌های کارخانه خود با این راهکار، با کارشناسان مهندسی داده ما تماس حاصل فرمایید.
                </p>
                <Button to="/contact" variant="copper" size="sm" className="w-full">
                  درخواست بررسی و مشاوره
                </Button>
              </div>

              {/* Related Services */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200">
                <h3 className="text-sm font-bold text-navy-900 mb-4 font-vazir">
                  سایر خدمات تخصصی
                </h3>
                <ul className="space-y-3 text-xs">
                  {relatedServices.map((rs) => (
                    <li key={rs.id} className="border-b border-slate-100 pb-2 last:border-none last:pb-0">
                      <Link
                        to={`/services/${rs.slug}`}
                        className="font-medium text-navy-900 hover:text-brand-blue flex items-center justify-between group"
                      >
                        <span>{rs.title}</span>
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
