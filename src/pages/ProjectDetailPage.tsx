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
        canonical={`https://novin-amaliat.ir/projects/${project.slug}`}
      />
      <section className="pt-32 pb-16 bg-navy-900 text-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb
            items={[
              { label: 'پروژه‌ها', path: '/projects' },
              { label: project.title },
            ]}
          />
          <h1 className="text-3xl sm:text-4xl font-black font-vazir leading-tight mb-4">
            {project.title}
          </h1>
          <p className="text-slate-300 text-base">{project.scope}</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6 text-slate-700">
            <div>
              <h2 className="text-xl font-bold text-navy-900 mb-2">اطلاعات کلی پروژه</h2>
              <p>صنعت: {project.industry}</p>
              <p>ماده معدنی: {project.mineralType}</p>
            </div>
            <div className="pt-8">
              <Button to="/projects" variant="outline" size="sm">
                بازگشت به فهرست پروژه‌ها
              </Button>
            </div>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
