import { Router } from 'express';
import { seoController } from '../controllers/seoController';
import { authenticate } from '../middleware/auth';

const router = Router();

// Public sitemap & robots
router.get('/sitemap.xml', seoController.getSitemapXml);
router.get('/robots.txt', seoController.getRobotsTxt);

// Admin SEO analytics overview
router.get('/overview', authenticate, seoController.getOverview);

export default router;
