import { Router } from 'express';
import { shortenUrl, getUrlAnalytics, getUserUrls } from '../controllers/urlController';
import { authMiddleware } from '../middleware/authMiddleware';
import { rateLimiter } from '../middleware/rateLimiter';

const router = Router();

// Route to create a shortened URL with rate limiting
router.post('/shorten', authMiddleware, rateLimiter(50, 1), shortenUrl); // 50 requests per minute

// Route to get analytics for a shortened URL with rate limiting
router.get('/:code/analytics', authMiddleware, getUrlAnalytics); // 20 requests per minute

// Route to get all URLs created by a user with rate limiting
router.get('/user/urls', authMiddleware, getUserUrls); // 20 requests per minute

export default router;
