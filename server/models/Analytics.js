import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
  viewsHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      userAgent: String,
      referrer: String,
    }
  ]
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
