import { Router } from 'express';
import { messagesController } from '../controllers/messagesController';
import { authenticate, requireRole } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimiter';

const router = Router();
const contactLimiter = createRateLimiter(60000, 10); // 10 submissions per minute per IP

// Public submit
router.post('/submit', contactLimiter, messagesController.submit);

// Admin
router.get('/', authenticate, messagesController.getAll);
router.get('/:id', authenticate, messagesController.getById);
router.patch('/:id/status', authenticate, requireRole(['super_admin', 'admin', 'editor']), messagesController.updateStatus);
router.post('/:id/notes', authenticate, requireRole(['super_admin', 'admin', 'editor']), messagesController.addNote);
router.delete('/:id', authenticate, requireRole(['super_admin', 'admin']), messagesController.delete);

export default router;
