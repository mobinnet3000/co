import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const usersController = {
  // Admin: Get all users
  getAll: (req: AuthRequest, res: Response) => {
    const users = db.prepare(`
      SELECT id, username, email, full_name, role, is_active, last_login_at, created_at
      FROM users ORDER BY created_at DESC
    `).all();
    res.json({ success: true, data: users });
  },

  // Admin: Create user
  create: (req: AuthRequest, res: Response) => {
    const { username, email, password, full_name, role = 'editor' } = req.body;

    if (!username || !email || !password || !full_name) {
      return res.status(400).json({ success: false, message: 'کلیه فیلدهای نام کاربری، ایمیل، کلمه عبور و نام کامل الزامی هستند.' });
    }

    const cleanUsername = username.trim().toLowerCase();
    const existing = db.prepare('SELECT id FROM users WHERE username = ? OR email = ?').get(cleanUsername, email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'کاربری با این نام کاربری یا ایمیل وجود دارد.' });
    }

    const passwordHash = bcrypt.hashSync(password, 10);
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `).run(cleanUsername, email, passwordHash, full_name, role, now, now);

    res.status(201).json({ success: true, message: 'کاربر جدید با موفقیت ایجاد شد.', id: Number(result.lastInsertRowid) });
  },

  // Admin: Update user status/role
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { full_name, email, role, is_active, password } = req.body;

    const existing = db.prepare('SELECT id, username FROM users WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'کاربر یافت نشد.' });
    }

    // Prevent deactivating own account
    if (req.user!.id === Number(id) && is_active === 0) {
      return res.status(400).json({ success: false, message: 'نمی‌توانید حساب کاربری جاری خود را غیرفعال کنید.' });
    }

    const now = new Date().toISOString();
    let passwordHashUpdate = null;
    if (password && password.length >= 8) {
      passwordHashUpdate = bcrypt.hashSync(password, 10);
    }

    db.prepare(`
      UPDATE users SET
        full_name = COALESCE(?, full_name),
        email = COALESCE(?, email),
        role = COALESCE(?, role),
        is_active = COALESCE(?, is_active),
        password_hash = COALESCE(?, password_hash),
        updated_at = ?
      WHERE id = ?
    `).run(
      full_name ?? null,
      email ?? null,
      role ?? null,
      is_active ?? null,
      passwordHashUpdate ?? null,
      now,
      id
    );

    res.json({ success: true, message: 'اطلاعات کاربر به‌روزرسانی شد.' });
  },

  // Admin: Delete user
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;

    if (req.user!.id === Number(id)) {
      return res.status(400).json({ success: false, message: 'نمی‌توانید حساب کاربری فعال خود را حذف کنید.' });
    }

    db.prepare('DELETE FROM users WHERE id = ?').run(id);
    res.json({ success: true, message: 'کاربر حذف شد.' });
  },

  // Admin: Get system audit logs
  getAuditLogs: (req: AuthRequest, res: Response) => {
    const logs = db.prepare('SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 100').all();
    res.json({ success: true, data: logs });
  },
};
