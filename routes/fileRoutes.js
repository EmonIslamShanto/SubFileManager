import express from 'express';
import multer from 'multer';
import { authenticate } from '../middlewares/auth.js';
import { uploadFile } from '../controllers/fileController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// File upload endpoint
router.post('/upload', authenticate, upload.single('file'), uploadFile);

export default router;
