import { Router } from 'express';
import { createUser, getUsers, updateUser, deleteUser ,fetchRecentUsers } from '../controllers/adminController';
import { verifyToken } from '../middlewares/authMiddleware';
import { checkAdmin } from '../middlewares/checkAdmin';

const router = Router();

router.use(verifyToken, checkAdmin);

router.post('/users', createUser);        
router.get('/users', getUsers);           
router.put('/users/:id', updateUser);     
router.delete('/users/:id', deleteUser);  
router.get('/fetch/recent/user' ,fetchRecentUsers);

export default router;
