import express from 'express';
import SiteContent from '../models/SiteContent.js';

const router = express.Router();

// GET Site Content (Auto-seeds default if none exists)
router.get('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = await SiteContent.create({});
    }
    res.json(content);
  } catch (error) {
    console.error('Error fetching content:', error);
    res.status(500).json({ error: 'Failed to fetch site content' });
  }
});

// UPDATE Site Content
router.put('/', async (req, res) => {
  try {
    let content = await SiteContent.findOne();
    if (!content) {
      content = new SiteContent(req.body);
    } else {
      Object.assign(content, req.body);
    }

    const updated = await content.save();
    res.json({ success: true, content: updated });
  } catch (error) {
    console.error('Error updating content:', error);
    res.status(500).json({ error: 'Failed to update site content' });
  }
});

export default router;
