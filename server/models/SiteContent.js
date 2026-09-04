import mongoose from 'mongoose';

const siteContentSchema = new mongoose.Schema({
  // There should only be one document — the site's content
  name: { type: String, default: 'Awoyele Victor Ayomide' },
  role: { type: String, default: 'Computer Science Student & Full-Stack Web Developer' },
  bio: { type: String, default: '' },
  location: { type: String, default: 'Nigeria' },
  
  specialization: [String],
  
  technologies: {
    type: Map,
    of: [String],
    default: {}
  },
  
  socials: {
    github: String,
    linkedin: String,
    twitter: String,
    whatsapp: String,
    phone: String,
  },

  email: { type: String, default: 'awoyeleeema1@gmail.com' },
}, { timestamps: true });

export default mongoose.model('SiteContent', siteContentSchema);
