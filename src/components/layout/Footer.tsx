import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, ArrowUpLeft, ShieldCheck, Database, Layers, Activity } from 'lucide-react';
import { companyData } from '../../data/company';
import { servicesData } from '../../data/services';
import { industriesData } from '../../data/industries';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-sand text-[#0F1821] pt-14 pb-10 border-t border-[#E3DAD0] relative overflow-hidden select-none">
      {/* Background Architectural Guidelines */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]/70"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]/70"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Footer Directory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">
          {/* Col 1: Brand Info & Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-4 text-right">
            <div className="mb-2">
              <Logo asVideo size="md" />
            </div>

            <div>
              <span className="text-[11px] font-mono font-bold text-slate-500 uppercase tracking-wider block mb-1">
                CORPORATE IDENTITY // هویت رسمی
              </span>
              <h3 className="text-sm font-bold text-[#0F1821] font-vazir leading-snug">
                شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
              پلتفرم و راهکارهای تخصصی پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی کارخانجات.
            </p>

            {/* Slogan with Red/Amber Pulse Dot */}
            <div className="pt-2 flex items-center gap-2.5 text-xs">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C92127] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#EFA73F]"></span>
              </span>
              <span className="text-[#0F1821] font-bold">«فناوری داده در خدمت معدن»</span>
            </div>

            <div className="pt-4 border-t border-[#E3DAD0] text-xs text-slate-600 space-y-2.5">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#EFA73F] flex-shrink-0 mt-0.5" />
                <span>{companyData.details.address}</span>
              </div>
              {companyData.details.email && (
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#C92127] flex-shrink-0" />
                  <a
                    href={`mailto:${companyData.details.email}`}
                    className="hover:text-[#0F1821] transition-colors font-mono font-semibold"
                  >
                    {companyData.details.email}
                  </a>
                </div>
              )}
              {companyData.details.workingHours && (
                <div className="flex items-center gap-2.5">
                  <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span>{companyData.details.workingHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-right">
            <h3 className="text-[#0F1821] font-bold text-sm tracking-wide border-b border-[#E3DAD0] pb-2.5 flex items-center gap-2 font-vazir">
              <Database className="w-4 h-4 text-[#EFA73F]" />
              <span>راهکارها و خدمات تخصصی</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-600 hover:text-[#0F1821] transition-colors flex items-center justify-between py-1 group"
                  >
                    <span className="group-hover:translate-x-[-2px] transition-transform">{service.title}</span>
                    <ArrowUpLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#EFA73F]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries & Platform (2 cols) */}
          <div className="lg:col-span-2 space-y-3 text-right">
            <h3 className="text-[#0F1821] font-bold text-sm tracking-wide border-b border-[#E3DAD0] pb-2.5 flex items-center gap-2 font-vazir">
              <Layers className="w-4 h-4 text-[#C92127]" />
              <span>صنایع هدف</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {industriesData.map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 text-[#0F1821] hover:text-[#C92127] font-bold transition-colors text-xs"
                >
                  <Activity className="w-3.5 h-3.5 text-[#EFA73F]" />
                  <span>سامانه تحلیل داده</span>
                  <ArrowUpLeft className="w-3.5 h-3.5" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate Documents & Assurance (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-right">
            <h3 className="text-[#0F1821] font-bold text-sm tracking-wide border-b border-[#E3DAD0] pb-2.5 flex items-center gap-2 font-vazir">
              <ShieldCheck className="w-4 h-4 text-[#2B8367]" />
              <span>اصالت سازمانی و مدارک</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]">
                  درباره معدنکو و ماموریت مهندسی
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]">
                  شناسنامه رسمی شرکت (نسخه چاپی)
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]">
                  پروژه‌ها و مطالعات موردی
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]">
                  دانشنامه و یادداشت‌های تخصصی
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-[#0F1821] transition-colors block py-1 hover:translate-x-[-2px]">
                  ارتباط با کارشناسان و استعلام
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3.5 bg-white/80 rounded-[10px] border border-[#E3DAD0] shadow-xs text-[11px] text-slate-600 leading-relaxed font-light">
                <span className="text-[#0F1821] font-bold">پایش و بهینه‌سازی:</span> تمامی ارقام و مدل‌ها منطبق بر موازنه دقیق متالورژیکی و اصول کانی‌آرایی خطوط تولید طراحی شده‌اند.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Metadata */}
        <div className="pt-6 border-t border-[#E3DAD0] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p className="text-center sm:text-right leading-relaxed">
            تمامی حقوق مادی و معنوی متعلق به{' '}
            <strong className="text-[#0F1821] font-bold">شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود</strong> با نام تجاری{' '}
            <strong className="text-[#0F1821] font-bold">معدنکو (Madan Co)</strong> می‌باشد.
          </p>
          <div className="flex items-center gap-4 flex-shrink-0">
            <span className="font-mono text-[11px] text-slate-500 bg-white/70 px-2.5 py-1 rounded-[6px] border border-[#E3DAD0]">
              © {new Date().getFullYear()} MADAN CO. ALL RIGHTS RESERVED.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
