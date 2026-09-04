import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  technologies: [String],
  github: String,
  liveUrl: String,
  gradientFrom: { type: String, default: '#7c3aed' },  // violet-600
  gradientTo: { type: String, default: '#c084fc' },     // purple-400
  icon: { type: String, default: 'code' },               // icon name
  image: String,  // optional uploaded image URL/base64
  order: { type: Number, default: 0 },
  featured: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Project', projectSchema);
