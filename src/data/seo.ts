export interface PageSEO {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  structuredDataType?: 'Organization' | 'WebSite' | 'WebPage' | 'Service' | 'Article';
}

export const defaultSEO = {
  siteName: 'معدنکو (Madan Co) | محاسبات عملیات داده ارزیابی نوین',
  siteUrl: 'https://madan.co.ir',
  defaultOgImage: 'https://madan.co.ir/brand-palette.jpg',
  twitterHandle: '@madanco_ir',
  searchConsoleVerification: '<!-- GSC_VERIFICATION_TOKEN_PLACEHOLDER -->',
  gaTrackingId: '<!-- GA4_MEASUREMENT_ID_PLACEHOLDER -->',
  keywordsClusters: {
    persian: [
      'معدنکو',
      'madan co',
      'فناوری داده در خدمت معدن',
      'پایش خطوط فرآوری',
      'بهینه‌سازی خطوط فرآوری',
      'محاسبات عملیات داده ارزیابی نوین',
      'تحلیل داده معدن',
      'مدیریت داده‌های عملیاتی',
      'نرم افزار کارخانه فرآوری',
      'هوشمندسازی معدن',
      'موازنه متالورژیکی',
    ],
    english: [
      'Madan Co',
      'Mining Data Analytics',
      'Mineral Processing Data Analytics',
      'Operational Optimization',
      'Process Performance Monitoring',
      'Industrial Data Platform',
    ],
  },
};

export const pagesSEO: Record<string, PageSEO> = {
  home: {
    title: 'معدنکو (Madan Co) | فناوری داده در خدمت معدن | محاسبات عملیات داده ارزیابی نوین',
    description: 'معدنکو (شرکت محاسبات عملیات داده ارزیابی نوین) - پلتفرم تخصصی پایش و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق تحلیل، موازنه و پردازش داده‌های عملیاتی.',
    keywords: ['معدنکو', 'madan co', 'فناوری داده در خدمت معدن', 'پایش خطوط فرآوری', 'بهینه سازی معدن', 'تحلیل داده معدن'],
    canonical: 'https://madan.co.ir/',
    structuredDataType: 'WebSite',
  },
  platform: {
    title: 'سامانه پایش و بهینه‌سازی خطوط فرآوری | معدنکو Madan Co',
    description: 'بستر نرم‌افزاری دریافت، اعتبارسنجی، پردازش و تحلیل داده‌های خطوط فرآوری مواد معدنی با داشبوردهای تعاملی و موازنه متالورژیکی معدنکو.',
    keywords: ['سامانه معدنکو', 'پایش خطوط فرآوری', 'نرم افزار متالورژی', 'داشبورد صنعتی فرآوری', 'موازنه جرم فرآوری'],
    canonical: 'https://madan.co.ir/platform',
    structuredDataType: 'WebPage',
  },
  about: {
    title: 'درباره معدنکو و شرکت محاسبات عملیات داده ارزیابی نوین',
    description: 'آشنایی با ماموریت، رویکرد مهندسی و ارزش‌های معدنکو در حوزه فناوری داده و صنایع معدنی.',
    keywords: ['درباره معدنکو', 'درباره شرکت محاسبات عملیات داده', 'مهندسی داده معدنی'],
    canonical: 'https://madan.co.ir/about',
    structuredDataType: 'Organization',
  },
  company: {
    title: 'شناسنامه رسمی شرکت محاسبات عملیات داده ارزیابی نوین (معدنکو)',
    description: 'پروفایل جامع سازمانی شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو) جهت ارائه به مدیران صنایع، کارفرمایان و سرمایه‌گذاران.',
    keywords: ['شناسنامه معدنکو', 'مشخصات شرکت محاسبات عملیات داده ارزیابی نوین', 'پروفایل صنعتی'],
    canonical: 'https://madan.co.ir/company',
    structuredDataType: 'Organization',
  },
  services: {
    title: 'راهکارها و خدمات تخصصی داده‌های صنعتی | معدنکو',
    description: 'خدمات تخصصی یکپارچه‌سازی، پالایش داده، تحلیل داده‌های صنعتی، ارزیابی عملکرد و توسعه نرم‌افزارهای معدنی معدنکو.',
    keywords: ['خدمات معدنکو', 'ارزیابی عملکرد خطوط فرآوری', 'طراحی داشبورد صنعتی', 'توسعه نرم افزار معدن'],
    canonical: 'https://madan.co.ir/services',
    structuredDataType: 'Service',
  },
  industries: {
    title: 'صنایع هدف و حوزه‌های کاربرد | فرآوری سنگ‌آهن، مس، سرب و روی | معدنکو',
    description: 'راهکارهای داده‌محور ویژه کارخانجات فرآوری سنگ‌آهن، کنسانتره‌سازی مس، سرب و روی و صنایع کانی‌آرایی کشور.',
    keywords: ['صنایع معدنی', 'فرآوری مس', 'فرآوری سنگ آهن', 'صنایع سرب و روی'],
    canonical: 'https://madan.co.ir/industries',
    structuredDataType: 'WebPage',
  },
  projects: {
    title: 'پروژه‌ها و مطالعات موردی | معدنکو',
    description: 'آرشیو مستندات پروژه‌ها و مطالعات موردی معدنکو در صنایع معدنی.',
    keywords: ['پروژه های معدنکو', 'مطالعات موردی فرآوری', 'پروژه های صنعتی'],
    canonical: 'https://madan.co.ir/projects',
    structuredDataType: 'WebPage',
  },
  blog: {
    title: 'دانشنامه و مقالات تخصصی مهندسی داده و فرآوری معدنی | معدنکو',
    description: 'مقالات تحلیلی، متون تخصصی کانی‌آرایی، مهندسی داده صنعتی، مدیریت داده‌های عملیاتی و تحول دیجیتال در معادن.',
    keywords: ['دانشنامه معدنکو', 'مقالات مهندسی معدن', 'آموزش تحلیل داده های صنعتی'],
    canonical: 'https://madan.co.ir/blog',
    structuredDataType: 'WebPage',
  },
  contact: {
    title: 'تماس با معدنکو Madan Co | محاسبات عملیات داده ارزیابی نوین',
    description: 'ارتباط مستقیم با کارشناسان شرکت معدنکو از طریق تماس تلفنی، پیام‌رسان‌ها و نشانی دفتر مرکزی تهران.',
    keywords: ['تماس با معدنکو', 'تلفن معدنکو', 'شماره تماس مهندسی داده معدنی'],
    canonical: 'https://madan.co.ir/contact',
    structuredDataType: 'WebPage',
  },
};
