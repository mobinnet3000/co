# راهنمای جامع توسعه، معماری و نگهداری نرم‌افزار (DEVELOPER GUIDE)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو - Madan Co)

این مستند، راهنمای مرجع فنی برای توسعه‌دهندگان، مهندسان نرم‌افزار و تیم‌های DevOps جهت راه‌اندازی، توسعه، تست، بیلد و نگهداری پلتفرم دیجیتال معدنکو است.

---

## ۱. معرفی پروژه و معماری کلی (Project Overview)

پلتفرم وب‌سایت و سامانه مدیریت محتوای معدنکو (Madan Co) یک راهکار نرم‌افزاری تجاری و محتوا‌محور است که با هدف معرفی خدمات تخصصی داده‌محور، متالورژی استخراجی، موازنه جرم کارخانجات کانی‌آرایی و پایش خطوط فرآوری معدنی توسعه یافته است.

### ارکان معماری نرم‌افزار:
- **Frontend:** طراحی کامپوننت‌محور با React 18، زبان TypeScript، بیلد سریع Vite و سیستم طراحی یکپارچه Tailwind CSS (شامل توکن‌های هویتی ماسه‌ای `#F7F3EE`، سرمه‌ای `#0F1821`، کهربایی `#EFA73F` و یاقوتی `#C92127`).
- **Backend API:** فریم‌ورک Express 5 بر بستر Node.js 22/24 با معماری ماژولار کنترلر-سرویس.
- **Database:** موتور بومی SQLite در حالت **WAL (Write-Ahead Logging)** با ماژول رسمی `node:sqlite` بدون نیاز به ابزارهای ساخت C++.
- **SEO & Static Generation:** اسکریپت پیش‌رندر ایستا جهت تولید اسناد HTML کامل برای خزنده‌های وب با داده‌های ساختاریافته Schema.org و تگ‌های OpenGraph.
- **Production Runtime:** سرور یکپارچه Passenger-compatible با فایل ورودی `app.js`، مناسب برای هاست‌های cPanel و سرورهای لینوکسی.

---

## ۲. پیش‌نیازها و محیط اجرا (Prerequisites)

- **Node.js:** نسخه `>= 22.0.0` (توصیه اکید: Node.js 22 LTS یا Node.js 24).
- **مدیر بسته‌ها:** `npm` نسخه `>= 10.0.0`.
- **سیستم‌عامل:** لینوکس (Ubuntu, Rocky Linux, CloudLinux/cPanel)، ویندوز ۱۰/۱۱ یا macOS.

---

## ۳. نصب وابستگی‌های پروژه (Installation)

برای نصب کامل پکیج‌ها در محیط توسعه:
```bash
# نصب پکیج‌های توسعه و اجرایی
npm install
```

در محیط‌های سرور یا خط لوله CI/CD:
```bash
# نصب سریع و قطعی بر اساس package-lock.json
npm ci
```

---

## ۴. اجرای محیط توسعه (Development Workflow)

پروژه به گونه‌ای طراحی شده که بک‌اند و فرانت‌اند به صورت همزمان با یک دستور اجرا شوند:

```bash
# اجرای همزمان سرور API (پورت 5000) و سرور Vite (پورت 3000)
npm run dev
```

در صورت نیاز به اجرای مجزا:
- **فقط سرور بک‌اند:**
  ```bash
  npm run server
  ```
- **فقط فرانت‌اند کلاینت:**
  ```bash
  npm run dev:client
  ```

---

## ۵. فرآیند ساخت و بیلد پروداکشن (Production Build)

فرآیند بیلد نهایی پروژه شامل ۴ مرحله خودکار است:
1. ارزیابی انواع تایپ‌اسکریپت (`tsc`).
2. کامپایل و فشرده‌سازی است‌های فرانت‌اند توسط Vite در پوشه `dist/`.
3. اجرای اسکریپت پیش‌رندر ایستا (`scripts/prerender.js`) و تولید ۴۴ فایل HTML سئو.
4. باندلینگ پرسرعت سورس‌کد بک‌اند توسط `esbuild` در فایل `server/dist/index.js`.

دستور اجرای بیلد:
```bash
npm run build
```

پس از بیلد، اجرای مستقیم سرور پروداکشن با فرمان زیر انجام می‌شود:
```bash
npm start
# معادل: node app.js
```

---

## ۶. اجرای تست‌های خودکار (Automated Testing)

پلتفرم دارای ۲۱ آزمون یکپارچگی بک‌اند است که سلامت روت‌ها، دیتابیس، احراز هویت، تفکیک پیش‌نویس‌ها و هر ۱۸ نوع بلوک صفحه‌ساز را ارزیابی می‌کنند:

```bash
# اجرای آزمون‌های یکپارچگی بک‌اند با نود تست رانر بومی
npm run test:backend
```

همچنین جهت اعتبارسنجی استاتیک کدهای تایپ‌اسکریپت:
```bash
npx tsc --noEmit
```

---

## ۷. پایگاه‌داده SQLite و مدیریت داده‌ها (Database)

- **محل ذخیره‌سازی:** به طور پیش‌فرض در `server/data/madanco.sqlite` (یا مقدار متغیر `DATABASE_PATH`).
- **حالت عملکرد:** `PRAGMA journal_mode = WAL;` و `PRAGMA foreign_keys = ON;` جهت حداکثر کارایی و همزمانی.
- **مقداردهی اولیه (Seeding):** تابع `initDatabase()` جداول را در صورت عدم وجود ایجاد کرده و `seedDatabase()` تنها رکوردهای ناموجود را درج می‌کند (هیچ داده موجودی در دیپلوی مجدد بازنویسی نمی‌شود).

### دستورات پشتیبان‌گیری و بازیابی:
```bash
# پشتیبان‌گیری امن با ارزیابی یکپارچگی
npm run db:backup

# بازیابی از آخرین فایل پشتیبان
npm run db:restore
```

---

## ۸. معماری Backend

سورس‌کد سرور در پوشه `server/src/` قرار دارد:
- `index.ts`: فایل اصلی سرور Express، پیکربندی میدل‌ورها، روت‌های API و سرویس‌دهی فرانت‌اند.
- `config.ts`: متمرکزسازی تمام تنظیمات و متغیرهای محیطی با فالبک‌های امن.
- `db/database.ts`: راه‌اندازی اتصال SQLite و تعریف ساختار جداول (DDL).
- `db/seed.ts`: داده‌های پیش‌فرض شامل دسته‌بندی‌ها، تگ‌ها و تنظیمات سازمانی.
- `controllers/`: منطق پردازشی کنترلرها (`articles`, `categories`, `menus`, `pages`, `pageSections`, `media`, `messages`, `analytics`, `seo`, `auth`, `users`, `settings`).
- `middleware/`: میدل‌ورهای احراز هویت JWT (`auth.ts`)، مدیریت خطا (`errorHandler.ts`) و اعتبارسنجی آپلود (`upload.ts`).
- `routes/`: تعریف مسیرهای RESTful تفکیک‌شده.

---

## ۹. معماری Frontend

سورس‌کد کلاینت در پوشه `src/` قرار دارد:
- `pages/`: صفحات اصلی شامل `HomePage`, `AboutPage`, `ServicesPage`, `IndustriesPage`, `BlogPage`, `BlogDetailPage`, `ContactPage`, `PlatformPage`, `ProjectsPage`, `CompanyPage`, `DynamicPage`.
- `pages/admin/`: صفحات پنل مدیریت شامل `AdminOverviewPage`, `AdminPagesPage`, `AdminBlogPage`, `AdminMenusPage`, `AdminMessagesPage`, `AdminMediaPage`, `AdminSeoPage`, `AdminUsersPage`, `AdminSettingsPage`.
- `components/blocks/`: رندرر ۱۸ نوع بلوک استاندارد CMS (`HeroBlock`, `TextBlock`, `ImageBlock`, `ImageTextBlock`, `FeaturesBlock`, `StatsBlock`, `CardsBlock`, `ShowcaseBlock`, `TableBlock`, `FAQBlock`, `CTABlock`, `ContactInfoBlock`, `TeamBlock`, `TestimonialsBlock`, `LogoCloudBlock`, `VideoBlock`, `DownloadsBlock`, `GalleryBlock`).
- `services/api.ts`: کلاینت فرانت‌اند برای فراخوانی تایپ‌شده تمام اندپوینت‌های سرور.
- `data/articles.ts`: آرشیو داده‌های ۱۸ مقاله فنی متالورژی جهت بارگذاری آنی و آفلاین کلاینت.

---

## ۱۰. پنل مدیریت و امنیت حساب‌ها (Admin System)

- **آدرس صفحه لاگین:** `/admin/login`
- **نحوه تغییر یا بازنشانی رمز عبور مدیر از خط فرمان:**
  ```bash
  npm run admin:reset-password <username> <new_password>
  # مثال:
  npm run admin:reset-password admin "MyStrongNewPassword#2026"
  ```
- **نقش‌های کاربری:**
  - `super_admin`: دسترسی نامحدود به تمامی بخش‌ها، تنظیمات و کاربران.
  - `admin`: مدیریت محتوا، صفحات، مقالات، منوها و پیام‌ها.
  - `editor`: نگارش و ویرایش مقالات و بارگذاری رسانه.

---

## ۱۱. جدول متغیرهای محیطی (Environment Variables)

| نام متغیر | توضیح عملکردی | مقدار نمونه / پیش‌فرض | ضرورت |
|---|---|---|:---:|
| `NODE_ENV` | محیط اجرای برنامه | `production` / `development` | اختیاری |
| `PORT` | پورت گوش دادن سرور (توسط cPanel Passenger تزریق می‌شود) | `5000` | اختیاری |
| `JWT_SECRET` | کلید رمزنگاری امضای توکن‌های نشست ادمین | رشته تصادفی ۶۴ کاراکتری | **بسیار مهم** |
| `DATABASE_PATH` | مسیر دائمی ذخیره‌سازی فایل دیتابیس SQLite | `/home/user/madan-data/madanco.sqlite` | **مهم** |
| `UPLOADS_DIR` | مسیر دائمی ذخیره فایل‌های آپلودشده | `/home/user/madan-data/uploads` | **مهم** |
| `CORS_ORIGIN` | دامنه‌های مجاز دسترسی API | `https://madan.co.ir,https://madan.ba3tani.ir` | مهم |
| `SITE_URL` | نشانی پایه وب‌سایت جهت تولید کنونیکال‌ها | `https://madan.co.ir` | اختیاری |
| `INITIAL_ADMIN_PASSWORD` | رمز اولیه مدیر هنگام اجرای اول دیتابیس نو | مقدار قوی دلخواه | اختیاری |

---

## ۱۲. بسته‌بندی و استقرار در cPanel (Deployment)

برای تولید پکیج فشرده مخصوص آپلود در cPanel File Manager:
```bash
npm run package:cpanel
```
این فرمان فایل **`dist-cpanel-release.zip`** را تولید می‌کند. مراحل بارگذاری در cPanel:
1. استخراج فایل زیپ در پوشه `madan_app` هاست.
2. ساخت اپلیکیشن در **Setup Node.js App** با نسخه نود **`22.23.4`** و فایل استارتاپ **`app.js`**.
3. کلیک روی **Run NPM Install** و سپس **Restart**.
*(راهنمای تفصیلی در [PHASE_5_DEPLOYMENT_GUIDE.md](file:///c:/Users/meck/Documents/co/PHASE_5_DEPLOYMENT_GUIDE.md) آمده است).*

---

## ۱۳. عیب‌یابی خطاهای رایج (Troubleshooting)

1. **خطای پورت یا عدم راه‌اندازی در cPanel:**
   - سرور نباید به پورت ۵۰۰۰ مقید باشد؛ `config.port` به صورت خودکار مقدار `process.env.PORT` تزریق‌شده توسط Passenger را می‌خواند.
2. **خطای Missing parameter name در روت‌ها:**
   - در اکسپرس ۵، وایلدکاردها نباید به صورت `*` استفاده شوند. روت‌ها با میدل‌ورهای استاندارد یا پارامترهای نام‌دار تنظیم شده‌اند.
3. **خطای SQLITE_CANTOPEN:**
   - اطمینان حاصل کنید که پوشه والد فایل دیتابیس وجود داشته و مجوز نوشتن (۷۵۵) به کاربر وب داده شده است.
4. **بروز مشکل در رفرش صفحات ری‌اکت:**
   - سرور اکسپرس با میدل‌ور SPA fallback هر مسیر صفحه ناموجود را به `dist/index.html` هدایت می‌کند، مگر اینکه فایل HTML پیش‌رندرشده آن وجود داشته باشد.

---

## ۱۴. اصول و خط‌مشی‌های امنیتی (Security Policies)

- **عدم افشای سکرت‌ها:** هرگز فایل `.env` را به مخزن گیت اضافه نکنید (در `.gitignore` لحاظ شده است).
- **اعتبارسنجی ورودی‌ها:** کلیه پارامترهای ورودی قبل از اجرای کوئری با Zod و اعتبارسنجی‌های سرور بررسی می‌شوند.
- **مسدودسازی فایل‌های خطرناک:** هیچ فایل با پسوندهای اسکریپتی (`.php`, `.sh`, `.exe`, `.py`, `.js`) قابل آپلود در سیستم نیست.

---

## ۱۵. گردش کار استاندارد توسعه (Development Workflow)

1. **انجام تغییرات و کدنویسی:** در پوشه‌های `src/` یا `server/src/`.
2. **آزمون یکپارچگی:** اجرای `npm run test:backend` جهت اطمینان از سلامت روت‌ها.
3. **بررسی تایپ:** اجرای `npx tsc --noEmit` جهت اعتبارسنجی کلاینت.
4. **بیلد پروداکشن:** اجرای `npm run build` و بازبینی صفحات خروجی در `dist/`.
5. **بسته‌بندی برای هاست:** اجرای `npm run package:cpanel` و استقرار خروجی.
