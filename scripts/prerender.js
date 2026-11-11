import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

// Define all routes to prerender
const routes = [
  {
    path: '/',
    title: 'معدنکو (Madan Co) | فناوری داده در خدمت معدن | محاسبات عملیات داده ارزیابی نوین',
    description: 'معدنکو (شرکت محاسبات عملیات داده ارزیابی نوین) - پلتفرم تخصصی پایش و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق تحلیل، موازنه و پردازش داده‌های عملیاتی.',
    keywords: 'معدنکو, madan co, فناوری داده در خدمت معدن, پایش خطوط فرآوری, بهینه سازی معدن',
    canonical: 'https://novin-amaliat.ir/',
  },
  {
    path: '/platform',
    title: 'سامانه تحلیل و پردازش داده‌های خطوط فرآوری | محاسبات عملیات داده ارزیابی نوین',
    description: 'بستر نرم‌افزاری دریافت، اعتبارسنجی، پردازش و تحلیل داده‌های خطوط فرآوری مواد معدنی با داشبوردهای تعاملی و موازنه متالورژیکی.',
    keywords: 'سامانه تحلیل داده فرآوری, نرم افزار متالورژی, داشبورد صنعتی فرآوری, موازنه جرم فرآوری',
    canonical: 'https://novin-amaliat.ir/platform',
  },
  {
    path: '/about',
    title: 'درباره ما | شرکت محاسبات عملیات داده ارزیابی نوین',
    description: 'آشنایی با ماموریت، رویکرد مهندسی و اهداف شرکت محاسبات عملیات داده ارزیابی نوین در حوزه فناوری داده و صنایع معدنی.',
    keywords: 'درباره شرکت محاسبات عملیات داده, مهندسی داده معدنی, تیم توسعه نرم افزار صنعتی',
    canonical: 'https://novin-amaliat.ir/about',
  },
  {
    path: '/company',
    title: 'شناسنامه رسمی و پروفایل شرکتی | محاسبات عملیات داده ارزیابی نوین',
    description: 'پروفایل جامع سازمانی شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود جهت ارائه به مدیران صنایع، کارفرمایان و سرمایه‌گذاران.',
    keywords: 'شناسنامه شرکتی محاسبات داده, مشخصات شرکت محاسبات عملیات داده ارزیابی نوین, پروفایل صنعتی',
    canonical: 'https://novin-amaliat.ir/company',
  },
  {
    path: '/services',
    title: 'راهکارها و خدمات تخصصی داده‌های صنعتی | محاسبات عملیات داده ارزیابی نوین',
    description: 'خدمات تخصصی یکپارچه‌سازی، پالایش داده، تحلیل داده‌های صنعتی، ارزیابی عملکرد و توسعه نرم‌افزارهای معدنی.',
    keywords: 'خدمات تحلیل داده معدنی, ارزیابی عملکرد خطوط فرآوری, طراحی داشبورد صنعتی, توسعه نرم افزار معدن',
    canonical: 'https://novin-amaliat.ir/services',
  },
  {
    path: '/services/industrial-data-management',
    title: 'دریافت و یکپارچه‌سازی داده‌های عملیاتی | خدمات تخصصی',
    description: 'سازماندهی جریان‌های متنوع داده‌های خطوط فرآوری در یک چارچوب داده‌ای ساختاریافته و قابل اتکا.',
    keywords: 'یکپارچه‌سازی داده‌های معدنی, لاگ‌بوک فرآوری, مخزن داده کارخانه',
    canonical: 'https://novin-amaliat.ir/services/industrial-data-management',
  },
  {
    path: '/services/data-processing',
    title: 'پردازش و آماده‌سازی داده | خدمات تخصصی',
    description: 'پاک‌سازی، فیلتر داده‌های ناهنجار و نرمال‌سازی متغیرهای فرآیندی برای دستیابی به اطلاعات قابل استناد.',
    keywords: 'پالایش داده صنعتی, فیلتر نویز کارخانه, مهندسی داده معدنی',
    canonical: 'https://novin-amaliat.ir/services/data-processing',
  },
  {
    path: '/services/industrial-data-analytics',
    title: 'تحلیل داده‌های صنعتی | خدمات تخصصی',
    description: 'بررسی رفتار متغیرهای خط، تحلیل همبستگی پارامترها و شناسایی گلوگاه‌های پنهان فرآیند تولید.',
    keywords: 'تحلیل آماری فرآوری, همبستگی متغیرهای خط, بهینه سازی کانی آرایی',
    canonical: 'https://novin-amaliat.ir/services/industrial-data-analytics',
  },
  {
    path: '/services/process-performance-evaluation',
    title: 'ارزیابی عملکرد خطوط فرآوری | خدمات تخصصی',
    description: 'محاسبه دقیق موازنه جرم، ارزیابی راندمان بازیابی، بررسی عیار کنسانتره و سنجش بهره‌وری تجهیزات.',
    keywords: 'موازنه جرم متالورژیکی, راندمان بازیابی, نسبت تغلیظ کنسانتره',
    canonical: 'https://novin-amaliat.ir/services/process-performance-evaluation',
  },
  {
    path: '/services/industrial-dashboard-design',
    title: 'طراحی داشبوردهای تحلیلی | خدمات تخصصی',
    description: 'پیاده‌سازی رابط‌های کاربری گرافیکی، بصری‌سازی روندها و نمایش وضعیت شاخص‌های کلیدی تولید.',
    keywords: 'داشبورد اتاق کنترل, مانیتورینگ متالورژیکی, UI صنعتی',
    canonical: 'https://novin-amaliat.ir/services/industrial-dashboard-design',
  },
  {
    path: '/services/custom-industrial-software',
    title: 'توسعه راهکارهای نرم‌افزاری صنعتی | خدمات تخصصی',
    description: 'برنامه‌نویسی و استقرار سامانه‌های داده‌محور سفارشی، متناسب با معماری فنی و فرآیندی کارفرما.',
    keywords: 'نرم افزار اختصاصی معدن, استقرار ایزوله کارخانه, سیستم سفارشی فرآوری',
    canonical: 'https://novin-amaliat.ir/services/custom-industrial-software',
  },
  {
    path: '/industries',
    title: 'صنایع هدف و حوزه‌های کاربرد | فرآوری سنگ‌آهن، مس، سرب و روی',
    description: 'راهکارهای داده‌محور ویژه کارخانجات فرآوری سنگ‌آهن، کنسانتره‌سازی مس، سرب و روی و صنایع کانی‌آرایی کشور.',
    keywords: 'صنایع معدنی, فرآوری مس, فرآوری سنگ آهن, صنایع سرب و روی',
    canonical: 'https://novin-amaliat.ir/industries',
  },
  {
    path: '/industries/mineral-processing',
    title: 'کارخانه‌های فرآوری مواد معدنی | صنایع هدف',
    description: 'راهکارهای جامع مدیریت و تحلیل داده‌های عملیاتی در مدارهای خردایش، طبقه‌بندی، فلوتاسیون و آبگیری.',
    keywords: 'کارخانه فرآوری, خردایش کانسنگ, فلوتاسیون',
    canonical: 'https://novin-amaliat.ir/industries/mineral-processing',
  },
  {
    path: '/industries/iron-ore',
    title: 'صنایع فرآوری سنگ‌آهن | صنایع هدف',
    description: 'مدیریت داده‌ها در خطوط تولید کنسانتره، جدایش مغناطیسی و واحدهای گندله‌سازی.',
    keywords: 'کنسانتره سنگ آهن, جدایش مغناطیسی, درام مگنت, گندله سازی',
    canonical: 'https://novin-amaliat.ir/industries/iron-ore',
  },
  {
    path: '/industries/copper',
    title: 'صنایع فرآوری مس | صنایع هدف',
    description: 'پایش و تحلیل داده‌های مدارهای فلوتاسیون مس-مولیبدن، آسیاهای نیمه‌خودشکن و بیولیچینگ.',
    keywords: 'فرآوری مس, فلوتاسیون مس, آسیای نیمه خودشکن SAG',
    canonical: 'https://novin-amaliat.ir/industries/copper',
  },
  {
    path: '/industries/lead-zinc',
    title: 'صنایع فرآوری سرب و روی | صنایع هدف',
    description: 'سازماندهی داده‌های مدارهای جدایش انتخابی فلوتاسیون سرب و روی و واحدهای هیدرومتالورژی.',
    keywords: 'فلوتاسیون سرب و روی, اسفالریت, هیدرومتالورژی روی',
    canonical: 'https://novin-amaliat.ir/industries/lead-zinc',
  },
  {
    path: '/projects',
    title: 'پروژه‌ها و مطالعات موردی | محاسبات عملیات داده ارزیابی نوین',
    description: 'آرشیو مستندات پروژه‌ها و مطالعات موردی شرکت محاسبات عملیات داده ارزیابی نوین در صنایع معدنی.',
    keywords: 'پروژه های تحلیل داده معدن, مطالعات موردی فرآوری, پروژه های صنعتی',
    canonical: 'https://novin-amaliat.ir/projects',
  },
  {
    path: '/blog',
    title: 'دانشنامه و مقالات تخصصی مهندسی داده و فرآوری معدنی',
    description: 'مقالات تحلیلی، متون تخصصی کانی‌آرایی، مهندسی داده صنعتی، مدیریت داده‌های عملیاتی و تحول دیجیتال در معادن.',
    keywords: 'مقالات مهندسی معدن, دانشنامه فرآوری مواد معدنی, هوشمندسازی معدن',
    canonical: 'https://novin-amaliat.ir/blog',
  },
  {
    path: '/blog/role-of-data-analytics-in-mineral-processing-performance',
    title: 'نقش تحلیل داده در بهبود عملکرد خطوط فرآوری مواد معدنی | دانشنامه',
    description: 'چگونه بررسی داده‌های عملیاتی و تحلیل متغیرهای فرآیندی می‌تواند به تثبیت کارایی خطوط سنگ‌شکنی، آسیاکنی و فلوتاسیون کمک کند؟',
    keywords: 'تحلیل داده معدن, فرآوری مواد معدنی, راندمان متالورژیکی',
    canonical: 'https://novin-amaliat.ir/blog/role-of-data-analytics-in-mineral-processing-performance',
  },
  {
    path: '/blog/importance-of-operational-data-management-in-processing-plants',
    title: 'چرا مدیریت داده‌های عملیاتی در کارخانه‌های فرآوری اهمیت دارد؟ | دانشنامه',
    description: 'بررسی دلایل پراکندگی داده‌ها در محیط‌های صنعتی، خطرات گزارش‌های ناهمخوان و راهکارهای غلبه بر جزیره‌های اطلاعاتی در معادن.',
    keywords: 'مدیریت داده صنعتی, یکپارچه‌سازی داده‌ها, موازنه مواد',
    canonical: 'https://novin-amaliat.ir/blog/importance-of-operational-data-management-in-processing-plants',
  },
  {
    path: '/blog/digital-transformation-in-mining-from-operational-data-to-intelligence',
    title: 'تحول دیجیتال در صنعت معدن؛ از داده‌های عملیاتی تا تصمیم‌گیری هوشمند | دانشنامه',
    description: 'نگاهی راهبردی به مسیر بلوغ دیجیتال در صنایع معدنی ایران و ضرورت بنا نهادن پایه‌های داده‌ای مستحکم پیش از پیاده‌سازی فناوری‌های پیچیده.',
    keywords: 'تحول دیجیتال معدن, هوشمندسازی معدن, استراتژی صنعتی',
    canonical: 'https://novin-amaliat.ir/blog/digital-transformation-in-mining-from-operational-data-to-intelligence',
  },
  {
    path: '/contact',
    title: 'تماس با ما و درخواست مشاوره | محاسبات عملیات داده ارزیابی نوین',
    description: 'ارتباط مستقیم با کارشناسان شرکت محاسبات عملیات داده ارزیابی نوین جهت بررسی نیازهای داده‌ای و دمو سامانه.',
    keywords: 'تماس با محاسبات داده نوین, مشاوره تحلیل داده معدنی, درخواست دمو',
    canonical: 'https://novin-amaliat.ir/contact',
  },
];

console.log('--- Starting Static Build-Time SEO Prerendering ---');

const templateHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(templateHtmlPath)) {
  console.error('dist/index.html not found! Run vite build first.');
  process.exit(1);
}

const templateHtml = fs.readFileSync(templateHtmlPath, 'utf-8');

routes.forEach((route) => {
  let html = templateHtml;

  // Replace Title
  html = html.replace(/<title>.*?<\/title>/i, `<title>${route.title}</title>`);

  // Replace Meta Description
  html = html.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace or Add Canonical
  if (html.includes('<link rel="canonical"')) {
    html = html.replace(
      /<link rel="canonical" href=".*?" \/>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );
  } else {
    html = html.replace('</head>', `  <link rel="canonical" href="${route.canonical}" />\n  </head>`);
  }

  // Replace Open Graph title and description
  html = html.replace(
    /<meta property="og:title" content=".*?" \/>/i,
    `<meta property="og:title" content="${route.title}" />`
  );
  html = html.replace(
    /<meta property="og:description" content=".*?" \/>/i,
    `<meta property="og:description" content="${route.description}" />`
  );

  // Output destination
  if (route.path === '/') {
    fs.writeFileSync(path.join(distDir, 'index.html'), html, 'utf-8');
    console.log(`Prerendered: / -> dist/index.html`);
  } else {
    const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
    if (!fs.existsSync(routeDir)) {
      fs.mkdirSync(routeDir, { recursive: true });
    }
    fs.writeFileSync(path.join(routeDir, 'index.html'), html, 'utf-8');
    console.log(`Prerendered: ${route.path} -> dist${route.path}/index.html`);
  }
});

console.log(`Successfully generated static HTML pages for ${routes.length} routes!`);
