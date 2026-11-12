import React, { useState, useEffect } from 'react';
import { Settings, Save, Check, AlertCircle, Globe, Phone, Shield, Search } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { api } from '../../services/api';

export const AdminSettingsPage: React.FC = () => {
  const [settings, setSettings] = useState<Record<string, string>>({
    site_name: '',
    official_name_fa: '',
    tagline: '',
    site_description: '',
    phone: '',
    email: '',
    address: '',
    whatsapp: '',
    telegram: '',
    site_url: '',
    platform_live_url: '',
    footer_copyright: '',
    seo_default_title: '',
    seo_default_description: '',
    seo_default_keywords: '',
    google_analytics_id: '',
    google_search_console_code: '',
  });

  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<{ text: string; isError?: boolean } | null>(null);

  useEffect(() => {
    api.settings.getPublic()
      .then((res) => {
        if (res.success && res.data) {
          setSettings((prev) => ({ ...prev, ...res.data }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const handleChange = (key: string, value: string) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setFeedback(null);

    try {
      await api.settings.update(settings);
      setFeedback({ text: 'تنظیمات سراسری سایت با موفقیت در دیتابیس ذخیره شد.' });
    } catch (err: any) {
      setFeedback({ text: err.message, isError: true });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-black text-navy-950 font-vazir">تنظیمات سراسری وبسایت و سامانه</h1>
            <p className="text-xs text-slate-500 font-light mt-1">
              مدیریت نام برند، هویت حقوقی، اطلاعات تماس رسمی، دامنه‌ها و زیرساخت سئو
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs shadow-xs transition-colors disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'در حال ذخیره...' : 'ذخیره کل تغییرات'}</span>
          </button>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`p-4 rounded-xl text-xs flex items-center justify-between ${
              feedback.isError
                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
            }`}
          >
            <div className="flex items-center gap-2">
              {feedback.isError ? <AlertCircle className="w-4 h-4" /> : <Check className="w-4 h-4" />}
              <span>{feedback.text}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSave} className="space-y-6 text-xs">
          {/* Section 1: General & Identity */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DAD0]">
              <Globe className="w-4 h-4 text-[#0F1821]" />
              <h2 className="text-sm font-bold text-navy-950 font-vazir">۱. هویت برند و اطلاعات حقوقی</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-950 mb-1">نام برند تجاری (Brand Name)</label>
                <input
                  type="text"
                  value={settings.site_name}
                  onChange={(e) => handleChange('site_name', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">نام رسمی ثبتی شرکت (Legal Official Name)</label>
                <input
                  type="text"
                  value={settings.official_name_fa}
                  onChange={(e) => handleChange('official_name_fa', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-950 mb-1">شعار برند (Tagline)</label>
                <input
                  type="text"
                  value={settings.tagline}
                  onChange={(e) => handleChange('tagline', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">دامنه وبسایت عمومی (Site Domain)</label>
                <input
                  type="text"
                  value={settings.site_url}
                  onChange={(e) => handleChange('site_url', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">آدرس سامانه نرم‌افزاری زنده (Live Platform URL)</label>
              <input
                type="text"
                value={settings.platform_live_url}
                onChange={(e) => handleChange('platform_live_url', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                dir="ltr"
              />
              <span className="text-[11px] text-slate-400 mt-1 block">
                تمامی دکمه‌های «ورود به سامانه» در سراسر سایت به این آدرس هدایت می‌شوند.
              </span>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">توضیح کوتاه فعالیت شرکت</label>
              <textarea
                rows={2}
                value={settings.site_description}
                onChange={(e) => handleChange('site_description', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
              />
            </div>
          </div>

          {/* Section 2: Contact Details */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DAD0]">
              <Phone className="w-4 h-4 text-[#C92127]" />
              <h2 className="text-sm font-bold text-navy-950 font-vazir">۲. راه‌های ارتباط رسمی شرکت</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-950 mb-1">شماره تلفن مستقیم رسمی</label>
                <input
                  type="text"
                  value={settings.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">پست الکترونیکی رسمی (Email)</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">نشانی دفتر مرکزی</label>
              <input
                type="text"
                value={settings.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-950 mb-1">پیوند واتساپ</label>
                <input
                  type="text"
                  value={settings.whatsapp}
                  onChange={(e) => handleChange('whatsapp', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">پیوند تلگرام</label>
                <input
                  type="text"
                  value={settings.telegram}
                  onChange={(e) => handleChange('telegram', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Footer & Legal */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DAD0]">
              <Shield className="w-4 h-4 text-[#EFA73F]" />
              <h2 className="text-sm font-bold text-navy-950 font-vazir">۳. متن کپی‌رایت و پاورقی</h2>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">متن حقوق مادی و معنوی فوتر</label>
              <textarea
                rows={2}
                value={settings.footer_copyright}
                onChange={(e) => handleChange('footer_copyright', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
              />
            </div>
          </div>

          {/* Section 4: Global SEO Defaults */}
          <div className="bg-white rounded-2xl p-6 border border-[#E3DAD0] shadow-card space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-[#E3DAD0]">
              <Search className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-navy-950 font-vazir">۴. مقادیر پیش‌فرض سئو و ابزارهای تحلیل</h2>
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">عنوان سئوی پیش‌فرض (Default Title Tag)</label>
              <input
                type="text"
                value={settings.seo_default_title}
                onChange={(e) => handleChange('seo_default_title', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
              />
            </div>

            <div>
              <label className="block font-bold text-navy-950 mb-1">توضیحات متای پیش‌فرض (Default Meta Description)</label>
              <textarea
                rows={2}
                value={settings.seo_default_description}
                onChange={(e) => handleChange('seo_default_description', e.target.value)}
                className="w-full p-2.5 rounded-xl border border-[#E3DAD0] focus:outline-none focus:border-[#0F1821]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold text-navy-950 mb-1">Google Analytics Measurement ID</label>
                <input
                  type="text"
                  placeholder="G-XXXXXXXXXX"
                  value={settings.google_analytics_id}
                  onChange={(e) => handleChange('google_analytics_id', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>

              <div>
                <label className="block font-bold text-navy-950 mb-1">Google Search Console Verification Tag</label>
                <input
                  type="text"
                  placeholder="google-site-verification=..."
                  value={settings.google_search_console_code}
                  onChange={(e) => handleChange('google_search_console_code', e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-[#E3DAD0] font-mono focus:outline-none focus:border-[#0F1821]"
                  dir="ltr"
                />
              </div>
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-3 rounded-[10px] bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold text-xs transition-colors shadow-xs disabled:opacity-50"
            >
              ذخیره تمامی تنظیمات
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};
