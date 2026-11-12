# راهنمای جامع و گام‌به‌گام استقرار سامانه MadanCo در cPanel (نسخه رسمی فارسی)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (Madan Co)

**دامنه رسمی هدف:** `https://madan.co.ir`  
**بسته استقرار:** `dist-cpanel-release.zip`  
**محیط اجرا:** cPanel Setup Node.js App (Phusion Passenger)  
**نسخه پیشنهادی نود:** Node.js 22.23.4 (یا بالاتر)  
**فایل استارتاپ اصلی:** `app.js`

این راهنما منحصراً برای اجرا از طریق **رابط وب cPanel** و **Terminal داخلی cPanel** تدوین شده است و به هیچ‌گونه دسترسی SSH خارجی یا گیت وابسته نیست.

---

## ۱. نقشه معماری و تفکیک دایرکتوری‌ها در سرور

جهت تضمین **عدم از دست رفتن اطلاعات (Zero Data Loss)** در به‌روزرسانی‌های آینده، ساختار فایل‌ها در دایرکتوری خانگی هاست (`/home/USERNAME/`) به دو پوشه مجزا تفکیک می‌شود:

```text
/home/USERNAME/
│
├── madan_app/                    <-- پوشه کدهای برنامه (با هر آپدیت مجدداً اکسترکت می‌شود)
│   ├── app.js                    <-- ورودی استارتاپ Passenger
│   ├── package.json
│   ├── package-lock.json
│   ├── .env                      <-- تنظیمات سرور پروداکشن
│   ├── dist/                     <-- فایل‌های کامپایل‌شده فرانت‌اند و ۴۴ فایل پیش‌رندر ایستا
│   ├── server/dist/index.js      <-- فایل یکپارچه باندل‌شده سرور Express
│   └── scripts/                  <-- اسکریپت‌های مدیریت، ریست پسورد و بک‌آپ
│
└── madan_data/                   <-- پوشه دائمی داده‌ها (هیچ‌گاه با آپدیت دست‌نخورده باقی می‌ماند)
    ├── database/
    │   └── madanco.sqlite        <-- پایگاه‌داده اصلی SQLite (شامل مقالات، کاربران، پیام‌ها و صفحات)
    ├── uploads/                  <-- تصاویر، اسناد و رسانه‌های آپلودی CMS
    └── backups/                  <-- نسخه‌های پشتیبان خودکار روزانه
```

---

## ۲. مراحل گام‌به‌گام استقرار در cPanel

### مرحله ۱: ساخت دایرکتوری داده‌های دائمی (Persistent Data)
1. وارد **cPanel** شده و روی **Terminal** کلیک کنید (یا از طریق **File Manager** در مسیر `/home/USERNAME/` پوشه‌ها را بسازید).
2. دستورات زیر را برای ساخت ساختار ذخیره‌سازی دائمی اجرا کنید:
   ```bash
   mkdir -p /home/$USER/madan_data/database
   mkdir -p /home/$USER/madan_data/uploads
   mkdir -p /home/$USER/madan_data/backups
   mkdir -p /home/$USER/madan_app
   ```
   **خروجی مورد انتظار:** پوشه‌ها با موفقیت ساخته می‌شوند (بدون خطا).

---

### مرحله ۲: آپلود و استخراج بسته انتشار (`dist-cpanel-release.zip`)
1. در پنل cPanel به **File Manager** بروید.
2. وارد پوشه `madan_app` شوید.
3. فایل `dist-cpanel-release.zip` را آپلود کنید.
4. روی فایل راست‌کلیک کرده و گزینه **Extract** را بزنید تا تمام فایل‌ها مستقیماً درون پوشه `madan_app` باز شوند.
5. فایل `dist-cpanel-release.zip` را حذف کنید تا فضای هاست آزاد شود.

---

### مرحله ۳: ساخت Node.js Application در cPanel
1. در منوی اصلی cPanel، گزینه **Setup Node.js App** را باز کنید.
2. روی دکمه **Create Application** کلیک کرده و مشخصات را دقیقاً مطابق زیر وارد کنید:
   - **Node.js version:** `22.x` (توصیه: 22.23.4)
   - **Application mode:** `Production`
   - **Application root:** `madan_app`
   - **Application startup file:** `app.js`
   - **Application URL:** دامنه اصلی خود را انتخاب کنید: `madan.co.ir`
3. دکمه **Create** را در بالای صفحه بزنید.
   > **نکته:** برنامه ساخته شده و دستور فعال‌سازی محیط مجازی (nodevenv) با رنگ زرد/سبز در بالای صفحه ظاهر می‌شود.

---

### مرحله ۴: نصب وابستگی‌های برنامه (NPM Install)
1. در همان صفحه Node.js App، روی دکمه آبی‌رنگ **Run NPM Install** کلیک کنید.
2. منتظر بمانید تا پیام سبز موفقیت ظاهر شود.
   > **روش جایگزین از ترمینال cPanel:**  
   > خط فرمان نمایش‌داده‌شده در بالای صفحه Node.js App را کپی کرده و در ترمینال Paste کنید (چیزی شبیه به: `source /home/USERNAME/nodevenv/madan_app/22/bin/activate && cd /home/USERNAME/madan_app`) سپس دستور زیر را اجرا کنید:
   > ```bash
   > npm install --omit=dev
   > ```

---

### مرحله ۵: تنظیم متغیرهای محیطی (.env)
1. در ترمینال cPanel (با فعال بودن محیط مجازی):
   ```bash
   cp .env.production.example .env
   ```
2. تولید یک کلید امنیتی ۶۴ کاراکتری برای توکن‌های JWT:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   رشته تولیدشده را کپی کنید.
3. فایل `.env` را در File Manager یا با دستور `nano .env` باز کرده و مقادیر را تنظیم کنید:

```env
# محیط اجرا
NODE_ENV=production

# آدرس رسمی وب‌سایت
SITE_URL=https://madan.co.ir
BASE_URL=https://madan.co.ir
PLATFORM_LIVE_URL=https://madan.co.ir

# امضای امنیتی توکن‌های احراز هویت (حداقل ۶۴ کاراکتر تصادفی)
JWT_SECRET=کلید_۶۴_کاراکتری_تولیدشده_در_مرحله_قبل
JWT_EXPIRES_IN=7d

# مسیرهای پایدار داده‌ها (خارج از پوشه کدها)
DATABASE_PATH=/home/USERNAME/madan_data/database/madanco.sqlite
UPLOADS_DIR=/home/USERNAME/madan_data/uploads
BACKUP_DIR=/home/USERNAME/madan_data/backups

# تنظیمات اولیه حساب کاربری مدیر
INITIAL_ADMIN_USERNAME=admin
INITIAL_ADMIN_EMAIL=info@madan.co.ir
INITIAL_ADMIN_PASSWORD=یک_رمز_عبور_بسیار_قوی_و_پیچیده

# محدودسازی دامنه‌های مجاز CORS
CORS_ORIGIN=https://madan.co.ir,https://www.madan.co.ir
```
> **توجه:** به جای `USERNAME`، نام کاربری دقیق حساب cPanel خود را قرار دهید.

---

### مرحله ۶: نصب اولیه دیتابیس و تنظیم حساب مدیر
در ترمینال cPanel دستورات زیر را اجرا کنید:

1. **انتقال دیتابیس سید اولیه به مسیر دائمی (در صورت اولین راه‌اندازی):**
   ```bash
   if [ ! -f /home/$USER/madan_data/database/madanco.sqlite ]; then
     cp server/data/madanco.sqlite.seed /home/$USER/madan_data/database/madanco.sqlite
     echo "دیتابیس اولیه با موفقیت کپی شد."
   fi
   ```

2. **اعتبارسنجی و سید جداول:**
   ```bash
   npm run db:seed
   ```

3. **تنظیم یا بازنشانی رمز عبور مدیر ارشد:**
   ```bash
   npm run admin:reset-password -- admin "رمز_عبور_دلخواه_و_قوی_شما"
   ```
   **خروجی مورد انتظار:**
   ```text
   ✓ رمز عبور کاربر "admin" با موفقیت به‌روزرسانی شد.
     شناسه کاربری: 1
     ایمیل: info@madan.co.ir
   ```

---

### مرحله ۷: راه‌اندازی و ری‌استارت برنامه
1. به منوی **Setup Node.js App** در cPanel برگردید.
2. روی دکمه **Restart** کلیک کنید.
3. وضعیت اپلیکیشن باید **Enabled (سبز)** باشد.

---

### مرحله ۸: فعال‌سازی گواهی امنیتی SSL (AutoSSL)
1. در صفحه اصلی cPanel به بخش **SSL/TLS Status** بروید.
2. دامنه `madan.co.ir` و `www.madan.co.ir` را تیک بزنید.
3. دکمه **Run AutoSSL** را بفشارید تا گواهی امنیتی صادر و پروتکل HTTPS فعال شود.

---

## ۳. چک‌لیست تست و اعتبارسنجی عملیاتی

پس از بالا آمدن سایت، موارد زیر را در مرورگر یا با `curl` بررسی کنید:

| ردیف | آدرس آزمون | نتیجه مورد انتظار |
|:---:|---|---|
| ۱ | `https://madan.co.ir/health` | خروجی JSON با مقدار `"status": "healthy"` |
| ۲ | `https://madan.co.ir/api/health` | خروجی JSON با وضعیت سالم |
| ۳ | `https://madan.co.ir/` | صفحه اصلی سایت معدنکو با لود سریع بدون خطای کنسول |
| ۴ | `https://madan.co.ir/blog` | آرشیو مقالات و دانشنامه تخصصی فرآوری مواد معدنی |
| ۵ | `https://madan.co.ir/blog/factors-affecting-energy-consumption-in-comminution` | نمایش مقاله تکی با محتوای کامل، فهرست مطالب خودکار و عنوان فارسی |
| ۶ | `https://madan.co.ir/sitemap.xml` | ساختار XML نقشه سایت با لیست تمام صفحات و مقالات |
| ۷ | `https://madan.co.ir/robots.txt` | فایل راهنمای خزنده‌ها با مسدودسازی مسیرهای ادمین |
| ۸ | `https://madan.co.ir/admin/login` | صفحه ورود مدیران و ورود با نام کاربری `admin` |
| ۹ | `https://madan.co.ir/api/unhandled-test` | بازگرداندن پاسخ استاندارد JSON 404 (و نه HTML) |

---

## ۴. بررسی لاگ‌ها و عیب‌یابی خطاهای متداول

در صورت بروز مشکل:
1. در **File Manager** به مسیر ریشه برنامه (`madan_app`) بروید.
2. فایل‌های لاگ مسافر را بررسی کنید:
   - `stderr.log`: خطاهای راهبردی یا استارت‌آپ سرور.
   - `stdout.log`: خروجی‌های استاندارد کنسول.

### خطاهای متداول و راهکار برطرف‌سازی:
1. **خطای 503 Service Unavailable:**
   - معمولاً به دلیل ناتوانی Passenger در راه‌اندازی است. فایل `stderr.log` را بخوانید.
   - مطمئن شوید متغیر `JWT_SECRET` حداقل ۶۴ کاراکتر است.
2. **خطای SQLite Cant Open Database:**
   - مطمئن شوید پوشه `/home/USERNAME/madan_data/database` دسترسی نوشتن (Permission 755) دارد.
3. **خطای CORS Access Denied:**
   - در فایل `.env` متغیر `CORS_ORIGIN` را بررسی کنید که شامل `https://madan.co.ir,https://www.madan.co.ir` باشد.

---

## ۵. پشتیبان‌گیری منظم و بازیابی اضطراری (Backup & Restore)

### ۵.۱. پشتیبان‌گیری خودکار از طریق Cron Job در cPanel
1. در cPanel به بخش **Cron Jobs** بروید.
2. فرکانس زمانی را روی **Once Per Day (ساعت ۲:۰۰ بامداد)** تنظیم کنید:
   - دستور:
     ```bash
     source /home/$USER/nodevenv/madan_app/22/bin/activate && cd /home/$USER/madan_app && npm run db:backup >> /home/$USER/madan_data/backups/backup.log 2>&1
     ```
   پشتیبان‌ها با فرمت `madanco_backup_تاریخ.sqlite` درون پوشه `/home/USERNAME/madan_data/backups/` با ارزیابی سلامت ذخیره می‌شوند.

### ۵.۲. بازیابی نسخه پشتیبان (Restore):
در شرایط اضطراری در ترمینال cPanel:
```bash
source /home/$USER/nodevenv/madan_app/22/bin/activate && cd /home/$USER/madan_app
npm run db:restore
```
سپس دکمه **Restart** را در Setup Node.js App بزنید.

---

## ۶. گردش کار به‌روزرسانی به نسخه‌های جدید بدون ریسک از دست رفتن داده

هنگامی که در آینده نسخه جدیدی از سایت ارائه می‌شود:
1. فایل زیپ نسخه جدید را در پوشه `/home/USERNAME/madan_app` آپلود کنید.
2. فایل زیپ را درون همان پوشه **Extract** کنید (جایگزین شدن کدهای برنامه).
3. چون پایگاه‌داده و رسانه‌های آپلودی در دایرکتوری مجزای `/home/USERNAME/madan_data/` قرار دارند، **هیچ مقاله‌ای، پیامی، کاربری یا عکسی حذف نخواهد شد**.
4. در **Setup Node.js App** روی دکمه **Run NPM Install** و سپس **Restart** کلیک کنید.
5. نسخه جدید بدون کوچک‌ترین قطعی یا از دست رفتن اطلاعات فعال می‌شود.
