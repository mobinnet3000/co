import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { DatabaseSync } from 'node:sqlite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../server/data/madanco.sqlite');
const backupDir = path.resolve(__dirname, '../server/backups');

if (!fs.existsSync(backupDir)) {
  console.error(`Backup directory not found at: ${backupDir}`);
  process.exit(1);
}

let targetBackup = process.argv[2];

if (!targetBackup) {
  // Find the most recent backup
  const files = fs.readdirSync(backupDir).filter((f) => f.endsWith('.sqlite'));
  if (files.length === 0) {
    console.error('No backup files found in server/backups.');
    process.exit(1);
  }
  files.sort().reverse();
  targetBackup = path.join(backupDir, files[0]);
} else if (!path.isAbsolute(targetBackup)) {
  targetBackup = path.resolve(process.cwd(), targetBackup);
}

if (!fs.existsSync(targetBackup)) {
  console.error(`Target backup file does not exist: ${targetBackup}`);
  process.exit(1);
}

// Verify integrity of the backup before restoring
try {
  const testDb = new DatabaseSync(targetBackup);
  const integrity = testDb.prepare('PRAGMA integrity_check;').get();
  console.log(`✓ Backup verified successfully:`, integrity);
} catch (err) {
  console.error('Invalid or corrupted backup file:', err.message);
  process.exit(1);
}

// Restore
fs.copyFileSync(targetBackup, dbPath);
console.log(`=======================================================`);
console.log(`✓ Database restored successfully from: ${targetBackup}`);
console.log(`✓ Active database target: ${dbPath}`);
console.log(`=======================================================`);
