#!/usr/bin/env node
/**
 * CLI Tool to securely reset or create an administrator password
 * Usage: node scripts/reset-admin-password.js <username> <new_password>
 */
import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH || path.resolve(__dirname, '../server/data/madanco.sqlite');

const username = process.argv[2] || process.env.INITIAL_ADMIN_USERNAME || 'admin';
const newPassword = process.argv[3];

if (!newPassword) {
  console.error('\nخطا: رمز عبور جدید مشخص نشده است.');
  console.log('نحوه استفاده:');
  console.log('  node scripts/reset-admin-password.js <نام_کاربری> <رمز_عبور_جدید>');
  console.log('مثال:');
  console.log('  node scripts/reset-admin-password.js admin "MyStrongP@ssw0rd2026"\n');
  process.exit(1);
}

if (!fs.existsSync(dbPath)) {
  console.error(`خطا: فایل پایگاه داده در مسیر ${dbPath} یافت نشد.`);
  process.exit(1);
}

try {
  const db = new DatabaseSync(dbPath);
  const user = db.prepare('SELECT id, username, email FROM users WHERE username = ?').get(username);
  const now = new Date().toISOString();
  const passwordHash = bcrypt.hashSync(newPassword, 10);

  if (user) {
    db.prepare('UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?').run(passwordHash, now, user.id);
    console.log(`\n✓ رمز عبور کاربر "${username}" با موفقیت به‌روزرسانی شد.`);
    console.log(`  شناسه کاربری: ${user.id}`);
    console.log(`  ایمیل: ${user.email}\n`);
  } else {
    const result = db.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 1, ?, ?)
    `).run(username, `${username}@madan.co.ir`, passwordHash, 'مدیر ارشد سامانه', 'super_admin', now, now);
    console.log(`\n✓ کاربر مدیر ارشد جدید با نام کاربری "${username}" ایجاد و رمز عبور تنظیم گردید.`);
    console.log(`  شناسه ایجادشده: ${result.lastInsertRowid}\n`);
  }
} catch (err) {
  console.error('خطا در اجرای تغییر رمز:', err.message);
  process.exit(1);
}
