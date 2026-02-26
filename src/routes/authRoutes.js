import express from 'express';
import { registerUser } from '../controllers/authControllers.js';

const router = express.Router();

//les routes
router.post('/register', registerUser)

export default router;