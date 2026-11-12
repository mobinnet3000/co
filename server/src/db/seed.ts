import bcrypt from 'bcryptjs';
import { db } from './database';

export function seedDatabase() {
  const now = new Date().toISOString();

  // 1. Seed Super Admin User if not exists
  const userCheck = db.prepare('SELECT id FROM users WHERE username = ?').get('admin');
  if (!userCheck) {
    const passwordHash = bcrypt.hashSync('MadanCo@2026!Admin', 10);
    db.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `).run('admin', 'info@madan.co.ir', passwordHash, 'مدیر ارشد سامانه معدنکو', 'super_admin', now, now);
    console.log('✓ Super Admin user seeded: admin / MadanCo@2026!Admin');
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
    ['platform_live_url', 'https://madan.ba3tani.ir', 'general'],
    ['footer_copyright', 'تمامی حقوق مادی و معنوی متعلق به شرکت محاسبات عملیات داده ارزیابی نوین (نام تجاری معدنکو Madan Co) می‌باشد.', 'footer'],
    ['seo_default_title', 'معدنکو (Madan Co) | فناوری داده در خدمت معدن', 'seo'],
    ['seo_default_keywords', 'معدنکو, madan co, فناوری داده در خدمت معدن, پایش خطوط فرآوری, بهینه‌سازی خطوط فرآوری, محاسبات عملیات داده ارزیابی نوین', 'seo'],
    ['seo_default_description', 'معدنکو - پلتفرم تخصصی پایش، تحلیل و بهینه‌سازی خطوط فرآوری مواد معدنی از طریق موازنه متالورژیکی و یکپارچه‌سازی داده‌های عملیاتی.', 'seo'],
    ['google_analytics_id', '', 'analytics'],
    ['google_search_console_code', '', 'analytics'],
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
    ['مدیریت داده‌های معدنی', 'mineral-data-management', 'مقالات و آموزش‌های پیرامون جریان داده و استانداردهای اطلاعاتی'],
    ['متالورژی و فرآوری', 'metallurgy-processing', 'تکنولوژی‌های خردایش، فلوتاسیون، جدایش و موازنه مواد معدنی'],
    ['تحلیل داده صنعتی', 'industrial-analytics', 'روش‌های پایش عملکرد، راندمان متالورژیکی و تصمیم‌گیری داده‌محور'],
    ['تحول دیجیتال در معدن', 'digital-mining', 'استقرار سیستم‌ها و فرهنگ داده‌محور در کارخانجات کانی‌آرایی'],
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

  // 6. Seed Initial Confirmed Articles
  const articlesCount = (db.prepare('SELECT COUNT(*) as c FROM articles').get() as { c: number }).c;
  if (articlesCount === 0) {
    const defaultArticles = [
      {
        title: 'نقش تحلیل داده در ارتقای راندمان کارخانجات فرآوری مواد معدنی',
        slug: 'role-of-data-analytics-in-mineral-processing-performance',
        summary: 'چگونه ثبت دقیق داده‌های خوراک، عیار و بازیابی به کاهش باطله و افزایش سودآوری در مدارهای کانی‌آرایی منجر می‌شود؟',
        content_html: `
          <h2>مقدمه: از خط تولید تا گزارش متالورژیکی</h2>
          <p>در کارخانجات فرآوری مواد معدنی، روزانه صدها داده از بارسنج‌ها، فلومترها، چگالی‌سنج‌ها و آنالیزهای آزمایشگاهی تولید می‌شود. عدم یکپارچگی این داده‌ها باعث اتلاف ساعت‌ها زمان باارزش مهندسین فرآیند می‌شود.</p>
          <h2>چرا موازنه جرم اهمیت دارد؟</h2>
          <p>بدون موازنه پیوسته مواد و تطبیق جریان‌های ورودی و خروجی، امکان ردیابی خطاهای اندازه‌گیری و تلفات در باطله وجود نخواهد داشت.</p>
          <h2>نتیجه‌گیری</h2>
          <p>سامانه‌های متمرکز پایش داده، فاصله بین مشاهدات اپراتور و تصمیم‌گیری استراتژیک مدیران را به حداقل می‌رسانند.</p>
        `,
        category_slug: 'industrial-analytics',
        author: 'واحد تحقیق و توسعه معدنکو',
        reading_time: '۸ دقیقه',
        is_featured: 1,
        published_at: '۱۴۰۳/۰۸/۱۵',
        tags: ['تحلیل داده', 'فرآوری مواد معدنی', 'موازنه جرم'],
      },
      {
        title: 'اهمیت مدیریت داده‌های عملیاتی در خطوط فرآوری',
        slug: 'importance-of-operational-data-management-in-processing-plants',
        summary: 'بررسی راهکارهای گذر از لاگ‌بوک‌های سنتی و شیت‌های اکسل به سیستم‌های داده‌ای یکپارچه و قابل اتکا.',
        content_html: `
          <h2>چالش‌های سیستم‌های دستی و اکسل</h2>
          <p>شیت‌های اکسل آسیب‌پذیر، فاقد تاریخچه ویرایش و بدون اعتبارسنجی خودکار هستند. یک خطای تایپی در ورودی تناژ می‌تواند موازنه شیفت را کاملاً منحرف سازد.</p>
          <h2>مزایای سامانه‌های ایزوله On-Premises</h2>
          <p>در صنایع معدنی به دلیل محدودیت‌های امنیتی، استقرار سیستم در شبکه داخلی کارخانه بدون نیاز به اینترنت بالاترین اولویت را دارد.</p>
        `,
        category_slug: 'mineral-data-management',
        author: 'مهندسی داده و فرآیند',
        reading_time: '۱۰ دقیقه',
        is_featured: 1,
        published_at: '۱۴۰۳/۰۸/۱۰',
        tags: ['مدیریت داده‌های معدنی', 'کنترل فرآیند'],
      },
    ];

    const insertArt = db.prepare(`
      INSERT INTO articles (title, slug, summary, content_html, author_name, category_id, status, reading_time, is_featured, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, (SELECT id FROM categories WHERE slug = ?), 'published', ?, ?, ?, ?, ?)
    `);

    for (const a of defaultArticles) {
      const res = insertArt.run(
        a.title,
        a.slug,
        a.summary,
        a.content_html,
        a.author,
        a.category_slug,
        a.reading_time,
        a.is_featured,
        a.published_at,
        now,
        now
      );

      const articleId = Number(res.lastInsertRowid);
      const insertArtTag = db.prepare(`
        INSERT OR IGNORE INTO article_tags (article_id, tag_id)
        SELECT ?, id FROM tags WHERE name = ?
      `);

      for (const t of a.tags) {
        insertArtTag.run(articleId, t);
      }
    }
    console.log('✓ Initial articles and knowledge base entries seeded.');
  }
}
