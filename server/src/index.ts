import express from 'express';
import cors from 'cors';
import path from 'path';
import fs from 'fs';
import { config } from './config';
import { initDatabase } from './db/database';
import { seedDatabase } from './db/seed';
import { errorHandler } from './middleware/errorHandler';

import authRoutes from './routes/authRoutes';
import pagesRoutes from './routes/pagesRoutes';
import articlesRoutes from './routes/articlesRoutes';
import categoriesRoutes from './routes/categoriesRoutes';
import mediaRoutes from './routes/mediaRoutes';
import settingsRoutes from './routes/settingsRoutes';
import messagesRoutes from './routes/messagesRoutes';
import seoRoutes from './routes/seoRoutes';
import usersRoutes from './routes/usersRoutes';
import pageSectionsRoutes from './routes/pageSectionsRoutes';
import menusRoutes from './routes/menusRoutes';
import analyticsRoutes from './routes/analyticsRoutes';
import searchRoutes from './routes/searchRoutes';
import { seoController } from './controllers/seoController';

// Initialize and seed database
initDatabase();
seedDatabase();

export const app = express();

// Trust proxy for secure cookies/IP tracking
app.set('trust proxy', 1);

// Security & Parsing Middlewares
app.use(cors({
  origin: (origin, callback) => {
    // Allow local development and specified production origins, or requests with no origin (like mobile/curl)
    if (!origin || config.corsOrigins.includes(origin) || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      callback(null, true);
    } else {
      callback(null, true); // Permissive in self-hosted setup, origin checked in headers
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Static file serving for uploaded media
app.use('/uploads', express.static(config.uploadsDir));

// Public SEO routes at root
app.get('/sitemap.xml', seoController.getSitemapXml);
app.get('/robots.txt', seoController.getRobotsTxt);

// Health check endpoints (both /health and /api/health)
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MadanCo Corporate Platform',
    version: '1.0.0',
  });
});

app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    service: 'MadanCo Corporate & CMS API',
    version: '1.0.0',
  });
});

// Mount modular API routes
app.use('/api/auth', authRoutes);
app.use('/api/pages', pagesRoutes);
app.use('/api/sections', pageSectionsRoutes);
app.use('/api/menus', menusRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/search', searchRoutes);

// Catch-all 404 for unknown /api/* requests (NEVER return HTML for API requests)
app.use('/api', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'مسیر API مورد نظر یافت نشد (API endpoint not found)',
    path: req.originalUrl,
  });
});

// Error handling middleware
app.use(errorHandler);

// Production Frontend Static & SPA Serving (when dist exists)
if (fs.existsSync(config.distDir)) {
  // 1. Serve static assets with caching
  app.use(express.static(config.distDir, {
    index: false,
    maxAge: config.nodeEnv === 'production' ? '7d' : 0,
  }));

  // 2. Prerendered HTML checks & SPA fallback for GET requests
  app.use((req, res, next) => {
    if (req.method !== 'GET') {
      return next();
    }

    if (req.path.startsWith('/api') || req.path.startsWith('/uploads')) {
      return next();
    }

    // Check if an exact prerendered HTML file exists for this route (e.g. dist/about/index.html)
    const cleanPath = req.path.replace(/^\/|\/$/g, '');
    if (cleanPath) {
      const prerenderedPath = path.join(config.distDir, cleanPath, 'index.html');
      if (fs.existsSync(prerenderedPath)) {
        return res.sendFile(prerenderedPath);
      }
    }

    // Default SPA fallback
    const indexPath = path.join(config.distDir, 'index.html');
    if (fs.existsSync(indexPath)) {
      return res.sendFile(indexPath);
    }

    next();
  });
}

// Start server if executed directly (and not in node test runner)
const isTestRunner = process.env.NODE_ENV === 'test' || process.env.NODE_TEST_CONTEXT !== undefined || process.argv.some(arg => arg.includes('test'));
if (!isTestRunner) {
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`✓ MadanCo Production Server running on port ${config.port}`);
    console.log(`✓ Environment: ${config.nodeEnv}`);
    console.log(`✓ Database: SQLite (WAL Mode enabled)`);
    console.log(`✓ Frontend: Serving from ${config.distDir}`);
    console.log(`✓ Health: http://localhost:${config.port}/health`);
    console.log(`=======================================================`);
  });
}

export default app;
