import { Router } from 'express';
import { mediaController } from '../controllers/mediaController';
import { authenticate, requireRole } from '../middleware/auth';
import { uploadMiddleware } from '../middleware/upload';

const router = Router();

router.get('/', authenticate, mediaController.getAll);
router.post('/upload', authenticate, uploadMiddleware.single('file'), mediaController.upload);
router.put('/:id', authenticate, requireRole(['super_admin', 'admin', 'editor']), mediaController.update);
router.delete('/:id', authenticate, requireRole(['super_admin', 'admin']), mediaController.delete);

export default router;
