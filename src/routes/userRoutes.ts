import { Router } from 'express';
import { register } from '../controllers/userController';
import { login } from '../controllers/authController';
import { verifyToken } from '../middlewares/authMiddleware';
import { profile } from '../controllers/profileController';

const router  = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/profile', verifyToken, profile);



export default router;
