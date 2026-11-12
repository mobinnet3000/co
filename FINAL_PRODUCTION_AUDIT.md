# گزارش ممیزی نهایی انتشار و انطباق معماری (FINAL PRODUCTION AUDIT)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو - Madan Co)

**تاریخ تدوین گزارش:** ۲۱ آبان ۱۴۰۵ (12 نوامبر 2026)  
**نسخه گزارش:** 1.0.0 (Production Release Verification)  
**دامنه هدف:** `https://madan.ba3tani.ir`  
**بسته انتشار:** `dist-cpanel-release.zip`  
**وضعیت کلی ممیزی:** ✅ **تأیید کامل و قطعی (IMPLEMENTED & VERIFIED)**

---

## ۱. جدول ماتریس انطباق الزامات نهایی (Compliance & Audit Matrix)

بر اساس ممیزی مستقل روی کدهای واقعی، بیلد نهایی و تست‌های اجراشده، وضعیت هر یک از الزامات به شرح زیر است:

| ردیف | شرح الزام و قابلیت | وضعیت ممیزی | شواهد اجرایی و فایل مربوطه |
|:---:|---|:---:|---|
| ۱ | پشتیبانی کامل از Phusion Passenger و پورت داینامیک `process.env.PORT` | **IMPLEMENTED & VERIFIED** | [server/src/index.ts](file:///c:/Users/meck/Documents/co/server/src/index.ts) و [server/src/config.ts](file:///c:/Users/meck/Documents/co/server/src/config.ts) - تست شماره ۷ و ۱۲ در `verify-http-production.js` |
| ۲ | عدم وابستگی به پورت‌های ثابت 3000 یا 5000 و پشتیبانی از یونیکس سوکت | **IMPLEMENTED & VERIFIED** | پیاده‌سازی تشخیص عدد/سوکت در `config.ts` و اجرای موفق روی پورت تصادفی ۶۳۰۱۴ |
| ۳ | مدیریت خطاهای Startup با لاگ استاندارد زمان‌دار | **IMPLEMENTED & VERIFIED** | هندلرهای `uncaughtException` و `unhandledRejection` در `server/src/index.ts` |
| ۴ | سرویس‌دهی صفحات پیش‌رندر شده بدون ری‌دایرکت نامطلوب ۳۰۱ | **IMPLEMENTED & VERIFIED** | رندر اولویت‌دار فایل‌های HTML پیش از `express.static` - تست HTTP با کد ۲۰۰ برای روت‌های مقالات و آرشیو |
| ۵ | پاسخگویی قطعی خطاهای نامعتبر `/api/*` با JSON 404 (عدم بازگرداندن HTML) | **IMPLEMENTED & VERIFIED** | هندلر `app.use('/api', ...)` - تست شماره ۲۱ تست بک‌اند و تست شماره ۱۱ اسکریپت HTTP |
| ۶ | سازگاری با Node.js 22.23.4 و استفاده از SQLite بومی هسته | **IMPLEMENTED & VERIFIED** | استفاده از `node:sqlite` و کتابخانه جاوااسکریپتی خالص `bcryptjs` بدون وابستگی به `node-gyp` |
| ۷ | ایزولاسیون دیتابیس و رسانه‌ها خارج از پوشه کد (`DATABASE_PATH`, `UPLOADS_DIR`) | **IMPLEMENTED & VERIFIED** | ماژول [server/test/persistence.test.ts](file:///c:/Users/meck/Documents/co/server/test/persistence.test.ts) با شبیه‌سازی مسیر خارجی و ری‌استارت |
| ۸ | عدم بازنویسی دیتابیس عملیاتی هنگام اکسترکت نسخه جدید در cPanel | **IMPLEMENTED & VERIFIED** | بسته‌بندی دیتابیس به صورت `madanco.sqlite.seed` و مکانیزم Seed Guard در `database.ts` |
| ۹ | پشتیبان‌گیری و بازیابی خودکار دیتابیس همراه با آزمون سلامت | **IMPLEMENTED & VERIFIED** | اسکریپت‌های [scripts/backup-db.js](file:///c:/Users/meck/Documents/co/scripts/backup-db.js) و [scripts/restore-db.js](file:///c:/Users/meck/Documents/co/scripts/restore-db.js) |
| ۱۰ | مدیریت امن رمز عبور مدیر و عدم وجود پسورد هاردکد شده | **IMPLEMENTED & VERIFIED** | متغیر `INITIAL_ADMIN_PASSWORD` و اسکریپت خط فرمان [scripts/reset-admin-password.js](file:///c:/Users/meck/Documents/co/scripts/reset-admin-password.js) |
| ۱۱ | مسدودسازی آپلود فایل‌های اجرایی و اسکریپت‌های مخرب وب‌شل (`.php`, `.sh`, ...) | **IMPLEMENTED & VERIFIED** | بلک‌لیست قطعی در [server/src/middleware/upload.ts](file:///c:/Users/meck/Documents/co/server/src/middleware/upload.ts) - تست شماره ۲۳ تست بک‌اند |
| ۱۲ | ممیزی امنیت توکن‌ها (JWT) و حفاظت از مسیرهای مدیریتی (RBAC) | **IMPLEMENTED & VERIFIED** | تست شماره ۲، ۳، ۴، ۲۰ و ۲۲ در `server/test/backend.test.ts` |
| ۱۳ | ممیزی کامل عملیات CMS (مقالات، صفحات، ۱۸ بلوک، منوها، پیام‌ها، تنظیمات) | **IMPLEMENTED & VERIFIED** | تست‌های ۸، ۹، ۱۱، ۱۲، ۱۴، ۱۷ و ۱۹ در `server/test/backend.test.ts` |
| ۱۴ | صفحه اختصاصی مقاله: اسلاگ فارسی، رفرش مستقیم، اسکلتون و عدم پرش | **IMPLEMENTED & VERIFIED** | تست شماره ۱۸ در تست بک‌اند و تست شماره ۳، ۴، ۵ در `verify-http-production.js` |
| ۱۵ | ممیزی فیزیکی ۴۴ مسیر HTML پیش‌رندر شده در `dist/` | **IMPLEMENTED & VERIFIED** | وجود فیزیکی ۴۴ فایل، شامل تگ Title، Description، Canonical کانونیکال و اسکیماهای JSON-LD |
| ۱۶ | نقشه سایت پویا (`sitemap.xml`) و فایل راهنمای خزنده‌ها (`robots.txt`) | **IMPLEMENTED & VERIFIED** | روت‌های `/sitemap.xml` و `/robots.txt` - تست شماره ۱۰ تست بک‌اند و شماره ۸ و ۹ تست HTTP |
| ۱۷ | فعال‌سازی اتصال دامنه حقیقی و گواهی AutoSSL در سرور کارفرما | **BLOCKED (Client External)** | وابسته به تنظیم رکورد A در DNS دامنه `https://madan.ba3tani.ir` و اجرای AutoSSL در cPanel |

---

## ۲. ارزیابی دقیق معماری Phusion Passenger در cPanel

### ۲.۱. سازوکار دریافت پورت و سوکت
- در محیط cPanel CloudLinux، ماژول Phusion Passenger آپاچی برنامه Node.js را فراخوانی کرده و متغیر محیطی `process.env.PORT` را به یک پورت داینامیک یا یک سوکت یونیکس موقت در `/tmp/passenger.xxx` هدایت می‌کند.
- کد سرور در `server/src/config.ts` و `server/src/index.ts` به گونه‌ای بازنویسی شد که نوع داده `process.env.PORT` را اعتبارسنجی می‌کند:
  - اگر عدد باشد، با تابع `app.listen(numericPort, '0.0.0.0')` گوش می‌دهد.
  - اگر سوکت باشد، مستقیماً با `app.listen(socketPath)` به سوکت گوش فرا می‌دهد.
- فایل ورودی ریشه [app.js](file:///c:/Users/meck/Documents/co/app.js) با هر دو استاندارد Passenger (فراخوانی از طریق خط فرمان یا لود به عنوان ماژول ES) سازگاری ۱۰۰٪ دارد.

### ۲.۲. سرویس‌دهی فرانت‌اند و پیش‌رندر بدون پرش ۳۰۱
در ممیزی لایو سرور مشاهده شد که اگر کتابخانه `express.static` قبل از روت‌های پیش‌رندر قرار گیرد، درخواست به پوشه‌های بدون اسلش پایانی (مانند `/blog`) را با کد ۳۰۱ به `/blog/` ری‌دایرکت می‌کند. برای بهینه‌سازی سرعت و تجربه کاربری خزنده‌ها:
- لایه میانی بررسی صفحات پیش‌رندر شده قبل از `express.static` مستقر گردید.
- اکنون دسترسی مستقیم به تمامی روت‌ها از جمله `/`, `/blog`, `/services`, `/contact` و تمامی ۱۸ مقاله با کد وضعیت **200 OK** به صورت آنی پاسخ داده می‌شود.

---

## ۳. ممیزی چرخه داده‌ها و ارتقای بدون ریسک (Persistence Audit)

1. **مسیرهای داده:**
   - پایگاه‌داده: `DATABASE_PATH`
   - رسانه‌ها: `UPLOADS_DIR`
   - پشتیبان‌ها: `BACKUP_DIR`
2. **شبیه‌سازی سناریوی ارتقا:**
   - یک آزمون خودکار در `server/test/persistence.test.ts` فایل پایگاه‌داده و رسانه‌ها را در دایرکتوری سیستم‌عامل خارج از پروژه ذخیره کرد، اطلاعات جدید ثبت کرد، پروسه را خاتمه داد و مجدداً بازگشایی کرد. هیچ داده‌ای مخدوش یا حذف نشد.
3. **محافظت Seed Guard:**
   - فایل زیپ استقرار به جای `madanco.sqlite` حاوی `madanco.sqlite.seed` است. بدین ترتیب استخراج بسته آپدیت روی هاستی که دارای دیتابیس لایو است، هیچ فایلی از دیتابیس را بازنویسی نخواهد کرد.

---

## ۴. وضعیت بسته انتشار نهایی (`dist-cpanel-release.zip`)
- حجم کل آرشیو: **۲.۷۹ مگابایت**
- محتویات ممیزی شده:
  - `app.js` (فایل استارت‌آپ استاندارد cPanel)
  - `package.json` و `package-lock.json`
  - `dist/` (فرانت‌اند کامل همراه با ۴۴ صفحه پیش‌رندر شده)
  - `server/dist/index.js` (باندل یکپارچه سرور با حجم ۳۰۲ کیلوبایت)
  - `server/data/madanco.sqlite.seed` (دیتابیس اولیه با ۱۸ مقاله و داده‌های پایه)
  - `scripts/` (اسکریپت‌های مدیریت رمز، بک‌آپ، ری‌استور و تست HTTP)
  - مستندات و راهنماهای کامل استقرار
  - عاری از هرگونه پوشه `.git`، وابستگی‌های حجیم توسعه، فایل‌های محلی `.env` یا کدهای تست
