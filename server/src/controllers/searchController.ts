import { Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const searchController = {
  adminGlobalSearch: (req: AuthRequest, res: Response) => {
    const q = ((req.query.q as string) || '').trim();

    if (!q || q.length < 2) {
      return res.json({
        success: true,
        data: {
          pages: [],
          articles: [],
          messages: [],
          media: [],
          menus: [],
        },
      });
    }

    const pattern = `%${q}%`;

    const pages = db.prepare(`
      SELECT id, title, slug, status, template
      FROM pages
      WHERE title LIKE ? OR slug LIKE ? OR excerpt LIKE ?
      ORDER BY updated_at DESC
      LIMIT 5
    `).all(pattern, pattern, pattern);

    const articles = db.prepare(`
      SELECT id, title, slug, status, author_name, reading_time
      FROM articles
      WHERE title LIKE ? OR slug LIKE ? OR summary LIKE ?
      ORDER BY updated_at DESC
      LIMIT 5
    `).all(pattern, pattern, pattern);

    const messages = db.prepare(`
      SELECT id, name, company, email, phone, status, subject
      FROM contact_messages
      WHERE name LIKE ? OR company LIKE ? OR message LIKE ? OR email LIKE ?
      ORDER BY created_at DESC
      LIMIT 5
    `).all(pattern, pattern, pattern, pattern);

    const media = db.prepare(`
      SELECT id, filename, original_name, alt_text, url
      FROM media
      WHERE original_name LIKE ? OR alt_text LIKE ? OR title LIKE ?
      ORDER BY id DESC
      LIMIT 5
    `).all(pattern, pattern, pattern);

    const menus = db.prepare(`
      SELECT id, title, url, menu_id
      FROM menu_items
      WHERE title LIKE ? OR url LIKE ?
      LIMIT 5
    `).all(pattern, pattern);

    res.json({
      success: true,
      query: q,
      data: {
        pages,
        articles,
        messages,
        media,
        menus,
      },
    });
  },
};
