import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'madanco_production_jwt_secret_key_2026_secured_mining_data',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbPath: process.env.DATABASE_PATH || process.env.DB_PATH || path.resolve(process.cwd(), 'server/data/madanco.sqlite'),
  uploadsDir: process.env.UPLOADS_DIR || process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'server/data/uploads'),
  distDir: process.env.DIST_DIR || path.resolve(process.cwd(), 'dist'),
  corsOrigins: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',').map(s => s.trim()) : ['http://localhost:5173', 'http://localhost:3000', 'https://madan.co.ir', 'https://madan.ba3tani.ir'],
  nodeEnv: process.env.NODE_ENV || 'development',
  siteUrl: process.env.SITE_URL || 'https://madan.co.ir',
  platformLiveUrl: process.env.PLATFORM_LIVE_URL || 'https://madan.ba3tani.ir',
  initialAdminUsername: process.env.INITIAL_ADMIN_USERNAME || 'admin',
  initialAdminPassword: process.env.INITIAL_ADMIN_PASSWORD || 'MadanCo@2026!Admin',
  initialAdminEmail: process.env.INITIAL_ADMIN_EMAIL || 'info@madan.co.ir',
};
