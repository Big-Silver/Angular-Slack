import express from 'express';
import chatsController from '../controllers/chats.controller';
import authMiddleware from '../middlewares/auth.middleware';
import attachUserMiddleware from '../middlewares/attach-user.middleware';

const router = express.Router();

router.get('/', authMiddleware, chatsController.getLast7Days);
router.post('/', authMiddleware, attachUserMiddleware, chatsController.send);

export default router;
