export interface CompanyInfo {
  officialNameFa: string;
  officialNameEn: string;
  brandName: string;
  taglineFa: string;
  taglineEn: string;
  descriptionFa: string;
  mission: string;
  vision: string;
  values: {
    title: string;
    description: string;
    icon: string;
  }[];
  // Configurable fields for unverified details
  details: {
    registrationNumber?: string;
    nationalId?: string;
    establishmentYear?: string;
    address?: string;
    phone?: string;
    email?: string;
    workingHours?: string;
    postalCode?: string;
  };
  socials: {
    linkedin?: string;
    telegram?: string;
    whatsapp?: string;
  };
}

export interface NavItem {
  label: string;
  path: string;
  children?: {
    label: string;
    path: string;
    description?: string;
  }[];
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  challenges: string[];
  features: string[];
  process: {
    step: string;
    title: string;
    description: string;
  }[];
  benefits: string[];
  relevantIndustries: string[];
  faq: {
    question: string;
    answer: string;
  }[];
  isAvailable: boolean; // Confirmed vs under evaluation
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  typicalOperations: string[];
  dataTypes: string[];
  analyticsOpportunities: string[];
  platformApplications: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  client?: string;
  industry: string;
  mineralType: string;
  scope: string;
  services: string[];
  technology: string[];
  completionDate?: string;
  results?: string[];
  image?: string;
  isVerified: boolean;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  summary: string;
  category: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  status: 'published' | 'draft';
  tableOfContents: {
    id: string;
    title: string;
  }[];
  contentHtml: string;
  tags: string[];
  faq?: {
    question: string;
    answer: string;
  }[];
}

export interface PlatformMetric {
  label: string;
  value: string;
  unit: string;
  change: string;
  status: 'optimal' | 'warning' | 'normal';
}

export interface PlatformWorkflowStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  inputs: string[];
  outputs: string[];
}
