import { Router } from 'express';
import { analyticsController } from '../controllers/analyticsController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Public collect
router.post('/collect', analyticsController.track);

// Admin dashboard stats
router.get('/dashboard', requireAuth, analyticsController.getDashboard);

export default router;
