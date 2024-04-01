import express from 'express';
import userController from "../Controllers/userController.js";
import homeController from '../Controllers/homeController.js';
import verifyToken from '../Controllers/verify_token.js';

const router = express.Router();

// Define route for user registration (POST request)
router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/all', verifyToken,homeController.all);
router.post('/add', verifyToken,homeController.add);
router.put('/edit', verifyToken,homeController.edit);
router.delete('/delete', verifyToken,homeController.delete);


export default router;
