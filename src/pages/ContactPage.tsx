import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, MapPin, Clock, Phone, Send, CheckCircle2, AlertCircle, Building2, HelpCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { SectionHeading } from '../components/common/SectionHeading';
import { Button } from '../components/common/Button';
import { companyData } from '../data/company';
import { pagesSEO } from '../data/seo';

// Zod Schema for Frontend Validation
const contactSchema = z.object({
  fullName: z.string().min(3, 'لطفاً نام و نام خانوادگی خود را کامل وارد کنید'),
  companyName: z.string().min(2, 'لطفاً نام شرکت یا مجتمع معدنی را وارد کنید'),
  position: z.string().optional(),
  email: z.string().email('آدرس ایمیل معتبر نیست'),
  phone: z.string().min(10, 'شماره تماس باید حداقل ۱۰ رقم باشد'),
  inquiryType: z.string().min(1, 'لطفاً نوع درخواست را انتخاب فرمایید'),
  message: z.string().min(10, 'پیام شما باید حداقل ۱۰ کاراکتر باشد'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export const ContactPage: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<ContactFormData | null>(null);
  const seo = pagesSEO.contact;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      inquiryType: 'درخواست مشاوره',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    // Frontend-only simulation with clear demo notice as required by prompt
    setSubmittedData(data);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmittedData(null);
    reset();
  };

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />

      {/* Header Banner */}
      <section className="pt-32 pb-16 bg-navy-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'تماس با ما' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              ارتباط با کارشناسان و درخواست مشاوره
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              جهت بررسی نیازمندی‌های داده‌ای کارخانه، هماهنگی جلسه معرفی سامانه و آغاز تعاملات مهندسی، با ما در تماس باشید.
            </p>
          </div>
        </div>
      </section>

      {/* Main Form and Contact Details */}
      <section className="py-16 md:py-24 bg-brand-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Form Column (7 cols) */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-3xl p-8 sm:p-10 border border-brand-border shadow-card">
                <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2 font-vazir">
                  فرم استعلام و درخواست مشاوره
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mb-8 font-light">
                  لطفاً اطلاعات اولیه کارخانه یا مجموعه معدنی خود را ثبت فرمایید تا کارشناسان فنی با شما تماس گیرند.
                </p>

                {/* Clear Notice on Pure Frontend / Demo Validation */}
                <div className="mb-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 text-brand-blue flex-shrink-0 mt-0.5" />
                  <div className="leading-relaxed">
                    <strong>توجه کارفرما: </strong>
                    این فرم به صورت اعتبارسنجی سمت کاربر (Client-Side) فعال است. پس از تکمیل، می‌توانید پیام خود را به صورت مستقیم از طریق پست الکترونیکی رسمی نیز به نشانی{' '}
                    <a href={`mailto:${companyData.details.email}`} className="text-brand-blue font-mono font-bold">
                      {companyData.details.email}
                    </a>{' '}
                    ارسال فرمایید.
                  </div>
                </div>

                {!isSubmitted ? (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    {/* Inquiry Type Selector */}
                    <div>
                      <label className="block text-xs font-bold text-navy-900 mb-2">
                        نوع درخواست یا موضوع همکاری:
                      </label>
                      <select
                        {...register('inquiryType')}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                      >
                        <option value="معرفی سامانه">معرفی سامانه و دمو فلوشیت</option>
                        <option value="درخواست مشاوره">درخواست مشاوره تخصصی داده‌های فرآوری</option>
                        <option value="همکاری تجاری">همکاری تجاری و سازمانی</option>
                        <option value="همکاری فنی">همکاری فنی و مهندسی</option>
                        <option value="درخواست خدمات">درخواست خدمات تحلیل داده و موازنه</option>
                        <option value="سایر موارد">سایر موارد</option>
                      </select>
                      {errors.inquiryType && (
                        <p className="text-rose-500 text-xs mt-1">{errors.inquiryType.message}</p>
                      )}
                    </div>

                    {/* Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          نام و نام خانوادگی: *
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: مهندس احمدی"
                          {...register('fullName')}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                        />
                        {errors.fullName && (
                          <p className="text-rose-500 text-xs mt-1">{errors.fullName.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          نام شرکت / کارخانه معدنی: *
                        </label>
                        <input
                          type="text"
                          placeholder="مثال: مجتمع کنسانتره‌سازی مس ..."
                          {...register('companyName')}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                        />
                        {errors.companyName && (
                          <p className="text-rose-500 text-xs mt-1">{errors.companyName.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Position, Email & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          سمت سازمانی:
                        </label>
                        <input
                          type="text"
                          placeholder="مدیر کارخانه، سرپرست متالورژی..."
                          {...register('position')}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          پست الکترونیکی: *
                        </label>
                        <input
                          type="email"
                          dir="ltr"
                          placeholder="email@company.com"
                          {...register('email')}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 text-left focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue font-mono"
                        />
                        {errors.email && (
                          <p className="text-rose-500 text-xs mt-1">{errors.email.message}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-slate-700 mb-1.5">
                          شماره تماس همراه: *
                        </label>
                        <input
                          type="tel"
                          dir="ltr"
                          placeholder="09123456789"
                          {...register('phone')}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 text-left focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue font-mono"
                        />
                        {errors.phone && (
                          <p className="text-rose-500 text-xs mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                    </div>

                    {/* Message Box */}
                    <div>
                      <label className="block text-xs font-medium text-slate-700 mb-1.5">
                        شرح مختصری از خط فرآوری و نیازمندی‌های داده‌ای: *
                      </label>
                      <textarea
                        rows={5}
                        placeholder="نوع ماده معدنی، فلوشیت، چالش‌های جاری در ثبت داده یا موازنه متالورژیکی..."
                        {...register('message')}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-navy-900 focus:outline-none focus:ring-2 focus:ring-brand-blue/30 focus:border-brand-blue"
                      ></textarea>
                      {errors.message && (
                        <p className="text-rose-500 text-xs mt-1">{errors.message.message}</p>
                      )}
                    </div>

                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full font-semibold"
                        icon={<Send className="w-4 h-4" />}
                      >
                        ثبت و ارسال اطلاعات
                      </Button>
                    </div>
                  </form>
                ) : (
                  /* Form Submission Success / Mailto Fallback Modal */
                  <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-navy-900 font-vazir">
                      اطلاعات شما با موفقیت در فرم اعتبارسنجی شد
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light max-w-md mx-auto">
                      با تشکر از شما <strong>{submittedData?.fullName}</strong>؛ اطلاعات مربوط به شرکت{' '}
                      <strong>{submittedData?.companyName}</strong> دریافت شد.
                    </p>

                    <div className="p-4 bg-white rounded-xl border border-emerald-100 text-xs text-slate-600 text-right space-y-1 font-mono">
                      <div>موضوع: {submittedData?.inquiryType}</div>
                      <div>تماس: {submittedData?.phone} | {submittedData?.email}</div>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                      <a
                        href={`mailto:${companyData.details.email}?subject=${encodeURIComponent(
                          `درخواست ${submittedData?.inquiryType} از طرف ${submittedData?.companyName}`
                        )}&body=${encodeURIComponent(
                          `نام: ${submittedData?.fullName}\nشرکت: ${submittedData?.companyName}\nسمت: ${submittedData?.position}\nشماره تماس: ${submittedData?.phone}\nایمیل: ${submittedData?.email}\n\nپیام:\n${submittedData?.message}`
                        )}`}
                        className="px-5 py-2.5 rounded-[10px] bg-brand-blue text-white text-xs font-semibold hover:bg-navy-900 transition-colors"
                      >
                        ارسال از طریق نرم‌افزار ایمیل شما (Mailto)
                      </a>
                      <button
                        onClick={handleReset}
                        className="px-5 py-2.5 rounded-[10px] border border-slate-300 text-slate-700 text-xs font-medium hover:bg-slate-100 transition-colors"
                      >
                        ارسال فرم جدید
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Details Column (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-navy-900 text-white rounded-3xl p-8 border border-slate-800 shadow-card">
                <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
                  DIRECT CONTACT
                </span>
                <h3 className="text-xl font-bold font-vazir mb-6">
                  راه‌های ارتباط رسمی با شرکت
                </h3>

                <div className="space-y-5 text-xs sm:text-sm">
                  <div className="flex items-start gap-3">
                    <Building2 className="w-5 h-5 text-brand-blue flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-vazir">نام رسمی شرکت:</strong>
                      <span className="text-slate-300">{companyData.officialNameFa}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-brand-copper flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-vazir">نشانی اداری:</strong>
                      <span className="text-slate-300">{companyData.details.address}</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-vazir">پست الکترونیکی رسمی:</strong>
                      <a
                        href={`mailto:${companyData.details.email}`}
                        className="text-brand-cyan font-mono hover:underline"
                      >
                        {companyData.details.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-white font-vazir">ساعات پاسخگویی اداری:</strong>
                      <span className="text-slate-300">{companyData.details.workingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-400">
                  اطلاعات تماس رسمی و شماره‌های خط مستقیم پس از نهایی‌سازی هماهنگی‌های دفتری در این بخش به‌روزرسانی خواهند شد.
                </div>
              </div>

              {/* Company Profile Quick Link */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-subtle">
                <h4 className="text-sm font-bold text-navy-900 mb-2 font-vazir">
                  نیاز به شناسنامه رسمی شرکت دارید؟
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light mb-4">
                  جهت دریافت و پرینت مشخصات کامل ثبتی و راهکارهای فنی شرکت، صفحه پروفایل رسمی را ملاحظه فرمایید.
                </p>
                <Button to="/company" variant="outline" size="sm" className="w-full">
                  مشاهده شناسنامه رسمی (نسخه چاپی)
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
