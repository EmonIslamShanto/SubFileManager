import express from 'express';
import { processSubscriptions } from '../controllers/subscriptionController.js';
import { authenticate } from '../middlewares/auth.js';

const router = express.Router();

// Endpoint to manually trigger subscription processing
router.post('/process', authenticate, processSubscriptions);

export default router;
