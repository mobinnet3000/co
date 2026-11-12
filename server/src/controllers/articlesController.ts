import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const articlesController = {
  // Public: List published articles with search and filtering
  getPublicArticles: (req: Request, res: Response) => {
    const { category, tag, search, page = '1', limit = '10' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.max(1, Math.min(50, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;

    let query = `
      SELECT a.id, a.title, a.slug, a.summary, a.featured_image, a.author_name,
             a.reading_time, a.is_featured, a.published_at, a.created_at,
             c.name as category_name, c.slug as category_slug
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
    `;
    const params: any[] = [];

    if (category && category !== 'همه مقالات') {
      query += ' AND (c.slug = ? OR c.name = ?)';
      params.push(category, category);
    }

    if (search) {
      query += ' AND (a.title LIKE ? OR a.summary LIKE ? OR a.content_html LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (tag) {
      query += ` AND a.id IN (
        SELECT at.article_id FROM article_tags at
        JOIN tags t ON at.tag_id = t.id
        WHERE t.slug = ? OR t.name = ?
      )`;
      params.push(tag, tag);
    }

    // Count total
    const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
    const totalRow = db.prepare(countQuery).get(...params) as { total: number };
    const total = totalRow ? totalRow.total : 0;

    query += ' ORDER BY a.is_featured DESC, a.created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);

    const articles = db.prepare(query).all(...params) as any[];

    // Fetch tags for each article
    for (const art of articles) {
      const tags = db.prepare(`
        SELECT t.name, t.slug FROM tags t
        JOIN article_tags at ON t.id = at.tag_id
        WHERE at.article_id = ?
      `).all(art.id);
      art.tags = tags;
    }

    res.json({
      success: true,
      data: articles,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  },

  // Public: Get published article by slug
  getPublicArticleBySlug: (req: Request, res: Response) => {
    const { slug } = req.params;
    const article = db.prepare(`
      SELECT a.*, c.name as category_name, c.slug as category_slug
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.slug = ? AND a.status = 'published'
    `).get(slug) as any;

    if (!article) {
      return res.status(404).json({ success: false, message: 'مقاله مورد نظر یافت نشد.' });
    }

    // Fetch tags
    article.tags = db.prepare(`
      SELECT t.name, t.slug FROM tags t
      JOIN article_tags at ON t.id = at.tag_id
      WHERE at.article_id = ?
    `).all(article.id);

    // Fetch related articles
    article.related = db.prepare(`
      SELECT id, title, slug, summary, reading_time, published_at
      FROM articles
      WHERE category_id = ? AND id != ? AND status = 'published'
      ORDER BY created_at DESC LIMIT 3
    `).all(article.category_id, article.id);

    res.json({ success: true, data: article });
  },

  // Admin: List all articles
  getAll: (req: AuthRequest, res: Response) => {
    const articles = db.prepare(`
      SELECT a.id, a.title, a.slug, a.status, a.is_featured, a.author_name,
             a.reading_time, a.published_at, a.created_at, a.updated_at,
             c.name as category_name
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      ORDER BY a.created_at DESC
    `).all() as any[];

    for (const art of articles) {
      art.tags = db.prepare(`
        SELECT t.name FROM tags t
        JOIN article_tags at ON t.id = at.tag_id
        WHERE at.article_id = ?
      `).all(art.id).map((t: any) => t.name);
    }

    res.json({ success: true, data: articles });
  },

  // Admin: Get by ID
  getById: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const article = db.prepare('SELECT * FROM articles WHERE id = ?').get(id) as any;
    if (!article) {
      return res.status(404).json({ success: false, message: 'مقاله یافت نشد.' });
    }

    article.tags = db.prepare(`
      SELECT t.id, t.name, t.slug FROM tags t
      JOIN article_tags at ON t.id = at.tag_id
      WHERE at.article_id = ?
    `).all(id);

    res.json({ success: true, data: article });
  },

  // Admin: Create article
  create: (req: AuthRequest, res: Response) => {
    const {
      title,
      slug,
      summary,
      content_html,
      featured_image,
      category_id,
      status = 'published',
      reading_time = '۵ دقیقه',
      is_featured = 0,
      seo_title,
      seo_description,
      focus_keyword,
      canonical_url,
      og_image,
      published_at,
      tags = [],
    } = req.body;

    if (!title || !slug || !summary || !content_html) {
      return res.status(400).json({ success: false, message: 'عنوان، پیوند یکتا (Slug)، خلاصه و متن کامل مقاله الزامی هستند.' });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(cleanSlug);
    if (existing) {
      return res.status(400).json({ success: false, message: 'مقاله‌ای با این پیوند یکتا قبلاً ثبت شده است.' });
    }

    const now = new Date().toISOString();
    const pubDate = published_at || new Intl.DateTimeFormat('fa-IR').format(new Date());

    const result = db.prepare(`
      INSERT INTO articles (
        title, slug, summary, content_html, featured_image, author_id, author_name,
        category_id, status, reading_time, is_featured, seo_title, seo_description,
        focus_keyword, canonical_url, og_image, published_at, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      cleanSlug,
      summary,
      content_html,
      featured_image || '',
      req.user!.id,
      req.user!.full_name,
      category_id || null,
      status,
      reading_time,
      is_featured ? 1 : 0,
      seo_title || title,
      seo_description || summary,
      focus_keyword || '',
      canonical_url || `https://madan.co.ir/blog/${cleanSlug}`,
      og_image || featured_image || '',
      pubDate,
      now,
      now
    );

    const articleId = Number(result.lastInsertRowid);

    // Save tags
    if (Array.isArray(tags)) {
      const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)');
      const getTag = db.prepare('SELECT id FROM tags WHERE name = ?');
      const linkTag = db.prepare('INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)');

      for (const t of tags) {
        if (!t) continue;
        const tagName = String(t).trim();
        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
        insertTag.run(tagName, tagSlug);
        const tagRow = getTag.get(tagName) as any;
        if (tagRow) {
          linkTag.run(articleId, tagRow.id);
        }
      }
    }

    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'CREATE_ARTICLE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, cleanSlug, `انتشار/ایجاد مقاله: ${title}`, now);

    res.status(201).json({ success: true, message: 'مقاله با موفقیت ایجاد شد.', id: articleId });
  },

  // Admin: Update article
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const {
      title,
      slug,
      summary,
      content_html,
      featured_image,
      category_id,
      status,
      reading_time,
      is_featured,
      seo_title,
      seo_description,
      focus_keyword,
      canonical_url,
      og_image,
      published_at,
      tags,
    } = req.body;

    const existing = db.prepare('SELECT id, slug, title FROM articles WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'مقاله مورد نظر یافت نشد.' });
    }

    const cleanSlug = slug ? slug.trim().toLowerCase().replace(/\s+/g, '-') : existing.slug;
    if (cleanSlug !== existing.slug) {
      const clash = db.prepare('SELECT id FROM articles WHERE slug = ? AND id != ?').get(cleanSlug, id);
      if (clash) {
        return res.status(400).json({ success: false, message: 'این پیوند یکتا برای مقاله دیگری استفاده شده است.' });
      }
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE articles SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        summary = COALESCE(?, summary),
        content_html = COALESCE(?, content_html),
        featured_image = COALESCE(?, featured_image),
        category_id = COALESCE(?, category_id),
        status = COALESCE(?, status),
        reading_time = COALESCE(?, reading_time),
        is_featured = COALESCE(?, is_featured),
        seo_title = COALESCE(?, seo_title),
        seo_description = COALESCE(?, seo_description),
        focus_keyword = COALESCE(?, focus_keyword),
        canonical_url = COALESCE(?, canonical_url),
        og_image = COALESCE(?, og_image),
        published_at = COALESCE(?, published_at),
        updated_at = ?
      WHERE id = ?
    `).run(
      title,
      cleanSlug,
      summary,
      content_html,
      featured_image,
      category_id,
      status,
      reading_time,
      is_featured !== undefined ? (is_featured ? 1 : 0) : null,
      seo_title,
      seo_description,
      focus_keyword,
      canonical_url,
      og_image,
      published_at,
      now,
      id
    );

    // Update tags if provided
    if (Array.isArray(tags)) {
      db.prepare('DELETE FROM article_tags WHERE article_id = ?').run(id);
      const insertTag = db.prepare('INSERT OR IGNORE INTO tags (name, slug) VALUES (?, ?)');
      const getTag = db.prepare('SELECT id FROM tags WHERE name = ?');
      const linkTag = db.prepare('INSERT OR IGNORE INTO article_tags (article_id, tag_id) VALUES (?, ?)');

      for (const t of tags) {
        if (!t) continue;
        const tagName = String(t).trim();
        const tagSlug = tagName.toLowerCase().replace(/\s+/g, '-');
        insertTag.run(tagName, tagSlug);
        const tagRow = getTag.get(tagName) as any;
        if (tagRow) {
          linkTag.run(id, tagRow.id);
        }
      }
    }

    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'UPDATE_ARTICLE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, cleanSlug, `به‌روزرسانی مقاله: ${title || existing.title}`, now);

    res.json({ success: true, message: 'مقاله با موفقیت به‌روزرسانی شد.' });
  },

  // Admin: Delete article
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const article = db.prepare('SELECT id, slug, title FROM articles WHERE id = ?').get(id) as any;
    if (!article) {
      return res.status(404).json({ success: false, message: 'مقاله مورد نظر یافت نشد.' });
    }

    db.prepare('DELETE FROM articles WHERE id = ?').run(id);

    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'DELETE_ARTICLE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, article.slug, `حذف مقاله: ${article.title}`, now);

    res.json({ success: true, message: 'مقاله با موفقیت حذف شد.' });
  },
};
