// lib/mongoose.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_URI!;

export async function connectToDatabase() {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect(MONGODB_URI);
  }
}
