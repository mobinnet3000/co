import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const seoController = {
  // Admin: Get SEO health overview and page checklist
  getOverview: (req: AuthRequest, res: Response) => {
    const pages = db.prepare(`
      SELECT id, title, slug, seo_title, seo_description, focus_keyword, canonical_url, og_image
      FROM pages WHERE status = 'published'
    `).all() as any[];

    const articles = db.prepare(`
      SELECT id, title, slug, seo_title, seo_description, focus_keyword, canonical_url, og_image
      FROM articles WHERE status = 'published'
    `).all() as any[];

    const allItems = [
      ...pages.map((p) => ({ ...p, type: 'page' })),
      ...articles.map((a) => ({ ...a, type: 'article' })),
    ];

    let missingSeoTitle = 0;
    let missingSeoDesc = 0;
    let missingFocusKeyword = 0;
    let titleTooLong = 0;
    let descTooShort = 0;

    for (const item of allItems) {
      if (!item.seo_title) missingSeoTitle++;
      else if (item.seo_title.length > 65) titleTooLong++;

      if (!item.seo_description) missingSeoDesc++;
      else if (item.seo_description.length < 50) descTooShort++;

      if (!item.focus_keyword) missingFocusKeyword++;
    }

    res.json({
      success: true,
      stats: {
        totalIndexedEntities: allItems.length,
        totalPages: pages.length,
        totalArticles: articles.length,
        missingSeoTitle,
        missingSeoDesc,
        missingFocusKeyword,
        titleTooLong,
        descTooShort,
      },
      items: allItems,
    });
  },

  // Dynamic Sitemap XML generator endpoint
  getSitemapXml: (req: Request, res: Response) => {
    const pages = db.prepare("SELECT slug, updated_at FROM pages WHERE status = 'published'").all() as any[];
    const articles = db.prepare("SELECT slug, updated_at FROM articles WHERE status = 'published'").all() as any[];

    const baseUrl = 'https://madan.co.ir';
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Static / root
    xml += `  <url>\n    <loc>${baseUrl}/</loc>\n    <priority>1.0</priority>\n    <changefreq>daily</changefreq>\n  </url>\n`;

    for (const p of pages) {
      if (p.slug === 'home') continue;
      const url = `${baseUrl}/${p.slug}`;
      const date = p.updated_at ? p.updated_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.8</priority>\n  </url>\n`;
    }

    for (const a of articles) {
      const url = `${baseUrl}/blog/${a.slug}`;
      const date = a.updated_at ? a.updated_at.slice(0, 10) : new Date().toISOString().slice(0, 10);
      xml += `  <url>\n    <loc>${url}</loc>\n    <lastmod>${date}</lastmod>\n    <priority>0.7</priority>\n  </url>\n`;
    }

    xml += '</urlset>';

    res.header('Content-Type', 'application/xml');
    res.send(xml);
  },

  // Dynamic Robots.txt generator endpoint
  getRobotsTxt: (req: Request, res: Response) => {
    const robots = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /admin/*
Disallow: /api/*

Sitemap: https://madan.co.ir/sitemap.xml
`;
    res.header('Content-Type', 'text/plain');
    res.send(robots);
  },
};
