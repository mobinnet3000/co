import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

// Strict validation of JWT_SECRET in Production
let jwtSecret = process.env.JWT_SECRET;
if (isProduction) {
  if (!jwtSecret || jwtSecret.length < 64) {
    throw new Error(
      '[FATAL SECURITY CONFIGURATION ERROR]\n' +
      'In production environment, JWT_SECRET is strictly mandatory and must be a cryptographically secure random string of at least 64 characters.\n' +
      'Generate one using: node -e "console.log(require(\'crypto\').randomBytes(32).toString(\'hex\'))"\n' +
      'Then add it to your server .env file.'
    );
  }
} else {
  // Safe test/dev fallback for local automated testing only
  jwtSecret = jwtSecret || 'dev_test_fallback_jwt_secret_key_only_not_for_production_use_minimum_64_chars_long_1234567890';
}

const rawPort = process.env.PORT;
const portValue = rawPort && !isNaN(Number(rawPort)) ? Number(rawPort) : (rawPort || 5000);

// Default CORS origins by environment
const defaultCorsOrigins = isProduction
  ? ['https://madan.co.ir', 'https://www.madan.co.ir']
  : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:5000', 'http://127.0.0.1:5173', 'https://madan.co.ir'];

const corsOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((s) => s.trim())
  : defaultCorsOrigins;

export const config = {
  port: portValue,
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  dbPath: process.env.DATABASE_PATH || process.env.DB_PATH || path.resolve(process.cwd(), 'server/data/madanco.sqlite'),
  uploadsDir: process.env.UPLOADS_DIR || process.env.UPLOAD_DIR || path.resolve(process.cwd(), 'server/uploads'),
  distDir: process.env.DIST_DIR || path.resolve(process.cwd(), 'dist'),
  corsOrigins,
  nodeEnv,
  siteUrl: process.env.SITE_URL || 'https://madan.co.ir',
  platformLiveUrl: process.env.BASE_URL || process.env.SITE_URL || 'https://madan.co.ir',
  initialAdminUsername: process.env.INITIAL_ADMIN_USERNAME || 'admin',
  initialAdminPassword: process.env.INITIAL_ADMIN_PASSWORD || (isProduction ? '' : 'dev_test_admin_pass'),
  initialAdminEmail: process.env.INITIAL_ADMIN_EMAIL || 'info@madan.co.ir',
};
