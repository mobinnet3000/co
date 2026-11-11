import React from 'react';
import { ArrowLeft, Shield, Sliders, CheckCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';
import { ImageCard } from '../common/ImageCard';
import { AnimatedSection } from '../common/AnimatedSection';

export const CompanyIntro: React.FC = () => {
  return (
    <section className="py-20 md:py-28 bg-white border-b border-brand-border relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Right Column: Industrial Visual (5 cols) */}
          <AnimatedSection className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <ImageCard
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80"
                alt="تجهیزات صنعتی و خطوط فرآوری مواد معدنی معدنکو"
                aspectRatio="square"
                className="shadow-card border border-brand-border"
              />
              {/* Copper accent badge */}
              <div className="absolute -bottom-6 -left-6 bg-navy-900 text-white p-5 rounded-2xl shadow-elevated border border-slate-800 max-w-xs hidden sm:block">
                <div className="flex items-center gap-2 mb-2 text-brand-amber">
                  <Shield className="w-4 h-4" />
                  <span className="text-xs font-bold font-vazir">پایش و بهینه‌سازی کانی‌آرایی</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-light">
                  مبتنی بر استانداردهای مهندسی داده و تکیه بر اطلاعات و موازنه جرم واقعی کارخانجات
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* Left Column: Editorial Copy (7 cols) */}
          <AnimatedSection delay={0.15} className="lg:col-span-7 order-1 lg:order-2 text-right">
            <SectionHeading
              eyebrow="هویت و ماموریت معدنکو"
              title="نگاهی دقیق‌تر به عملیات صنعتی"
              className="mb-6"
            />

            <div className="space-y-5 text-slate-600 text-base md:text-lg leading-relaxed font-light">
              <p>
                در فرآیندهای صنعتی و به‌ویژه خطوط فرآوری مواد معدنی، داده‌های عملیاتی نقش مهمی در شناخت وضعیت فرآیند و ارزیابی عملکرد تجهیزات و خطوط دارند.
              </p>
              <p>
                <strong>معدنکو</strong> (شرکت محاسبات عملیات داده ارزیابی نوین) با توسعه راهکارهای نرم‌افزاری و داده‌محور، بر ایجاد بستری برای دریافت، پردازش و تحلیل اطلاعات عملیاتی این حوزه تمرکز دارد. هدف ما پایان دادن به حدسیات در تصمیم‌گیری و تبدیل داده‌های خام روزمره به یک دارایی منسجم متالورژیکی است.
              </p>
            </div>

            {/* Core Pillars List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8">
              <div className="p-4 rounded-xl bg-brand-sand border border-brand-border flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-navy-800 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">سازماندهی داده‌های تولید</h4>
                  <p className="text-xs text-slate-500 leading-normal font-light">
                    یکپارچگی میان آزمایشگاه، لاگ‌بوک‌ها و ساعات کارکرد خطوط خردایش
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-brand-sand border border-brand-border flex items-start gap-3">
                <Sliders className="w-5 h-5 text-brand-amberDark flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-bold text-navy-950 mb-1 font-vazir">پایش و بهینه‌سازی دقیق</h4>
                  <p className="text-xs text-slate-500 leading-normal font-light">
                    سنجش مستمر بازیابی، نسبت تغلیظ و موازنه جرم در طول شیفت‌ها
                  </p>
                </div>
              </div>
            </div>

            <div>
              <Button
                to="/about"
                variant="primary"
                size="md"
                className="bg-navy-900 hover:bg-navy-800 text-white font-medium"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                بیشتر درباره معدنکو بدانید
              </Button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
};
