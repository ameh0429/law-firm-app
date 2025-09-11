// server.js
import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import cors from 'cors';
import teamRoutes from './routes/team.js';
import blogRoutes from './routes/blog.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';
import bookingRoutes from './routes/booking.js';
import paystackRoute from './routes/paystack.js';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const allowedOrigins = [
  "http://localhost:3000",
];
if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('MongoDB connection error:', error));

// Routes
app.use('/api/team', teamRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/paystack', paystackRoute);
app.use('/uploads', express.static('uploads'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ message: 'Law Firm API is running!' });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
