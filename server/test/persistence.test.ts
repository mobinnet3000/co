import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'fs';
import path from 'path';
import os from 'os';
import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';

test('Data Persistence Test: Database & Uploads outside project directory', async (t) => {
  // 1. Create external temporary directory completely outside the project repository
  const extBaseDir = path.join(os.tmpdir(), `madanco-ext-test-${Date.now()}`);
  const extDbDir = path.join(extBaseDir, 'external-db');
  const extUploadsDir = path.join(extBaseDir, 'external-uploads');
  const extDbPath = path.join(extDbDir, 'madanco.sqlite');

  fs.mkdirSync(extDbDir, { recursive: true });
  fs.mkdirSync(extUploadsDir, { recursive: true });

  await t.test('1. Initialize database at external path and verify tables & seeds', () => {
    const db = new DatabaseSync(extDbPath);
    db.exec('PRAGMA journal_mode = WAL;');
    db.exec('PRAGMA foreign_keys = ON;');

    // Create schema
    db.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'editor',
        is_active INTEGER NOT NULL DEFAULT 1,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS articles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        summary TEXT,
        content_html TEXT,
        author_name TEXT,
        category_id INTEGER,
        status TEXT NOT NULL DEFAULT 'draft',
        reading_time INTEGER DEFAULT 5,
        is_featured INTEGER DEFAULT 0,
        seo_title TEXT,
        seo_description TEXT,
        focus_keyword TEXT,
        canonical_url TEXT,
        published_at TEXT,
        created_at TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read INTEGER DEFAULT 0,
        status TEXT DEFAULT 'new',
        created_at TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS website_settings (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        group_name TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
    `);

    // Insert baseline admin
    const now = new Date().toISOString();
    const hash = bcrypt.hashSync('ExternalAdminPass!2026', 10);
    db.prepare(`
      INSERT INTO users (username, email, password_hash, full_name, role, is_active, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'super_admin', 1, ?, ?)
    `).run('ext_admin', 'admin@external.test', hash, 'مدیر تست خارجی', now, now);

    // Insert custom test article
    db.prepare(`
      INSERT INTO articles (title, slug, summary, content_html, author_name, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, 'published', ?, ?)
    `).run(
      'مقاله تست ماندگاری داده در مسیر خارجی',
      'external-persistence-sample-article',
      'چکیده تست ذخیره داده در خارج از پوشه پروژه',
      '<p>محتوای کامل مقاله تست جهت تضمین عدم بازنویسی اطلاعات در زمان آپدیت</p>',
      'تیم مهندسی معدنکو',
      now,
      now
    );

    // Insert user contact inquiry
    db.prepare(`
      INSERT INTO contact_messages (name, email, phone, subject, message, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run('مهندس کمالی', 'kamali@mine-data.ir', '09121112233', 'استعلام سامانه پایش', 'درخواست بررسی خط فرآوری مس', now);

    // Insert custom settings
    db.prepare(`
      INSERT INTO website_settings (key, value, group_name, updated_at)
      VALUES (?, ?, 'general', ?)
    `).run('custom_production_key', 'verified_external_persistence_value_9988', now);

    // Create a mock uploaded file in external uploads directory
    const testFilePath = path.join(extUploadsDir, 'report-2026-q1.pdf');
    fs.writeFileSync(testFilePath, '%PDF-1.4 Mock Engineering Report Data for MadanCo');

    // Close connection to simulate shutdown
    db.close();

    assert.ok(fs.existsSync(extDbPath), 'External SQLite database file exists on disk');
    assert.ok(fs.existsSync(testFilePath), 'External uploaded file exists on disk');
  });

  await t.test('2. Simulate complete application restart and verify zero data loss', () => {
    // Reopen database with completely new independent connection
    const dbRestart = new DatabaseSync(extDbPath);
    dbRestart.exec('PRAGMA journal_mode = WAL;');

    // 1. Verify User exists
    const user = dbRestart.prepare('SELECT username, role, full_name FROM users WHERE username = ?').get('ext_admin') as any;
    assert.ok(user, 'Admin user must persist across restarts');
    assert.equal(user.username, 'ext_admin');
    assert.equal(user.role, 'super_admin');

    // 2. Verify Custom Article exists
    const article = dbRestart.prepare('SELECT title, slug, status FROM articles WHERE slug = ?').get('external-persistence-sample-article') as any;
    assert.ok(article, 'Custom article must persist across restarts');
    assert.equal(article.title, 'مقاله تست ماندگاری داده در مسیر خارجی');
    assert.equal(article.status, 'published');

    // 3. Verify Contact Message exists
    const msg = dbRestart.prepare('SELECT name, email, subject FROM contact_messages WHERE email = ?').get('kamali@mine-data.ir') as any;
    assert.ok(msg, 'Contact message must persist across restarts');
    assert.equal(msg.name, 'مهندس کمالی');
    assert.equal(msg.subject, 'استعلام سامانه پایش');

    // 4. Verify Custom Setting exists
    const setting = dbRestart.prepare('SELECT value FROM website_settings WHERE key = ?').get('custom_production_key') as any;
    assert.ok(setting, 'Custom setting must persist across restarts');
    assert.equal(setting.value, 'verified_external_persistence_value_9988');

    // 5. Verify External File exists
    const testFilePath = path.join(extUploadsDir, 'report-2026-q1.pdf');
    assert.ok(fs.existsSync(testFilePath), 'External media file must remain intact across updates');
    const content = fs.readFileSync(testFilePath, 'utf-8');
    assert.match(content, /Mock Engineering Report Data/);

    dbRestart.close();
  });

  // Cleanup external temp directory
  try {
    fs.rmSync(extBaseDir, { recursive: true, force: true });
  } catch (e) {
    // Ignore cleanup error if file locked briefly
  }
});
