import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Clock, ArrowUpLeft, ShieldCheck, Database, Layers } from 'lucide-react';
import { companyData } from '../../data/company';
import { servicesData } from '../../data/services';
import { industriesData } from '../../data/industries';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-navy-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 bg-grid-dark opacity-10 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand Info (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo variant="light" size="md" />
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed font-light mt-4">
              {companyData.descriptionFa}
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-brand-amber">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-amber animate-pulse"></span>
              <span>«{companyData.taglineFa}»</span>
            </div>

            <div className="pt-4 border-t border-slate-800/80 text-xs text-slate-400 space-y-2">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-amber flex-shrink-0 mt-0.5" />
                <span>{companyData.details.address}</span>
              </div>
              {companyData.details.email && (
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-brand-amber flex-shrink-0" />
                  <a
                    href={`mailto:${companyData.details.email}`}
                    className="hover:text-white transition-colors font-mono"
                  >
                    {companyData.details.email}
                  </a>
                </div>
              )}
              {companyData.details.workingHours && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-slate-500 flex-shrink-0" />
                  <span>{companyData.details.workingHours}</span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Services (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2 flex items-center gap-2 font-vazir">
              <Database className="w-4 h-4 text-brand-amber" />
              <span>راهکارها و خدمات تخصصی</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {servicesData.map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-slate-400 hover:text-brand-amber transition-colors flex items-center justify-between py-1 group"
                  >
                    <span>{service.title}</span>
                    <ArrowUpLeft className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-brand-amber" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Industries & Platform (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2 flex items-center gap-2 font-vazir">
              <Layers className="w-4 h-4 text-brand-crimson" />
              <span>صنایع هدف</span>
            </h3>
            <ul className="space-y-2 text-xs">
              {industriesData.map((ind) => (
                <li key={ind.id}>
                  <Link
                    to={`/industries/${ind.slug}`}
                    className="text-slate-400 hover:text-brand-amber transition-colors block py-1"
                  >
                    {ind.title}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  to="/platform"
                  className="inline-flex items-center gap-1.5 text-brand-amber hover:text-white font-semibold transition-colors"
                >
                  <span>سامانه پایش خطوط</span>
                  <ArrowUpLeft className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links & Transparency (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-white font-bold text-sm tracking-wide border-b border-slate-800 pb-2 flex items-center gap-2 font-vazir">
              <ShieldCheck className="w-4 h-4 text-brand-success" />
              <span>اصالت سازمانی و مدارک</span>
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-400 hover:text-white transition-colors block py-1">
                  درباره معدنکو و ماموریت مهندسی
                </Link>
              </li>
              <li>
                <Link to="/company" className="text-slate-400 hover:text-white transition-colors block py-1">
                  شناسنامه رسمی شرکت (نسخه چاپی)
                </Link>
              </li>
              <li>
                <Link to="/projects" className="text-slate-400 hover:text-white transition-colors block py-1">
                  پروژه‌ها و مطالعات موردی
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-slate-400 hover:text-white transition-colors block py-1">
                  دانشنامه و یادداشت‌های تخصصی
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-400 hover:text-white transition-colors block py-1">
                  ارتباط با کارشناسان و استعلام
                </Link>
              </li>
            </ul>

            <div className="pt-3">
              <div className="p-3 bg-navy-900 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed font-light">
                <span className="text-brand-amber font-semibold">پایش و بهینه‌سازی:</span> تمامی ارقام و مدل‌ها منطبق بر موازنه دقیق متالورژیکی و اصول کانی‌آرایی خطوط تولید طراحی شده‌اند.
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Note */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p className="text-center sm:text-right">
            تمامی حقوق مادی و معنوی متعلق به{' '}
            <strong className="text-slate-300">{companyData.officialNameFa}</strong> با نام تجاری{' '}
            <strong className="text-brand-amber">معدنکو (Madan Co)</strong> می‌باشد.
          </p>
          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400">
              © {new Date().getFullYear()} Madan Co. All rights reserved.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
