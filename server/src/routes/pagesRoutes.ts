import { Router } from 'express';
import { pagesController } from '../controllers/pagesController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Public
router.get('/slug/:slug', pagesController.getBySlug);

// Admin
router.get('/', authenticate, pagesController.getAll);
router.get('/:id', authenticate, pagesController.getById);
router.post('/', authenticate, requireRole(['super_admin', 'admin', 'editor']), pagesController.create);
router.put('/:id', authenticate, requireRole(['super_admin', 'admin', 'editor']), pagesController.update);
router.delete('/:id', authenticate, requireRole(['super_admin', 'admin']), pagesController.delete);

export default router;
