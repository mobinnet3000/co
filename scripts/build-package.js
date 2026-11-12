#!/usr/bin/env node
/**
 * Automated script to create a clean production-ready cPanel Deployment Package
 * Output: dist-cpanel-release.zip
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const stageDir = path.join(rootDir, 'cpanel-deploy-staging');
const zipFile = path.join(rootDir, 'dist-cpanel-release.zip');

console.log('--- Preparing cPanel Deployment Package ---');

// 1. Verify build files
const clientDist = path.join(rootDir, 'dist');
const serverDist = path.join(rootDir, 'server', 'dist', 'index.js');

if (!fs.existsSync(clientDist) || !fs.existsSync(serverDist)) {
  console.log('Running full production build first...');
  execSync('npm run build', { stdio: 'inherit', cwd: rootDir });
}

// 2. Prepare clean staging directory
if (fs.existsSync(stageDir)) {
  fs.rmSync(stageDir, { recursive: true, force: true });
}
fs.mkdirSync(stageDir, { recursive: true });

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 3. Copy necessary deployment artifacts
console.log('Copying distribution files to staging...');
copyRecursive(clientDist, path.join(stageDir, 'dist'));
copyRecursive(path.join(rootDir, 'server', 'dist'), path.join(stageDir, 'server', 'dist'));

// Copy initial seed database if exists
const dbFile = path.join(rootDir, 'server', 'data', 'madanco.sqlite');
if (fs.existsSync(dbFile)) {
  copyRecursive(dbFile, path.join(stageDir, 'server', 'data', 'madanco.sqlite'));
}

// Create empty uploads directory placeholder
fs.mkdirSync(path.join(stageDir, 'server', 'data', 'uploads'), { recursive: true });

// Copy scripts
fs.mkdirSync(path.join(stageDir, 'scripts'), { recursive: true });
['reset-admin-password.js', 'backup-db.js', 'restore-db.js'].forEach(script => {
  const src = path.join(rootDir, 'scripts', script);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(stageDir, 'scripts', script));
  }
});

// Copy root deployment files
['app.js', 'package.json', 'package-lock.json', '.env.example'].forEach(file => {
  const src = path.join(rootDir, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, path.join(stageDir, file));
  }
});

// 4. Create ZIP archive
console.log('Compressing files into dist-cpanel-release.zip...');
if (fs.existsSync(zipFile)) {
  fs.unlinkSync(zipFile);
}

try {
  // Use PowerShell Compress-Archive on Windows
  execSync(`powershell -NoProfile -Command "Compress-Archive -Path '${stageDir}\\*' -DestinationPath '${zipFile}' -Force"`, { stdio: 'inherit' });
  const stats = fs.statSync(zipFile);
  console.log('=======================================================');
  console.log(`✓ cPanel Release Package successfully generated!`);
  console.log(`✓ Output file: dist-cpanel-release.zip`);
  console.log(`✓ Archive Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB`);
  console.log('=======================================================');
} catch (err) {
  console.error('Failed to create zip file:', err.message);
} finally {
  // Clean up staging directory
  if (fs.existsSync(stageDir)) {
    fs.rmSync(stageDir, { recursive: true, force: true });
  }
}
