import { Router } from 'express';
import { authController } from '../controllers/authController';
import { authenticate } from '../middleware/auth';
import { createRateLimiter } from '../middleware/rateLimiter';

const router = Router();
const loginLimiter = createRateLimiter(60000, 10); // 10 login requests per minute

router.post('/login', loginLimiter, authController.login);
router.get('/me', authenticate, authController.getMe);
router.post('/change-password', authenticate, authController.changePassword);

export default router;
