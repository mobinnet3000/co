import React from 'react';
import { Link } from 'react-router-dom';
import { Target, Compass, Award, ShieldCheck, Eye, Cpu, Handshake, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/common/CTASection';
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

      {/* Hero Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'درباره شرکت' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              ABOUT THE ENTERPRISE
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              درباره شرکت محاسبات عملیات داده ارزیابی نوین
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              رویکرد ما پیوند دادن تجارب میدانی فرآوری مواد معدنی با انضباط ریاضی مهندسی داده است؛ بستری برای گذار صنایع معدنی به سوی مدیریت شفاف و مبتنی بر شواهد عینی.
            </p>
          </div>
        </div>
      </section>

      {/* Main Corporate Overview */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5 text-slate-600 text-base md:text-lg leading-relaxed">
              <SectionHeading
                eyebrow="پیشینه و انگیزه شکل‌گیری"
                title="پاسخ به یک نیاز واقعی در محیط‌های صنعتی"
                className="mb-6"
              />
              <p>
                در سالیان گذشته، پیشرفت تجهیزات کارخانجات فرآوری مواد معدنی در کشور با رشد ابزارهای مدیریت داده همگام نبوده است. بسیاری از کارخانجات بزرگ کانی‌آرایی علیرغم سرمایه‌گذاری سنگین بر روی خطوط سنگ‌شکنی، آسیاکنی و فلوتاسیون، همچنان برای ثبت پارامترها و ارزیابی موازنه خط از سیستم‌های سنتی، اکسل‌های شخصی و لاگ‌های کاغذی استفاده می‌کنند.
              </p>
              <p>
                <strong>شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود</strong> با درک این شکاف فنی، تمرکز خود را بر توسعه تخصصی سامانه‌های داده و راهکارهای تحلیلی برای خطوط فرآوری مواد معدنی قرار داده است. ما معتقدیم معدن‌کاری صرفاً جا‌به‌جایی سنگ و فرآیند نیست؛ بلکه جریان پیوسته‌ای از داده‌هاست که شناخت درست آن، کلید بقا و سودآوری در بازارهای رقابتی است.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 shadow-card">
                <h3 className="text-lg font-bold text-navy-900 mb-4 font-vazir border-b border-slate-200 pb-3">
                  شناسنامه خلاصه شرکتی
                </h3>
                <dl className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <dt className="text-slate-500">نام تجاری:</dt>
                    <dd className="font-bold text-navy-900 text-left">معدنکو (MADAN CO)</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <dt className="text-slate-500">نام ثبتی:</dt>
                    <dd className="font-semibold text-navy-900 text-left">{companyData.officialNameFa}</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <dt className="text-slate-500">نوع شرکت:</dt>
                    <dd className="font-medium text-navy-900">با مسئولیت محدود</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <dt className="text-slate-500">حوزه فعالیت:</dt>
                    <dd className="font-medium text-navy-900">مهندسی داده، نرم‌افزار و صنایع معدنی</dd>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-100">
                    <dt className="text-slate-500">شعار سازمانی:</dt>
                    <dd className="font-semibold text-brand-amberDark">«{companyData.taglineFa}»</dd>
                  </div>
                </dl>

                <div className="mt-6">
                  <Button to="/company" variant="outline" size="sm" className="w-full">
                    مشاهده پروفایل رسمی و نسخه چاپی
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-brand-bgLight border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 text-brand-blue flex items-center justify-center mb-6">
                  <Target className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-brand-blue block mb-2 font-semibold">MISSION</span>
                <h3 className="text-2xl font-bold text-navy-900 mb-4 font-vazir">
                  ماموریت ما
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  {companyData.mission}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
                راهبرد اجرایی شرکت در کلیه پروژه‌ها
              </div>
            </div>

            {/* Vision */}
            <div className="bg-white p-8 rounded-3xl border border-brand-border shadow-subtle flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 text-brand-cyan flex items-center justify-center mb-6">
                  <Compass className="w-6 h-6" />
                </div>
                <span className="text-xs font-mono text-brand-cyan block mb-2 font-semibold">VISION</span>
                <h3 className="text-2xl font-bold text-navy-900 mb-4 font-vazir">
                  چشم‌انداز ما
                </h3>
                <p className="text-slate-600 text-base leading-relaxed font-light">
                  {companyData.vision}
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-400">
                افق بلندمدت توسعه محصولات فناورانه
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24 bg-white border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            align="center"
            eyebrow="ارزش‌های بنیادین"
            title="اصول راهنمای مهندسی در شرکت ما"
            description="اصولی که در تمام مراحل طراحی نرم‌افزار، پالایش داده‌ها و تعامل با مدیران کارخانجات به آن پایبندیم."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {companyData.values.map((val, idx) => (
              <div
                key={idx}
                className="p-6 rounded-card bg-slate-50 border border-slate-200/80 hover:border-brand-blue/30 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center mb-4 text-brand-blue shadow-sm">
                    {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                    {idx === 1 && <Eye className="w-5 h-5" />}
                    {idx === 2 && <Cpu className="w-5 h-5" />}
                    {idx === 3 && <Handshake className="w-5 h-5" />}
                  </div>
                  <h4 className="text-base font-bold text-navy-900 mb-2 font-vazir">
                    {val.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                    {val.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Approach: No Fake Team Names */}
      <section className="py-16 md:py-24 bg-brand-bgLight">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <SectionHeading
            align="center"
            eyebrow="تیم و سازمان"
            title="ساختار تخصصی بین‌رشته‌ای"
            description="شرکت بر پایه همکاری نزدیک میان متخصصین فرآوری مواد معدنی، مهندسین داده و توسعه‌دهندگان نرم‌افزارهای صنعتی اداره می‌شود."
          />

          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-right space-y-4 max-w-3xl mx-auto shadow-subtle">
            <h4 className="text-base font-bold text-navy-900 font-vazir">
              ترکیب مهندسی و تعهد اجرایی:
            </h4>
            <p className="text-sm text-slate-600 leading-relaxed">
              تیم ما شامل فارغ‌التحصیلان و متخصصان حوزه‌های کانی‌آرایی، مهندسی صنایع و مهندسی نرم‌افزار است. با توجه به سیاست راستی‌آزمایی و حفظ حریم خصوصی، مشخصات تکمیلی اعضای هیئت‌مدیره و سوابق ثبتی رسمی همزمان با انتشار گزارش سالیانه سازمانی در شناسنامه رسمی به‌روزرسانی خواهد شد.
            </p>
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3 text-xs text-brand-blue font-medium">
              <CheckCircle2 className="w-4 h-4 text-brand-success" />
              <span>پایبندی به انضباط فنی، شفافیت آماری و اجتناب از ادعاهای تجاری مبالغه‌آمیز</span>
            </div>
          </div>

          <div className="mt-12">
            <CTASection />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
