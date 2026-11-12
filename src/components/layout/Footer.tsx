import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone, ArrowUpLeft, ExternalLink } from 'lucide-react';
import { companyData } from '../../data/company';
import { Logo } from '../common/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-sand text-[#0F1821] pt-12 pb-8 border-t border-[#E3DAD0] relative overflow-hidden select-none">
      {/* Background Architectural Guidelines - Ultra Minimal */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute top-0 bottom-0 right-[12%] w-[1px] bg-[#E3DAD0]"></div>
        <div className="absolute top-0 bottom-0 left-[12%] w-[1px] bg-[#E3DAD0]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Section: Brand Identity & Direct Contact */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 pb-10 border-b border-[#E3DAD0]">
          {/* Brand Info */}
          <div className="space-y-3 max-w-xl text-right">
            <div className="inline-block">
              <Logo asVideo size="md" />
            </div>

            <div className="flex items-center gap-2 pt-1 text-xs font-vazir">
              <span className="w-2 h-2 rounded-full bg-[#C92127]"></span>
              <span className="font-bold text-navy-950">
                شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود
              </span>
              <span className="text-slate-400 font-mono">|</span>
              <span className="text-slate-500 font-light">«فناوری داده در خدمت معدن»</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-light">
              پلتفرم و راهکارهای تخصصی پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی.
            </p>
          </div>

          {/* Quick Direct Contacts (Clean Badges) */}
          <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-3 text-xs">
            {/* Phone */}
            <a
              href="tel:09999196630"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-white/80 border border-[#E3DAD0] text-navy-950 hover:border-[#C92127] hover:text-[#C92127] transition-all shadow-xs group"
            >
              <Phone className="w-3.5 h-3.5 text-[#C92127]" />
              <span className="font-vazir font-medium text-slate-600">تماس مستقیم:</span>
              <span dir="ltr" className="font-mono font-bold text-navy-950 group-hover:text-[#C92127]">
                09999196630
              </span>
            </a>

            {/* Email */}
            <a
              href={`mailto:${companyData.details.email}`}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-white/80 border border-[#E3DAD0] text-navy-950 hover:border-[#EFA73F] transition-all shadow-xs"
            >
              <Mail className="w-3.5 h-3.5 text-[#EFA73F]" />
              <span className="font-mono font-medium">{companyData.details.email}</span>
            </a>

            {/* Address */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[10px] bg-white/80 border border-[#E3DAD0] text-slate-700 text-xs shadow-xs">
              <MapPin className="w-3.5 h-3.5 text-slate-500" />
              <span>{companyData.details.address}</span>
            </div>
          </div>
        </div>

        {/* Middle Section: Essential Minimal Navigation Links */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 text-xs font-vazir">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-slate-700">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              صفحه اصلی
            </Link>

            <Link
              to="/platform"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              معرفی سامانه پایش
            </Link>

            <Link
              to="/services"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              خدمات مهندسی
            </Link>

            <Link
              to="/about"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              درباره ما
            </Link>

            <Link
              to="/company"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              شناسنامه رسمی شرکت
            </Link>

            <Link
              to="/contact"
              className="px-3 py-1.5 rounded-[8px] bg-white/60 border border-transparent hover:border-[#E3DAD0] hover:text-navy-950 transition-colors"
            >
              ارتباط با ما
            </Link>
          </div>

          {/* Direct Live Platform Access Button */}
          <a
            href="https://madan.ba3tani.ir"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-[10px] bg-[#EFA73F] text-[#0F1821] hover:bg-[#D48E28] font-bold text-xs transition-colors shadow-xs"
          >
            <span>ورود به سامانه زنده (madan.ba3tani.ir)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Bottom Bar: Copyright & Domain */}
        <div className="pt-6 border-t border-[#E3DAD0] flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p className="text-center sm:text-right leading-relaxed font-light">
            تمامی حقوق مادی و معنوی متعلق به{' '}
            <strong className="text-navy-950 font-bold">شرکت محاسبات عملیات داده ارزیابی نوین</strong> (نام تجاری{' '}
            <strong className="text-navy-950 font-bold">معدنکو Madan Co</strong>) می‌باشد.
          </p>

          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] font-bold text-slate-600 bg-white/70 px-2.5 py-1 rounded-[6px] border border-[#E3DAD0]">
              madan.co.ir
            </span>
            <span className="font-mono text-[11px] text-slate-400">
              © {new Date().getFullYear()}
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};
