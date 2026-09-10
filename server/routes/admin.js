import express from 'express';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import { requireAuth } from '../middleware/auth.js';

dotenv.config();

const router = express.Router();

// Strict rate limiter for admin login to prevent brute force attacks (5 attempts per 15 minutes per IP)
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per window
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts from this IP. Please try again after 15 minutes.'
  }
});

// Admin login
router.post('/login', loginLimiter, (req, res) => {
  const { password } = req.body || {};
  const adminPassword = process.env.ADMIN_PASSWORD;

  // Never fall back to default passwords like admin123; strictly require ADMIN_PASSWORD
  if (!adminPassword) {
    console.error('CRITICAL: ADMIN_PASSWORD environment variable is not set!');
    return res.status(500).json({ 
      success: false, 
      error: 'Server authentication configuration error: ADMIN_PASSWORD is not configured.' 
    });
  }

  if (typeof password !== 'string' || !password) {
    return res.status(400).json({ success: false, error: 'Password is required' });
  }

  // Constant-time password comparison to prevent timing attacks
  const inputBuffer = Buffer.from(password);
  const targetBuffer = Buffer.from(adminPassword);

  let isMatch = false;
  if (inputBuffer.length === targetBuffer.length) {
    isMatch = crypto.timingSafeEqual(inputBuffer, targetBuffer);
  }

  if (isMatch) {
    const secret = process.env.JWT_SECRET || adminPassword;
    const token = jwt.sign({ role: 'admin' }, secret, { expiresIn: '24h' });
    return res.json({ 
      success: true, 
      token, 
      message: 'Authentication successful' 
    });
  }

  return res.status(401).json({ success: false, error: 'Incorrect password' });
});

// Verify active admin session
router.get('/verify', requireAuth, (req, res) => {
  res.json({ success: true, user: req.user });
});

export default router;
