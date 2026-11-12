import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const categoriesController = {
  // Public & Admin: Get all categories with article count
  getAll: (req: Request, res: Response) => {
    const categories = db.prepare(`
      SELECT c.*, COUNT(a.id) as articles_count
      FROM categories c
      LEFT JOIN articles a ON c.id = a.category_id AND a.status = 'published'
      GROUP BY c.id
      ORDER BY c.name ASC
    `).all();
    res.json({ success: true, data: categories });
  },

  // Admin: Create category
  create: (req: AuthRequest, res: Response) => {
    const { name, slug, description } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'نام دسته‌بندی و پیوند یکتا (Slug) الزامی است.' });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = db.prepare('SELECT id FROM categories WHERE slug = ? OR name = ?').get(cleanSlug, name);
    if (existing) {
      return res.status(400).json({ success: false, message: 'دسته‌بندی با این نام یا پیوند یکتا وجود دارد.' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO categories (name, slug, description, created_at)
      VALUES (?, ?, ?, ?)
    `).run(name, cleanSlug, description || '', now);

    res.status(201).json({ success: true, message: 'دسته‌بندی ایجاد شد.', id: Number(result.lastInsertRowid) });
  },

  // Admin: Update category
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, slug, description } = req.body;

    const existing = db.prepare('SELECT id FROM categories WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'دسته‌بندی یافت نشد.' });
    }

    const cleanSlug = slug ? slug.trim().toLowerCase().replace(/\s+/g, '-') : undefined;

    db.prepare(`
      UPDATE categories SET
        name = COALESCE(?, name),
        slug = COALESCE(?, slug),
        description = COALESCE(?, description)
      WHERE id = ?
    `).run(name, cleanSlug, description, id);

    res.json({ success: true, message: 'دسته‌بندی با موفقیت به‌روزرسانی شد.' });
  },

  // Admin: Delete category
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    db.prepare('UPDATE articles SET category_id = NULL WHERE category_id = ?').run(id);
    db.prepare('DELETE FROM categories WHERE id = ?').run(id);
    res.json({ success: true, message: 'دسته‌بندی حذف شد.' });
  },
};
