import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';
import projectsRoutes from './routes/projects.js';
import analyticsRoutes from './routes/analytics.js';
import adminRoutes from './routes/admin.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 5000;

// Path to the built React frontend (one level up from /server, then /dist)
const distPath = path.join(__dirname, '..', 'dist');

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files from the React build
app.use(express.static(distPath));

// API Routes
app.use('/api/contact', contactRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/api/ping', (req, res) => {
  res.json({ message: 'Portfolio API Online', timestamp: new Date() });
});

// For any non-API route, send back the React index.html
// This makes React Router work correctly on refresh/direct URL
app.get('/*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// Database Connection
// Use the proper env‑var name (MONGODB_URI); fallback to MONGO_URI for backward compatibility
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
