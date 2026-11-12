# راهنمای جامع استقرار در محیط عملیاتی (Production Deployment Guide)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو Madan Co)

این سند راهنمای گام‌به‌گام استقرار، راه‌اندازی، مدیریت پشتیبان‌گیری و نگهداری وبسایت رسمی (`https://madan.co.ir`) و سامانه مدیریت محتوای یکپارچه (CMS & API) در محیط سرور عملیاتی لینوکس (Ubuntu 22.04 / 24.04 LTS) است.

---

## ۱. معماری کلی پلتفرم

- **لایه فرانت‌اند (Frontend):** 
  - کامپایل شده با React 18, Vite, Tailwind CSS و Framer Motion
  - مجهز به پره‌رندرینگ استاتیک (SSG / Static HTML) برای کلیه ۲۲ روت عمومی جهت سئو بی‌نقص
  - خروجی استاتیک در پوشه: `dist/`
- **لایه بک‌اند و وب‌سرویس (Backend & REST API):**
  - فریم‌ورک Express در بستر مدرن Node.js 24
  - دیتابیس بومی، اسکریپت‌پذیر و پرسرعت: `SQLite 3` با موتور درونی `node:sqlite` در حالت WAL (Write-Ahead Logging) بدون نیاز به نصب نرم‌افزار اضافی پایگاه داده
  - استقرار داده‌ها در دایرکتوری: `server/data/madanco.sqlite`
  - فایل‌های آپلود شده در دایرکتوری: `server/data/uploads/`
- **پنل مدیریت و اتوماسیون (CMS):**
  - مستقر در مسیر روت: `/admin`
  - مسیر ورود امن: `/admin/login`

---

## ۲. پیش‌نیازهای سرور

- **سیستم عامل:** Ubuntu 22.04 LTS یا جدیدتر
- **Node.js:** نسخه `20.x` یا ترجیحاً `24.x` (توصیه: v24.19.0 LTS)
- **مدیر فرآیند:** `PM2`
- **وب‌سرور معکوس (Reverse Proxy):** `Nginx`
- **گواهینامه امنیتی:** `Certbot (Let's Encrypt SSL)`

---

## ۳. مراحل نصب و راه‌اندازی اولیه روی سرور

### گام اول: کلون پروژه و نصب وابستگی‌ها
```bash
# رفتن به دایرکتوری وب
cd /var/www/madan-co

# نصب پکیج‌های پروژه
npm install --production=false
```

### گام دوم: تنظیم فایل پیکربندی محیطی (.env)
```bash
cp .env.example .env
nano .env
```
مقادیر `JWT_SECRET` را با یک رشته تصادفی امن ۶۴ کاراکتری جایگزین کنید:
```env
PORT=5000
NODE_ENV=production
JWT_SECRET=super_secret_production_key_random_string_2026
DATABASE_PATH=/var/www/madan-co/server/data/madanco.sqlite
UPLOADS_DIR=/var/www/madan-co/server/data/uploads
SITE_URL=https://madan.co.ir
PLATFORM_LIVE_URL=https://madan.ba3tani.ir
```

### گام سوم: ساخت و کامپایل فرانت‌اند (Production Build)
```bash
npm run build
```
این دستور کدهای تایپ‌اسکریپت را بررسی کرده، فرانت‌اند را با Vite مینیفای و فشرده کرده و ۲۲ صفحه سئو استاتیک را در دایرکتوری `dist/` ایجاد می‌کند.

### گام چهارم: اجرای سرویس بک‌اند با PM2
```bash
# نصب سراسری PM2
npm install -g pm2

# اجرای سرور API و راه‌اندازی خودکار
pm2 start "npx tsx server/src/index.ts" --name "madanco-api"

# ذخیره وضعیت برای اجرای مجدد پس از ریبوت سرور
pm2 save
pm2 startup
```

---

## ۴. پیکربندی Nginx (وب‌سرور و Reverse Proxy)

یک فایل کانفیگ جدید در `/etc/nginx/sites-available/madan.co.ir` ایجاد کنید:

```nginx
server {
    server_name madan.co.ir www.madan.co.ir;

    # ریشه فایل‌های استاتیک فرانت‌اند
    root /var/www/madan-co/dist;
    index index.html;

    # فشرده‌سازی Gzip
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # هدایت مسیرهای عمومی به فایل‌های prerender شده یا SPA
    location / {
        try_files $uri $uri/ /index.html;
    }

    # فایل‌های آپلود شده
    location /uploads/ {
        alias /var/www/madan-co/server/data/uploads/;
        expires 30d;
        add_header Cache-Control "public, no-transform";
    }

    # هدایت درخواست‌های API به سرور Express Node.js
    location /api/ {
        proxy_pass http://127.0.0.1:5000/api/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # نقشه سایت و ربات‌های سئو داینامیک
    location = /sitemap.xml {
        proxy_pass http://127.0.0.1:5000/sitemap.xml;
    }

    location = /robots.txt {
        proxy_pass http://127.0.0.1:5000/robots.txt;
    }
}
```

فعال‌سازی کانفیگ و ری‌استارت Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/madan.co.ir /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

فعال‌سازی رایگان SSL:
```bash
sudo certbot --nginx -d madan.co.ir -d www.madan.co.ir
```

---

## ۵. سیاست پشتیبان‌گیری و بازیابی داده‌ها (Disaster Recovery & Backup)

### اسکریپت پشتیبان‌گیری خودکار روزانه (Cron Job):
فایل اسکریپت `/usr/local/bin/backup-madanco.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/var/backups/madanco"
DATE=$(date +%Y-%m-%d_%H%M%S)
mkdir -p "$BACKUP_DIR"

# پشتیبان‌گیری از دیتابیس SQLite بدون قفل کردن فرآیند
sqlite3 /var/www/madan-co/server/data/madanco.sqlite ".backup '$BACKUP_DIR/madanco-$DATE.sqlite'"

# فشرده‌سازی فایل‌های آپلود شده
tar -czf "$BACKUP_DIR/uploads-$DATE.tar.gz" -C /var/www/madan-co/server/data uploads

# نگهداری پشتیبان‌های ۳۰ روز گذشته و حذف قدیمی‌ترها
find "$BACKUP_DIR" -type f -mtime +30 -delete

echo "Backup completed successfully at $DATE"
```
مجوز اجرا و تنظیم در Crontab (اجرا هر شب ساعت ۳ بامداد):
```bash
chmod +x /usr/local/bin/backup-madanco.sh
(crontab -l 2>/dev/null; echo "0 3 * * * /usr/local/bin/backup-madanco.sh >> /var/log/madanco-backup.log 2>&1") | crontab -
```

### بازیابی اطلاعات (Restore):
در صورت بروز نقص سخت‌افزاری یا نیاز به برگرداندن پشتیبان:
```bash
# ۱. متوقف کردن سرویس بک‌اند
pm2 stop madanco-api

# ۲. جایگزینی فایل دیتابیس
cp /var/backups/madanco/madanco-TARGET_DATE.sqlite /var/www/madan-co/server/data/madanco.sqlite

# ۳. استخراج فایل‌های آپلود شده
tar -xzf /var/backups/madanco/uploads-TARGET_DATE.tar.gz -C /var/www/madan-co/server/data/

# ۴. اجرای مجدد سرویس
pm2 start madanco-api
```

---

## ۶. حساب کاربری پیش‌فرض مدیر ارشد (Super Admin)

سامانه در اولین بارگذاری پایگاه داده به طور خودکار حساب زیر را با هش رمزنگاری‌شده Bcrypt ایجاد می‌کند:
- **نام کاربری:** `admin`
- **کلمه عبور پیش‌فرض:** `MadanCo@2026!Admin`
- **مسیر ورود:** `https://madan.co.ir/admin/login`

> [!CAUTION]
> بلافاصله پس از اولین ورود به پنل، از مسیر **«کاربران و دسترسی‌ها»** یا تنظیمات حساب، کلمه عبور پیش‌فرض را به یک کلمه عبور قوی و اختصاصی تغییر دهید.
