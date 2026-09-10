import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import contactRoutes from './routes/contact.js';
import contentRoutes from './routes/content.js';
import projectsRoutes from './routes/projects.js';
import analyticsRoutes from './routes/analytics.js';
import adminRoutes from './routes/admin.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Path to the built React frontend (one level up from /server, then /dist)
const distPath = path.join(__dirname, '..', 'dist');

// CORS Whitelist Configuration
const defaultAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'http://localhost:5000',
  'http://localhost:5001',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:5000',
  'http://127.0.0.1:5001',
];

const envAllowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(',').map(o => o.trim()).filter(Boolean)
  : [];

const allowedOrigins = [...new Set([...defaultAllowedOrigins, ...envAllowedOrigins])];

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. mobile apps, curl, or same-origin direct requests)
    if (!origin) return callback(null, true);

    // Allow configured whitelist origins, wildcard, render deployments, vercel, or localhost
    if (
      allowedOrigins.includes(origin) || 
      allowedOrigins.includes('*') ||
      origin.endsWith('.onrender.com') ||
      origin.endsWith('.vercel.app') ||
      origin.includes('localhost') ||
      origin.includes('127.0.0.1')
    ) {
      return callback(null, true);
    }

    // Default permissive for portfolio visitors to prevent breaking public API
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
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

// For any client-side SPA navigation routes, send back index.html
// In Express 5, /{splat} or /{*splat} captures all non-API paths
app.get('/{*splat}', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/assets')) {
    return next();
  }
  res.sendFile(path.join(distPath, 'index.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
  if (err && err.message && err.message.startsWith('CORS blocked')) {
    return res.status(403).json({ error: err.message });
  }
  console.error('Unhandled server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Database Connection
const mongoUri = process.env.MONGODB_URI || process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(mongoUri)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err.message));

app.listen(PORT, () => {
  console.log(`🚀 Portfolio server running on http://localhost:${PORT}`);
});
