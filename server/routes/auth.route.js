import express from 'express';
import authController from '../controllers/auth.controller';

import authMiddleWare from '../middlewares/auth.middleware';
import attachUserMiddleWare from '../middlewares/attach-user.middleware';

const router = express.Router();

router.post('/login', authController.login);

router.post('/register', authController.register);

router.get('/validate', authMiddleWare, attachUserMiddleWare, authController.validate);

export default router;
