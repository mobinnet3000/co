import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const pagesController = {
  // Public get by slug
  getBySlug: (req: Request, res: Response) => {
    const { slug } = req.params;
    const page = db.prepare(`
      SELECT * FROM pages WHERE slug = ? AND status = 'published'
    `).get(slug);

    if (!page) {
      return res.status(404).json({ success: false, message: 'صفحه مورد نظر یافت نشد.' });
    }
    res.json({ success: true, data: page });
  },

  // Admin: List all pages
  getAll: (req: AuthRequest, res: Response) => {
    const pages = db.prepare('SELECT * FROM pages ORDER BY updated_at DESC').all();
    res.json({ success: true, data: pages });
  },

  // Admin: Get by ID
  getById: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const page = db.prepare('SELECT * FROM pages WHERE id = ?').get(id);
    if (!page) {
      return res.status(404).json({ success: false, message: 'صفحه یافت نشد.' });
    }
    res.json({ success: true, data: page });
  },

  // Admin: Create page
  create: (req: AuthRequest, res: Response) => {
    const {
      title,
      slug,
      excerpt,
      content,
      status = 'published',
      scheduled_at,
      parent_id,
      template = 'default',
      seo_title,
      seo_description,
      focus_keyword,
      canonical_url,
      og_image,
    } = req.body;

    if (!title || !slug) {
      return res.status(400).json({ success: false, message: 'عنوان و آدرس یکتا (Slug) الزامی هستند.' });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = db.prepare('SELECT id FROM pages WHERE slug = ?').get(cleanSlug);
    if (existing) {
      return res.status(400).json({ success: false, message: 'صفحه‌ای با این پیوند یکتا (Slug) از قبل وجود دارد.' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO pages (
        title, slug, excerpt, content, status, scheduled_at, parent_id, template,
        seo_title, seo_description, focus_keyword, canonical_url, og_image,
        created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      title,
      cleanSlug,
      excerpt || '',
      content || '',
      status,
      scheduled_at || null,
      parent_id || null,
      template,
      seo_title || title,
      seo_description || excerpt || '',
      focus_keyword || '',
      canonical_url || `https://madan.co.ir/${cleanSlug}`,
      og_image || '',
      now,
      now
    );

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'CREATE_PAGE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, cleanSlug, `ایجاد صفحه جدید: ${title}`, now);

    res.status(201).json({
      success: true,
      message: 'صفحه با موفقیت ایجاد شد.',
      id: Number(result.lastInsertRowid),
    });
  },

  // Admin: Update page
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const {
      title,
      slug,
      excerpt,
      content,
      status,
      scheduled_at,
      parent_id,
      template,
      seo_title,
      seo_description,
      focus_keyword,
      canonical_url,
      og_image,
    } = req.body;

    const existing = db.prepare('SELECT id, slug FROM pages WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'صفحه مورد نظر یافت نشد.' });
    }

    const cleanSlug = slug ? slug.trim().toLowerCase().replace(/\s+/g, '-') : existing.slug;
    if (cleanSlug !== existing.slug) {
      const slugClash = db.prepare('SELECT id FROM pages WHERE slug = ? AND id != ?').get(cleanSlug, id);
      if (slugClash) {
        return res.status(400).json({ success: false, message: 'این پیوند یکتا قبلاً برای صفحه دیگری ثبت شده است.' });
      }
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE pages SET
        title = COALESCE(?, title),
        slug = COALESCE(?, slug),
        excerpt = COALESCE(?, excerpt),
        content = COALESCE(?, content),
        status = COALESCE(?, status),
        scheduled_at = ?,
        parent_id = ?,
        template = COALESCE(?, template),
        seo_title = COALESCE(?, seo_title),
        seo_description = COALESCE(?, seo_description),
        focus_keyword = COALESCE(?, focus_keyword),
        canonical_url = COALESCE(?, canonical_url),
        og_image = COALESCE(?, og_image),
        updated_at = ?
      WHERE id = ?
    `).run(
      title ?? null,
      cleanSlug ?? null,
      excerpt ?? null,
      content ?? null,
      status ?? null,
      scheduled_at ?? null,
      parent_id ?? null,
      template ?? null,
      seo_title ?? null,
      seo_description ?? null,
      focus_keyword ?? null,
      canonical_url ?? null,
      og_image ?? null,
      now,
      id
    );

    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'UPDATE_PAGE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, cleanSlug, `به‌روزرسانی صفحه: ${title || existing.slug}`, now);

    res.json({ success: true, message: 'صفحه با موفقیت به‌روزرسانی شد.' });
  },

  // Admin: Delete page
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const page = db.prepare('SELECT id, slug, title FROM pages WHERE id = ?').get(id) as any;
    if (!page) {
      return res.status(404).json({ success: false, message: 'صفحه مورد نظر یافت نشد.' });
    }

    // Protect essential system pages
    if (['home', 'platform', 'about', 'services', 'contact', 'company'].includes(page.slug)) {
      return res.status(400).json({ success: false, message: 'صفحات سیستمی و هویتی اصلی قابل حذف نیستند؛ فقط می‌توانید محتوای آن‌ها را ویرایش فرمایید.' });
    }

    db.prepare('DELETE FROM pages WHERE id = ?').run(id);

    const now = new Date().toISOString();
    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'DELETE_PAGE', ?, ?, ?)
    `).run(req.user!.id, req.user!.username, page.slug, `حذف صفحه: ${page.title}`, now);

    res.json({ success: true, message: 'صفحه با موفقیت حذف گردید.' });
  },
};
