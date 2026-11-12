import { Router } from 'express';
import { searchController } from '../controllers/searchController';
import { requireAuth } from '../middleware/auth';

const router = Router();

// Admin global search across all entities
router.get('/admin', requireAuth, searchController.adminGlobalSearch);

export default router;
