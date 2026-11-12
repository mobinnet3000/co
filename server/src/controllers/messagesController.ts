import { Request, Response } from 'express';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

export const messagesController = {
  // Public: Submit contact form / inquiry
  submit: (req: Request, res: Response) => {
    const { name, email, phone, company, subject, message } = req.body;

    if (!name || !message || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'نام، پیام، و حداقل یکی از راه‌های ارتباطی (شماره تلفن یا ایمیل) الزامی هستند.',
      });
    }

    // Basic email validation if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'فرمت آدرس ایمیل نامعتبر است.' });
    }

    const ip = req.ip || req.socket.remoteAddress || '';
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO contact_messages (name, email, phone, company, subject, message, status, ip_address, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'unread', ?, ?, ?)
    `).run(
      name.trim(),
      email ? email.trim() : '',
      phone ? phone.trim() : '',
      company ? company.trim() : '',
      subject ? subject.trim() : 'پیام ارتباط با شرکت',
      message.trim(),
      ip,
      now,
      now
    );

    res.status(201).json({
      success: true,
      message: 'پیام شما با موفقیت ثبت گردید. کارشناسان ما به زودی با شما تماس خواهند گرفت.',
      id: Number(result.lastInsertRowid),
    });
  },

  // Admin: Get all messages with filter & pagination
  getAll: (req: AuthRequest, res: Response) => {
    const { status, search, page = '1', limit = '20' } = req.query;
    const pageNum = Math.max(1, parseInt(page as string, 10));
    const limitNum = Math.max(1, Math.min(100, parseInt(limit as string, 10)));
    const offset = (pageNum - 1) * limitNum;

    let query = 'SELECT * FROM contact_messages WHERE 1=1';
    const params: any[] = [];

    if (status && status !== 'all') {
      query += ' AND status = ?';
      params.push(status);
    }

    if (search) {
      query += ' AND (name LIKE ? OR email LIKE ? OR phone LIKE ? OR company LIKE ? OR message LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s, s, s);
    }

    const countQuery = `SELECT COUNT(*) as total FROM (${query})`;
    const totalRow = db.prepare(countQuery).get(...params) as { total: number };
    const total = totalRow ? totalRow.total : 0;

    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(limitNum, offset);

    const messages = db.prepare(query).all(...params);

    // Unread count
    const unreadCountRow = db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'unread'").get() as { c: number };

    res.json({
      success: true,
      data: messages,
      unreadCount: unreadCountRow ? unreadCountRow.c : 0,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        totalPages: Math.ceil(total / limitNum),
      },
    });
  },

  // Admin: Get single message
  getById: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const msg = db.prepare('SELECT * FROM contact_messages WHERE id = ?').get(id) as any;
    if (!msg) {
      return res.status(404).json({ success: false, message: 'پیام یافت نشد.' });
    }

    // Auto mark as read if unread
    if (msg.status === 'unread') {
      const now = new Date().toISOString();
      db.prepare("UPDATE contact_messages SET status = 'read', updated_at = ? WHERE id = ?").run(now, id);
      msg.status = 'read';
    }

    res.json({ success: true, data: msg });
  },

  // Admin: Update status
  updateStatus: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { status } = req.body;

    const allowed = ['unread', 'read', 'in_progress', 'resolved', 'archived'];
    if (!allowed.includes(status)) {
      return res.status(400).json({ success: false, message: 'وضعیت انتخاب‌شده معتبر نیست.' });
    }

    const now = new Date().toISOString();
    db.prepare('UPDATE contact_messages SET status = ?, updated_at = ? WHERE id = ?').run(status, now, id);

    res.json({ success: true, message: 'وضعیت پیام به‌روزرسانی شد.' });
  },

  // Admin: Add note
  addNote: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { note } = req.body;

    const existing = db.prepare('SELECT internal_notes FROM contact_messages WHERE id = ?').get(id) as any;
    if (!existing) {
      return res.status(404).json({ success: false, message: 'پیام یافت نشد.' });
    }

    const now = new Date().toISOString();
    const formattedNote = `[${req.user!.username} در ${now.slice(0, 10)}]: ${note}\n\n${existing.internal_notes || ''}`;

    db.prepare('UPDATE contact_messages SET internal_notes = ?, updated_at = ? WHERE id = ?').run(formattedNote, now, id);

    res.json({ success: true, message: 'یادداشت داخلی با موفقیت افزوده شد.' });
  },

  // Admin: Delete message
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    db.prepare('DELETE FROM contact_messages WHERE id = ?').run(id);
    res.json({ success: true, message: 'پیام حذف شد.' });
  },
};
