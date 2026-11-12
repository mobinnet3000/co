import { DatabaseSync } from 'node:sqlite';
import fs from 'fs';
import path from 'path';
import { config } from '../config';

// Ensure data and uploads directories exist
const dataDir = path.dirname(config.dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}
if (!fs.existsSync(config.uploadsDir)) {
  fs.mkdirSync(config.uploadsDir, { recursive: true });
}

// Auto-seed bootstrap if database does not exist but a seed file is present
const seedPath = path.join(dataDir, 'madanco.sqlite.seed');
if (!fs.existsSync(config.dbPath) && fs.existsSync(seedPath)) {
  try {
    fs.copyFileSync(seedPath, config.dbPath);
    console.log(`✓ Bootstrapped new database from seed file to: ${config.dbPath}`);
  } catch (err: any) {
    console.warn('Notice: Could not copy seed database file:', err?.message);
  }
}

export const db = new DatabaseSync(config.dbPath);

// Enable WAL mode and foreign keys for high performance and integrity
db.exec('PRAGMA journal_mode = WAL;');
db.exec('PRAGMA foreign_keys = ON;');

export function initDatabase() {
  db.exec(`
    -- Users table for Authentication and Access Control
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'editor',
      is_active INTEGER NOT NULL DEFAULT 1,
      last_login_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Pages table for CMS page management
    CREATE TABLE IF NOT EXISTS pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT,
      content TEXT,
      status TEXT NOT NULL DEFAULT 'published',
      scheduled_at TEXT,
      parent_id INTEGER REFERENCES pages(id) ON DELETE SET NULL,
      template TEXT DEFAULT 'default',
      seo_title TEXT,
      seo_description TEXT,
      focus_keyword TEXT,
      canonical_url TEXT,
      og_image TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Categories table for Blog
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      created_at TEXT NOT NULL
    );

    -- Tags table for Blog
    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL
    );

    -- Articles table for Publishing & Knowledge Base
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      summary TEXT NOT NULL,
      content_html TEXT NOT NULL,
      featured_image TEXT,
      author_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      author_name TEXT NOT NULL,
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      status TEXT NOT NULL DEFAULT 'published',
      reading_time TEXT,
      is_featured INTEGER NOT NULL DEFAULT 0,
      seo_title TEXT,
      seo_description TEXT,
      focus_keyword TEXT,
      canonical_url TEXT,
      og_image TEXT,
      published_at TEXT NOT NULL,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Article-Tag junction table
    CREATE TABLE IF NOT EXISTS article_tags (
      article_id INTEGER NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
      tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (article_id, tag_id)
    );

    -- Media Library table
    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      size INTEGER NOT NULL,
      url TEXT NOT NULL,
      alt_text TEXT,
      title TEXT,
      created_at TEXT NOT NULL
    );

    -- Website Global Settings (Key-Value)
    CREATE TABLE IF NOT EXISTS website_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      group_name TEXT NOT NULL DEFAULT 'general',
      updated_at TEXT NOT NULL
    );

    -- Contact Messages & Inquiries table
    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      company TEXT,
      subject TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      internal_notes TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Redirects management table
    CREATE TABLE IF NOT EXISTS redirects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      source_url TEXT UNIQUE NOT NULL,
      target_url TEXT NOT NULL,
      status_code INTEGER NOT NULL DEFAULT 301,
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL
    );

    -- Audit Logs table
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      username TEXT NOT NULL,
      action TEXT NOT NULL,
      resource TEXT NOT NULL,
      details TEXT,
      ip_address TEXT,
      created_at TEXT NOT NULL
    );

    -- Page Sections table for Dynamic Page Builder & CMS
    CREATE TABLE IF NOT EXISTS page_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      page_id INTEGER NOT NULL REFERENCES pages(id) ON DELETE CASCADE,
      section_type TEXT NOT NULL,
      section_order INTEGER NOT NULL DEFAULT 0,
      config_json TEXT NOT NULL DEFAULT '{}',
      is_active INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Navigation Menus table
    CREATE TABLE IF NOT EXISTS navigation_menus (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      location TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Navigation Menu Items table (Supports hierarchical nested items)
    CREATE TABLE IF NOT EXISTS menu_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      menu_id INTEGER NOT NULL REFERENCES navigation_menus(id) ON DELETE CASCADE,
      title TEXT NOT NULL,
      url TEXT NOT NULL,
      parent_id INTEGER REFERENCES menu_items(id) ON DELETE CASCADE,
      sort_order INTEGER NOT NULL DEFAULT 0,
      target TEXT DEFAULT '_self',
      is_active INTEGER NOT NULL DEFAULT 1
    );

    -- Frequently Asked Questions (FAQ) table
    CREATE TABLE IF NOT EXISTS faqs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      question TEXT NOT NULL,
      answer TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'general',
      sort_order INTEGER NOT NULL DEFAULT 0,
      is_published INTEGER NOT NULL DEFAULT 1,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );

    -- Content Revisions table for version history
    CREATE TABLE IF NOT EXISTS content_revisions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      entity_type TEXT NOT NULL,
      entity_id INTEGER NOT NULL,
      user_id INTEGER REFERENCES users(id) ON DELETE SET NULL,
      content_snapshot TEXT NOT NULL,
      change_summary TEXT,
      created_at TEXT NOT NULL
    );

    -- First-party Privacy-preserving Analytics Events
    CREATE TABLE IF NOT EXISTS analytics_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      event_type TEXT NOT NULL DEFAULT 'pageview',
      path TEXT NOT NULL,
      referrer TEXT,
      ip_hash TEXT,
      user_agent TEXT,
      created_at TEXT NOT NULL
    );

    -- Indexes for fast lookups
    CREATE INDEX IF NOT EXISTS idx_pages_slug ON pages(slug);
    CREATE INDEX IF NOT EXISTS idx_pages_status ON pages(status);
    CREATE INDEX IF NOT EXISTS idx_page_sections_page ON page_sections(page_id, section_order);
    CREATE INDEX IF NOT EXISTS idx_menus_slug ON navigation_menus(slug);
    CREATE INDEX IF NOT EXISTS idx_menu_items_menu ON menu_items(menu_id, sort_order);
    CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
    CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
    CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
    CREATE INDEX IF NOT EXISTS idx_messages_status ON contact_messages(status);
    CREATE INDEX IF NOT EXISTS idx_audit_created ON audit_logs(created_at);
    CREATE INDEX IF NOT EXISTS idx_analytics_path ON analytics_events(path, created_at);
  `);
}
