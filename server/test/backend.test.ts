process.env.NODE_ENV = 'test';

import test from 'node:test';
import assert from 'node:assert';
import http from 'node:http';
import { app } from '../src/index';

let server: http.Server;
let port: number;
let baseUrl: string;
let authToken: string;

test.before(async () => {
  return new Promise<void>((resolve) => {
    server = app.listen(0, () => {
      const addr = server.address() as any;
      port = addr.port;
      baseUrl = `http://localhost:${port}`;
      console.log(`Test server running at ${baseUrl}`);
      resolve();
    });
  });
});

test.after(async () => {
  return new Promise<void>((resolve) => {
    if (server) {
      server.closeAllConnections?.();
      server.close(() => {
        resolve();
        setImmediate(() => process.exit(0));
      });
      server.unref();
    } else {
      resolve();
      setImmediate(() => process.exit(0));
    }
  });
});

test('1. Health Check Endpoint', async () => {
  const res = await fetch(`${baseUrl}/api/health`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.status, 'healthy');
  assert.strictEqual(data.service, 'MadanCo Corporate & CMS API');
});

test('2. Authentication Failure on invalid credentials', async () => {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'wrong-password' }),
  });
  assert.strictEqual(res.status, 401);
  const data = await res.json();
  assert.strictEqual(data.success, false);
});

test('3. Authentication Success with seeded Super Admin', async () => {
  const res = await fetch(`${baseUrl}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: 'admin', password: 'MadanCo@2026!Admin' }),
  });
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.ok(data.token);
  assert.strictEqual(data.user.username, 'admin');
  assert.strictEqual(data.user.role, 'super_admin');
  authToken = data.token;
});

test('4. Token Verification via /api/auth/me', async () => {
  const res = await fetch(`${baseUrl}/api/auth/me`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.user.username, 'admin');
});

test('5. Public Settings Endpoint returns confirmed corporate info', async () => {
  const res = await fetch(`${baseUrl}/api/settings/public`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.phone, '09999196630');
  assert.strictEqual(data.data.email, 'info@madan.co.ir');
  assert.strictEqual(data.data.address, 'تهران، نیروی دریایی');
  assert.strictEqual(data.data.platform_live_url, 'https://madan.ba3tani.ir');
});

test('6. Contact Message Submission and Validation', async () => {
  // Test invalid submission without name or contact
  const badRes = await fetch(`${baseUrl}/api/messages/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: 'تست بدون نام' }),
  });
  assert.strictEqual(badRes.status, 400);

  // Test valid submission
  const goodRes = await fetch(`${baseUrl}/api/messages/submit`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'مهندس احمدی',
      phone: '09120000000',
      email: 'ahmadi@mine-sample.ir',
      company: 'کارخانه فرآوری مس نگین',
      subject: 'استعلام استقرار سامانه پایش',
      message: 'درخواست جلسه فنی برای بررسی اتصال جریان داده‌های خط فلوتاسیون',
    }),
  });
  assert.strictEqual(goodRes.status, 201);
  const data = await goodRes.json();
  assert.strictEqual(data.success, true);
  assert.ok(data.id);
});

test('7. Admin Message Management (Retrieve, Update Status, Add Note)', async () => {
  // Retrieve list
  const listRes = await fetch(`${baseUrl}/api/messages`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(listRes.status, 200);
  const listData = await listRes.json();
  assert.strictEqual(listData.success, true);
  assert.ok(listData.data.length > 0);

  const testMsg = listData.data[0];

  // Update status to in_progress
  const statusRes = await fetch(`${baseUrl}/api/messages/${testMsg.id}/status`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ status: 'in_progress' }),
  });
  assert.strictEqual(statusRes.status, 200);

  // Add internal note
  const noteRes = await fetch(`${baseUrl}/api/messages/${testMsg.id}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({ note: 'تماس اولیه حاصل شد، جلسه فنی برای دوشنبه تنظیم گردید.' }),
  });
  assert.strictEqual(noteRes.status, 200);
});

test('8. CMS Pages Management (List, Get Slug, Create, Update)', async () => {
  // Public get by slug
  const pageRes = await fetch(`${baseUrl}/api/pages/slug/platform`);
  assert.strictEqual(pageRes.status, 200);
  const pageData = await pageRes.json();
  assert.strictEqual(pageData.success, true);
  assert.strictEqual(pageData.data.slug, 'platform');

  // Admin list
  const allPagesRes = await fetch(`${baseUrl}/api/pages`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(allPagesRes.status, 200);
  const allPages = await allPagesRes.json();
  assert.ok(allPages.data.length >= 6);
});

test('9. Blog System (Public Search, Categories, Admin Article CRUD)', async () => {
  // Public list
  const blogRes = await fetch(`${baseUrl}/api/articles/public`);
  assert.strictEqual(blogRes.status, 200);
  const blogData = await blogRes.json();
  assert.strictEqual(blogData.success, true);
  assert.ok(blogData.data.length > 0);

  // Categories
  const catRes = await fetch(`${baseUrl}/api/categories`);
  assert.strictEqual(catRes.status, 200);
  const catData = await catRes.json();
  assert.strictEqual(catData.success, true);
  assert.ok(catData.data.length >= 4);

  // Create new article
  const newArtRes = await fetch(`${baseUrl}/api/articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      title: 'مقاله تستی ارزیابی خودکار سئو و فرآوری',
      slug: 'automated-test-article-processing',
      summary: 'چکیده آزمایشی جهت اعتبارسنجی پایپ‌لاین تولید و استقرار CMS',
      content_html: '<h2>متن تست</h2><p>تست سیستم انتشار محتوا در پلتفرم معدنکو.</p>',
      category_id: catData.data[0].id,
      reading_time: '۴ دقیقه',
      tags: ['تست', 'متالورژی'],
    }),
  });
  assert.strictEqual(newArtRes.status, 201);
  const newArt = await newArtRes.json();
  assert.ok(newArt.id);

  // Verify public retrieval of the new article
  const getPubRes = await fetch(`${baseUrl}/api/articles/public/automated-test-article-processing`);
  assert.strictEqual(getPubRes.status, 200);
  const getPubData = await getPubRes.json();
  assert.strictEqual(getPubData.data.slug, 'automated-test-article-processing');

  // Clean up test article
  const delRes = await fetch(`${baseUrl}/api/articles/${newArt.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(delRes.status, 200);
});

test('10. SEO Infrastructure (Overview, Dynamic Sitemap XML, Robots.txt)', async () => {
  // SEO Overview
  const seoRes = await fetch(`${baseUrl}/api/seo/overview`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(seoRes.status, 200);
  const seoData = await seoRes.json();
  assert.strictEqual(seoData.success, true);
  assert.ok(seoData.stats.totalIndexedEntities > 0);

  // Sitemap XML
  const sitemapRes = await fetch(`${baseUrl}/sitemap.xml`);
  assert.strictEqual(sitemapRes.status, 200);
  const sitemapXml = await sitemapRes.text();
  assert.ok(sitemapXml.includes('<?xml version="1.0" encoding="UTF-8"?>'));
  assert.ok(sitemapXml.includes('<loc>https://madan.co.ir/</loc>'));

  // Robots.txt
  const robotsRes = await fetch(`${baseUrl}/robots.txt`);
  assert.strictEqual(robotsRes.status, 200);
  const robotsTxt = await robotsRes.text();
  assert.ok(robotsTxt.includes('Disallow: /admin'));
  assert.ok(robotsTxt.includes('Sitemap: https://madan.co.ir/sitemap.xml'));
});

test('11. Dynamic Page Sections (Public Slug, Admin Create, Reorder, Delete)', async () => {
  // Public sections for 'home' page
  const homeSecRes = await fetch(`${baseUrl}/api/sections/public/slug/home`);
  assert.strictEqual(homeSecRes.status, 200);
  const homeSec = await homeSecRes.json();
  assert.strictEqual(homeSec.success, true);
  assert.ok(homeSec.data.length >= 3);
  assert.ok(homeSec.data[0].section_type);

  // Admin list sections for page id 1
  const adminSecRes = await fetch(`${baseUrl}/api/sections/page/1`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(adminSecRes.status, 200);
  const adminSec = await adminSecRes.json();
  assert.strictEqual(adminSec.success, true);

  // Create a new section
  const createSecRes = await fetch(`${baseUrl}/api/sections/page/1`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      section_type: 'faq',
      config_json: JSON.stringify({ title: 'سوالات متداول تستی', items: [] }),
    }),
  });
  assert.strictEqual(createSecRes.status, 201);
  const createData = await createSecRes.json();
  assert.ok(createData.id);

  // Update section
  const updateSecRes = await fetch(`${baseUrl}/api/sections/${createData.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      config_json: JSON.stringify({ title: 'سوالات متداول بروزرسانی‌شده', items: [{ q: 'تست', a: 'پاسخ' }] }),
    }),
  });
  assert.strictEqual(updateSecRes.status, 200);

  // Delete section
  const delSecRes = await fetch(`${baseUrl}/api/sections/${createData.id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(delSecRes.status, 200);
});

test('12. Navigation Menus & Nested Tree Management', async () => {
  // Public header menu
  const headerRes = await fetch(`${baseUrl}/api/menus/public/header`);
  assert.strictEqual(headerRes.status, 200);
  const headerData = await headerRes.json();
  assert.strictEqual(headerData.success, true);
  assert.ok(headerData.items.length >= 5);

  // Public all menus
  const allPubRes = await fetch(`${baseUrl}/api/menus/public/all`);
  assert.strictEqual(allPubRes.status, 200);
  const allPub = await allPubRes.json();
  assert.ok(allPub.data.header);
  assert.ok(allPub.data.footer);

  // Admin list menus
  const adminMenusRes = await fetch(`${baseUrl}/api/menus`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(adminMenusRes.status, 200);
  const adminMenus = await adminMenusRes.json();
  assert.ok(adminMenus.data.length >= 2);
});

test('13. Knowledge Base Scale: Verify >= 15 High-Quality Technical Articles', async () => {
  const articlesRes = await fetch(`${baseUrl}/api/articles/public?limit=50`);
  assert.strictEqual(articlesRes.status, 200);
  const articlesData = await articlesRes.json();
  assert.strictEqual(articlesData.success, true);
  assert.ok(articlesData.data.length >= 15, `Expected >= 15 articles, got ${articlesData.data.length}`);

  // Verify first article structure and deep content
  const firstSlug = articlesData.data[0].slug;
  const detailRes = await fetch(`${baseUrl}/api/articles/public/${firstSlug}`);
  assert.strictEqual(detailRes.status, 200);
  const detail = await detailRes.json();
  assert.ok(detail.data.content_html.length > 500);
  assert.ok(detail.data.seo_title);
  assert.ok(detail.data.seo_description);
});

test('14. Analytics Collection & Admin Metrics Dashboard', async () => {
  // Track pageview
  const trackRes = await fetch(`${baseUrl}/api/analytics/collect`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      event_type: 'pageview',
      path: '/platform',
      referrer: 'https://google.com',
    }),
  });
  assert.strictEqual(trackRes.status, 200);

  // Get admin analytics dashboard
  const dashRes = await fetch(`${baseUrl}/api/analytics/dashboard`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(dashRes.status, 200);
  const dashData = await dashRes.json();
  assert.strictEqual(dashData.success, true);
  assert.ok(dashData.stats.totalViews >= 1);
  assert.ok(dashData.stats.totalArticles >= 15);
  assert.ok(dashData.stats.totalPages >= 6);
  assert.ok(Array.isArray(dashData.topPaths));
});

test('15. Global Admin Search across all entities', async () => {
  const searchRes = await fetch(`${baseUrl}/api/search/admin?q=فرآوری`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(searchRes.status, 200);
  const searchData = await searchRes.json();
  assert.strictEqual(searchData.success, true);
  assert.ok(searchData.data.articles.length > 0 || searchData.data.pages.length > 0);
});

test('16. Editorial Publishing Workflow & Draft Isolation', async () => {
  // Public search must only return published articles
  const pubRes = await fetch(`${baseUrl}/api/articles/public?limit=100`);
  assert.strictEqual(pubRes.status, 200);
  const pubData = await pubRes.json();
  assert.strictEqual(pubData.success, true);
  for (const art of pubData.data) {
    assert.strictEqual(art.status, 'published');
  }

  // Admin view must see both published and drafts (25 total)
  const adminRes = await fetch(`${baseUrl}/api/articles`, {
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(adminRes.status, 200);
  const adminData = await adminRes.json();
  assert.strictEqual(adminData.success, true);
  assert.ok(adminData.data.length >= 25, `Expected >= 25 total articles (15 published + 10 drafts), got ${adminData.data.length}`);
});

test('17. Extended Page Builder Block Types Support', async () => {
  const newBlocks = ['gallery', 'timeline', 'services_grid', 'downloads', 'image', 'image_text', 'video', 'logo_cloud', 'testimonials', 'cards', 'contact_info', 'team'];
  for (const type of newBlocks) {
    const res = await fetch(`${baseUrl}/api/sections/page/1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        section_type: type,
        config_json: JSON.stringify({ title: `بلوک آزمایشی ${type}`, items: [] }),
      }),
    });
    assert.strictEqual(res.status, 201, `Failed creating section of type: ${type}`);
    const data = await res.json();
    assert.ok(data.id);

    // Clean up
    await fetch(`${baseUrl}/api/sections/${data.id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${authToken}` },
    });
  }
});

test('18. Public Article by Slug & Draft Protection', async () => {
  // Test published article lookup
  const pubSlug = 'role-of-data-analytics-in-mineral-processing-performance';
  const res = await fetch(`${baseUrl}/api/articles/public/${pubSlug}`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.success, true);
  assert.strictEqual(data.data.slug, pubSlug);
  assert.strictEqual(data.data.status, 'published');

  // Test draft article slug lookup on public endpoint - MUST BE 404
  const draftSlug = 'draft-flotation-reagents-selectivity-study';
  const draftRes = await fetch(`${baseUrl}/api/articles/public/${draftSlug}`);
  assert.strictEqual(draftRes.status, 404, 'Draft articles must not be accessible via public endpoint');
});

test('19. Categories CRUD & Slug Updating', async () => {
  const uniqueSuffix = Date.now();
  // Create category
  const createRes = await fetch(`${baseUrl}/api/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name: `متالورژی پیشرفته آزمون ${uniqueSuffix}`,
      slug: `advanced-test-metallurgy-${uniqueSuffix}`,
      description: 'دسته‌بندی تستی آزمون خودکار',
    }),
  });
  assert.strictEqual(createRes.status, 201);
  const createData = await createRes.json();
  const catId = createData.id;
  assert.ok(catId);

  // Update category
  const updateRes = await fetch(`${baseUrl}/api/categories/${catId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify({
      name: `متالورژی پیشرفته به‌روزرسانی ${uniqueSuffix}`,
      description: 'توضیحات جدید به‌روزشده',
    }),
  });
  assert.strictEqual(updateRes.status, 200);

  // Clean up delete
  const delRes = await fetch(`${baseUrl}/api/categories/${catId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${authToken}` },
  });
  assert.strictEqual(delRes.status, 200);
});

test('20. Root Health Check Endpoint (/health)', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  const data = await res.json();
  assert.strictEqual(data.status, 'healthy');
  assert.strictEqual(data.service, 'MadanCo Corporate Platform');
});

test('21. Unhandled API Route Returns Clean JSON 404 (Not HTML)', async () => {
  const res = await fetch(`${baseUrl}/api/non-existent-endpoint-${Date.now()}`);
  assert.strictEqual(res.status, 404);
  const contentType = res.headers.get('content-type') || '';
  assert.ok(contentType.includes('application/json'), `Expected JSON response, got ${contentType}`);
  const data = await res.json();
  assert.strictEqual(data.success, false);
});
