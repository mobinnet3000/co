import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

const ALLOWED_SECTION_TYPES = [
  'hero',
  'text',
  'image',
  'image_text',
  'features',
  'stats',
  'faq',
  'cta',
  'table',
  'showcase',
  'gallery',
  'video',
  'logo_cloud',
  'testimonials',
  'cards',
  'contact_info',
  'downloads',
  'team',
  'timeline',
  'services_grid',
  'html',
];

export const pageSectionsController = {
  // Public: Get active sections by page slug
  getByPageSlug: (req: Request, res: Response) => {
    const { slug } = req.params;
    const page = db.prepare("SELECT id, title, slug FROM pages WHERE slug = ? AND status = 'published'").get(slug) as { id: number; title: string; slug: string } | undefined;

    if (!page) {
      return res.status(404).json({ success: false, message: 'صفحه مورد نظر یافت نشد.' });
    }

    const sections = db.prepare(`
      SELECT * FROM page_sections
      WHERE page_id = ? AND is_active = 1
      ORDER BY section_order ASC, id ASC
    `).all(page.id) as Array<{ id: number; page_id: number; section_type: string; section_order: number; config_json: string; is_active: number; created_at: string; updated_at: string }>;

    const parsed = sections.map(s => {
      let config = {};
      try {
        config = JSON.parse(s.config_json);
      } catch {
        config = {};
      }
      return {
        ...s,
        config,
      };
    });

    res.json({ success: true, page, data: parsed });
  },

  // Admin: Get all sections by page ID (including inactive)
  getByPageId: (req: AuthRequest, res: Response) => {
    const { pageId } = req.params;
    const sections = db.prepare(`
      SELECT * FROM page_sections
      WHERE page_id = ?
      ORDER BY section_order ASC, id ASC
    `).all(pageId) as Array<{ id: number; page_id: number; section_type: string; section_order: number; config_json: string; is_active: number; created_at: string; updated_at: string }>;

    const parsed = sections.map(s => {
      let config = {};
      try {
        config = JSON.parse(s.config_json);
      } catch {
        config = {};
      }
      return {
        ...s,
        config,
      };
    });

    res.json({ success: true, data: parsed });
  },

  // Admin: Create new section for a page
  create: (req: AuthRequest, res: Response) => {
    const { pageId } = req.params;
    const { section_type, config_json, is_active = 1, section_order } = req.body;

    if (!section_type || !ALLOWED_SECTION_TYPES.includes(section_type)) {
      return res.status(400).json({
        success: false,
        message: `نوع سکشن معتبر نیست. انواع مجاز: ${ALLOWED_SECTION_TYPES.join(', ')}`,
      });
    }

    // Validate config_json is valid JSON
    let validConfigStr = '{}';
    if (typeof config_json === 'string') {
      try {
        JSON.parse(config_json);
        validConfigStr = config_json;
      } catch {
        return res.status(400).json({ success: false, message: 'تنظیمات سکشن باید ساختار JSON معتبر باشد.' });
      }
    } else if (typeof config_json === 'object' && config_json !== null) {
      validConfigStr = JSON.stringify(config_json);
    }

    // Calculate next order if not specified
    let order = section_order;
    if (order === undefined || order === null) {
      const maxOrder = db.prepare('SELECT MAX(section_order) as m FROM page_sections WHERE page_id = ?').get(pageId) as { m: number | null };
      order = (maxOrder?.m ?? -1) + 1;
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO page_sections (page_id, section_type, section_order, config_json, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(pageId, section_type, order, validConfigStr, is_active ? 1 : 0, now, now);

    res.status(201).json({
      success: true,
      message: 'سکشن با موفقیت ایجاد شد.',
      id: Number(result.lastInsertRowid),
    });
  },

  // Admin: Update existing section
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { section_type, config_json, is_active, section_order } = req.body;

    const existing = db.prepare('SELECT * FROM page_sections WHERE id = ?').get(id) as { id: number; page_id: number; section_type: string; config_json: string; is_active: number; section_order: number } | undefined;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'سکشن مورد نظر یافت نشد.' });
    }

    let finalConfig = existing.config_json;
    if (config_json !== undefined) {
      if (typeof config_json === 'string') {
        try {
          JSON.parse(config_json);
          finalConfig = config_json;
        } catch {
          return res.status(400).json({ success: false, message: 'فرمت JSON ارسال شده نامعتبر است.' });
        }
      } else if (typeof config_json === 'object' && config_json !== null) {
        finalConfig = JSON.stringify(config_json);
      }
    }

    const finalType = section_type || existing.section_type;
    if (section_type && !ALLOWED_SECTION_TYPES.includes(section_type)) {
      return res.status(400).json({ success: false, message: 'نوع سکشن معتبر نیست.' });
    }

    const finalActive = is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active;
    const finalOrder = section_order !== undefined ? Number(section_order) : existing.section_order;
    const now = new Date().toISOString();

    db.prepare(`
      UPDATE page_sections
      SET section_type = ?, config_json = ?, is_active = ?, section_order = ?, updated_at = ?
      WHERE id = ?
    `).run(finalType, finalConfig, finalActive, finalOrder, now, id);

    res.json({ success: true, message: 'سکشن با موفقیت بروزرسانی شد.' });
  },

  // Admin: Delete section
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM page_sections WHERE id = ?').run(id);

    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'سکشن یافت نشد.' });
    }

    res.json({ success: true, message: 'سکشن با موفقیت حذف شد.' });
  },

  // Admin: Batch reorder sections
  reorder: (req: AuthRequest, res: Response) => {
    const { pageId } = req.params;
    const { items } = req.body as { items: Array<{ id: number; section_order: number }> };

    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'آیتم‌ها باید آرایه‌ای از شناسه‌ها و رتبه‌ها باشند.' });
    }

    const updateStmt = db.prepare('UPDATE page_sections SET section_order = ?, updated_at = ? WHERE id = ? AND page_id = ?');
    const now = new Date().toISOString();

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const item of items) {
        updateStmt.run(item.section_order, now, item.id, pageId);
      }
      db.exec('COMMIT;');
      res.json({ success: true, message: 'چیدمان سکشن‌ها با موفقیت ذخیره شد.' });
    } catch (err: any) {
      db.exec('ROLLBACK;');
      res.status(500).json({ success: false, message: 'خطا در مرتب‌سازی سکشن‌ها', error: err.message });
    }
  },

  // Admin: Duplicate section
  duplicate: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const source = db.prepare('SELECT * FROM page_sections WHERE id = ?').get(id) as any;

    if (!source) {
      return res.status(404).json({ success: false, message: 'سکشن مبدأ یافت نشد.' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO page_sections (page_id, section_type, section_order, config_json, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(source.page_id, source.section_type, source.section_order + 1, source.config_json, source.is_active, now, now);

    res.status(201).json({
      success: true,
      message: 'سکشن تکثیر شد.',
      id: Number(result.lastInsertRowid),
    });
  },
};
