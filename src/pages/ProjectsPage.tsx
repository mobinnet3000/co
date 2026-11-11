import React from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, ShieldCheck, ArrowLeft, ArrowUpLeft, AlertCircle } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { CTASection } from '../components/common/CTASection';
import { projectsData, projectEmptyStateNotice } from '../data/projects';
import { pagesSEO } from '../data/seo';

export const ProjectsPage: React.FC = () => {
  const seo = pagesSEO.projects;
  const hasVerifiedProjects = projectsData.filter((p) => p.isVerified).length > 0;

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
          <Breadcrumb items={[{ label: 'پروژه‌ها و مطالعات موردی' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-brand-cyan tracking-wider uppercase block mb-3">
              CASE STUDIES & PORTFOLIO
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6">
              پروژه‌ها و مطالعات موردی
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              آرشیو تجارب فنی، نتایج مطالعات موردی متالورژیکی و پروژه‌های استقرار سامانه در کارخانجات فرآوری کشور.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Verified Projects or Professional Empty State */}
      <section className="py-20 bg-brand-bgLight">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasVerifiedProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData
                .filter((p) => p.isVerified)
                .map((project) => (
                  <div
                    key={project.id}
                    className="bg-white rounded-card overflow-hidden border border-brand-border shadow-subtle hover:shadow-card transition-all flex flex-col justify-between"
                  >
                    <div className="p-6">
                      <span className="text-xs font-mono text-brand-blue mb-2 block">{project.industry}</span>
                      <h3 className="text-lg font-bold text-navy-900 mb-2 font-vazir">{project.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4">{project.scope}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs font-bold text-brand-blue inline-flex items-center gap-1"
                      >
                        <span>مطالعه گزارش پروژه</span>
                        <ArrowUpLeft className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            /* Professional Empty State as explicitly instructed by prompt */
            <div className="max-w-3xl mx-auto bg-white rounded-3xl p-8 sm:p-14 border border-brand-border shadow-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-200 text-brand-blue mx-auto flex items-center justify-center mb-6">
                <FolderGit2 className="w-8 h-8" />
              </div>

              <span className="text-xs font-mono text-brand-copper tracking-wider uppercase block mb-3 font-semibold">
                CONFIDENTIALITY & VERIFICATION POLICY
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 font-vazir mb-4 leading-tight">
                {projectEmptyStateNotice.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl mx-auto">
                {projectEmptyStateNotice.description}
              </p>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-500 mb-8 max-w-lg mx-auto flex items-center gap-2 text-right">
                <ShieldCheck className="w-4 h-4 text-brand-success flex-shrink-0" />
                <span>
                  کلیه مطالعات موردی پس از امضای توافق‌نامه افشای متقابل (NDA) و مجوز مکتوب کارفرما منتشر می‌گردند.
                </span>
              </div>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
              >
                {projectEmptyStateNotice.ctaText}
              </Button>
            </div>
          )}

          <div className="mt-16">
            <CTASection />
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
