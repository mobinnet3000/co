import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = process.env.DATABASE_PATH || process.env.DB_PATH || path.resolve(__dirname, '../server/data/madanco.sqlite');
const backupDir = process.env.BACKUP_DIR || path.resolve(path.dirname(dbPath), 'backups');

if (!fs.existsSync(dbPath)) {
  console.error(`Database file not found at: ${dbPath}`);
  process.exit(1);
}

if (!fs.existsSync(backupDir)) {
  fs.mkdirSync(backupDir, { recursive: true });
}

// Perform crash-consistent, WAL-safe SQLite backup using VACUUM INTO
const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
const backupPath = path.join(backupDir, `madanco_backup_${timestamp}.sqlite`);

try {
  const db = new DatabaseSync(dbPath);
  // Verify integrity
  const integrity = db.prepare('PRAGMA integrity_check;').get();
  console.log('✓ Source database integrity check:', integrity);

  // WAL-safe snapshot
  const safeDest = backupPath.replace(/\\/g, '/');
  db.exec(`VACUUM INTO '${safeDest}';`);
  db.close();

  // Verify backup integrity
  const testDb = new DatabaseSync(backupPath);
  const backupIntegrity = testDb.prepare('PRAGMA integrity_check;').get();
  testDb.close();
  console.log('✓ Backup database integrity check:', backupIntegrity);

  const stats = fs.statSync(backupPath);
  console.log(`=======================================================`);
  console.log(`✓ WAL-safe Backup successfully created!`);
  console.log(`✓ Path: ${backupPath}`);
  console.log(`✓ Size: ${(stats.size / 1024).toFixed(2)} KB`);
  console.log(`=======================================================`);
} catch (err) {
  console.error('Backup failed:', err.message);
  process.exit(1);
}
