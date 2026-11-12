import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SEO } from '../components/common/SEO';
import { pagesSEO } from '../data/seo';
import { Hero } from '../components/home/Hero';
import { CompanyIntro } from '../components/home/CompanyIntro';
import { PlatformOverview } from '../components/home/PlatformOverview';
import { ServicesOverview } from '../components/home/ServicesOverview';
import { Advantages } from '../components/home/Advantages';
import { FinalCTA } from '../components/home/FinalCTA';
import { BlockRenderer, PageSectionData } from '../components/blocks/BlockRenderer';
import { api } from '../services/api';
import { companyData } from '../data/company';

export const HomePage: React.FC = () => {
  const seo = pagesSEO.home;
  const [cmsSections, setCmsSections] = useState<PageSectionData[]>([]);
  const [useCmsSections, setUseCmsSections] = useState<boolean>(false);

  useEffect(() => {
    api.sections.getByPageSlug('home')
      .then((res) => {
        if (res.success && res.data && res.data.length > 0) {
          // If custom sections exist in CMS, filter out hero (rendered natively) and display them
          const nonHero = res.data.filter((s) => s.section_type !== 'hero');
          if (nonHero.length > 0) {
            setCmsSections(nonHero);
            setUseCmsSections(true);
          }
        }
      })
      .catch(() => {});
  }, []);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: companyData.officialNameFa,
    alternateName: companyData.brandName,
    url: 'https://madan.co.ir',
    logo: 'https://madan.co.ir/favicon.svg',
    description: companyData.descriptionFa,
    email: companyData.details.email,
    telephone: companyData.details.phone,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'تهران',
      streetAddress: 'نیروی دریایی',
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
      {/* Interactive Motion Hero */}
      <Hero />

      {/* Render Dynamic CMS Sections if configured; otherwise use baseline static components */}
      {useCmsSections && cmsSections.length > 0 ? (
        <div className="space-y-0">
          {cmsSections.map((sec) => (
            <BlockRenderer key={sec.id} section={sec} />
          ))}
        </div>
      ) : (
        <>
          <CompanyIntro />
          <PlatformOverview />
          <ServicesOverview />
          <Advantages />
          <FinalCTA />
        </>
      )}
    </PageContainer>
  );
};
