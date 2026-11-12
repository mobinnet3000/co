import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';
import { config } from '../config';

export const mediaController = {
  // Admin: Upload single or multiple files
  upload: (req: AuthRequest, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'فایلی جهت آپلود انتخاب نشده است.' });
    }

    const { alt_text, title } = req.body;
    const file = req.file;
    const url = `/uploads/${file.filename}`;
    const now = new Date().toISOString();

    const result = db.prepare(`
      INSERT INTO media (filename, original_name, mime_type, size, url, alt_text, title, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      file.filename,
      file.originalname,
      file.mimetype,
      file.size,
      url,
      alt_text || file.originalname,
      title || file.originalname,
      now
    );

    res.status(201).json({
      success: true,
      message: 'فایل با موفقیت آپلود شد.',
      data: {
        id: Number(result.lastInsertRowid),
        url,
        filename: file.filename,
        original_name: file.originalname,
        mime_type: file.mimetype,
        size: file.size,
      },
    });
  },

  // Admin: List all media
  getAll: (req: AuthRequest, res: Response) => {
    const { search, type } = req.query;
    let query = 'SELECT * FROM media WHERE 1=1';
    const params: any[] = [];

    if (search) {
      query += ' AND (original_name LIKE ? OR alt_text LIKE ? OR title LIKE ?)';
      const s = `%${search}%`;
      params.push(s, s, s);
    }

    if (type === 'image') {
      query += " AND mime_type LIKE 'image/%'";
    } else if (type === 'document') {
      query += " AND mime_type NOT LIKE 'image/%'";
    }

    query += ' ORDER BY created_at DESC';
    const media = db.prepare(query).all(...params);

    res.json({ success: true, data: media });
  },

  // Admin: Update metadata
  update: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const { alt_text, title } = req.body;

    const existing = db.prepare('SELECT id FROM media WHERE id = ?').get(id);
    if (!existing) {
      return res.status(404).json({ success: false, message: 'فایل یافت نشد.' });
    }

    db.prepare(`
      UPDATE media SET
        alt_text = COALESCE(?, alt_text),
        title = COALESCE(?, title)
      WHERE id = ?
    `).run(alt_text, title, id);

    res.json({ success: true, message: 'مشخصات فایل به‌روزرسانی شد.' });
  },

  // Admin: Delete media
  delete: (req: AuthRequest, res: Response) => {
    const { id } = req.params;
    const media = db.prepare('SELECT id, filename FROM media WHERE id = ?').get(id) as any;
    if (!media) {
      return res.status(404).json({ success: false, message: 'فایل یافت نشد.' });
    }

    // Remove from disk safely
    const filePath = path.join(config.uploadsDir, media.filename);
    if (fs.existsSync(filePath)) {
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.error('Error removing file from disk:', err);
      }
    }

    db.prepare('DELETE FROM media WHERE id = ?').run(id);
    res.json({ success: true, message: 'فایل با موفقیت حذف شد.' });
  },
};
