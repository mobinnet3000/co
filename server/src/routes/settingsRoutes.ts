import { Router } from 'express';
import { settingsController } from '../controllers/settingsController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Public
router.get('/public', settingsController.getPublic);

// Admin
router.get('/', authenticate, settingsController.getAll);
router.post('/batch', authenticate, requireRole(['super_admin', 'admin']), settingsController.update);

export default router;
