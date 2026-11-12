import React from 'react';
import { MapPin, Phone, Mail, Globe, Clock, ShieldCheck } from 'lucide-react';

export interface ContactInfoBlockConfig {
  tagline?: string;
  title: string;
  description?: string;
  phone?: string;
  email?: string;
  address?: string;
  workingHours?: string;
  platformUrl?: string;
}

export const ContactInfoBlock: React.FC<{ config: ContactInfoBlockConfig }> = ({ config }) => {
  if (!config) return null;

  const phone = config.phone || '09999196630';
  const email = config.email || 'info@madan.co.ir';
  const address = config.address || 'تهران، تهران نیرو دریایی';
  const platformUrl = config.platformUrl || 'https://madan.ba3tani.ir';

  return (
    <section className="py-16 md:py-20 bg-brand-sand border-b border-[#E3DAD0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          {config.tagline && (
            <span className="text-xs font-mono font-bold text-[#EFA73F] tracking-wider uppercase block mb-2">
              {config.tagline}
            </span>
          )}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black font-vazir text-navy-950 mb-3">
            {config.title}
          </h2>
          {config.description && (
            <p className="text-xs sm:text-sm text-slate-600 font-light leading-relaxed">
              {config.description}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Address */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <div className="w-10 h-10 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 mb-4">
              <MapPin className="w-5 h-5 text-[#C92127]" />
            </div>
            <h4 className="text-xs font-bold text-navy-950 font-vazir mb-1">نشانی دفتر مرکزی</h4>
            <p className="text-xs text-slate-600 font-light leading-relaxed">{address}</p>
          </div>

          {/* Phone */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <div className="w-10 h-10 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 mb-4">
              <Phone className="w-5 h-5 text-[#EFA73F]" />
            </div>
            <h4 className="text-xs font-bold text-navy-950 font-vazir mb-1">تماس مستقیم</h4>
            <a href={`tel:${phone}`} className="text-xs font-mono font-bold text-navy-950 hover:text-[#C92127] block" dir="ltr">
              {phone}
            </a>
          </div>

          {/* Email */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <div className="w-10 h-10 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 mb-4">
              <Mail className="w-5 h-5 text-navy-950" />
            </div>
            <h4 className="text-xs font-bold text-navy-950 font-vazir mb-1">مکاتبات رسمی</h4>
            <a href={`mailto:${email}`} className="text-xs font-mono text-slate-600 hover:text-navy-950 block" dir="ltr">
              {email}
            </a>
          </div>

          {/* Platform */}
          <div className="p-6 rounded-2xl bg-white border border-[#E3DAD0] shadow-card">
            <div className="w-10 h-10 rounded-xl bg-brand-sand border border-[#E3DAD0] flex items-center justify-center text-navy-950 mb-4">
              <Globe className="w-5 h-5 text-[#EFA73F]" />
            </div>
            <h4 className="text-xs font-bold text-navy-950 font-vazir mb-1">سامانه آنلاین فرآوری</h4>
            <a
              href={platformUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-[#EFA73F] font-bold hover:underline block"
              dir="ltr"
            >
              madan.ba3tani.ir
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
