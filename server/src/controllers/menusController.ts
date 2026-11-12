import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

interface MenuItemRow {
  id: number;
  menu_id: number;
  title: string;
  url: string;
  parent_id: number | null;
  sort_order: number;
  target: string;
  is_active: number;
}

interface NestedMenuItem extends MenuItemRow {
  children: NestedMenuItem[];
}

function buildTree(items: MenuItemRow[], parentId: number | null = null): NestedMenuItem[] {
  return items
    .filter(item => item.parent_id === parentId)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map(item => ({
      ...item,
      children: buildTree(items, item.id),
    }));
}

export const menusController = {
  // Public: Get menu by slug with nested tree
  getPublicBySlug: (req: Request, res: Response) => {
    const { slug } = req.params;
    const menu = db.prepare('SELECT * FROM navigation_menus WHERE slug = ?').get(slug) as any;

    if (!menu) {
      return res.status(404).json({ success: false, message: 'منوی مورد نظر یافت نشد.' });
    }

    const items = db.prepare(`
      SELECT * FROM menu_items
      WHERE menu_id = ? AND is_active = 1
      ORDER BY sort_order ASC, id ASC
    `).all(menu.id) as MenuItemRow[];

    const tree = buildTree(items, null);
    res.json({
      success: true,
      menu: {
        id: menu.id,
        name: menu.name,
        slug: menu.slug,
        location: menu.location,
      },
      items: tree,
    });
  },

  // Public: Get all public menus
  getAllPublic: (req: Request, res: Response) => {
    const menus = db.prepare('SELECT id, name, slug, location FROM navigation_menus').all() as any[];
    const result: Record<string, any> = {};

    for (const m of menus) {
      const items = db.prepare(`
        SELECT * FROM menu_items
        WHERE menu_id = ? AND is_active = 1
        ORDER BY sort_order ASC, id ASC
      `).all(m.id) as MenuItemRow[];
      result[m.slug] = {
        ...m,
        items: buildTree(items, null),
      };
    }

    res.json({ success: true, data: result });
  },

  // Admin: List all menus
  getAll: (req: AuthRequest, res: Response) => {
    const menus = db.prepare(`
      SELECT m.*, COUNT(i.id) as item_count
      FROM navigation_menus m
      LEFT JOIN menu_items i ON m.id = i.menu_id
      GROUP BY m.id
      ORDER BY m.id ASC
    `).all();

    res.json({ success: true, data: menus });
  },

  // Admin: Get single menu with full flat and tree items
  getById: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const menu = db.prepare('SELECT * FROM navigation_menus WHERE id = ?').get(id) as any;

    if (!menu) {
      return res.status(404).json({ success: false, message: 'منو یافت نشد.' });
    }

    const items = db.prepare(`
      SELECT * FROM menu_items
      WHERE menu_id = ?
      ORDER BY sort_order ASC, id ASC
    `).all(menu.id) as MenuItemRow[];

    res.json({
      success: true,
      menu,
      itemsFlat: items,
      itemsTree: buildTree(items, null),
    });
  },

  // Admin: Create Menu
  create: (req: AuthRequest, res: Response) => {
    const { name, slug, location } = req.body;
    if (!name || !slug) {
      return res.status(400).json({ success: false, message: 'نام و پیوند یکتای منو الزامی است.' });
    }

    const cleanSlug = slug.trim().toLowerCase().replace(/\s+/g, '-');
    const existing = db.prepare('SELECT id FROM navigation_menus WHERE slug = ?').get(cleanSlug);
    if (existing) {
      return res.status(400).json({ success: false, message: 'منویی با این شناسه لاتین از قبل وجود دارد.' });
    }

    const now = new Date().toISOString();
    const result = db.prepare(`
      INSERT INTO navigation_menus (name, slug, location, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?)
    `).run(name, cleanSlug, location || null, now, now);

    res.status(201).json({
      success: true,
      message: 'منو ایجاد شد.',
      id: Number(result.lastInsertRowid),
    });
  },

  // Admin: Update Menu
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { name, location } = req.body;

    const existing = db.prepare('SELECT id FROM navigation_menus WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'منو یافت نشد.' });
    }

    const now = new Date().toISOString();
    db.prepare(`
      UPDATE navigation_menus
      SET name = COALESCE(?, name), location = COALESCE(?, location), updated_at = ?
      WHERE id = ?
    `).run(name, location, now, id);

    res.json({ success: true, message: 'مشخصات منو بروزرسانی شد.' });
  },

  // Admin: Delete Menu
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const result = db.prepare('DELETE FROM navigation_menus WHERE id = ?').run(id);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'منو یافت نشد.' });
    }
    res.json({ success: true, message: 'منو و تمام آیتم‌های آن با موفقیت حذف شدند.' });
  },

  // Admin: Add Menu Item
  addItem: (req: AuthRequest, res: Response) => {
    const { menuId } = req.params;
    const { title, url, parent_id = null, sort_order, target = '_self', is_active = 1 } = req.body;

    if (!title || !url) {
      return res.status(400).json({ success: false, message: 'عنوان آیتم و آدرس لینک الزامی هستند.' });
    }

    let order = sort_order;
    if (order === undefined || order === null) {
      const maxOrder = db.prepare('SELECT MAX(sort_order) as m FROM menu_items WHERE menu_id = ?').get(menuId) as { m: number | null };
      order = (maxOrder?.m ?? -1) + 1;
    }

    const result = db.prepare(`
      INSERT INTO menu_items (menu_id, title, url, parent_id, sort_order, target, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(menuId, title, url, parent_id ? Number(parent_id) : null, order, target, is_active ? 1 : 0);

    res.status(201).json({
      success: true,
      message: 'آیتم منو اضافه شد.',
      id: Number(result.lastInsertRowid),
    });
  },

  // Admin: Update Menu Item
  updateItem: (req: AuthRequest, res: Response) => {
    const { itemId } = req.params;
    const { title, url, parent_id, sort_order, target, is_active } = req.body;

    const existing = db.prepare('SELECT * FROM menu_items WHERE id = ?').get(itemId) as MenuItemRow | undefined;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'آیتم منو یافت نشد.' });
    }

    db.prepare(`
      UPDATE menu_items
      SET title = COALESCE(?, title),
          url = COALESCE(?, url),
          parent_id = ?,
          sort_order = COALESCE(?, sort_order),
          target = COALESCE(?, target),
          is_active = COALESCE(?, is_active)
      WHERE id = ?
    `).run(
      title,
      url,
      parent_id !== undefined ? (parent_id ? Number(parent_id) : null) : existing.parent_id,
      sort_order !== undefined ? Number(sort_order) : existing.sort_order,
      target,
      is_active !== undefined ? (is_active ? 1 : 0) : existing.is_active,
      itemId
    );

    res.json({ success: true, message: 'آیتم منو بروزرسانی شد.' });
  },

  // Admin: Delete Menu Item
  deleteItem: (req: AuthRequest, res: Response) => {
    const { itemId } = req.params;
    const result = db.prepare('DELETE FROM menu_items WHERE id = ?').run(itemId);
    if (result.changes === 0) {
      return res.status(404).json({ success: false, message: 'آیتم یافت نشد.' });
    }
    res.json({ success: true, message: 'آیتم حذف شد.' });
  },

  // Admin: Batch Reorder Items
  reorderItems: (req: AuthRequest, res: Response) => {
    const { menuId } = req.params;
    const { items } = req.body as { items: Array<{ id: number; sort_order: number; parent_id?: number | null }> };

    if (!Array.isArray(items)) {
      return res.status(400).json({ success: false, message: 'آیتم‌ها باید آرایه باشند.' });
    }

    const updateStmt = db.prepare('UPDATE menu_items SET sort_order = ?, parent_id = ? WHERE id = ? AND menu_id = ?');

    db.exec('BEGIN TRANSACTION;');
    try {
      for (const it of items) {
        updateStmt.run(it.sort_order, it.parent_id !== undefined ? it.parent_id : null, it.id, menuId);
      }
      db.exec('COMMIT;');
      res.json({ success: true, message: 'ترتیب آیتم‌ها بروزرسانی شد.' });
    } catch (err: any) {
      db.exec('ROLLBACK;');
      res.status(500).json({ success: false, message: 'خطا در مرتب‌سازی', error: err.message });
    }
  },
};
