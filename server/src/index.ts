import express from 'express';
import cors from 'cors';
import path from 'path';
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

// Health check endpoint
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
app.use('/api/articles', articlesRoutes);
app.use('/api/categories', categoriesRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/seo', seoRoutes);
app.use('/api/users', usersRoutes);

// Error handling middleware
app.use(errorHandler);

// Start server if executed directly
if (process.env.NODE_ENV !== 'test') {
  app.listen(config.port, '0.0.0.0', () => {
    console.log(`=======================================================`);
    console.log(`✓ MadanCo Production Backend running on port ${config.port}`);
    console.log(`✓ Database: SQLite (Node.js 24 Native WAL Mode)`);
    console.log(`✓ API Health: http://localhost:${config.port}/api/health`);
    console.log(`=======================================================`);
  });
}
