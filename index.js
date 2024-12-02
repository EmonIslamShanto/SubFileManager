import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import subscriptionRoutes from './routes/subscriptionRoutes.js';
import fileRoutes from './routes/fileRoutes.js';
import courseRoutes from './routes/courseRoutes.js';
import authRoutes from './routes/authRoutes.js';
import { setupSwagger } from './swagger.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to the database
connectDB();

// Middleware
app.use(express.json());

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/files', fileRoutes);
app.use('/api/courses', courseRoutes);

// Swagger Documentation
setupSwagger(app);

// Error Handling Middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
