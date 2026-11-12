# راهنمای جامع استقرار در cPanel (FINAL CPANEL DEPLOYMENT GUIDE)
## سامانه شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو - Madan Co)

**دامنه عملیاتی:** `https://madan.ba3tani.ir`  
**بسته استقرار:** `dist-cpanel-release.zip`  
**محیط اجرا:** cPanel Setup Node.js App (Phusion Passenger)  
**نسخه پیشنهادی نود:** Node.js 22.23.4 (LTS)  
**فایل راه‌انداز اصلی:** `app.js`

---

## ۱. پیش‌نیازهای هاستینگ cPanel

قبل از شروع استقرار، مطمئن شوید هاست شما ویژگی‌های زیر را دارد:
1. ویژگی **Setup Node.js App** (پشتیبانی‌شده توسط CloudLinux و ماژول Phusion Passenger آپاچی).
2. دسترسی به **Terminal** در پنل cPanel (یا دسترسی SSH).
3. نسخه **Node.js 22.x** (به دلیل استفاده از ماژول بومی پایگاه‌داده `node:sqlite` بدون نیاز به کامپایلرهای سنگین پایتون یا `node-gyp`).
4. ساب‌دامین یا دامنه ایجاد شده: `madan.ba3tani.ir`.

---

## ۲. ساختار بسته انتشار (dist-cpanel-release.zip)

فایل زیپ تولید شده حاوی تمام اجزای مورد نیاز برای اجرای مستقیم است:
```text
dist-cpanel-release.zip
├── app.js                         # فایل ورودی اصلی سازگار با Passenger
├── package.json                   # تنظیمات اجرایی و وابستگی‌های Production
├── package-lock.json              # قفل دقیق نسخه‌های پکیج‌ها
├── .env.production.example        # قالب نمونه متغیرهای محیطی سرور
├── dist/                          # فرانت‌اند کامپایل‌شده + ۴۴ فایل پیش‌رندر ایستا
│   ├── index.html
│   ├── sitemap.xml
│   ├── robots.txt
│   ├── blog/
│   │   ├── index.html
│   │   ├── ai-in-mining/index.html
│   │   └── ...
│   └── assets/
├── server/
│   ├── dist/
│   │   └── index.js               # فایل یکپارچه باندل‌شده بک‌اند (ESM)
│   ├── data/                      # مسیر ذخیره دیتابیس SQLite
│   ├── uploads/                   # مسیر ذخیره مدیاها و تصاویر آپلودی
│   └── backups/                   # مسیر ذخیره نسخه‌های پشتیبان دیتابیس
└── scripts/
    ├── backup-db.js               # اسکریپت بک‌آپ اتوماتیک
    ├── restore-db.js              # اسکریپت ری‌استور
    └── reset-admin-password.js    # اسکریپت بازیابی رمز عبور مدیر از خط فرمان
```

---

## ۳. مراحل گام‌به‌گام استقرار در cPanel

### گام اول: آپلود و استخراج فایل انتشار
1. وارد کنترل پنل cPanel شوید.
2. به بخش **File Manager** بروید.
3. یک پوشه برای برنامه در دایرکتوری خانگی خود ایجاد کنید (مثلاً: `/home/username/madan_app`).
   > **نکته مهم:** پوشه برنامه نباید درون `public_html` باشد، بلکه باید در ریشه کاربر (Home Directory) قرار گیرد تا سورس کد مستقیماً در دسترس عموم نباشد.
4. فایل `dist-cpanel-release.zip` را درون پوشه `madan_app` آپلود کنید.
5. روی فایل راست‌کلیک کرده و گزینه **Extract** را انتخاب نمایید.

---

### گام دوم: ساخت برنامه در Setup Node.js App
1. در صفحه اصلی cPanel، روی آیکون **Setup Node.js App** کلیک کنید.
2. دکمه **Create Application** را بزنید و فیلدها را به این صورت پر کنید:
   - **Node.js version:** `22.23.4` (یا آخرین نسخه ۲۲ فعال روی هاست)
   - **Application mode:** `Production`
   - **Application root:** `madan_app` (مسیر پوشه‌ای که فایل‌ها را در آن Extract کردید)
   - **Application startup file:** `app.js`
   - **Application URL:** دامنه یا ساب‌دامین خود (`madan.ba3tani.ir`) را انتخاب کنید.
3. روی دکمه **Create** در گوشه بالا کلیک کنید.

---

### گام سوم: تنظیم متغیرهای محیطی (.env)
1. در همان صفحه Node.js App، به بخش **Environment variables** بروید (یا در File Manager فایل `.env.production.example` را به `.env` تغییر نام دهید).
2. متغیرهای زیر را ثبت کنید:

| نام متغیر (Variable) | مقدار پیشنهادی | توضیح |
|---|---|---|
| `NODE_ENV` | `production` | فعال‌سازی حالت عملیاتی |
| `PORT` | `3000` | پورت توسط Passenger تعیین می‌شود |
| `BASE_URL` | `https://madan.ba3tani.ir` | آدرس رسمی وب‌سایت |
| `JWT_SECRET` | یک رشته تصادفی ۶۴ کاراکتری | امضای توکن‌های احراز هویت |
| `INITIAL_ADMIN_PASSWORD` | یک کلمه عبور پیچیده | رمز عبور اولیه کاربر admin |
| `DATABASE_PATH` | `/home/username/madan_data/madanco.sqlite` (یا `server/data/madanco.sqlite`) | مسیر فایل دیتابیس SQLite (ترجیحاً خارج از پوشه کد) |
| `UPLOADS_DIR` | `/home/username/madan_data/uploads` (یا `server/uploads`) | مسیر آپلود فایل‌ها و رسانه‌ها |
| `BACKUP_DIR` | `/home/username/madan_data/backups` | مسیر ذخیره فایل‌های پشتیبان |

نمونه دستور در ترمینال سرور برای تولید یک کلید امن تصادفی برای `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

### گام چهارم: نصب وابستگی‌های اجرایی (NPM Install)
1. در صفحه Setup Node.js App، روی دکمه آبی‌رنگ **Run NPM Install** کلیک کنید.
2. چند لحظه صبر کنید تا پیام موفقیت آمیز نصب پکیج‌ها نمایش داده شود.

> **روش جایگزین از طریق ترمینال cPanel:**  
> دستور سبزرنگ فعال‌سازی محیط مجازی که در بالای صفحه Setup Node.js App نمایش داده شده را کپی کنید (چیزی شبیه به: `source /home/username/nodevenv/madan_app/22/bin/activate && cd /home/username/madan_app`).  
> وارد Terminal در cPanel شوید، دستور فوق را Paste کرده و اینتر بزنید. سپس دستور زیر را اجرا کنید:
> ```bash
> npm install --omit=dev
> ```

---

### گام پنجم: مقداردهی اولیه پایگاه‌داده و ایجاد کاربر ادمین
در محیط ترمینال cPanel (با محیط مجازی فعال‌شده):
```bash
# ایجاد جداول و داده‌های اولیه در دیتابیس SQLite
npm run db:seed
```
اگر کلمه عبور اولیه را در متغیر محیطی ست نکرده‌اید یا قصد تغییر فوری آن را دارید، دستور زیر را اجرا کنید:
```bash
npm run admin:reset-password -- admin "رمز_عبور_بسیار_قوی_شما"
```

---

### گام ششم: ری‌استارت و فعال‌سازی نهایی
1. به صفحه Setup Node.js App بازگردید.
2. روی دکمه **Restart** کلیک کنید.
3. در صورت نیاز، وضعیت برنامه را روی **Enabled** بگذارید.

---

### گام هفتم: فعال‌سازی گواهی رایگان SSL (AutoSSL)
1. در صفحه اصلی cPanel به بخش **SSL/TLS Status** بروید.
2. دامنه `madan.ba3tani.ir` را تیک بزنید.
3. دکمه **Run AutoSSL** را بفشارید تا گواهی معتبر Let's Encrypt یا cPanel Sectigo صادر و فعال گردد.

---

## ۴. چک‌لیست اعتبارسنجی پس از استقرار (Smoke Tests)

پس از بالا آمدن سایت، آدرس‌های زیر را در مرورگر بررسی کنید:
1. **بررسی سلامت سرور:**  
   آدرس `https://madan.ba3tani.ir/health` باید خروجی JSON زیر را بدهد:
   ```json
   { "status": "ok", "service": "madan-co-api", "uptime": 12.3 }
   ```
2. **بررسی صفحه اصلی:**  
   آدرس `https://madan.ba3tani.ir` باید صفحه شرکتی کامل با انیمیشن‌ها، لوگو و فونت فارسی را نمایش دهد.
3. **بررسی وبلاگ و مقاله تکی:**  
   به `https://madan.ba3tani.ir/blog` رفته و روی مقاله کلیک کنید. آدرس `https://madan.ba3tani.ir/blog/ai-in-mining` باید بدون ریدایرکت با متن کامل و TOC لود شود.
4. **ورود به پنل مدیریت:**  
   به `https://madan.ba3tani.ir/login` بروید و با نام کاربری `admin` و رمز عبور وارد شوید. داشبورد و دسترسی ویرایش محتوا را تست کنید.
5. **بررسی نقشه سایت:**  
   آدرس `https://madan.ba3tani.ir/sitemap.xml` ساختار XML استاندارد مقالات را نمایش دهد.

---

## ۵. پشتیبان‌گیری منظم و خودکار (Automated Backup & Maintenance)

دیتابیس سیستم در فایل `server/data/madanco.sqlite` ذخیره می‌شود. جهت پشتیبان‌گیری اتوماتیک روزانه:
1. در cPanel به بخش **Cron Jobs** بروید.
2. یک جاب روزانه در ساعت ۲ بامداد تنظیم کنید:
   ```bash
   source /home/username/nodevenv/madan_app/22/bin/activate && cd /home/username/madan_app && npm run db:backup >> /home/username/madan_app/cron.log 2>&1
   ```
فایل‌های بک‌آپ با پسوند `.sqlite` و برچسب تاریخ و ساعت در پوشه `server/backups/` نگهداری می‌شوند.
