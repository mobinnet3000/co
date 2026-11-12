# راهنمای آمادگی استقرار نهایی در محیط پروداکشن (PHASE 4 DEPLOYMENT READINESS)
## شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود (معدنکو - Madan Co)

**تاریخ تدوین:** نوامبر ۲۰۲۶  
**دامنه کاربرد:** تیم‌های DevOps، سیستم‌ادمین‌ها و مدیران فنی  

---

## ۱. پیش‌نیازهای محیط سرور (System Prerequisites)

| جزء زیرساختی | نسخه پیشنهادی | توضیحات |
|---|---|---|
| **Node.js** | `>= 22.0.0` (ترجیحاً Node.js 24 LTS) | جهت پشتیبانی از ماژول استاندارد بومی `node:sqlite` |
| **سیستم‌عامل** | Ubuntu Linux 22.04 / 24.04 LTS یا Rocky Linux 9 | عملکرد بهینه موتور SQLite در لینوکس با فایل‌سیستم ext4 |
| **مدیر فرآیندها** | PM2 یا Systemd Service | جهت مانیتورینگ خودکار، راه‌اندازی پس از ریبوت و چرخش لاگ‌ها |
| **وب سرور معکوس** | Nginx یا Caddy | جهت مدیریت SSL/TLS، فشرده‌سازی Gzip/Brotli و پروکسی به پورت محلی |
| **حافظه رم (RAM)** | حداقل ۲ گیگابایت (پیشنهادی ۴ گیگابایت) | کفایت کامل برای سرویس‌دهی سبک و پرسرعت |

---

## ۲. متغیرهای محیطی ضروری (`.env`)

فایل نمونه در `.env.example` قرار دارد. برای محیط تولید:
```env
NODE_ENV=production
PORT=5000
JWT_SECRET=super-secret-random-hex-string-at-least-32-chars
CORS_ORIGIN=https://madan.co.ir,https://madan.ba3tani.ir
DB_PATH=./data/madanco.sqlite
```

---

## ۳. فرآیند گام‌به‌گام استقرار (Step-by-Step Deployment)

### گام اول: بیلد کامل پروژه
در محیط سرور یا خط لوله CI/CD دستور زیر را اجرا کنید:
```bash
npm ci
npm run build
```
این دستور کدهای تایپ‌اسکریپت را اعتبارسنجی نموده، خروجی‌های بهینه‌سازی‌شده را در پوشه `dist/` قرار داده و اسکریپت پیش‌رندر ایستا را اجرا می‌نماید.

### گام دوم: راه‌اندازی سرویس بک‌اند با PM2
در پوشه `server/`:
```bash
cd server
npm ci --production
pm2 start dist/index.js --name "madanco-api" -i max
pm2 save
```

### گام سوم: پیکربندی Nginx
نمونه کانفیگ پیشنهادی برای Nginx:
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

    # سرو مستقیم اسناد پیش‌رندر شده و فایل‌های ایستا
    location / {
        try_files $uri $uri/ /index.html;
    }

    # هدایت درخواست‌های API به سرور اکسپرس
    location /api/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # کشینگ قوی برای است‌های بیلدشده
    location /assets/ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

---

## ۴. برنامه پشتیبان‌گیری و بازیابی فاجعه (Disaster Recovery Plan)

1. **پشتیبان‌گیری روزانه با Cron:**
   دستور زیر را در crontab سرور قرار دهید:
   ```bash
   0 3 * * * cd /var/www/madanco/server && node ../scripts/backup-db.js
   ```
   فایل‌های فشرده با شناسه زمانی در مسیر `server/data/backups/` ذخیره شده و از نظر یکپارچگی ارزیابی می‌شوند.
2. **بازیابی فوری:**
   در صورت بروز هرگونه مشکل سخت‌افزاری یا خطای کاربری:
   ```bash
   node scripts/restore-db.js server/data/backups/backup-2026-XX-XX.sqlite
   ```
