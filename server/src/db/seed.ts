import bcrypt from 'bcryptjs';
import { db } from './database';
import { technicalArticles } from './seedArticles';
import { draftArticles } from './draftArticles';
import { config } from '../config';

export function seedDatabase() {
  const now = new Date().toISOString();

  // 1. Seed Super Admin User if not exists (Zero Overwrite & Safe Bootstrap)
  const adminUsername = config.initialAdminUsername || 'admin';
  const userCheck = db.prepare('SELECT id FROM users WHERE username = ?').get(adminUsername);
  if (!userCheck) {
    if (config.initialAdminPassword) {
      const passwordHash = bcrypt.hashSync(config.initialAdminPassword, 10);
      db.prepare(`
        INSERT INTO users (username, email, password_hash, full_name, role, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, ?, 1, ?, ?)
      `).run(adminUsername, config.initialAdminEmail, passwordHash, 'مدیر ارشد سامانه معدنکو', 'super_admin', now, now);
      console.log(`✓ Super Admin user initialized for username: "${adminUsername}"`);
    } else {
      console.warn(`[SECURITY NOTICE] Super Admin user "${adminUsername}" does not exist and INITIAL_ADMIN_PASSWORD was not provided.`);
      console.warn(`  To set up admin account, run: npm run admin:reset-password -- ${adminUsername} <YourSecurePassword>`);
    }
  } else {
    // Existing user preserved untouched
  }

  // 2. Seed Default Global Settings
  const defaultSettings: Array<[string, string, string]> = [
    ['site_name', 'معدنکو (Madan Co)', 'general'],
    ['official_name_fa', 'شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود', 'general'],
    ['tagline', 'فناوری داده در خدمت معدن', 'general'],
    ['site_description', 'پلتفرم تخصصی پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی.', 'general'],
    ['phone', '09999196630', 'contact'],
    ['email', 'info@madan.co.ir', 'contact'],
    ['address', 'تهران، نیروی دریایی', 'contact'],
    ['whatsapp', 'https://wa.me/989999196630', 'contact'],
    ['telegram', 'https://t.me/MadanCoSupport', 'contact'],
    ['site_url', 'https://madan.co.ir', 'general'],
    ['platform_live_url', 'https://madan.co.ir', 'general'],
    ['footer_copyright', 'تمامی حقوق مادی و معنوی متعلق به شرکت محاسبات عملیات داده ارزیابی نوین (نام تجاری معدنکو Madan Co) می‌باشد.', 'footer'],
    ['seo_default_title', 'معدنکو (Madan Co) | فناوری داده در خدمت معدن', 'seo'],
    ['seo_default_keywords', 'معدنکو, madan co, فناوری داده در خدمت معدن, پایش خطوط فرآوری, بهینه‌سازی خطوط فرآوری, محاسبات عملیات داده ارزیابی نوین', 'seo'],
    ['seo_default_description', 'معدنکو - پلتفرم تخصصی پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی.', 'seo'],
    ['brand_primary_color', '#0F1821', 'theme'],
    ['brand_amber_color', '#EFA73F', 'theme'],
    ['brand_crimson_color', '#C92127', 'theme'],
    ['brand_sand_color', '#F7F3EE', 'theme'],
  ];

  const insertSetting = db.prepare(`
    INSERT OR IGNORE INTO website_settings (key, value, group_name, updated_at)
    VALUES (?, ?, ?, ?)
  `);

  for (const [key, val, group] of defaultSettings) {
    insertSetting.run(key, val, group, now);
  }

  // 3. Seed Default Blog Categories
  const categories: Array<[string, string, string]> = [
    ['خردایش و آسیاکنی', 'comminution-milling', 'اصول مهندسی سنگ‌شکنی، آسیاهای خودشکن، رولرهای فشارقوی و مدارهای طبقه‌بندی'],
    ['جدایش و فلوتاسیون', 'separation-flotation', 'شیمی سطح، کلکتورها، کف‌سازها، جدایش مغناطیسی و ثقلی کانسنگ‌های صنعتی'],
    ['متالورژی و موازنه فرآیند', 'metallurgy-mass-balance', 'محاسبات پایستگی جرم، کینتیک جدایش و بهینه‌سازی فلوشیت کارخانه'],
    ['مدیریت و تحلیل داده‌های صنعتی', 'industrial-data-analytics', 'یکپارچه‌سازی اطلاعات ابزاردقیق، آزمایشگاه عیارسنجی و پایش پیوسته'],
    ['کنترل کیفیت و بهره‌برداری کارخانه', 'plant-operations-qc', 'شاخص‌های کلیدی عملکرد KPI، نمونه‌برداری پی‌یر ژی، عیب‌یابی و پایش وضعیت'],
  ];

  const insertCat = db.prepare(`
    INSERT OR IGNORE INTO categories (name, slug, description, created_at)
    VALUES (?, ?, ?, ?)
  `);

  for (const [name, slug, desc] of categories) {
    insertCat.run(name, slug, desc, now);
  }

  // 4. Seed Default Tags
  const defaultTags: Array<[string, string]> = [
    ['تحلیل داده', 'data-analytics'],
    ['فرآوری مواد معدنی', 'mineral-processing'],
    ['کانی‌آرایی', 'mineral-dressing'],
    ['بهینه‌سازی کارخانه', 'plant-optimization'],
    ['موازنه جرم', 'mass-balance'],
    ['کنترل فرآیند', 'process-control'],
    ['فلوتاسیون', 'flotation'],
    ['خردایش', 'comminution'],
    ['آسیاکنی', 'milling'],
    ['سنگ‌شکن', 'crusher'],
    ['هیدروسیکلون', 'hydrocyclone'],
    ['جدایش مغناطیسی', 'magnetic-separation'],
    ['جدایش ثقلی', 'gravity-separation'],
    ['شاخص KPI', 'kpi'],
    ['نمونه‌برداری', 'sampling'],
    ['تئوری محدودیت‌ها TOC', 'toc'],
    ['پایش وضعیت CBM', 'cbm'],
  ];

  const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)');
  for (const [name, slug] of defaultTags) {
    insertTag.run(name, slug);
  }

  // 5. Seed Initial CMS Pages if not exists
  const initialPages = [
    {
      title: 'صفحه اصلی معدنکو',
      slug: 'home',
      excerpt: 'صفحه اصلی معرفی هویت، پلتفرم و خدمات معدنکو',
      template: 'home',
      seo_title: 'معدنکو (Madan Co) | فناوری داده در خدمت معدن',
      seo_description: 'پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی.',
    },
    {
      title: 'معرفی سامانه تحلیل داده‌های خطوط فرآوری',
      slug: 'platform',
      excerpt: 'لندینگ پیج معرفی سامانه نرم‌افزاری و قابلیت‌های داشبورد عملیاتی',
      template: 'platform',
      seo_title: 'سامانه تحلیل و پردازش داده‌های خطوط فرآوری | معدنکو',
      seo_description: 'بستر نرم‌افزاری دریافت، اعتبارسنجی، پردازش و تحلیل داده‌های خطوط کانی‌آرایی با قابلیت استقرار در شبکه محلی کارخانه.',
    },
    {
      title: 'درباره ما و چشم‌انداز',
      slug: 'about',
      excerpt: 'داستان شکل‌گیری، رویکرد مهندسی و ارزش‌های محوری شرکت',
      template: 'about',
      seo_title: 'درباره ما | شرکت محاسبات عملیات داده ارزیابی نوین',
      seo_description: 'آشنایی با ماموریت، رویکرد مهندسی و تعهدات ما در تبدیل داده‌های کانی‌آرایی به بینش هوشمند صنعتی.',
    },
    {
      title: 'شناسنامه رسمی و پروفایل شرکتی',
      slug: 'company',
      excerpt: 'سند رسمی معرفی مشخصات ثبتی و توانمندی‌های شرکت جهت ارائه به کارفرمایان',
      template: 'company',
      seo_title: 'شناسنامه رسمی و پروفایل شرکتی | محاسبات عملیات داده ارزیابی نوین',
      seo_description: 'سند رسمی معرفی مشخصات و حوزه‌های فناوری شرکت محاسبات عملیات داده ارزیابی نوین با مسئولیت محدود.',
    },
    {
      title: 'خدمات تخصصی مهندسی داده و فرآوری',
      slug: 'services',
      excerpt: 'سبد خدمات ۶گانه شرکت در حوزه پردازش، تحلیل و ارزیابی خطوط تولید',
      template: 'services',
      seo_title: 'راهکارها و خدمات تخصصی داده‌های صنعتی | معدنکو',
      seo_description: 'خدمات تخصصی یکپارچه‌سازی، پالایش داده، تحلیل متالورژیکی و ارزیابی عملکرد کارخانجات فرآوری کشور.',
    },
    {
      title: 'صنایع هدف و مدارهای فرآوری',
      slug: 'industries',
      excerpt: 'راهکارهای کانی‌آرایی برای مس، سنگ‌آهن، سرب و روی و سایر کانی‌های استراتژیک',
      template: 'industries',
      seo_title: 'صنایع هدف و مدارهای فرآوری کانی‌آرایی | معدنکو',
      seo_description: 'پوشش تخصصی زنجیره فرآوری مس، سنگ‌آهن و کنسانتره سرب و روی بر مبنای خصوصیات کانی‌شناسی کانسنگ‌های ایران.',
    },
    {
      title: 'پروژه‌ها و تجربیات میدانی',
      slug: 'projects',
      excerpt: 'سوابق و زمینه‌های پیاده‌سازی موازنه جرم و پایش خطوط کانی‌آرایی',
      template: 'projects',
      seo_title: 'پروژه‌ها و تجارب متالورژیکی | معدنکو',
      seo_description: 'پروژه‌های استقرار سامانه پایش، رفع گلوگاه‌های خردایش و طراحی جریان داده‌های فرآیندی در معادن کشور.',
    },
    {
      title: 'ارتباط مستقیم با ما',
      slug: 'contact',
      excerpt: 'راه‌های ارتباط مستقیم، تلفن تماس، ایمیل و نشانی شرکت',
      template: 'contact',
      seo_title: 'تماس با ما | شرکت محاسبات عملیات داده ارزیابی نوین',
      seo_description: 'راه‌های ارتباط مستقیم تلفنی، ایمیل و مراجعه جهت بررسی نیازمندی‌های داده‌ای کارخانجات فرآوری.',
    },
  ];

  const insertPage = db.prepare(`
    INSERT OR IGNORE INTO pages (title, slug, excerpt, content, template, status, seo_title, seo_description, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'published', ?, ?, ?, ?)
  `);

  for (const p of initialPages) {
    insertPage.run(p.title, p.slug, p.excerpt, '', p.template, p.seo_title, p.seo_description, now, now);
  }

  // 6. Seed Complete Library of Technical Articles (>= 15 articles)
  const insertArt = db.prepare(`
    INSERT OR IGNORE INTO articles (
      title, slug, summary, content_html, author_name, category_id, status,
      reading_time, is_featured, seo_title, seo_description, focus_keyword,
      canonical_url, published_at, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      (SELECT id FROM categories WHERE slug = ?),
      'published', ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  for (const a of technicalArticles) {
    const canonical = `https://madan.co.ir/blog/${a.slug}`;
    const res = insertArt.run(
      a.title,
      a.slug,
      a.summary,
      a.content_html,
      a.author,
      a.category_slug,
      a.reading_time,
      a.is_featured,
      a.seo_title,
      a.seo_description,
      a.focus_keyword,
      canonical,
      a.published_at,
      now,
      now
    );

    // If inserted, link tags
    const article = db.prepare('SELECT id FROM articles WHERE slug = ?').get(a.slug) as { id: number } | undefined;
    if (article) {
      const insertArtTag = db.prepare(`
        INSERT OR IGNORE INTO article_tags (article_id, tag_id)
        SELECT ?, id FROM tags WHERE name = ?
      `);
      for (const t of a.tags) {
        insertArtTag.run(article.id, t);
      }
    }
  }

  // Seed Draft Articles (10 additional engineering articles)
  const insertDraftArt = db.prepare(`
    INSERT OR IGNORE INTO articles (
      title, slug, summary, content_html, author_name, category_id, status,
      reading_time, is_featured, seo_title, seo_description, focus_keyword,
      canonical_url, published_at, created_at, updated_at
    ) VALUES (
      ?, ?, ?, ?, ?,
      (SELECT id FROM categories WHERE slug = ?),
      'draft', ?, ?, ?, ?, ?,
      ?, ?, ?, ?
    )
  `);

  for (const d of draftArticles) {
    const canonical = `https://madan.co.ir/blog/${d.slug}`;
    insertDraftArt.run(
      d.title,
      d.slug,
      d.summary,
      d.content_html,
      d.author,
      d.category_slug,
      d.reading_time,
      d.is_featured,
      d.seo_title,
      d.seo_description,
      d.focus_keyword,
      canonical,
      d.published_at,
      now,
      now
    );

    const draft = db.prepare('SELECT id FROM articles WHERE slug = ?').get(d.slug) as { id: number } | undefined;
    if (draft) {
      const insertArtTag = db.prepare(`
        INSERT OR IGNORE INTO article_tags (article_id, tag_id)
        SELECT ?, id FROM tags WHERE name = ?
      `);
      for (const t of d.tags) {
        insertArtTag.run(draft.id, t);
      }
    }
  }
  console.log(`✓ Technical Articles verified: ${technicalArticles.length} published + ${draftArticles.length} drafts.`);

  // 7. Seed Navigation Menus if not exists
  const menuCount = (db.prepare('SELECT COUNT(*) as c FROM navigation_menus').get() as { c: number }).c;
  if (menuCount === 0) {
    // Header Menu
    const headerMenu = db.prepare(`
      INSERT INTO navigation_menus (name, slug, location, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run('منوی اصلی هدر', 'header', 'header', now, now);
    const headerMenuId = Number(headerMenu.lastInsertRowid);

    const headerItems = [
      { title: 'صفحه اصلی', url: '/', sort: 1 },
      { title: 'سامانه پایش', url: '/platform', sort: 2 },
      { title: 'خدمات تخصصی', url: '/services', sort: 3 },
      { title: 'صنایع هدف', url: '/industries', sort: 4 },
      { title: 'دانشنامه و مقالات', url: '/blog', sort: 5 },
      { title: 'درباره ما', url: '/about', sort: 6 },
      { title: 'تماس با ما', url: '/contact', sort: 7 },
    ];

    const insertMenuItem = db.prepare(`
      INSERT INTO menu_items (menu_id, title, url, sort_order, is_active)
      VALUES (?, ?, ?, ?, 1)
    `);

    for (const it of headerItems) {
      insertMenuItem.run(headerMenuId, it.title, it.url, it.sort);
    }

    // Footer Menu
    const footerMenu = db.prepare(`
      INSERT INTO navigation_menus (name, slug, location, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run('منوی پاورقی فوتر', 'footer', 'footer', now, now);
    const footerMenuId = Number(footerMenu.lastInsertRowid);

    const footerItems = [
      { title: 'سامانه تحلیل داده‌های خطوط', url: '/platform', sort: 1 },
      { title: 'خدمات موازنه متالورژیکی', url: '/services', sort: 2 },
      { title: 'شناسنامه شرکتی', url: '/company', sort: 3 },
      { title: 'دانشنامه متالورژی', url: '/blog', sort: 4 },
      { title: 'تماس و نشانی شرکت', url: '/contact', sort: 5 },
    ];

    for (const it of footerItems) {
      insertMenuItem.run(footerMenuId, it.title, it.url, it.sort);
    }
    console.log('✓ Navigation menus seeded (header & footer).');
  }

  // 8. Seed Default Sections for Home Page if not exists
  const homePage = db.prepare("SELECT id FROM pages WHERE slug = 'home'").get() as { id: number } | undefined;
  if (homePage) {
    const sectionCount = (db.prepare('SELECT COUNT(*) as c FROM page_sections WHERE page_id = ?').get(homePage.id) as { c: number }).c;
    if (sectionCount === 0) {
      const defaultSections = [
        {
          type: 'hero',
          order: 0,
          config: {
            badge: 'فناوری داده در خدمت معدن',
            title: 'پایش، موازنه و بهینه‌سازی هوشمند خطوط فرآوری مواد معدنی',
            subtitle: 'سامانه تخصصی یکپارچه‌سازی و پردازش داده‌های صنعتی، ایجاد موازنه پیوسته متالورژیکی و کاهش چشمگیر باطله در کارخانجات کانی‌آرایی کشور.',
            primaryCtaText: 'آشنایی با سامانه پایش',
            primaryCtaUrl: '/platform',
            secondaryCtaText: 'درخواست مشاوره تخصصی',
            secondaryCtaUrl: '/contact',
          },
        },
        {
          type: 'features',
          order: 1,
          config: {
            title: 'چرا رویکرد داده‌محور در فرآوری مواد معدنی ضروری است؟',
            subtitle: 'گذر از ثبت سنتی لاگ‌بوک و شیت‌های اکسل آسیب‌پذیر به بستری ایزوله، دقیق و قابل اتکا در شبکه داخلی کارخانه.',
            items: [
              {
                icon: 'Database',
                title: 'تک‌منبع حقیقت داده‌ای',
                description: 'حذف مغایرت‌ها میان آمارهای آزمایشگاه، اتاق کنترل و اتاق موازنه متالورژیکی با استقرار پایگاه داده متمرکز.',
              },
              {
                icon: 'Cpu',
                title: 'موازنه پیوسته پایستگی ماده',
                description: 'محاسبه لحظه‌ای خطاهای اندازه‌گیری جریان‌ها بر مبنای ریاضیات کمترین مربعات خطا و فرمول‌های بقای جرم.',
              },
              {
                icon: 'ShieldCheck',
                title: 'استقرار ایزوله On-Premises',
                description: 'کارکرد پایدار در بستر شبکه محلی (LAN) کارخانه بدون هیچ‌گونه نیاز به اینترنت و با بالاترین استانداردهای امنیت داده صنعتی.',
              },
            ],
          },
        },
        {
          type: 'stats',
          order: 2,
          config: {
            title: 'دستاوردهای مهندسی موازنه و پایش خطوط فرآوری',
            items: [
              { value: '۱۰۰٪', label: 'استقرار درون‌سازمانی و آفلاین', sub: 'ایزوله در شبکه اختصاصی کارخانه' },
              { value: '۰٫۵ تا ۲٪', label: 'پتانسیل افزایش بازیابی متالورژیکی', sub: 'با اصلاح خطاهای جریان و دانه خوراک' },
              { value: '۹۰٪', label: 'کاهش خطاهای انسانی ثبت آمار', sub: 'حذف ورود دستی تناژ و محاسبات اکسل' },
              { value: '۲۴/۷', label: 'دقت در موازنه جرم پیوسته', sub: 'پایش مستمر دبی، چگالی و عیار' },
            ],
          },
        },
        {
          type: 'faq',
          order: 3,
          config: {
            title: 'پرسش‌های متداول مدیران و مهندسین فرآیند',
            subtitle: 'پاسخ به سوالات کلیدی درباره نحوه استقرار، سازگاری با سیستم‌های موجود و امنیت داده‌ها.',
            items: [
              {
                q: 'آیا برای اجرای سامانه نیاز به اتصال به اینترنت وجود دارد؟',
                a: 'خیر. معماری سامانه به گونه‌ای طراحی شده که به صورت ۱۰۰٪ آفلاین بر روی سرور یا رایانه محلی کارخانه (On-Premises) در بستر شبکه داخلی نصب شده و هیچ داده‌ای از محیط کارخانه خارج نمی‌شود.',
              },
              {
                q: 'نحوه دریافت داده‌ها از آزمایشگاه و سیستم‌های ابزاردقیق چگونه است؟',
                a: 'سامانه از هر دو روش اتصال خودکار به پایگاه داده سیستم‌های اسکادا/PLC و بارگذاری اکسل یا ورود داده شیفت با اعتبارسنجی خودکار پشتیبانی می‌کند.',
              },
              {
                q: 'موازنه متالورژیکی چگونه خطای جریان‌ها را تصحیح می‌کند؟',
                a: 'الگوریتم‌های موازنه جرم با فرمولاسیون ریاضی پی‌یر ژی و تکنیک کمترین مربعات وزن‌دار، جریان‌های نامتعادل را به گونه‌ای تعدیل می‌کنند که قانون بقای جرم با حداقل خطای کل برقرار شود.',
              },
            ],
          },
        },
        {
          type: 'cta',
          order: 4,
          config: {
            title: 'آماده تحول در ثبت و تحلیل داده‌های کارخانه فرآوری خود هستید؟',
            subtitle: 'جهت دریافت دمو، بررسی زیرساخت‌های شبکه کارخانه یا هماهنگی جلسه حضوری با کارشناسان متالورژی ما در تماس باشید.',
            buttonText: 'تماس با واحد مهندسی',
            buttonUrl: '/contact',
            phone: '09999196630',
          },
        },
      ];

      const insertSection = db.prepare(`
        INSERT INTO page_sections (page_id, section_type, section_order, config_json, is_active, created_at, updated_at)
        VALUES (?, ?, ?, ?, 1, ?, ?)
      `);

      for (const s of defaultSections) {
        insertSection.run(homePage.id, s.type, s.order, JSON.stringify(s.config), now, now);
      }
      console.log('✓ Default home page dynamic sections seeded.');
    }
  }
}
