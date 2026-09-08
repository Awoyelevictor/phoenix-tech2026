import express from 'express';
import Analytics from '../models/Analytics.js';

const router = express.Router();

// Record a new page view
router.post('/view', async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = new Analytics({ totalViews: 0, viewsHistory: [] });
    }

    analytics.totalViews += 1;
    analytics.viewsHistory.push({
      timestamp: new Date(),
      userAgent: req.headers['user-agent'] || 'unknown',
      referrer: req.headers['referer'] || 'direct',
    });

    // Keep history bounded to latest 1000 records
    if (analytics.viewsHistory.length > 1000) {
      analytics.viewsHistory = analytics.viewsHistory.slice(-1000);
    }

    await analytics.save();
    res.json({ success: true, totalViews: analytics.totalViews });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({ error: 'Failed to record analytics' });
  }
});

// Get analytics stats for Admin
router.get('/', async (req, res) => {
  try {
    let analytics = await Analytics.findOne();
    if (!analytics) {
      analytics = await Analytics.create({ totalViews: 0, viewsHistory: [] });
    }

    // Calculate views today
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const viewsToday = analytics.viewsHistory.filter(v => new Date(v.timestamp) >= startOfToday).length;

    res.json({
      totalViews: analytics.totalViews,
      viewsToday,
      recentViews: analytics.viewsHistory.slice(-20).reverse()
    });
  } catch (error) {
    console.error('Get analytics error:', error);
    res.status(500).json({ error: 'Failed to retrieve analytics' });
  }
});

export default router;
