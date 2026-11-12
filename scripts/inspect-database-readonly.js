import { DatabaseSync } from 'node:sqlite';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dbPath = path.resolve(__dirname, '../server/data/madanco.sqlite');

console.log('=== READ-ONLY DATABASE AUDIT: MadanCo ===');
console.log(`Target database path: ${dbPath}`);

const db = new DatabaseSync(dbPath, { readOnly: true });

// 1. Check integrity
const integrity = db.prepare('PRAGMA integrity_check;').all();
console.log('\n--- 1. Database Integrity Check ---');
console.log(integrity);

const fkCheck = db.prepare('PRAGMA foreign_key_check;').all();
console.log('\n--- 2. Foreign Key Check ---');
console.log(fkCheck.length === 0 ? '✓ No Foreign Key violations found.' : fkCheck);

// 2. List all tables
const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%' ORDER BY name;").all();
console.log(`\n--- 3. Tables List (${tables.length} tables found) ---`);

const targetTables = [
  'users',
  'pages',
  'articles',
  'categories',
  'tags',
  'article_tags',
  'media',
  'website_settings',
  'contact_messages',
  'navigation_menus',
  'menu_items',
  'page_sections',
  'audit_logs',
];

const auditResults = {};

for (const t of targetTables) {
  const exists = tables.some((tbl) => tbl.name === t);
  if (!exists) {
    auditResults[t] = { exists: false, count: 0, columns: [] };
    continue;
  }
  const countRow = db.prepare(`SELECT COUNT(*) as count FROM "${t}";`).get();
  const cols = db.prepare(`PRAGMA table_info("${t}");`).all();
  auditResults[t] = {
    exists: true,
    count: countRow.count,
    columns: cols.map((c) => `${c.name} (${c.type}${c.notnull ? ' NOT NULL' : ''}${c.pk ? ' PK' : ''})`),
  };
}

console.log(JSON.stringify(auditResults, null, 2));

// 4. Audit users (without revealing passwords or hashes)
console.log('\n--- 4. Users Table Audit (Sanitized) ---');
if (auditResults['users']?.exists) {
  const users = db.prepare('SELECT id, username, email, full_name, role, is_active, created_at FROM users;').all();
  console.log(users);
}

// 5. Audit categories and articles summary
console.log('\n--- 5. Content Summary ---');
if (auditResults['articles']?.exists) {
  const artStats = db.prepare("SELECT status, COUNT(*) as cnt FROM articles GROUP BY status;").all();
  console.log('Articles by status:', artStats);
  const sampleTitles = db.prepare("SELECT id, title, slug, status FROM articles LIMIT 5;").all();
  console.log('Sample articles:', sampleTitles);
}

if (auditResults['pages']?.exists) {
  const pagesList = db.prepare("SELECT id, title, slug, template, status FROM pages;").all();
  console.log('Pages list:', pagesList);
}

if (auditResults['website_settings']?.exists) {
  const settings = db.prepare("SELECT key, group_name, value FROM website_settings WHERE key IN ('site_name', 'phone', 'email', 'platform_live_url', 'site_url');").all();
  console.log('Key settings:', settings);
}

db.close();
console.log('\n=== END OF READ-ONLY DATABASE AUDIT ===');
