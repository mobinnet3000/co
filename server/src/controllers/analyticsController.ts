import { Request, Response } from 'express';
import crypto from 'crypto';
import { db } from '../db/database';
import { AuthRequest } from '../middleware/auth';

function hashIp(ip: string | undefined): string {
  if (!ip) return 'unknown';
  return crypto.createHash('sha256').update(ip + '_madanco_salt_2026').digest('hex').substring(0, 16);
}

export const analyticsController = {
  // Public: Collect event (pageview, interaction)
  track: (req: Request, res: Response) => {
    const { event_type = 'pageview', path = '/', referrer = '' } = req.body;
    const ip = (req.headers['x-forwarded-for'] as string) || req.socket.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    // Ignore assets, api and admin routes in analytics
    if (path.startsWith('/api') || path.startsWith('/admin') || path.includes('.')) {
      return res.json({ success: true, ignored: true });
    }

    const ipHash = hashIp(ip);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO analytics_events (event_type, path, referrer, ip_hash, user_agent, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(event_type, path, referrer.slice(0, 500), ipHash, userAgent.slice(0, 255), now);

    res.json({ success: true });
  },

  // Admin: Dashboard metrics
  getDashboard: (req: AuthRequest, res: Response) => {
    // 1. Total & Today views
    const totalViews = (db.prepare("SELECT COUNT(*) as c FROM analytics_events WHERE event_type = 'pageview'").get() as { c: number }).c;
    const today = new Date().toISOString().split('T')[0];
    const todayViews = (db.prepare("SELECT COUNT(*) as c FROM analytics_events WHERE event_type = 'pageview' AND created_at >= ?").get(`${today}T00:00:00`) as { c: number }).c;
    const uniqueVisitors = (db.prepare('SELECT COUNT(DISTINCT ip_hash) as c FROM analytics_events').get() as { c: number }).c;

    // 2. Top visited paths
    const topPaths = db.prepare(`
      SELECT path, COUNT(*) as views
      FROM analytics_events
      WHERE event_type = 'pageview'
      GROUP BY path
      ORDER BY views DESC
      LIMIT 10
    `).all() as Array<{ path: string; views: number }>;

    // 3. Last 7 days views trend
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const trends = db.prepare(`
      SELECT substr(created_at, 1, 10) as date, COUNT(*) as views
      FROM analytics_events
      WHERE event_type = 'pageview' AND created_at >= ?
      GROUP BY date
      ORDER BY date ASC
    `).all(sevenDaysAgo.toISOString()) as Array<{ date: string; views: number }>;

    // 4. Content counts
    const totalArticles = (db.prepare("SELECT COUNT(*) as c FROM articles WHERE status = 'published'").get() as { c: number }).c;
    const draftArticles = (db.prepare("SELECT COUNT(*) as c FROM articles WHERE status != 'published'").get() as { c: number }).c;
    const totalPages = (db.prepare("SELECT COUNT(*) as c FROM pages WHERE status = 'published'").get() as { c: number }).c;
    const totalMedia = (db.prepare('SELECT COUNT(*) as c FROM media').get() as { c: number }).c;
    const unreadMessages = (db.prepare("SELECT COUNT(*) as c FROM contact_messages WHERE status = 'unread'").get() as { c: number }).c;
    const totalMessages = (db.prepare('SELECT COUNT(*) as c FROM contact_messages').get() as { c: number }).c;

    // 5. Recent Admin Activities
    const recentLogs = db.prepare(`
      SELECT * FROM audit_logs
      ORDER BY created_at DESC
      LIMIT 6
    `).all();

    res.json({
      success: true,
      stats: {
        totalViews,
        todayViews,
        uniqueVisitors,
        totalArticles,
        draftArticles,
        totalPages,
        totalMedia,
        unreadMessages,
        totalMessages,
      },
      topPaths,
      trends,
      recentLogs,
    });
  },
};
