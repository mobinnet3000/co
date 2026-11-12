import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../db/database';
import { config } from '../config';
import { AuthRequest } from '../middleware/auth';

export const authController = {
  login: (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'نام کاربری و کلمه عبور الزامی هستند.' });
    }

    const user = db.prepare(`
      SELECT id, username, email, password_hash, full_name, role, is_active
      FROM users WHERE username = ? OR email = ?
    `).get(username, username) as any;

    if (!user) {
      return res.status(401).json({ success: false, message: 'نام کاربری یا کلمه عبور اشتباه است.' });
    }

    if (!user.is_active) {
      return res.status(403).json({ success: false, message: 'حساب کاربری شما غیرفعال شده است.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'نام کاربری یا کلمه عبور اشتباه است.' });
    }

    // Update last login
    const now = new Date().toISOString();
    db.prepare('UPDATE users SET last_login_at = ? WHERE id = ?').run(now, user.id);

    // Audit log
    const ip = req.ip || req.socket.remoteAddress || '';
    db.prepare(`
      INSERT INTO audit_logs (user_id, username, action, resource, details, ip_address, created_at)
      VALUES (?, ?, 'LOGIN', 'auth', 'ورود موفق به سیستم مدیریت', ?, ?)
    `).run(user.id, user.username, ip, now);

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      config.jwtSecret,
      { expiresIn: '7d' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    });
  },

  getMe: (req: AuthRequest, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'احراز هویت نشده است.' });
    }
    res.json({ success: true, user: req.user });
  },

  changePassword: (req: AuthRequest, res: Response) => {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password || new_password.length < 8) {
      return res.status(400).json({ success: false, message: 'کلمه عبور جدید باید حداقل ۸ کاراکتر باشد.' });
    }

    const user = db.prepare('SELECT password_hash FROM users WHERE id = ?').get(req.user!.id) as any;
    if (!bcrypt.compareSync(current_password, user.password_hash)) {
      return res.status(400).json({ success: false, message: 'کلمه عبور فعلی نادرست است.' });
    }

    const newHash = bcrypt.hashSync(new_password, 10);
    const now = new Date().toISOString();
    db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(newHash, now, req.user!.id);

    res.json({ success: true, message: 'کلمه عبور با موفقیت به‌روزرسانی شد.' });
  },
};
