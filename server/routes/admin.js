import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/login', (req, res) => {
  const { password } = req.body;
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

  if (password === adminPassword) {
    res.json({ success: true, token: 'admin-authenticated-session' });
  } else {
    res.status(401).json({ success: false, error: 'Incorrect password' });
  }
});

export default router;
