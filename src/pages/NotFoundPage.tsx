import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, AlertCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title="صفحه مورد نظر یافت نشد (خطای ۴۰۴)"
        description="صفحه‌ای که به دنبال آن هستید وجود ندارد یا تغییر مسیر یافته است."
      />

      <section className="min-h-[75vh] flex items-center justify-center py-20 bg-brand-sand">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-navy-950 text-[#EFA73F] mx-auto flex items-center justify-center mb-6 shadow-card font-mono text-3xl font-black border border-[#E3DAD0]">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 font-vazir mb-3">
            صفحه مورد نظر یافت نشد
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light mb-8">
            نشانی وارد شده در دسترس نمی‌باشد یا صفحه مورد نظر به مسیر دیگری انتقال یافته است.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              to="/"
              variant="primary"
              size="md"
              icon={<Home className="w-4 h-4" />}
              className="bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold border-none"
            >
              بازگشت به صفحه اصلی
            </Button>
            <Button
              to="/platform"
              variant="outline"
              size="md"
              className="border-[#0F1821] text-[#0F1821] hover:bg-[#0F1821]/5"
            >
              مشاهده سامانه تحلیل داده
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
