import React, { useState } from 'react';
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
  ShieldCheck,
  Server,
  Layers,
  Activity,
  SlidersHorizontal,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { servicesData } from '../data/services';
import { pagesSEO } from '../data/seo';

export const ServicesPage: React.FC = () => {
  const seo = pagesSEO.services;
  const [activeCategory, setActiveCategory] = useState<'all' | 'data' | 'analysis' | 'software'>('all');

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

  const filteredServices = servicesData.filter((service) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'data') return ['s1', 's2'].includes(service.id);
    if (activeCategory === 'analysis') return ['s3', 's4'].includes(service.id);
    if (activeCategory === 'software') return ['s5', 's6'].includes(service.id);
    return true;
  });

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Hero Header Section - MadanCo Industrial Luxury Style */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-brand-sand text-navy-950 border-b border-[#E3DAD0] overflow-hidden select-none">
        {/* Subtle Architectural Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute bottom-10 left-0 right-0 h-[1px] bg-[#E3DAD0]/50"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'خدمات و راهکارهای مهندسی' }]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end justify-between">
            {/* Title & Editorial Description (8 cols) */}
            <div className="lg:col-span-8 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white/70 border border-[#E3DAD0] mb-4">
                <span className="w-2 h-2 rounded-full bg-[#C92127] animate-pulse"></span>
                <span className="text-[11px] font-mono font-bold tracking-wider text-navy-950 uppercase">
                  SERVICES ARCHITECTURE // ۶ حوزه تخصصی داده‌محور
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir text-navy-950 tracking-tight leading-tight sm:leading-snug mb-5">
                راهکارهای مهندسی داده، پایش و ارزیابی خطوط فرآوری
              </h1>

              <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
                شرکت محاسبات عملیات داده ارزیابی نوین (معدنکو) بستری مهندسی برای یکپارچه‌سازی گزارش‌های عملیاتی، پالایش داده‌های فرآیندی، موازنه متالورژیکی و پیاده‌سازی سامانه‌های پایش اختصاصی کارخانجات کانی‌آرایی فراهم می‌آورد.
              </p>
            </div>

            {/* Quick Metrics & Standards Badge (4 cols) */}
            <div className="lg:col-span-4 flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 border-b border-[#E3DAD0]/70 pb-2">
                  <span>DEPLOYMENT MODEL</span>
                  <span className="font-bold text-navy-950">ON-PREMISES</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-950 font-medium">
                  <Server className="w-4 h-4 text-[#EFA73F] flex-shrink-0" />
                  <span>استقرار کاملاً ایزوله در شبکه محلی کارخانه (Air-Gapped)</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E3DAD0] shadow-subtle">
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mb-2 border-b border-[#E3DAD0]/70 pb-2">
                  <span>METHODOLOGY</span>
                  <span className="font-bold text-[#C92127]">MASS BALANCE</span>
                </div>
                <div className="flex items-center gap-2.5 text-xs text-navy-950 font-medium">
                  <ShieldCheck className="w-4 h-4 text-[#C92127] flex-shrink-0" />
                  <span>انطباق کامل با اصول علمی کانی‌آرایی و موازنه جرم</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Exploration Section with Category Tabs */}
      <section className="py-16 md:py-24 bg-brand-sand/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Category Tabs (MadanCo Style: Active 100% stroke / Inactive 8% bg) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12 pb-6 border-b border-[#E3DAD0]">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-navy-950" />
              <span className="text-xs font-bold text-navy-950 font-vazir">دسته‌بندی تخصصی راهکارها:</span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                type="button"
                onClick={() => setActiveCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-vazir transition-all duration-200 rounded-[10px] ${
                  activeCategory === 'all'
                    ? 'border border-[#0F1821] text-[#0F1821] font-bold bg-transparent'
                    : 'bg-[#0F1821]/[0.08] text-slate-700 hover:text-navy-950 border border-transparent'
                }`}
              >
                همه راهکارها (۶)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('data')}
                className={`px-3.5 py-1.5 text-xs font-vazir transition-all duration-200 rounded-[10px] ${
                  activeCategory === 'data'
                    ? 'border border-[#0F1821] text-[#0F1821] font-bold bg-transparent'
                    : 'bg-[#0F1821]/[0.08] text-slate-700 hover:text-navy-950 border border-transparent'
                }`}
              >
                مدیریت و پردازش داده (۲)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('analysis')}
                className={`px-3.5 py-1.5 text-xs font-vazir transition-all duration-200 rounded-[10px] ${
                  activeCategory === 'analysis'
                    ? 'border border-[#0F1821] text-[#0F1821] font-bold bg-transparent'
                    : 'bg-[#0F1821]/[0.08] text-slate-700 hover:text-navy-950 border border-transparent'
                }`}
              >
                تحلیل و ارزیابی فرآیند (۲)
              </button>

              <button
                type="button"
                onClick={() => setActiveCategory('software')}
                className={`px-3.5 py-1.5 text-xs font-vazir transition-all duration-200 rounded-[10px] ${
                  activeCategory === 'software'
                    ? 'border border-[#0F1821] text-[#0F1821] font-bold bg-transparent'
                    : 'bg-[#0F1821]/[0.08] text-slate-700 hover:text-navy-950 border border-transparent'
                }`}
              >
                داشبورد و نرم‌افزار صنعتی (۲)
              </button>
            </div>
          </div>

          {/* Service Cards Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredServices.map((service, idx) => (
              <div
                key={service.id}
                className="bg-white/90 backdrop-blur-md rounded-3xl p-7 sm:p-8 border border-[#E3DAD0] shadow-subtle hover:shadow-card hover:border-[#EFA73F] transition-all duration-300 flex flex-col justify-between h-full group relative overflow-hidden"
              >
                {/* Minimal Architectural Corner Mark */}
                <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none overflow-hidden">
                  <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-[#E3DAD0]/50 group-hover:border-[#EFA73F] transition-colors"></div>
                </div>

                <div>
                  {/* Top Registration Bar */}
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]/80">
                    <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#EFA73F]/15 group-hover:border-[#EFA73F]/40 transition-all">
                      {getIcon(service.iconName)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-[#0F1821]/5 text-navy-950 border border-[#E3DAD0]">
                        CORE 0{idx + 1}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-navy-950 mb-3 font-vazir group-hover:text-[#C92127] transition-colors leading-snug">
                    {service.title}
                  </h2>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                    {service.shortDescription}
                  </p>

                  {/* Core Technical Highlights */}
                  <div className="space-y-2.5 mb-6 pt-4 border-t border-[#E3DAD0]/60">
                    <span className="text-[11px] font-mono uppercase font-bold text-navy-950 block">
                      KEY DELIVERABLES:
                    </span>
                    {service.features.slice(0, 3).map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#EFA73F] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Target Circuits / Context */}
                  {service.relevantIndustries && service.relevantIndustries.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-1.5">
                      {service.relevantIndustries.slice(0, 2).map((ind, iIdx) => (
                        <span
                          key={iIdx}
                          className="text-[10px] font-vazir px-2 py-0.5 rounded-[6px] bg-brand-sand border border-[#E3DAD0] text-slate-600"
                        >
                          {ind}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Card Action Link */}
                <div className="pt-4 border-t border-[#E3DAD0]/80 flex items-center justify-between">
                  <Link
                    to={`/services/${service.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-navy-950 group-hover:text-[#C92127] transition-colors font-vazir"
                  >
                    <span>مشاهده شرح و مراحل اجرای خدمت</span>
                    <ArrowUpLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1 group-hover:-translate-y-0.5 text-[#C92127]" />
                  </Link>

                  <span className="font-mono text-[10px] text-slate-400">
                    MADAN // 0{idx + 1}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* End-to-End Operational Pipeline Architecture */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#E3DAD0]">
              <div>
                <span className="text-[11px] font-mono text-[#EFA73F] font-bold block mb-1">
                  INTEGRATED PROCESS ARCHITECTURE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 font-vazir">
                  چرخه یکپارچه خدمات: از داده‌های خام کارخانه تا بینش عملیاتی
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">STAGE 01 TO 04</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DAD0] relative">
                <span className="font-mono text-xs font-bold text-[#EFA73F] block mb-2">STEP 01</span>
                <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">دریافت و ثبت داده</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  تجمیع فرم‌های شیفت، لاگ‌های آزمایشگاه کانی‌آرایی و مقادیر توزین و کارکرد تجهیزات.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DAD0] relative">
                <span className="font-mono text-xs font-bold text-[#EFA73F] block mb-2">STEP 02</span>
                <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">پالایش و هموارسازی</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  فیلتر رکوردهای ناهنجار و زمان‌های توقف جهت اعتبارسنجی ارقام پیش از هرگونه محاسبه.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DAD0] relative">
                <span className="font-mono text-xs font-bold text-[#C92127] block mb-2">STEP 03</span>
                <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">موازنه و تحلیل متالورژی</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  محاسبه موازنه جرم، ارزیابی راندمان بازیابی فلز و تطبیق کارکرد با مبانی طراحی مدار.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-brand-sand border border-[#E3DAD0] relative">
                <span className="font-mono text-xs font-bold text-navy-950 block mb-2">STEP 04</span>
                <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">داشبورد و گزارش تصمیم</h4>
                <p className="text-xs text-slate-600 font-light leading-relaxed">
                  ارائه در قالب داشبوردهای تعاملی و کارنامه‌های مدون شیفت جهت تصمیم‌گیری آگاهانه.
                </p>
              </div>
            </div>
          </div>

          {/* Technical Governance & Confidentiality Assurance Box */}
          <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0F1821] text-white border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2 text-xs font-mono text-[#EFA73F]">
                <Activity className="w-4 h-4 text-[#EFA73F]" />
                <span>CONFIDENTIALITY & DATA SECURITY</span>
              </div>
              <h4 className="text-lg font-bold font-vazir">
                حفظ محرمانگی کامل اطلاعات و استقلال زیرساخت
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                تمام راهکارهای نرم‌افزاری و مخازن داده‌ای بر اساس استقرار کاملاً محلی (On-Premises / Offline) درون شبکه اختصاصی کارفرما پیاده‌سازی می‌شوند و هیچ داده‌ای به خارج از سازمان منتقل نمی‌گردد.
              </p>
            </div>

            <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto">
              <Link
                to="/platform"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-[10px] bg-[#EFA73F] text-[#0F1821] font-bold text-xs hover:bg-[#D48E28] transition-colors font-vazir"
              >
                آشنایی با سامانه پایش
              </Link>
              <Link
                to="/contact"
                className="w-full sm:w-auto text-center px-4 py-2.5 rounded-[10px] border border-[#C92127] text-[#C92127] font-bold text-xs hover:bg-[#C92127]/10 transition-colors font-vazir"
              >
                درخواست مشاوره تخصصی
              </Link>
            </div>
          </div>

        </div>
      </section>
    </PageContainer>
  );
};
