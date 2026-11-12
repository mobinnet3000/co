import { NavItem } from '../types';

/**
 * تب‌های مهم و ضروری هدر (مینیمال و غیرشلوغ متناسب با این مرحله)
 */
export const headerNavItems: NavItem[] = [
  {
    label: 'صفحه اصلی',
    path: '/',
  },
  {
    label: 'معرفی سامانه',
    path: '/platform',
  },
  {
    label: 'خدمات',
    path: '/services',
  },
  {
    label: 'درباره ما',
    path: '/about',
  },
  {
    label: 'تماس با ما',
    path: '/contact',
  },
];

export const navigationItems: NavItem[] = [
  {
    label: 'صفحه اصلی',
    path: '/',
  },
  {
    label: 'درباره شرکت',
    path: '/about',
    children: [
      {
        label: 'معرفی و چشم‌انداز',
        path: '/about',
        description: 'داستان، اهداف و ماموریت شرکت',
      },
      {
        label: 'شناسنامه رسمی شرکت',
        path: '/company',
        description: 'پروفایل جامع شرکتی مناسب کارفرمایان و شرکا (نسخه چاپی)',
      },
    ],
  },
  {
    label: 'سامانه تحلیل داده',
    path: '/platform',
  },
  {
    label: 'خدمات',
    path: '/services',
    children: [
      {
        label: 'دریافت و یکپارچه‌سازی داده‌های عملیاتی',
        path: '/services/industrial-data-management',
        description: 'جمع‌آوری و تجمیع داده‌های فرآیندی کارخانه',
      },
      {
        label: 'پردازش و آماده‌سازی داده',
        path: '/services/data-processing',
        description: 'پاک‌سازی، اعتبارسنجی و نرمال‌سازی داده‌های خام',
      },
      {
        label: 'تحلیل داده‌های صنعتی',
        path: '/services/industrial-data-analytics',
        description: 'شناسایی الگوها، نوسانات و پارامترهای موثر بر تولید',
      },
      {
        label: 'ارزیابی عملکرد خطوط فرآوری',
        path: '/services/process-performance-evaluation',
        description: 'بررسی شاخص‌های بهره‌وری، بازیابی و عیار کنسانتره',
      },
      {
        label: 'طراحی داشبوردهای تحلیلی',
        path: '/services/industrial-dashboard-design',
        description: 'داشبوردهای سفارشی مانیتورینگ پارامترهای عملیاتی',
      },
      {
        label: 'توسعه راهکارهای نرم‌افزاری صنعتی',
        path: '/services/custom-industrial-software',
        description: 'سیستم‌های تخصصی متناسب با الزامات کارخانجات فرآوری',
      },
    ],
  },
  {
    label: 'صنایع هدف',
    path: '/industries',
    children: [
      {
        label: 'کارخانه‌های فرآوری مواد معدنی',
        path: '/industries/mineral-processing',
        description: 'مدیریت داده‌های خردایش، فلوتاسیون و جدایش',
      },
      {
        label: 'فرآوری سنگ‌آهن',
        path: '/industries/iron-ore',
        description: 'خطوط کنسانتره‌سازی و گندله‌سازی',
      },
      {
        label: 'فرآوری مس',
        path: '/industries/copper',
        description: 'مدارهای آسیاکنی، فلوتاسیون و لیچینگ',
      },
      {
        label: 'صنایع سرب و روی',
        path: '/industries/lead-zinc',
        description: 'واحدهای تغلیظ و هیدرومتالورژی',
      },
    ],
  },
  {
    label: 'پروژه‌ها',
    path: '/projects',
  },
  {
    label: 'دانشنامه و مقالات',
    path: '/blog',
  },
  {
    label: 'تماس با ما',
    path: '/contact',
  },
];
