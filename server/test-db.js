import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

console.log('Testing MongoDB connection with URI:', process.env.MONGO_URI ? 'URI present' : 'URI MISSING');

try {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('SUCCESS: Connected to MongoDB Atlas!');
  process.exit(0);
} catch (err) {
  console.error('ERROR connecting to Atlas:', err.message);
  process.exit(1);
}
