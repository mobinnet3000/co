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

      <section className="min-h-[75vh] flex items-center justify-center py-20 bg-brand-bgLight">
        <div className="max-w-md mx-auto px-4 text-center">
          <div className="w-20 h-20 rounded-3xl bg-navy-900 text-brand-cyan mx-auto flex items-center justify-center mb-6 shadow-card font-mono text-3xl font-black">
            404
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-900 font-vazir mb-3">
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
            >
              بازگشت به صفحه اصلی
            </Button>
            <Button
              to="/platform"
              variant="outline"
              size="md"
            >
              مشاهده سامانه تحلیل داده
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
