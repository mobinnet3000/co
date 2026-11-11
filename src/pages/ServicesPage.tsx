import React from 'react';
import { Link } from 'react-router-dom';
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
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/common/CTASection';
import { servicesData } from '../data/services';
import { pagesSEO } from '../data/seo';

export const ServicesPage: React.FC = () => {
  const seo = pagesSEO.services;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Database':
        return <Database className="w-6 h-6 text-brand-blue" />;
      case 'Cpu':
        return <Cpu className="w-6 h-6 text-brand-cyan" />;
      case 'LineChart':
        return <LineChart className="w-6 h-6 text-brand-copper" />;
      case 'Gauge':
        return <Gauge className="w-6 h-6 text-emerald-600" />;
      case 'LayoutDashboard':
        return <LayoutDashboard className="w-6 h-6 text-indigo-600" />;
      case 'Code2':
        return <Code2 className="w-6 h-6 text-sky-600" />;
      default:
        return <Database className="w-6 h-6 text-brand-blue" />;
    }
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'خدمات و راهکارها' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              ENGINEERING SERVICES
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              راهکارهای تخصصی داده و نرم‌افزار صنعتی
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              مجموعه خدمات مهندسی داده برای سازماندهی، پالایش، موازنه و پایش رفتارهای متالورژیکی در کارخانجات فرآوری مواد معدنی.
            </p>
          </div>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 bg-brand-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white rounded-card p-8 border border-brand-border shadow-subtle hover:shadow-card hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 group-hover:bg-brand-blue/5 transition-colors">
                      {getIcon(service.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-600">
                      خدمت تخصصی 0{idx + 1}
                    </span>
                  </div>

                  <h2 className="text-xl font-bold text-navy-900 mb-3 font-vazir group-hover:text-brand-blue transition-colors leading-snug">
                    {service.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed font-light mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <span className="text-xs font-bold text-navy-900 block">برخی از ویژگی‌ها:</span>
                    {service.features.slice(0, 2).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-cyan flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-blue group-hover:text-navy-900 transition-colors"
                  >
                    <span>مشاهده صفحه کامل و مراحل اجرا</span>
                    <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <CTASection />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
