import { Router } from 'express';
import { articlesController } from '../controllers/articlesController';
import { authenticate, requireRole } from '../middleware/auth';

const router = Router();

// Public
router.get('/public', articlesController.getPublicArticles);
router.get('/public/:slug', articlesController.getPublicArticleBySlug);

// Admin
router.get('/', authenticate, articlesController.getAll);
router.get('/:id', authenticate, articlesController.getById);
router.post('/', authenticate, requireRole(['super_admin', 'admin', 'editor', 'author']), articlesController.create);
router.put('/:id', authenticate, requireRole(['super_admin', 'admin', 'editor', 'author']), articlesController.update);
router.delete('/:id', authenticate, requireRole(['super_admin', 'admin']), articlesController.delete);

export default router;
