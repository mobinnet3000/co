import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  jwtSecret: process.env.JWT_SECRET || 'madanco_production_jwt_secret_key_2026_secured_mining_data',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbPath: process.env.DATABASE_PATH || path.resolve(process.cwd(), 'server/data/madanco.sqlite'),
  uploadsDir: process.env.UPLOADS_DIR || path.resolve(process.cwd(), 'server/data/uploads'),
  corsOrigins: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173', 'http://localhost:3000', 'https://madan.co.ir'],
  nodeEnv: process.env.NODE_ENV || 'development',
  siteUrl: process.env.SITE_URL || 'https://madan.co.ir',
  platformLiveUrl: process.env.PLATFORM_LIVE_URL || 'https://madan.ba3tani.ir',
};
