import { Router } from 'express';
import { menusController } from '../controllers/menusController';
import { requireAuth, requireEditor } from '../middleware/auth';

const router = Router();

// Public routes
router.get('/public/all', menusController.getAllPublic);
router.get('/public/:slug', menusController.getPublicBySlug);

// Admin routes
router.get('/', requireAuth, menusController.getAll);
router.get('/:id', requireAuth, menusController.getById);
router.post('/', requireAuth, requireEditor, menusController.create);
router.put('/:id', requireAuth, requireEditor, menusController.update);
router.delete('/:id', requireAuth, requireEditor, menusController.delete);

// Menu items
router.post('/:menuId/items', requireAuth, requireEditor, menusController.addItem);
router.put('/items/:itemId', requireAuth, requireEditor, menusController.updateItem);
router.delete('/items/:itemId', requireAuth, requireEditor, menusController.deleteItem);
router.post('/:menuId/items/reorder', requireAuth, requireEditor, menusController.reorderItems);

export default router;
