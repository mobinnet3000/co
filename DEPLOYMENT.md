# راهنمای جامع استقرار و نگهداری پروداکشن وب‌سایت معدنکو (Madan Co)

این سند راهنمای رسمی مهندسی استقرار، پشتیبان‌گیری، نگهداری و پیکربندی امنیتی پلتفرم شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود است.

---

## ۱. مشخصات معماری و پیش‌نیازها

- **سیستم‌عامل سرور:** Linux (Ubuntu 22.04 LTS / Debian 12) یا Windows Server
- **ران‌تایم:** Node.js نسخه 22 یا 24 (پیشنهاد: Node.js 24)
- **پایگاه داده:** SQLite نسخه بومی (`node:sqlite` در حالت پیشرفته WAL - Write-Ahead Logging)
- **وب‌سرور واسط (Reverse Proxy):** Nginx همراه با SSL (Let's Encrypt یا گواهینامه معتبر)
- **مدیریت پروسس‌های پس‌زمینه:** PM2

---

## ۲. متغیرهای محیطی (.env)

یک فایل با نام `.env` در ریشه پروژه ایجاد کرده و مقادیر زیر را تنظیم فرمایید:

```env
NODE_ENV=production
PORT=5000
JWT_SECRET=your_super_strong_random_jwt_secret_key_minimum_32_characters_here
CORS_ORIGINS=https://madan.co.ir,https://www.madan.co.ir
UPLOADS_DIR=server/uploads
DB_PATH=server/data/madanco.sqlite

# اعتبارسنجی اولیه ادمین (در صورت راه‌اندازی برای اولین بار)
ADMIN_INITIAL_USERNAME=admin
ADMIN_INITIAL_PASSWORD=MadanCo@2026!Admin
ADMIN_INITIAL_EMAIL=info@madan.co.ir
```

---

## ۳. مراحل استقرار پروداکشن (گام‌به‌گام)

### گام ۱: دریافت کد و نصب وابستگی‌ها
```bash
git clone <repository_url>
cd co
npm ci --omit=dev # یا npm install
```

### گام ۲: بیلد نهایی پروژه (شامل خروجی فرانت و پره‌رندر ۲۲ مسیر + مقالات سئو)
```bash
npm run build
```
این دستور پوشه `dist/` را تولید کرده و ۳۷ فایل ایستا با متاتگ‌های سئو و Schema.org تزریق‌شده ایجاد می‌نماید.

### گام ۳: راه‌اندازی پروسس سرور API با PM2
```bash
# نصب سراسری pm2 در صورت نیاز
npm install -g pm2

# اجرای بک‌اند روی پورت 5000
pm2 start "npm run server" --name "madanco-api"

# ذخیره وضعیت پروسس‌ها جهت شروع خودکار پس از ریست سرور
pm2 save
pm2 startup
```

---

## ۴. پیکربندی وب‌سرور Nginx (Reverse Proxy + Static Files)

یک فایل کانفیگ در مسیر `/etc/nginx/sites-available/madan.co.ir` بسازید:

```nginx
server {
    listen 80;
    server_name madan.co.ir www.madan.co.ir;
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name madan.co.ir www.madan.co.ir;

    ssl_certificate /etc/letsencrypt/live/madan.co.ir/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/madan.co.ir/privkey.pem;

    root /var/www/madanco/dist;
    index index.html;

    # فشرده‌سازی Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    # مسیردهی فایل‌های استاتیک فرانت‌اند
    location / {
        try_files $uri $uri/ /index.html;
    }

    # مسیردهی درخواست‌های API و بک‌اند به پروسس Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # مسیردهی فایل‌های آپلودی
    location /uploads/ {
        alias /var/www/madanco/server/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # نقشه سایت و روبوت‌ها
    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:5000/sitemap.xml;
    }
    location = /robots.txt {
        proxy_pass http://127.0.0.1:5000/robots.txt;
    }
}
```

---

## ۵. پشتیبان‌گیری و بازیابی پایگاه داده (Backup & Restore)

### ایجاد فایل بک‌آپ تست‌شده
```bash
npm run db:backup
```
این دستور سلامت فیزیکی دیتابیس را با `PRAGMA integrity_check` سنجیده و فایلی با فرمت `madanco_backup_TIMESTAMP.sqlite` در مسیر `server/backups/` ایجاد می‌کند.

### بازیابی دیتابیس از فایل بک‌آپ
```bash
# بازیابی آخرین بک‌آپ موجود به صورت خودکار
npm run db:restore

# یا بازیابی یک فایل مشخص
node scripts/restore-db.js server/backups/madanco_backup_2026-11-12T11-45-28-328Z.sqlite
```

---

## ۶. اجرای تست‌های خودکار یکپارچه
جهت حصول اطمینان از سلامت کامل سامانه پس از استقرار، دستور زیر را اجرا کنید:
```bash
npm run test:backend
```
این تست تمام ۱۷ سوئیت احراز هویت، CMS، سئو، منوها، فرم‌های تماس، مقالات پیش‌نویس و سکیوریتی را در کمتر از ۲ ثانیه با وضعیت `pass 17 / fail 0` اعتبارسنجی می‌کند.
