import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, error: 'Unauthorized: Authentication token required' });
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET || process.env.ADMIN_PASSWORD;

    if (!secret) {
      console.error('Server error: JWT_SECRET or ADMIN_PASSWORD is not set');
      return res.status(500).json({ success: false, error: 'Server authentication configuration missing' });
    }

    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ success: false, error: 'Unauthorized: Invalid or expired token' });
  }
};
