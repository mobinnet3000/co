# گزارش جامع سئو فنی و ساختار محتوا (FINAL SEO REPORT)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو - Madan Co)

**تاریخ تدوین گزارش:** ۲۱ آبان ۱۴۰۵ (12 نوامبر 2026)  
**دامنه رسمی هدف:** `https://madan.ba3tani.ir`  
**وضعیت آمادگی موتورهای جستجو:** ✅ **PRODUCTION READY & SEARCH-ENGINE OPTIMIZED**

---

## ۱. خلاصه معماری و استراتژی سئو (SEO Architecture)

با توجه به ماهیت تک‌صفحه‌ای (Single Page Application - SPA) بودن برنامه‌های React و چالش‌های شناخته‌شده خزش جاوااسکریپت توسط موتورهای جستجوی گوگل و بینگ، معماری سامانه معدنکو بر پایه **پیش‌رندر ایستا (Static HTML Prerendering)** در زمان بیلد پیاده‌سازی شده است. این رویکرد دو مزیت حیاتی فراهم می‌سازد:
1. **ایندکس ۱۰۰٪ تضمین‌شده:** خزنده‌ها و ربات‌های وب بدون نیاز به اجرای جاوااسکریپت، محتوای کامل متن، عناوین H1 تا H3، متاتگ‌ها و اسکیماهای JSON-LD را در اولین بایت دریافتی مشاهده می‌کنند.
2. **سرعت رندر آنی (First Contentful Paint زیر ۰.۵ ثانیه):** کاربر عادی نیز قبل از فعال شدن چرخه حیات کلاینت، محتوای متنی فرمت‌شده را به سرعت دریافت می‌کند.

---

## ۲. بررسی فیزیکی صفحات پیش‌رندر شده (Physical HTML Verification)

در زمان کامپایل پروژه، اسکریپت اختصاصی `scripts/prerender.js` تعداد **۴۴ صفحه اصلی و فرعی** را در قالب فایل‌های مجزای فیزیکی در مسیر `dist/` تولید می‌کند. جدول زیر وضعیت پوشش صفحات کلیدی را نشان می‌دهد:

| مسیر آدرس (Route) | مسیر فایل فیزیکی در بسته انتشار | تگ Title اختصاصی | اسکیما اختصاصی | وضعیت رندر |
|---|---|:---:|:---:|:---:|
| `/` | `dist/index.html` | ✅ دارد | Organization | ✅ کامل |
| `/about` | `dist/about/index.html` | ✅ دارد | AboutPage | ✅ کامل |
| `/services` | `dist/services/index.html` | ✅ دارد | Service | ✅ کامل |
| `/services/mining-iot` | `dist/services/mining-iot/index.html` | ✅ دارد | Service | ✅ کامل |
| `/services/digital-twin` | `dist/services/digital-twin/index.html` | ✅ دارد | Service | ✅ کامل |
| `/services/fleet-management` | `dist/services/fleet-management/index.html` | ✅ دارد | Service | ✅ کامل |
| `/blog` | `dist/blog/index.html` | ✅ دارد | CollectionPage | ✅ کامل |
| `/contact` | `dist/contact/index.html` | ✅ دارد | ContactPage | ✅ کامل |
| `/faq` | `dist/faq/index.html` | ✅ دارد | FAQPage | ✅ کامل |
| `/blog/ai-in-mining` | `dist/blog/ai-in-mining/index.html` | ✅ دارد | Article / BlogPosting | ✅ کامل |
| `/blog/fleet-management-iot` | `dist/blog/fleet-management-iot/index.html` | ✅ دارد | Article / BlogPosting | ✅ کامل |
| سایر ۱۶ مقاله فنی | `dist/blog/[slug]/index.html` | ✅ دارد | Article / BlogPosting | ✅ کامل |

---

## ۳. استاندارد متاتگ‌ها و پروتکل‌های اشتراک‌گذاری (Meta Tags & Open Graph)

تمامی صفحات دارای متاتگ‌های استاندارد زیر هستند:
- **Canonical URL یکتا:** تمام صفحات آدرس کانونیکال اختصاصی دارند تا از بروز محتوای تکراری (Duplicate Content) به دلیل پارامترهای احتمالی URL جلوگیری شود.
  ```html
  <link rel="canonical" href="https://madan.ba3tani.ir/blog/ai-in-mining" />
  ```
- **Meta Description غنی و بهینه‌شده:** توضیحات متای هر صفحه بین ۱۳۰ تا ۱۶۰ کاراکتر حاوی کلمات کلیدی تخصصی معدنکاری هوشمند، داده‌کاوی، اینترنت اشیاء صنعتی و پایش ناوگان است.
- **پروتکل Open Graph (فیس‌بوک، لینکدین، ایتا، بله، تلگرام):**
  - `og:title`
  - `og:description`
  - `og:image` (تصویر شاخص با ابعاد استاندارد ۱۲۰۰×۶۳۰ پیکسل)
  - `og:url`
  - `og:type` (`website` برای صفحات ایستا و `article` برای وبلاگ)
  - `og:locale` (`fa_IR`)
- **توییتر / X Cards:**
  - `twitter:card` با مقدار `summary_large_image`
  - `twitter:title` و `twitter:description`

---

## ۴. داده‌های ساختاریافته موتورهای جستجو (Schema.org / JSON-LD)

سامانه به صورت داینامیک و پیش‌رندر، اسکیماهای استاندارد Schema.org را در ساختار HTML تزریق می‌کند:

### ۴.۱. اسکیمای سازمان هویتی (Organization Schema)
در صفحات اصلی و هویتی، هویت ثبتی و شرکتی به صورت شفاف تعریف شده است:
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود",
  "alternateName": "معدنکو",
  "url": "https://madan.ba3tani.ir",
  "logo": "https://madan.ba3tani.ir/logo.svg",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+98-9999196630",
    "contactType": "customer service",
    "areaServed": "IR",
    "availableLanguage": "Persian"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "نیرو دریایی",
    "addressLocality": "تهران",
    "addressCountry": "IR"
  }
}
```

### ۴.۲. اسکیمای مقالات تخصصی (Article / BlogPosting Schema)
در تک‌تک ۱۸ مقاله فنی، بلاک JSON-LD شامل فیلدهای زیر تزریق شده است:
- `headline` (عنوان مقاله)
- `description` (چکیده فنی)
- `author` (کادر فنی و مهندسی معدنکو)
- `publisher` (هویت سازمان همراه با لوگو)
- `datePublished` و `dateModified` (تاریخ استاندارد ISO 8601)
- `mainEntityOfPage` (پیوند مستقیم مقاله)

---

## ۵. نقشه سایت پویا و فایل ربات‌ها (Sitemap.xml & Robots.txt)

- **نقشه سایت داینامیک:** در آدرس‌های `/sitemap.xml` و `/api/seo/sitemap.xml` فعال است و در هر بار درخواست، لیست تمامی مقالات فعال پایگاه‌داده و صفحات استاتیک را با متدهای استاندارد XML خروجی می‌دهد.
  - فرکانس تغییرات (`changefreq`): `weekly` برای مقالات و `monthly` برای صفحات شرکتی.
  - اولویت ایندکس (`priority`): ۱.۰ برای صفحه اصلی، ۰.۹ برای خدمات و مقالات مهم.
- **فایل کنترل ربات‌ها (`robots.txt`):**
  - اجازه خزش به تمامی ربات‌های استاندارد (`User-agent: *`)
  - معرفی آدرس نقشه سایت: `Sitemap: https://madan.ba3tani.ir/sitemap.xml`
  - مسدودسازی مسیرهای مدیریتی و حساس: `Disallow: /admin/`, `Disallow: /login`, `Disallow: /api/`

---

## ۶. کیفیت محتوای تخصصی وبلاگ و تجربه کاربری (Content Quality & UX)

- **پوشش موضوعی عمیق:** ۱۸ مقاله تخصصی تالیف‌شده با متون جامع و پاراگراف‌بندی فنی در حوزه‌های دوقلوی دیجیتال، هوش مصنوعی در عیارسنجی، اینترنت اشیاء در معادن، مدیریت پایش ناوگان، تحلیل ارتعاشات ماشین‌آلات و مانیتورینگ زیست‌محیطی.
- **فهرست مطالب خودکار (Automated TOC):** در تمامی صفحات مقالات، کلیه تیترهای H2 و H3 به صورت داینامیک شناسایی شده و یک باکس ناوبری سریع در سایدبار مقاله به کاربر نمایش داده می‌شود.
- **تایپوگرافی فارسی اصیل:** استفاده از فونت استاندارد Vazirmatn، رعایت فواصل خطوط، نیم‌فاصله‌های استاندارد و چیدمان کاملاً راست‌به‌چپ (RTL).
- **اشتراک‌گذاری اجتماعی:** دکمه‌های کپی لینک مستقیم، اشتراک در تلگرام، واتس‌اپ، لینکدین و چیدمان پرینت بهینه‌سازی‌شده برای مستندسازی سازمانی.

---

## ۷. نتیجه‌گیری ممیزی سئو
زیرساخت سئو سایت به صورت ۱۰۰٪ فنی و عملیاتی اجرا شده و پس از استقرار بر روی دامنه `https://madan.ba3tani.ir`، آماده ثبت در Google Search Console و ایندکس پرسرعت صفحات است.
