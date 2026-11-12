import { Request, Response, NextFunction } from 'express';

interface RateLimitRecord {
  count: number;
  resetTime: number;
}

const memoryStore = new Map<string, RateLimitRecord>();

// Clean up old entries periodically
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of memoryStore.entries()) {
    if (now > record.resetTime) {
      memoryStore.delete(key);
    }
  }
}, 60000);

export function createRateLimiter(windowMs: number = 60000, maxRequests: number = 30) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${req.baseUrl}${req.path}:${ip}`;
    const now = Date.now();

    const record = memoryStore.get(key);
    if (!record || now > record.resetTime) {
      memoryStore.set(key, { count: 1, resetTime: now + windowMs });
      return next();
    }

    if (record.count >= maxRequests) {
      const waitSeconds = Math.ceil((record.resetTime - now) / 1000);
      return res.status(429).json({
        success: false,
        message: `تعداد درخواست‌های ارسالی بیش از حد مجاز است. لطفاً ${waitSeconds} ثانیه دیگر مجدداً تلاش فرمایید.`,
      });
    }

    record.count++;
    next();
  };
}
