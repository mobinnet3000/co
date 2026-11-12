import React from 'react';
import { Phone, Mail, MapPin, Clock, MessageSquare, ArrowUpLeft, ShieldCheck, Building2, Send } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { companyData } from '../data/company';
import { pagesSEO } from '../data/seo';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const seo = pagesSEO.contact;

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner - MadanCo Industrial Luxury Style */}
      <section className="relative pt-32 pb-16 sm:pb-20 bg-brand-sand text-navy-950 border-b border-[#E3DAD0] overflow-hidden select-none">
        {/* Architectural Guidelines */}
        <div className="absolute inset-0 pointer-events-none opacity-30">
          <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]"></div>
          <div className="absolute top-[32%] left-0 right-0 h-[1px] bg-[#E3DAD0]"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: 'تماس با ما و ارتباط مستقیم' }]} />
          </div>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[10px] bg-white/70 border border-[#E3DAD0] mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C92127] animate-pulse"></span>
              <span className="text-[11px] font-mono font-bold tracking-wider text-navy-950 uppercase">
                DIRECT COMMUNICATIONS // کانال‌های ارتباط مستقیم
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir text-navy-950 tracking-tight leading-tight sm:leading-snug mb-5">
              ارتباط مستقیم با کارشناسان و مدیریت معدنکو
            </h1>

            <p className="text-base sm:text-lg text-slate-600 font-light leading-relaxed">
              جهت هماهنگی جلسات فنی، استعلام نیازمندی‌های داده‌ای خطوط فرآوری و تبادل اسناد متالورژیکی، از طریق شماره تماس، ایمیل سازمانی و پیام‌رسان‌های رسمی زیر مستقیماً با ما در ارتباط باشید.
            </p>
          </div>
        </div>
      </section>

      {/* Direct Contact Channels Grid (No Noisy Forms) */}
      <section className="py-16 md:py-24 bg-brand-sand/60 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 1. Direct Phone Call Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#E3DAD0] shadow-subtle hover:shadow-card hover:border-[#EFA73F] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]/70">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#EFA73F]/15 group-hover:border-[#EFA73F]/40 transition-all">
                    <Phone className="w-6 h-6 text-[#0F1821]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-[#0F1821]/5 text-navy-950 border border-[#E3DAD0]">
                    VOICE // مستقیم
                  </span>
                </div>

                <span className="text-xs font-mono text-[#EFA73F] font-bold block mb-1">
                  DIRECT PHONE LINE
                </span>
                <h2 className="text-xl font-bold text-navy-950 mb-2 font-vazir">
                  تماس مستقیم تلفنی
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                  گفتگوی مستقیم با کارشناسان مهندسی داده و مدیریت پیرامون ارزیابی خط فرآوری و سامانه‌ها.
                </p>

                <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DAD0] mb-6 text-center">
                  <span className="text-xs text-slate-500 block mb-1">شماره تماس رسمی:</span>
                  <a
                    href="tel:09999196630"
                    dir="ltr"
                    className="text-2xl font-black font-mono text-navy-950 tracking-wider hover:text-[#C92127] transition-colors block"
                  >
                    ۰۹۹۹ ۹۱۹ ۶۶۳۰
                  </a>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">09999196630</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DAD0]/70">
                <a
                  href="tel:09999196630"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] bg-[#0F1821] text-white hover:bg-[#1D2D3D] font-bold text-xs transition-colors font-vazir"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>برقراری تماس مستقیم</span>
                </a>
              </div>
            </div>

            {/* 2. Official Corporate Email Card */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#E3DAD0] shadow-subtle hover:shadow-card hover:border-[#EFA73F] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]/70">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#EFA73F]/15 group-hover:border-[#EFA73F]/40 transition-all">
                    <Mail className="w-6 h-6 text-[#EFA73F]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-[#0F1821]/5 text-navy-950 border border-[#E3DAD0]">
                    OFFICIAL // مکاتبات
                  </span>
                </div>

                <span className="text-xs font-mono text-[#EFA73F] font-bold block mb-1">
                  OFFICIAL CORRESPONDENCE
                </span>
                <h2 className="text-xl font-bold text-navy-950 mb-2 font-vazir">
                  پست الکترونیکی رسمی
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                  ارسال فلوشیت‌ها، مکاتبات رسمی، فایل‌های تحلیلی کانی‌آرایی و درخواست‌های قراردادی.
                </p>

                <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DAD0] mb-6 text-center">
                  <span className="text-xs text-slate-500 block mb-1">ایمیل سازمانی:</span>
                  <a
                    href="mailto:info@madan.co.ir"
                    className="text-lg font-black font-mono text-navy-950 tracking-wider hover:text-[#EFA73F] transition-colors block"
                  >
                    info@madan.co.ir
                  </a>
                  <span className="text-[11px] text-slate-400 font-mono mt-0.5 block">CORPORATE INBOX</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DAD0]/70">
                <a
                  href="mailto:info@madan.co.ir"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] border border-[#0F1821] text-navy-950 hover:bg-[#0F1821]/5 font-bold text-xs transition-colors font-vazir"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>ارسال ایمیل مستقیم</span>
                </a>
              </div>
            </div>

            {/* 3. Direct Instant Messaging (WhatsApp & Telegram) */}
            <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 border border-[#E3DAD0] shadow-subtle hover:shadow-card hover:border-[#EFA73F] transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]/70">
                  <div className="w-12 h-12 rounded-[10px] bg-brand-sand border border-[#E3DAD0] flex items-center justify-center group-hover:scale-105 group-hover:bg-[#C92127]/15 group-hover:border-[#C92127]/40 transition-all">
                    <MessageSquare className="w-6 h-6 text-[#C92127]" />
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-[6px] bg-[#0F1821]/5 text-navy-950 border border-[#E3DAD0]">
                    MESSENGERS // پیام‌رسان
                  </span>
                </div>

                <span className="text-xs font-mono text-[#C92127] font-bold block mb-1">
                  INSTANT CHAT & DOCS
                </span>
                <h2 className="text-xl font-bold text-navy-950 mb-2 font-vazir">
                  پیام‌رسان‌های مستقیم
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-6">
                  ارسال پیام، تبادل سریع مستندات و هماهنگی سریع جلسات آنلاین از طریق واتس‌اپ و تلگرام.
                </p>

                <div className="p-4 rounded-2xl bg-brand-sand border border-[#E3DAD0] mb-6 text-center space-y-1">
                  <span className="text-xs text-slate-500 block">پشتیبانی و تبادل مدارک:</span>
                  <div className="text-sm font-bold font-mono text-navy-950">
                    +98 999 919 6630
                  </div>
                  <span className="text-[10px] text-emerald-600 font-bold block">پاسخگویی سریع</span>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E3DAD0]/70 grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/989999196630"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[10px] bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors font-vazir"
                >
                  <span>واتس‌اپ</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </a>

                <a
                  href="https://t.me/madanco_ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-[10px] bg-[#0F1821] hover:bg-[#1D2D3D] text-white font-bold text-xs transition-colors font-vazir"
                >
                  <span>تلگرام</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Headquarters Location & Corporate Identity Frame */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Headquarters Card (7 cols) */}
            <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-3xl p-8 sm:p-10 border border-[#E3DAD0] shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E3DAD0]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#EFA73F]"></span>
                    <span>HEADQUARTERS & OFFICE HOURS</span>
                  </div>
                  <span className="text-xs font-mono font-bold text-navy-950">TEHRAN HQ</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-navy-950 font-vazir mb-6">
                  نشانی اداری و هماهنگی جلسات حضوری
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-sand border border-[#E3DAD0]">
                    <div className="p-3 rounded-[10px] bg-white border border-[#E3DAD0] text-[#C92127] flex-shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-navy-950 font-vazir mb-1">
                        نشانی شرکت:
                      </strong>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        تهران، نیروی دریایی
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-4 rounded-2xl bg-brand-sand border border-[#E3DAD0]">
                    <div className="p-3 rounded-[10px] bg-white border border-[#E3DAD0] text-[#EFA73F] flex-shrink-0">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <strong className="block text-sm font-bold text-navy-950 font-vazir mb-1">
                        ساعات پاسخگویی اداری:
                      </strong>
                      <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
                        شنبه تا چهارشنبه: ۸:۰۰ الی ۱۷:۰۰
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E3DAD0] text-xs text-slate-500 leading-relaxed font-light">
                * جلسات حضوری کارشناسی در محل دفتر شرکت پس از هماهنگی قبلی تلفنی یا ایمیلی برگزار می‌گردد.
              </div>
            </div>

            {/* Corporate Identity & Governance (5 cols) */}
            <div className="lg:col-span-5 bg-[#0F1821] text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-card flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-slate-800 text-[10px] font-mono text-[#EFA73F]">
                  <ShieldCheck className="w-4 h-4 text-[#EFA73F]" />
                  <span>OFFICIAL REGISTERED IDENTITY</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold font-vazir text-white mb-4">
                  شناسنامه ثبتی و حقوقی شرکت
                </h3>

                <dl className="space-y-3.5 text-xs text-slate-300 font-light">
                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <dt className="text-slate-400">نام کامل ثبتی:</dt>
                    <dd className="font-bold text-white text-left font-vazir">{companyData.officialNameFa}</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <dt className="text-slate-400">نام تجاری:</dt>
                    <dd className="font-bold text-[#EFA73F] font-vazir">معدنکو (MADAN CO)</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <dt className="text-slate-400">دامنه و وب‌سایت رسمی:</dt>
                    <dd className="font-mono text-white font-semibold">madan.co.ir</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <dt className="text-slate-400">پست الکترونیکی:</dt>
                    <dd className="font-mono text-white">info@madan.co.ir</dd>
                  </div>

                  <div className="flex justify-between py-1.5 border-b border-slate-800">
                    <dt className="text-slate-400">خط مستقیم تماس:</dt>
                    <dd className="font-mono text-[#EFA73F] font-bold">09999196630</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800">
                <Link
                  to="/company"
                  className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-[10px] border border-[#C92127] text-[#C92127] hover:bg-[#C92127]/10 font-bold text-xs transition-colors font-vazir"
                >
                  <span>مشاهده شناسنامه رسمی (نسخه چاپی)</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </PageContainer>
  );
};
