import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config';
import { db } from '../db/database';

export interface AuthRequest extends Request {
  user?: {
    id: number;
    username: string;
    email: string;
    role: string;
    full_name: string;
  };
}

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: 'توکن اعتبارسنجی ارسال نشده است.' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, config.jwtSecret) as { id: number; username: string };
    const user = db.prepare(`
      SELECT id, username, email, full_name, role, is_active
      FROM users WHERE id = ?
    `).get(decoded.id) as any;

    if (!user || !user.is_active) {
      return res.status(401).json({ success: false, message: 'حساب کاربری یافت نشد یا غیرفعال است.' });
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'توکن نامعتبر است یا منقضی شده است.' });
  }
}

export function requireRole(allowedRoles: string[]) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'احراز هویت الزامی است.' });
    }
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ success: false, message: 'شما سطح دسترسی لازم برای این عملیات را ندارید.' });
    }
    next();
  };
}
