import mongoose from 'mongoose';

const analyticsSchema = new mongoose.Schema({
  totalViews: { type: Number, default: 0 },
  countryBreakdown: { 
    type: Map, 
    of: Number, 
    default: new Map() 
  },
  viewsHistory: [
    {
      timestamp: { type: Date, default: Date.now },
      userAgent: String,
      referrer: String,
      countryCode: { type: String, default: 'Unknown' },
    }
  ]
}, { timestamps: true });

export default mongoose.model('Analytics', analyticsSchema);
