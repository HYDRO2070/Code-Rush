import mongoose from 'mongoose';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error', err);
    process.exit(1);
  }
};

export default connectDB;


export async function getUserByEmail(email) {
  const db = await connectToDatabase();
  const user = await db.collection('users').findOne({ email }); // Assuming 'users' is your collection name
  return user;
}