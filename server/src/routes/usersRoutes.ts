import { Router } from 'express';
import { usersController } from '../controllers/usersController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Only Super Admin & Admin can manage users
router.get('/', authenticate, requireRole(['super_admin', 'admin']), usersController.getAll);
router.post('/', authenticate, requireRole(['super_admin', 'admin']), usersController.create);
router.put('/:id', authenticate, requireRole(['super_admin', 'admin']), usersController.update);
router.delete('/:id', authenticate, requireRole(['super_admin']), usersController.delete);

// Audit logs
router.get('/audit-logs', authenticate, requireRole(['super_admin', 'admin']), usersController.getAuditLogs);

export default router;
