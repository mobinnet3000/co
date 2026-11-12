import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { Breadcrumb } from '../components/layout/Breadcrumb';
import { Button } from '../components/common/Button';
import { projectsData } from '../data/projects';

export const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projectsData.find((p) => p.slug === slug && p.isVerified);

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <PageContainer forceDarkNavbarText={true}>
      <SEO
        title={`${project.title} | پروژه و مطالعه موردی`}
        description={project.scope}
        canonical={`https://madan.co.ir/projects/${project.slug}`}
      />
      <section className="pt-32 pb-16 bg-navy-950 text-white relative border-b border-[#E3DAD0]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'پروژه‌ها', path: '/projects' },
              { label: project.title },
            ]}
          />
          <span className="text-xs font-mono text-[#EFA73F] tracking-wider uppercase block mb-2 font-semibold">
            VERIFIED CASE STUDY // معدنکو
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-vazir leading-tight mb-4 text-white">
            {project.title}
          </h1>
          <p className="text-slate-300 text-base font-light leading-relaxed">{project.scope}</p>
        </div>
      </section>

      <section className="py-16 bg-brand-sand">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/90 rounded-2xl p-8 sm:p-12 border border-[#E3DAD0] shadow-card space-y-6 text-slate-700">
            <div>
              <h2 className="text-xl font-bold text-navy-950 mb-3 font-vazir">اطلاعات کلی و قلمرو اجرایی پروژه</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="p-3 bg-brand-sandLight rounded-xl border border-[#E3DAD0]">
                  <span className="text-slate-500 block mb-1">صنعت و مدار فرآوری:</span>
                  <strong className="text-navy-950">{project.industry}</strong>
                </div>
                <div className="p-3 bg-brand-sandLight rounded-xl border border-[#E3DAD0]">
                  <span className="text-slate-500 block mb-1">ماده معدنی / کانسنگ:</span>
                  <strong className="text-navy-950">{project.mineralType}</strong>
                </div>
              </div>
            </div>
            <div className="pt-6 border-t border-[#E3DAD0]">
              <Button to="/projects" variant="outline" size="sm" className="border-[#0F1821] text-[#0F1821] hover:bg-[#0F1821]/5">
                بازگشت به فهرست پروژه‌ها
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
