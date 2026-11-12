import { Router } from 'express';
import { pageSectionsController } from '../controllers/pageSectionsController';
import { requireAuth, requireEditor } from '../middleware/auth';

const router = Router();

// Public route to fetch active sections by page slug
router.get('/public/slug/:slug', pageSectionsController.getByPageSlug);

// Admin routes for sections management
router.get('/page/:pageId', requireAuth, pageSectionsController.getByPageId);
router.post('/page/:pageId', requireAuth, requireEditor, pageSectionsController.create);
router.post('/page/:pageId/reorder', requireAuth, requireEditor, pageSectionsController.reorder);
router.put('/:id', requireAuth, requireEditor, pageSectionsController.update);
router.delete('/:id', requireAuth, requireEditor, pageSectionsController.delete);
router.post('/:id/duplicate', requireAuth, requireEditor, pageSectionsController.duplicate);

export default router;
