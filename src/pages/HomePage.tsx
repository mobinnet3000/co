import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { pagesSEO } from '../data/seo';
import { Hero } from '../components/home/Hero';
import { CompanyIntro } from '../components/home/CompanyIntro';
import { PlatformOverview } from '../components/home/PlatformOverview';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { IndustriesOverview } from '../components/home/IndustriesOverview';
import { Advantages } from '../components/home/Advantages';
import { FinalCTA } from '../components/home/FinalCTA';
import { companyData } from '../data/company';

export const HomePage: React.FC = () => {
  const seo = pagesSEO.home;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.officialNameFa,
    alternateName: companyData.brandName,
    url: 'https://novin-amaliat.ir',
    logo: 'https://novin-amaliat.ir/favicon.svg',
    description: companyData.descriptionFa,
    email: companyData.details.email,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Tehran',
      addressCountry: 'IR',
    },
  };

  return (
    <PageContainer>
      <SEO
        title={seo.title}
        description={seo.description}
        keywords={seo.keywords}
        canonical={seo.canonical}
        jsonLd={jsonLd}
      />
      <Hero />
      <CompanyIntro />
      <PlatformOverview />
      <ServicesOverview />
      <IndustriesOverview />
      <Advantages />
      <FinalCTA />
    </PageContainer>
  );
};
