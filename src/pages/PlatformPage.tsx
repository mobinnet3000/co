import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { pagesSEO } from '../data/seo';
import { PlatformHero } from '../components/platform/PlatformHero';
import { PlatformIntroduction } from '../components/platform/PlatformIntroduction';
import { PlatformWorkflow } from '../components/platform/PlatformWorkflow';
import { PlatformCapabilities } from '../components/platform/PlatformCapabilities';
import { PlatformDashboard } from '../components/platform/PlatformDashboard';
import { PlatformBenefits } from '../components/platform/PlatformBenefits';
import { PlatformFAQ } from '../components/platform/PlatformFAQ';
import { PlatformCTA } from '../components/platform/PlatformCTA';

export const PlatformPage: React.FC = () => {
  const seo = pagesSEO.platform;

  return (
    <PageContainer>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
      />
      <PlatformHero />
      <PlatformIntroduction />
      <PlatformWorkflow />
      <PlatformCapabilities />
      <PlatformDashboard />
      <PlatformBenefits />
      <PlatformFAQ />
      <PlatformCTA />
    </PageContainer>
  );
};
