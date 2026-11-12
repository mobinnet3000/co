import React from 'react';
import { Printer, Download, Building, ShieldCheck, Mail, MapPin, Clock, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { companyData } from '../data/company';
import { servicesData } from '../data/services';
import { industriesData } from '../data/industries';
import { pagesSEO } from '../data/seo';

export const CompanyPage: React.FC = () => {
  const seo = pagesSEO.company;

  const handlePrint = () => {
    window.print();
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner - hidden on print */}
      <section className="pt-32 pb-12 bg-navy-950 text-white relative no-print border-b border-[#E3DAD0]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb items={[{ label: 'درباره شرکت', path: '/about' }, { label: 'شناسنامه رسمی شرکت' }]} />
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-2">
                OFFICIAL COMPANY PROFILE
              </span>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-white">
                شناسنامه رسمی و پروفایل شرکتی
              </h1>
              <p className="text-slate-300 text-xs sm:text-sm mt-2 max-w-xl font-light">
                سند معرفی رسمی شرکت محاسبات عملیات داده ارزیابی نوین جهت ارائه به کارفرمایان، دستگاه‌های نظارتی و کمیسیون‌های معاملات.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={handlePrint}
                variant="primary"
                size="md"
                icon={<Printer className="w-4 h-4" />}
                className="shadow-sm bg-[#EFA73F] hover:bg-[#D48E28] text-navy-950 font-bold border-none"
              >
                چاپ معرفی شرکت
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Formal Document Layout - Suitable for Print & Web */}
      <section className="py-12 bg-brand-sand">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-card border border-[#E3DAD0] p-8 sm:p-14 print:p-0 print:border-none print:shadow-none print:rounded-none">
            {/* Document Header */}
            <div className="border-b-2 border-navy-900 pb-8 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-navy-900 font-vazir leading-tight">
                  {companyData.officialNameFa}
                </h2>
                <div className="text-xs font-inter text-slate-500 tracking-wider mt-1 font-medium">
                  {companyData.officialNameEn}
                </div>
                <div className="text-xs text-brand-blue font-semibold mt-2">
                  شناسنامه جامع معرفی سازمانی و حوزه‌های فناوری
                </div>
              </div>

              <div className="text-left font-mono text-xs text-slate-500 space-y-1">
                <div>تاریخ سند: ۱۴۰۳/۰۸</div>
                <div>نسخه سند: ۱.۰ (رسمی)</div>
                <div className="text-brand-copper font-semibold">وضعیت: معتبر و قابل استناد</div>
              </div>
            </div>

            {/* Section 1: Legal Identity & Registration */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۱. مشخصات هویتی و ثبتی شرکت
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">نام کامل ثبتی:</span>
                  <span className="font-bold text-navy-900">{companyData.officialNameFa}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">نوع شخصیت حقوقی:</span>
                  <span className="font-medium text-navy-900">شرکت با مسئولیت محدود</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">شماره ثبت:</span>
                  <span className="font-mono text-slate-600">
                    {companyData.details.registrationNumber || '[در انتظار درج شماره ثبت رسمی]'}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">شناسه ملی:</span>
                  <span className="font-mono text-slate-600">
                    {companyData.details.nationalId || '[در انتظار درج شناسه ملی]'}
                  </span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">پست الکترونیکی رسمی:</span>
                  <span className="font-mono text-brand-blue font-semibold">{companyData.details.email}</span>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
                  <span className="text-slate-500">موقعیت دفتر مرکزی:</span>
                  <span className="text-navy-900">{companyData.details.address}</span>
                </div>
              </div>
            </div>

            {/* Section 2: Corporate Background & Mission */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۲. معرفی و اهداف کلان
              </h3>
              <div className="text-xs sm:text-sm text-slate-700 leading-relaxed space-y-3 font-light text-justify">
                <p>{companyData.descriptionFa}</p>
                <p>
                  <strong>ماموریت رسمی: </strong>
                  {companyData.mission}
                </p>
                <p>
                  <strong>چشم‌انداز راهبردی: </strong>
                  {companyData.vision}
                </p>
              </div>
            </div>

            {/* Section 3: Core Technology & Product Overview */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۳. محصول محوری: سامانه تحلیل داده‌های خطوط فرآوری
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
                محصول مرکزی شرکت یک پلتفرم نرم‌افزاری اختصاصی است که داده‌های عملیاتی حاصل از جریان‌های کانی‌آرایی را دریافت نموده و با اعتبارسنجی و موازنه متالورژیکی، شاخص‌های بازیابی، بهره‌وری و توزیع دانه‌بندی را به صورت داشبوردهای کاربردی در اختیار مدیریت قرار می‌دهد.
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 border border-slate-200 rounded-lg">
                  <strong className="block text-navy-900 mb-1">سازگاری با شبکه محلی</strong>
                  <span className="text-slate-500">قابلیت نصب ایزوله بدون اینترنت در کارخانه</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg">
                  <strong className="block text-navy-900 mb-1">محاسبه موازنه جرم</strong>
                  <span className="text-slate-500">پایش راندمان متالورژیکی و کاهش باطله</span>
                </div>
                <div className="p-3 border border-slate-200 rounded-lg">
                  <strong className="block text-navy-900 mb-1">گزارش‌گیری مدون</strong>
                  <span className="text-slate-500">خروجی‌های استاندارد اداری و شیفت‌محور</span>
                </div>
              </div>
            </div>

            {/* Section 4: Services Portfolio */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۴. سبد خدمات مهندسی و تخصصی
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {servicesData.map((s, idx) => (
                  <div key={s.id} className="p-3 rounded-lg border border-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-navy-900 block font-vazir">{s.title}</strong>
                      <span className="text-slate-500 text-[11px] leading-tight block mt-0.5">
                        {s.shortDescription}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Section 5: Target Industries */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۵. حوزه‌های صنعتی هدف
              </h3>
              <div className="flex flex-wrap gap-2 text-xs">
                {industriesData.map((ind) => (
                  <span
                    key={ind.id}
                    className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium"
                  >
                    {ind.title}
                  </span>
                ))}
                <span className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  سایر کارخانجات کانی‌آرایی و متالورژی
                </span>
              </div>
            </div>

            {/* Section 6: Verified Projects and Quality Commitments */}
            <div className="mb-10">
              <h3 className="text-base font-bold text-navy-900 font-vazir border-r-4 border-brand-blue pr-3 mb-4">
                ۶. پروژه‌ها، گواهینامه‌ها و سوابق اجرایی
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-300 text-xs text-slate-600 leading-relaxed flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-brand-copper flex-shrink-0 mt-0.5" />
                <div>
                  <strong>سیاست شفافیت مدارک: </strong>
                  نمونه پروژه‌های اجرایی شرکت، مدارک ثبتی نهایی و گواهینامه‌های کیفی پس از تکمیل فرآیندهای راستی‌آزمایی و اخذ تاییدیه محرمانگی کارفرمایان در ضمایم این سند درج خواهد شد. از ارائه ادعاهای بدون مستند قطعی خودداری می‌گردد.
                </div>
              </div>
            </div>

            {/* Section 7: Official Contact and Sign-off */}
            <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between text-xs text-slate-600 gap-4">
              <div>
                <div><strong>واحد امور متقاضیان و کارفرمایان:</strong> {companyData.details.email}</div>
                <div><strong>تلفن مستقیم:</strong> <span dir="ltr" className="font-mono font-bold text-navy-950">09999196630</span></div>
                <div><strong>نشانی:</strong> {companyData.details.address}</div>
              </div>
              <div className="text-left font-mono text-[11px] text-slate-400">
                MOHASEBAT AMALIAT DADEH ARZYABI NOVIN LLC
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
