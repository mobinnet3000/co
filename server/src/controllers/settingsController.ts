import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const settingsController = {
  // Public: Get general and contact settings needed by frontend
  getPublic: (req: Request, res: Response) => {
    const rows = db.prepare(`
      SELECT key, value FROM website_settings
      WHERE group_name IN ('general', 'contact', 'footer', 'seo')
    `).all() as Array<{ key: string; value: string }>;

    const settings: Record<string, string> = {};
    for (const r of rows) {
      settings[r.key] = r.value;
    }

    res.json({ success: true, data: settings });
  },

  // Admin: Get all settings grouped
  getAll: (req: AuthRequest, res: Response) => {
    const rows = db.prepare('SELECT * FROM website_settings ORDER BY group_name, key').all() as Array<{
      key: string;
      value: string;
      group_name: string;
      updated_at: string;
    }>;

    const grouped: Record<string, Record<string, string>> = {};
    for (const r of rows) {
      if (!grouped[r.group_name]) {
        grouped[r.group_name] = {};
      }
      grouped[r.group_name][r.key] = r.value;
    }

    res.json({ success: true, data: grouped });
  },

  // Admin: Update settings (batch)
  update: (req: AuthRequest, res: Response) => {
    const settings = req.body; // e.g. { phone: "09999196630", email: "..." }
    if (!settings || typeof settings !== 'object') {
      return res.status(400).json({ success: false, message: 'داده‌های تنظیمات معتبر نیستند.' });
    }

    const now = new Date().toISOString();
    const updateStmt = db.prepare(`
      INSERT INTO website_settings (key, value, group_name, updated_at)
      VALUES (?, ?, 'custom', ?)
      ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at
    `);

    for (const [key, val] of Object.entries(settings)) {
      if (typeof val === 'string') {
        updateStmt.run(key, val, now);
      }
    }

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, created_at)
      VALUES (?, ?, 'UPDATE_SETTINGS', 'website_settings', 'به‌روزرسانی تنظیمات سراسری وبسایت', ?)
    `).run(req.user!.id, req.user!.username, now);

    res.json({ success: true, message: 'تنظیمات با موفقیت ذخیره گردید.' });
  },
};
