import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { config } from '../config';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(config.uploadsDir)) {
      fs.mkdirSync(config.uploadsDir, { recursive: true });
    }
    cb(null, config.uploadsDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `file-${uniqueSuffix}${ext}`);
  },
});

const allowedMimes = [
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/svg+xml',
  'image/gif',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
];

const allowedExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif', '.pdf', '.doc', '.docx'];
const dangerousExtensions = ['.php', '.phtml', '.php5', '.exe', '.sh', '.bash', '.js', '.cjs', '.mjs', '.bat', '.cmd', '.py', '.pl', '.cgi', '.jar'];

export const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15 MB limit
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();

    if (dangerousExtensions.includes(ext)) {
      return cb(new Error('بارگذاری فایل‌های اسکریپت یا اجرایی اکیداً غیرمجاز است.'));
    }

    if (allowedMimes.includes(file.mimetype) && allowedExtensions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('فرمت فایل مجاز نیست. تنها فرمت‌های تصویری و اسناد PDF/DOC مجاز هستند.'));
    }
  },
});
