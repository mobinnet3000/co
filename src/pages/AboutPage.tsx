import React from 'react';
import { Link } from 'react-router-dom';
import {
  Target,
  Compass,
  ShieldCheck,
  Eye,
  Cpu,
  Handshake,
  CheckCircle2,
  Server,
  Layers,
  ArrowUpLeft,
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Activity,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { companyData } from '../data/company';
import { pagesSEO } from '../data/seo';

export const AboutPage: React.FC = () => {
  const seo = pagesSEO.about;

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner - MadanCo Style */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-brand-sand text-navy-950 border-b border-[#E3DAD0] overflow-hidden select-none">
        {/* Subtle Architectural Grid Guidelines */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-[#E3DAD0]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'درباره شرکت و هویت سازمانی' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white/70 border border-[#E3DAD0] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#EFA73F]"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-navy-950 uppercase">
                ENTERPRISE IDENTITY // هویت مهندسی معدنکو
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir text-navy-950 tracking-tight leading-tight sm:leading-snug mb-5">
              درباره شرکت محاسبات عملیات داده ارزیابی نوین
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              رویکرد ما پیوند دادن تجارب میدانی فرآوری مواد معدنی با انضباط ریاضی مهندسی داده است؛ بستری برای گذار صنایع معدنی به سوی مدیریت شفاف و مبتنی بر شواهد عینی.
            </p>
          </div>
        </div>
      </section>

      {/* Corporate Overview & Official Identity Card */}
      <section className="py-16 md:py-24 bg-brand-sand/60 border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Editorial Story Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-slate-700 text-base leading-relaxed font-light">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[8px] bg-white/60 border border-[#E3DAD0] text-xs font-mono text-slate-500">
                <span className="w-1.5 h-1.5 rounded-full bg-[#C92127]"></span>
                <span>ORIGIN & PHILOSOPHY // انگیزه شکل‌گیری</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-navy-950 font-vazir leading-snug">
                پاسخ به یک نیاز واقعی در خطوط فرآوری مواد معدنی
              </h2>

              <p className="text-justify">
                در سالیان گذشته، پیشرفت تجهیزات کارخانجات فرآوری مواد معدنی در کشور همواره با چالش پراکندگی داده‌ها و دشواری تجمیع اطلاعات روزمره همراه بوده است. بسیاری از کارخانجات بزرگ کانی‌آرایی علیرغم سرمایه‌گذاری بر روی خطوط سنگ‌شکنی، آسیاکنی و فلوتاسیون، برای ثبت پارامترها و ارزیابی موازنه خط همچنان از شیت‌های سنتی، اکسل‌های شخصی و لاگ‌های کاغذی بهره می‌برند.
              </p>

              <p className="text-justify">
                <strong>شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (با نام تجاری معدنکو)</strong> با درک این شکاف فنی، تمرکز خود را بر توسعه تخصصی سامانه‌های داده و راهکارهای تحلیلی برای خطوط فرآوری مواد معدنی قرار داده است. باور بنیادین ما این است که:
              </p>

              {/* Central Quote Callout */}
              <div className="p-6 rounded-2xl bg-white/80 backdrop-blur-md border border-[#E3DAD0] shadow-subtle border-r-4 border-r-[#C92127]">
                <p className="text-base sm:text-lg font-bold font-vazir text-navy-950 leading-relaxed">
                  «صنعت معدن، فقط مجموعه‌ای از تجهیزات و فرآیندها نیست؛ مجموعه‌ای از داده‌هاست که با شناخت و تحلیل درست، می‌توان از آن‌ها اطلاعات ارزشمند عملیاتی استخراج کرد.»
                </p>
                <span className="block mt-2 text-xs font-mono text-[#EFA73F] font-semibold">
                  Madan Co. Core Strategic Principle
                </span>
              </div>

              <p className="text-justify">
                سامانه طراحی‌شده توسط این شرکت، داده‌ها و اطلاعات عملیاتی مرتبط با خطوط کارخانه‌های فرآوری مواد معدنی را دریافت نموده و عملیات داده‌محور، هموارسازی، موازنه متالورژیکی و ارزیابی عملکرد را در یک بستر مستقل محلی (On-Premises) به انجام می‌رساند.
              </p>
            </div>

            {/* Official Identity & Summary Specification Card (5 cols) */}
            <div className="lg:col-span-5 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#E3DAD0] shadow-card">
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <Building2 className="w-4 h-4 text-navy-950" />
                  <span>OFFICIAL SPECIFICATION</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-[#0F1821] text-white">
                  VERIFIED
                </span>
              </div>

              <h3 className="text-xl font-black text-navy-950 mb-6 font-vazir">
                شناسنامه و مشخصات شرکت
              </h3>

              <dl className="space-y-4 text-xs sm:text-sm">
                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">نام تجاری:</dt>
                  <dd className="font-bold text-[#EFA73F] font-vazir">معدنکو (MADAN CO)</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">نام ثبتی شرکت:</dt>
                  <dd className="font-bold text-navy-950 font-vazir text-left max-w-[210px] leading-snug">
                    {companyData.officialNameFa}
                  </dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">نوع شخصیت حقوقی:</dt>
                  <dd className="font-medium text-navy-950 font-vazir">با مسئولیت محدود</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">حوزه فعالیت:</dt>
                  <dd className="font-medium text-navy-950 font-vazir text-left">
                    فناوری داده و نرم‌افزار فرآوری معدنی
                  </dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">شعار سازمانی:</dt>
                  <dd className="font-bold text-[#C92127] font-vazir">«{companyData.taglineFa}»</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">وب‌سایت رسمی:</dt>
                  <dd className="font-mono text-navy-950 font-bold">madan.co.ir</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">پست الکترونیکی:</dt>
                  <dd className="font-mono text-navy-950 font-medium">info@madan.co.ir</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">تلفن تماس مستقیم:</dt>
                  <dd className="font-mono text-[#0F1821] font-bold">09999196630</dd>
                </div>

                <div className="flex justify-between py-2 border-b border-[#E3DAD0]/70">
                  <dt className="text-slate-500">نشانی اداری:</dt>
                  <dd className="font-medium text-navy-950 font-vazir">{companyData.details.address}</dd>
                </div>
              </dl>

              <div className="mt-8 pt-6 border-t border-[#E3DAD0]">
                <Link
                  to="/company"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] border border-[#0F1821] text-navy-950 hover:bg-[#0F1821] hover:text-white font-bold text-xs transition-colors font-vazir"
                >
                  <span>مشاهده شناسنامه رسمی و نسخه چاپی</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision (Dual Cards with MadanCo Tokens) */}
      <section className="py-16 md:py-24 bg-brand-sand border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Mission Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#E3DAD0] shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] text-[#0F1821] flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#EFA73F] block mb-2 font-bold uppercase">
                  MISSION // ماموریت سازمانی
                </span>
                <h3 className="text-2xl font-bold text-navy-950 mb-4 font-vazir">
                  ماموریت ما
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  {companyData.mission}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E3DAD0]/70 text-xs text-slate-400 font-mono">
                OPERATIONAL DATA &bull; METALLURGICAL INSIGHT
              </div>
            </div>

            {/* Vision Card */}
            <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-[#E3DAD0] shadow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] text-[#C92127] flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-[#C92127] block mb-2 font-bold uppercase">
                  VISION // چشم‌انداز آینده
                </span>
                <h3 className="text-2xl font-bold text-navy-950 mb-4 font-vazir">
                  چشم‌انداز ما
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  {companyData.vision}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-[#E3DAD0]/70 text-xs text-slate-400 font-mono">
                LONG-TERM INDUSTRIAL INTELLIGENCE HORIZON
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-brand-sand/60 border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white/70 border border-[#E3DAD0] mb-3">
              <span className="w-2 h-2 rounded-full bg-[#EFA73F]"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-navy-950 uppercase">
                CORE PRINCIPLES // ارزش‌های مهندسی
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-navy-950 font-vazir">
              اصول راهنمای مهندسی در شرکت ما
            </h2>
            <p className="mt-3 text-sm text-slate-600 font-light leading-relaxed">
              اصولی که در تمام مراحل طراحی نرم‌افزار، پالایش داده‌ها و تعامل با مدیران کارخانجات به آن پایبندیم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.values.map((val, idx) => (
              <div
                key={idx}
                className="p-7 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E3DAD0] shadow-subtle hover:shadow-card hover:border-[#EFA73F] transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center mb-5 text-navy-950 group-hover:scale-105 transition-all">
                    {idx === 0 && <ShieldCheck className="w-6 h-6 text-[#0F1821]" />}
                    {idx === 1 && <Eye className="w-6 h-6 text-[#EFA73F]" />}
                    {idx === 2 && <Cpu className="w-6 h-6 text-[#C92127]" />}
                    {idx === 3 && <Handshake className="w-6 h-6 text-[#0F1821]" />}
                  </div>
                  <h4 className="text-base font-bold text-navy-950 mb-2.5 font-vazir group-hover:text-[#C92127] transition-colors">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#E3DAD0]/60 text-[10px] font-mono text-slate-400">
                  PRINCIPLE 0{idx + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Structure & Technical Integrity */}
      <section className="py-16 md:py-24 bg-brand-sand">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 sm:p-12 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E3DAD0] shadow-card">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-6 border-b border-[#E3DAD0] gap-4">
              <div>
                <span className="text-[11px] font-mono text-[#EFA73F] font-bold block mb-1">
                  TECHNICAL DISCIPLINE & COMPLIANCE
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-navy-950 font-vazir">
                  تعهد به انضباط مهندسی و راستی‌آزمایی داده‌ها
                </h3>
              </div>
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-[8px] bg-brand-sand border border-[#E3DAD0] text-navy-950">
                ON-PREMISES READY
              </span>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed font-light text-justify">
              <p>
                شرکت محاسبات عملیات داده ارزیابی نوین از بدو تاسیس، سیاست شفافیت اطلاعاتی و دوری از ادعاهای مبالغه‌آمیز بازاریابی را سرلوحه اقدامات خود قرار داده است. راهکارهای ما مبتنی بر اصول شناخته‌شده متالورژی کانی‌آرایی و ریاضیات مهندسی داده بوده و بدون اعمال فرضیات تاییدنشده پیاده‌سازی می‌شوند.
              </p>
              <p>
                تمامی سامانه‌های نرم‌افزاری بر اساس معماری استقرار محلی (Air-Gapped / On-Premises) پیاده‌سازی می‌گردند تا مالکیت و محرمانگی داده‌های تولید کارخانه کاملاً محفوظ بماند.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3DAD0] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-navy-950 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>پایبندی به استانداردهای موازنه جرم، هموارسازی داده و امنیت صنعتی</span>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  to="/contact"
                  className="px-4 py-2.5 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/5 font-bold text-xs transition-colors font-vazir"
                >
                  ارتباط مستقیم با شرکت
                </Link>
                <Link
                  to="/platform"
                  className="px-4 py-2.5 rounded-[10px] bg-[#0F1821] text-white hover:bg-[#1D2D3D] font-bold text-xs transition-colors font-vazir"
                >
                  آشنایی با سامانه
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

    </PageContainer>
  );
};
