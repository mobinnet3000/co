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
      <section className="pt-32 pb-16 bg-navy-950 text-white relative overflow-hidden border-b border-[#E3DAD0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Breadcrumb items={[{ label: 'پروژه‌ها و مطالعات موردی' }]} />
          <div className="max-w-3xl">
            <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-3 font-semibold">
              CASE STUDIES & PORTFOLIO // معدنکو
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black font-vazir leading-tight mb-6 text-white">
              پروژه‌ها و مطالعات موردی
            </h1>
            <p className="text-slate-300 text-base sm:text-lg font-light leading-relaxed">
              آرشیو تجارب فنی، نتایج مطالعات موردی متالورژیکی و پروژه‌های استقرار سامانه در کارخانجات فرآوری کشور.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content: Verified Projects or Professional Empty State */}
      <section className="py-20 bg-brand-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {hasVerifiedProjects ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData
                .filter((p) => p.isVerified)
                .map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/90 rounded-2xl overflow-hidden border border-[#E3DAD0] shadow-card hover:shadow-elevated transition-all flex flex-col justify-between"
                  >
                    <div className="p-6">
                      <span className="text-xs font-mono text-slate-500 mb-2 block">{project.industry}</span>
                      <h3 className="text-lg font-bold text-navy-950 mb-2 font-vazir">{project.title}</h3>
                      <p className="text-xs text-slate-600 line-clamp-3 mb-4">{project.scope}</p>
                    </div>
                    <div className="p-6 pt-0">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="text-xs font-bold text-[#0F1821] hover:text-[#C92127] inline-flex items-center gap-1"
                      >
                        <span>مطالعه گزارش پروژه</span>
                        <ArrowUpLeft className="w-3.5 h-3.5 text-[#C92127]" />
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            /* Professional Empty State as explicitly instructed by prompt */
            <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-14 border border-[#E3DAD0] shadow-card text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FAF7F3] border border-[#E3DAD0] text-[#0F1821] mx-auto flex items-center justify-center mb-6">
                <FolderGit2 className="w-8 h-8 text-[#EFA73F]" />
              </div>

              <span className="text-xs font-mono text-[#C92127] tracking-wider uppercase block mb-3 font-semibold">
                CONFIDENTIALITY & VERIFICATION POLICY
              </span>

              <h2 className="text-xl sm:text-2xl font-bold text-navy-950 font-vazir mb-4 leading-tight">
                {projectEmptyStateNotice.title}
              </h2>

              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-light mb-8 max-w-xl mx-auto">
                {projectEmptyStateNotice.description}
              </p>

              <div className="p-4 rounded-xl bg-brand-sandLight border border-[#E3DAD0] text-xs text-slate-600 mb-8 max-w-lg mx-auto flex items-center gap-2 text-right">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>
                  کلیه مطالعات موردی پس از امضای توافق‌نامه افشای متقابل (NDA) و مجوز مکتوب کارفرما منتشر می‌گردند.
                </span>
              </div>

              <Button
                to="/contact"
                variant="primary"
                size="md"
                icon={<ArrowLeft className="w-4 h-4" />}
                className="bg-[#EFA73F] text-navy-950 hover:bg-[#D48E28] font-bold border-none"
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
