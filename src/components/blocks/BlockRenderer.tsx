import React from 'react';
import { HeroBlock } from './HeroBlock';
import { TextBlock } from './TextBlock';
import { FeaturesBlock } from './FeaturesBlock';
import { StatsBlock } from './StatsBlock';
import { FAQBlock } from './FAQBlock';
import { CTABlock } from './CTABlock';
import { TableBlock } from './TableBlock';
import { ShowcaseBlock } from './ShowcaseBlock';
import { GalleryBlock } from './GalleryBlock';
import { TimelineBlock } from './TimelineBlock';
import { ServicesGridBlock } from './ServicesGridBlock';
import { DownloadsBlock } from './DownloadsBlock';
import { ImageBlock } from './ImageBlock';
import { ImageTextBlock } from './ImageTextBlock';
import { VideoBlock } from './VideoBlock';
import { LogoCloudBlock } from './LogoCloudBlock';
import { TestimonialsBlock } from './TestimonialsBlock';
import { CardsBlock } from './CardsBlock';
import { ContactInfoBlock } from './ContactInfoBlock';
import { TeamBlock } from './TeamBlock';

export interface PageSectionData {
  id: number;
  section_type: string;
  section_order: number;
  config: any;
  is_active: number;
}

interface BlockRendererProps {
  section: PageSectionData;
}

export const BlockRenderer: React.FC<BlockRendererProps> = ({ section }) => {
  if (!section || !section.is_active) return null;

  switch (section.section_type) {
    case 'hero':
      return <HeroBlock config={section.config} />;
    case 'text':
      return <TextBlock config={section.config} />;
    case 'image':
      return <ImageBlock config={section.config} />;
    case 'image_text':
      return <ImageTextBlock config={section.config} />;
    case 'features':
      return <FeaturesBlock config={section.config} />;
    case 'stats':
      return <StatsBlock config={section.config} />;
    case 'faq':
      return <FAQBlock config={section.config} />;
    case 'cta':
      return <CTABlock config={section.config} />;
    case 'table':
      return <TableBlock config={section.config} />;
    case 'showcase':
      return <ShowcaseBlock config={section.config} />;
    case 'gallery':
      return <GalleryBlock config={section.config} />;
    case 'video':
      return <VideoBlock config={section.config} />;
    case 'logo_cloud':
      return <LogoCloudBlock config={section.config} />;
    case 'testimonials':
      return <TestimonialsBlock config={section.config} />;
    case 'cards':
      return <CardsBlock config={section.config} />;
    case 'contact_info':
      return <ContactInfoBlock config={section.config} />;
    case 'downloads':
      return <DownloadsBlock config={section.config} />;
    case 'team':
      return <TeamBlock config={section.config} />;
    case 'timeline':
      return <TimelineBlock config={section.config} />;
    case 'services_grid':
      return <ServicesGridBlock config={section.config} />;
    case 'html':
      return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div
            className="prose prose-slate max-w-none text-navy-900"
            dangerouslySetInnerHTML={{ __html: section.config?.html || '' }}
          />
        </div>
      );
    default:
      return null;
  }
};
