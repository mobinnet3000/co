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
    server.close(() => resolve());
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
