import express from 'express';
import { authenticate } from '../middlewares/auth.js';
import { createCourse, updateCourse } from '../controllers/courseController.js';

const router = express.Router();

// POST /courses/create - Create a new course
router.post('/create', authenticate, createCourse);

// Update course with nested modules and videos
router.put('/:courseId', authenticate, updateCourse);

export default router;
