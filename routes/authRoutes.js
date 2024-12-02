import express from 'express';
import { login, registration } from '../controllers/authControllers.js';

const router = express.Router();

// User registration
router.post('/register', registration);

// User login
router.post('/login', login);

export default router;
