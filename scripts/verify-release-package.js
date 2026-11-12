import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const zipFile = path.join(rootDir, 'dist-cpanel-release.zip');
const extractDir = path.join(rootDir, 'temp-test-package-extract');

console.log('--- Testing & Auditing dist-cpanel-release.zip ---');

if (!fs.existsSync(zipFile)) {
  console.error('Fatal: dist-cpanel-release.zip does not exist!');
  process.exit(1);
}

const stats = fs.statSync(zipFile);
console.log(`✓ Zip File Found. Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);

// Clean extract dir
if (fs.existsSync(extractDir)) {
  fs.rmSync(extractDir, { recursive: true, force: true });
}
fs.mkdirSync(extractDir, { recursive: true });

try {
  // Extract
  execSync(`powershell -NoProfile -Command "Expand-Archive -Path '${zipFile}' -DestinationPath '${extractDir}'"`, { stdio: 'inherit' });
  console.log('✓ Successfully extracted archive');

  // Audit checklist
  const checks = [
    { label: 'app.js entry file exists', path: 'app.js', required: true },
    { label: 'package.json exists', path: 'package.json', required: true },
    { label: 'package-lock.json exists', path: 'package-lock.json', required: true },
    { label: 'server/dist/index.js bundled server exists', path: 'server/dist/index.js', required: true },
    { label: 'dist/index.html root exists', path: 'dist/index.html', required: true },
    { label: 'dist/blog/index.html blog archive exists', path: 'dist/blog/index.html', required: true },
    { label: 'dist/sitemap.xml exists', path: 'dist/sitemap.xml', required: true },
    { label: 'dist/robots.txt exists', path: 'dist/robots.txt', required: true },
    { label: 'server/data/madanco.sqlite.seed exists', path: 'server/data/madanco.sqlite.seed', required: true },
    { label: 'server/uploads directory exists', path: 'server/uploads', required: true },
    { label: 'scripts/reset-admin-password.js exists', path: 'scripts/reset-admin-password.js', required: true },
    { label: 'scripts/backup-db.js exists', path: 'scripts/backup-db.js', required: true },
    { label: 'scripts/restore-db.js exists', path: 'scripts/restore-db.js', required: true },
    { label: 'CPANEL_DEPLOYMENT_FA.md exists', path: 'CPANEL_DEPLOYMENT_FA.md', required: true },
    { label: 'FINAL_CPANEL_DEPLOYMENT_GUIDE.md exists', path: 'FINAL_CPANEL_DEPLOYMENT_GUIDE.md', required: true },
    { label: 'FINAL_DATA_PERSISTENCE_GUIDE.md exists', path: 'FINAL_DATA_PERSISTENCE_GUIDE.md', required: true },
    { label: 'FINAL_PRODUCTION_AUDIT.md exists', path: 'FINAL_PRODUCTION_AUDIT.md', required: true },
    { label: 'FINAL_PRODUCTION_TESTS.md exists', path: 'FINAL_PRODUCTION_TESTS.md', required: true },
    { label: 'FINAL_HANDOVER.md exists', path: 'FINAL_HANDOVER.md', required: true },
    { label: 'DEVELOP.md exists', path: 'DEVELOP.md', required: true },
    // Negative security checks (Must NOT exist in release package)
    { label: 'No local .env file in archive', path: '.env', mustNotExist: true },
    { label: 'No .git directory in archive', path: '.git', mustNotExist: true },
    { label: 'No node_modules in archive', path: 'node_modules', mustNotExist: true },
    { label: 'No live development database in archive', path: 'server/data/madanco.sqlite', mustNotExist: true },
    { label: 'No SQLite WAL transaction file in archive', path: 'server/data/madanco.sqlite-wal', mustNotExist: true },
    { label: 'No SQLite SHM shared memory file in archive', path: 'server/data/madanco.sqlite-shm', mustNotExist: true },
  ];

  let passed = true;
  for (const c of checks) {
    const fullPath = path.join(extractDir, c.path);
    const exists = fs.existsSync(fullPath);
    if (c.mustNotExist) {
      if (exists) {
        console.error(`✖ SECURITY FAIL: ${c.label} (Found at ${c.path})`);
        passed = false;
      } else {
        console.log(`✔ SECURITY PASS: ${c.label}`);
      }
    } else {
      if (!exists) {
        console.error(`✖ REQUIREMENT FAIL: ${c.label} (Missing at ${c.path})`);
        passed = false;
      } else {
        console.log(`✔ REQUIREMENT PASS: ${c.label}`);
      }
    }
  }

  // Count prerendered HTML files
  function countHtml(dir) {
    let count = 0;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const p = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        count += countHtml(p);
      } else if (entry.isFile() && entry.name.endsWith('.html')) {
        count++;
      }
    }
    return count;
  }

  const htmlCount = countHtml(path.join(extractDir, 'dist'));
  console.log(`✓ Total Prerendered HTML files in extracted package: ${htmlCount} (Expected: >= 40)`);
  if (htmlCount < 40) {
    console.error('✖ FAIL: Insufficient prerendered HTML routes');
    passed = false;
  }

  // Audit package.json dependencies for production installability
  const pkg = JSON.parse(fs.readFileSync(path.join(extractDir, 'package.json'), 'utf-8'));
  console.log(`✓ Package name: ${pkg.name}, version: ${pkg.version}`);
  console.log(`✓ Production dependencies count: ${Object.keys(pkg.dependencies || {}).length}`);

  if (!passed) {
    console.error('\n✖ PACKAGE AUDIT FAILED!');
    process.exit(1);
  } else {
    console.log('\n=======================================================');
    console.log('✓ PACKAGE AUDIT PASSED 100% — READY FOR CPANEL RELEASE');
    console.log('=======================================================');
  }
} finally {
  // Clean up
  if (fs.existsSync(extractDir)) {
    fs.rmSync(extractDir, { recursive: true, force: true });
    console.log('✓ Cleaned up extraction directory');
  }
}
