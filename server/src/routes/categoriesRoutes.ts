import { Router } from 'express';
import { categoriesController } from '../controllers/categoriesController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Public & Admin
router.get('/', categoriesController.getAll);

// Admin
router.post('/', authenticate, requireRole(['super_admin', 'admin', 'editor']), categoriesController.create);
router.put('/:id', authenticate, requireRole(['super_admin', 'admin', 'editor']), categoriesController.update);
router.delete('/:id', authenticate, requireRole(['super_admin', 'admin']), categoriesController.delete);

export default router;
